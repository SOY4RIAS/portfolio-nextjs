# Plan de Implementación: RAG Chat Avanzado con AI SDK 6

## Resumen Ejecutivo

Este documento detalla el plan para implementar un sistema RAG (Retrieval-Augmented Generation) **avanzado** que demuestre uso profesional de AI, incluyendo:

- **AI SDK 6** con ToolLoopAgent y agent tools
- **Turso** (libSQL) para vector search nativo
- **OpenRouter** con modelos gratuitos
- Multi-step reasoning y human-in-the-loop patterns

---

## Stack Tecnológico Final

| Componente | Tecnología | Razón |
|------------|------------|-------|
| **Vector DB** | Turso (libSQL) | Vector search nativo, edge-ready, free tier generoso |
| **Embeddings** | OpenRouter (free models) | Sin costo, múltiples opciones |
| **LLM** | OpenRouter (:free models) | Llama 3.3 70B, Gemini Flash, DeepSeek gratis |
| **Framework** | AI SDK 6 | ToolLoopAgent, DevTools, multi-step |
| **Hosting** | Vercel | Edge runtime, streaming nativo |

**Costo Total: $0** (usando modelos gratuitos)

---

## Arquitectura Avanzada con Agentes

### Pipeline RAG con Agent Tools

```
User Query
    ↓
┌─────────────────────────────────────────┐
│           AI SDK 6 Agent                │
│  ┌─────────────────────────────────┐    │
│  │      ToolLoopAgent              │    │
│  │  ┌──────────┐ ┌──────────────┐  │    │
│  │  │ RAG Tool │ │ Context Tool │  │    │
│  │  └──────────┘ └──────────────┘  │    │
│  │  ┌──────────┐ ┌──────────────┐  │    │
│  │  │ Web Tool │ │ GitHub Tool  │  │    │
│  │  └──────────┘ └──────────────┘  │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│         Turso Vector Search             │
│  ┌─────────────────────────────────┐    │
│  │  F32_BLOB embeddings            │    │
│  │  DiskANN index (cosine)         │    │
│  │  vector_top_k() similarity      │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│     OpenRouter LLM (Free Models)        │
│  • Llama 3.3 70B (GPT-4 level)          │
│  • Gemini 2.0 Flash (1M context)        │
│  • DeepSeek R1 (reasoning)              │
└─────────────────────────────────────────┘
    ↓
Streamed Response with Tool Calls Visible
```

---

## AI SDK 6 Features a Implementar

### 1. ToolLoopAgent (Multi-Step Reasoning)

```typescript
// features/ai/lib/portfolio-agent.ts
import { ToolLoopAgent } from 'ai';
import { openrouter } from '@openrouter/ai-sdk-provider';
import { searchKnowledgeBase, getGitHubActivity, getCurrentDate } from './tools';

export const portfolioAgent = new ToolLoopAgent({
  model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
  instructions: `You are Santiago Arias's portfolio assistant. You have access to tools
to search his knowledge base, check his GitHub activity, and more.

ALWAYS use the searchKnowledgeBase tool first to find relevant information before answering.
If the user asks about recent projects, use the getGitHubActivity tool.

Respond in the same language as the user (Spanish or English).
Be concise but informative. Use markdown formatting.`,
  tools: {
    searchKnowledgeBase,
    getGitHubActivity,
    getCurrentDate,
  },
  stopWhen: stepCountIs(10), // Max 10 steps before stopping
});
```

### 2. Agent Tools con Tipos Estrictos

```typescript
// features/ai/lib/tools/search-knowledge-base.ts
import { tool } from 'ai';
import { z } from 'zod';
import { tursoClient } from '../turso';
import { generateEmbedding } from '../embeddings';

export const searchKnowledgeBase = tool({
  description: `Search Santiago's knowledge base for information about his experience,
skills, projects, AI expertise, education, and contact information.
Use this tool whenever you need factual information about Santiago.`,
  parameters: z.object({
    query: z.string().describe('The search query to find relevant information'),
    category: z.enum(['experience', 'skills', 'ai', 'education', 'contact', 'all'])
      .optional()
      .default('all')
      .describe('Optional category to filter results'),
    limit: z.number().min(1).max(10).optional().default(5)
      .describe('Number of results to return'),
  }),
  execute: async ({ query, category, limit }) => {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Search Turso with vector similarity
    const results = await tursoClient.execute({
      sql: `
        SELECT content, metadata,
               vector_distance_cos(embedding, vector(?)) as distance
        FROM documents
        WHERE category = COALESCE(?, category)
        ORDER BY distance ASC
        LIMIT ?
      `,
      args: [JSON.stringify(queryEmbedding), category === 'all' ? null : category, limit],
    });

    return {
      found: results.rows.length,
      results: results.rows.map(row => ({
        content: row.content,
        category: row.metadata?.category,
        relevance: (1 - row.distance).toFixed(2),
      })),
    };
  },
});
```

### 3. GitHub Activity Tool

```typescript
// features/ai/lib/tools/github-activity.ts
import { tool } from 'ai';
import { z } from 'zod';

export const getGitHubActivity = tool({
  description: `Get Santiago's recent GitHub activity including commits,
repositories, and contributions. Use this for questions about recent work or projects.`,
  parameters: z.object({
    type: z.enum(['repos', 'commits', 'contributions'])
      .describe('Type of activity to fetch'),
    limit: z.number().min(1).max(10).optional().default(5),
  }),
  execute: async ({ type, limit }) => {
    const response = await fetch(
      `https://api.github.com/users/SOY4RIAS/${type === 'repos' ? 'repos?sort=updated' : 'events'}`,
      { next: { revalidate: 3600 } } // Cache 1 hour
    );

    const data = await response.json();

    if (type === 'repos') {
      return data.slice(0, limit).map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        updated: repo.updated_at,
      }));
    }

    return data.slice(0, limit).map((event: any) => ({
      type: event.type,
      repo: event.repo.name,
      created: event.created_at,
    }));
  },
});
```

### 4. Human-in-the-Loop (Tool Approval)

```typescript
// features/ai/lib/tools/contact-tool.ts
import { tool } from 'ai';
import { z } from 'zod';

export const sendContactRequest = tool({
  description: 'Send a contact request or schedule a meeting with Santiago',
  parameters: z.object({
    name: z.string().describe('Name of the person'),
    email: z.string().email().describe('Email address'),
    message: z.string().describe('Message to send'),
  }),
  // Mark as requiring approval (human-in-the-loop)
  experimental_requireConfirmation: true,
  execute: async ({ name, email, message }) => {
    // This would integrate with your contact form/email service
    return {
      status: 'Contact request received',
      message: `Thanks ${name}! Santiago will respond to ${email} soon.`,
    };
  },
});
```

---

## Turso Vector Database Setup

### 1. Crear Database y Tabla

```typescript
// scripts/setup-turso.ts
import { createClient } from '@libsql/client';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function setupDatabase() {
  // Create documents table with vector column
  // Using 384 dimensions for lightweight embeddings (all-MiniLM-L6-v2)
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      metadata TEXT, -- JSON string
      category TEXT,
      embedding F32_BLOB(384),
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create vector index with DiskANN algorithm
  await turso.execute(`
    CREATE INDEX IF NOT EXISTS documents_embedding_idx
    ON documents (
      libsql_vector_idx(embedding, 'metric=cosine', 'type=diskann')
    )
  `);

  console.log('✓ Turso database setup complete');
}

setupDatabase();
```

### 2. Vector Similarity Search

```typescript
// features/ai/lib/turso.ts
import { createClient } from '@libsql/client';

export const tursoClient = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export async function searchSimilar(
  queryEmbedding: number[],
  limit: number = 5,
  category?: string
) {
  // Using vector_top_k for indexed approximate search
  const result = await tursoClient.execute({
    sql: `
      SELECT
        d.content,
        d.metadata,
        d.category
      FROM vector_top_k('documents_embedding_idx', vector(?), ?) AS v
      JOIN documents d ON d.rowid = v.id
      ${category ? 'WHERE d.category = ?' : ''}
    `,
    args: category
      ? [JSON.stringify(queryEmbedding), limit, category]
      : [JSON.stringify(queryEmbedding), limit],
  });

  return result.rows;
}
```

---

## OpenRouter Integration

### 1. Configuración del Provider

```typescript
// features/ai/lib/openrouter.ts
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
  // Optional: Add site info for rankings
  headers: {
    'HTTP-Referer': 'https://santiagoarias.dev',
    'X-Title': 'Santiago Arias Portfolio',
  },
});

// Free models available
export const FREE_MODELS = {
  // Best for general chat - GPT-4 level performance
  LLAMA_70B: 'meta-llama/llama-3.3-70b-instruct:free',

  // Best for long context (1M tokens)
  GEMINI_FLASH: 'google/gemini-2.0-flash-exp:free',

  // Best for reasoning/debugging
  DEEPSEEK_R1: 'deepseek/deepseek-r1:free',

  // Fast and efficient for simple tasks
  QWEN_CODER: 'qwen/qwen3-coder:free',
} as const;
```

### 2. Embeddings con Modelo Gratuito

```typescript
// features/ai/lib/embeddings.ts

// Option A: Use a free embedding API
export async function generateEmbedding(text: string): Promise<number[]> {
  // Using Hugging Face Inference API (free tier)
  const response = await fetch(
    'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  const embedding = await response.json();
  return embedding;
}

// Option B: Use OpenRouter's embedding endpoint
export async function generateEmbeddingOpenRouter(text: string): Promise<number[]> {
  const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/text-embedding-3-small',
      input: text,
    }),
  });

  const data = await response.json();
  return data.data[0].embedding;
}
```

---

## API Route con AI SDK 6

### Streaming Agent Responses

```typescript
// app/api/chat/route.ts
import { streamText } from 'ai';
import { openrouter, FREE_MODELS } from '@/features/ai/lib/openrouter';
import { searchKnowledgeBase, getGitHubActivity, getCurrentDate } from '@/features/ai/lib/tools';

export const runtime = 'edge'; // Enable edge runtime for faster responses

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openrouter(FREE_MODELS.LLAMA_70B),
    system: `You are Santiago Arias's portfolio AI assistant.

Santiago is a Senior Frontend Developer and AI-First Engineer with 8+ years of experience.
He has led teams of 30+ developers and currently works at BitcoinIRA.

You have access to tools to search his knowledge base and check his GitHub activity.
ALWAYS use searchKnowledgeBase first when asked about Santiago's experience, skills, or background.

Instructions:
- Respond in the same language as the user (Spanish or English)
- Be concise but informative
- Show your tool usage to demonstrate RAG capabilities
- Use markdown formatting for better readability
- For contact: me@santiagoarias.dev`,
    messages,
    tools: {
      searchKnowledgeBase,
      getGitHubActivity,
      getCurrentDate,
    },
    maxSteps: 5, // Allow up to 5 tool calls before final response
    toolChoice: 'auto',
  });

  return result.toDataStreamResponse();
}
```

---

## Actualización del Componente AIChat

### Con useChat y Tool Visualization

```typescript
// features/ai/components/AIChat.tsx
'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Input, Badge } from '@/shared';
import { Send, Bot, User, Sparkles, Search, Github, Calendar } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "What's your experience with AI tools?",
  "Show me your recent GitHub activity",
  "What tech stack do you specialize in?",
  "Tell me about your leadership experience",
];

const TOOL_ICONS: Record<string, any> = {
  searchKnowledgeBase: Search,
  getGitHubActivity: Github,
  getCurrentDate: Calendar,
};

export function AIChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showToolCalls, setShowToolCalls] = useState(true);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hi! I'm Santiago's AI assistant powered by **real RAG** with AI SDK 6.

I use **agent tools** to search a vector database (Turso) and fetch real-time data.
Watch the tool calls below to see RAG in action! 🔍`,
      },
    ],
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section id="ai-chat" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader />

        <Card className="max-w-2xl mx-auto overflow-hidden border-2 border-primary/20">
          <ChatHeader onToggleTools={() => setShowToolCalls(!showToolCalls)} />

          <div className="h-[28rem] overflow-y-auto p-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <div key={message.id}>
                  {/* Show tool calls if enabled */}
                  {showToolCalls && message.toolInvocations?.map((tool, i) => (
                    <ToolCallBadge key={i} tool={tool} />
                  ))}

                  <MessageBubble message={message} />
                </div>
              ))}
            </AnimatePresence>

            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <SuggestedQuestions
              questions={SUGGESTED_QUESTIONS}
              onSelect={(q) => handleInputChange({ target: { value: q } } as any)}
            />
          )}

          <ChatInput
            input={input}
            isLoading={isLoading}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </section>
  );
}

function ToolCallBadge({ tool }: { tool: any }) {
  const Icon = TOOL_ICONS[tool.toolName] || Search;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-xs text-muted-foreground mb-2"
    >
      <Badge variant="outline" className="gap-1">
        <Icon className="w-3 h-3" />
        {tool.toolName}
        {tool.state === 'result' && (
          <span className="text-green-500">✓</span>
        )}
      </Badge>
      {tool.state === 'call' && (
        <span className="animate-pulse">Searching...</span>
      )}
    </motion.div>
  );
}

// ... rest of sub-components (SectionHeader, ChatHeader, MessageBubble, etc.)
```

---

## Script de Ingesta de Datos

```typescript
// scripts/ingest-data.ts
import { createClient } from '@libsql/client';
import { resumeData } from '../data/resume';

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

interface DocumentChunk {
  content: string;
  category: string;
  metadata: Record<string, any>;
}

function chunkResumeData(): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];

  // Personal Info & Summary
  chunks.push({
    content: `Santiago Arias es ${resumeData.personalInfo.title}. ${resumeData.personalInfo.summary}.
Ubicación: ${resumeData.personalInfo.location}.
Experiencia total: 8+ años en desarrollo frontend y liderazgo técnico.`,
    category: 'overview',
    metadata: { source: 'personal_info' },
  });

  // Each work experience as separate chunk
  resumeData.experience.forEach((exp) => {
    const highlights = exp.highlights?.join('. ') || '';
    chunks.push({
      content: `Experiencia laboral en ${exp.company} (${exp.period}) como ${exp.position}.
${exp.description}
Logros destacados: ${highlights}`,
      category: 'experience',
      metadata: { company: exp.company, period: exp.period },
    });
  });

  // Skills grouped by category
  const skillsByCategory = resumeData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  Object.entries(skillsByCategory).forEach(([category, skills]) => {
    chunks.push({
      content: `Habilidades técnicas de ${category}: ${skills.join(', ')}.`,
      category: 'skills',
      metadata: { skillCategory: category },
    });
  });

  // AI Expertise
  resumeData.aiExpertise.forEach((expertise) => {
    chunks.push({
      content: `${expertise.title}: ${expertise.description}.
Herramientas y tecnologías: ${expertise.tools.join(', ')}.`,
      category: 'ai',
      metadata: { expertiseType: expertise.title },
    });
  });

  // Education
  resumeData.education.forEach((edu) => {
    chunks.push({
      content: `Educación: ${edu.degree} en ${edu.institution} (${edu.period}).`,
      category: 'education',
      metadata: { institution: edu.institution },
    });
  });

  // Contact
  chunks.push({
    content: `Información de contacto de Santiago Arias:
Email: ${resumeData.personalInfo.email}
GitHub: ${resumeData.personalInfo.github}
LinkedIn: ${resumeData.personalInfo.linkedin}
Website: ${resumeData.personalInfo.website}`,
    category: 'contact',
    metadata: { type: 'contact_info' },
  });

  return chunks;
}

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await fetch(
    'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    }
  );
  return response.json();
}

async function ingestData() {
  const chunks = chunkResumeData();
  console.log(`📦 Processing ${chunks.length} chunks...`);

  for (const chunk of chunks) {
    const embedding = await generateEmbedding(chunk.content);

    await turso.execute({
      sql: `INSERT INTO documents (content, category, metadata, embedding)
            VALUES (?, ?, ?, vector(?))`,
      args: [
        chunk.content,
        chunk.category,
        JSON.stringify(chunk.metadata),
        JSON.stringify(embedding),
      ],
    });

    console.log(`✓ Stored: ${chunk.category}`);

    // Rate limit for HuggingFace free tier
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log('🎉 Ingestion complete!');
}

ingestData();
```

---

## Variables de Entorno

```env
# .env.local

# Turso (Vector Database)
TURSO_DATABASE_URL=libsql://your-db-name.turso.io
TURSO_AUTH_TOKEN=your-auth-token

# OpenRouter (LLM)
OPENROUTER_API_KEY=sk-or-v1-xxx

# HuggingFace (Free Embeddings)
HUGGINGFACE_API_KEY=hf_xxx
```

---

## Estructura de Archivos Final

```
portfolio-nextjs/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts              # AI SDK 6 streaming route
│   └── ...
├── features/
│   └── ai/
│       ├── components/
│       │   └── AIChat.tsx            # Chat UI with tool visualization
│       ├── lib/
│       │   ├── openrouter.ts         # OpenRouter provider config
│       │   ├── turso.ts              # Turso client & search
│       │   ├── embeddings.ts         # HuggingFace embeddings
│       │   └── tools/
│       │       ├── index.ts          # Barrel export
│       │       ├── search-knowledge-base.ts
│       │       ├── github-activity.ts
│       │       └── contact.ts        # Human-in-the-loop example
│       └── ...
├── scripts/
│   ├── setup-turso.ts                # DB setup script
│   └── ingest-data.ts                # Data ingestion script
└── ...
```

---

## Dependencias a Instalar

```bash
npm install ai @openrouter/ai-sdk-provider @libsql/client zod
```

---

## Fases de Implementación

| Fase | Tarea | Descripción |
|------|-------|-------------|
| 1 | Setup Turso | Crear DB, tabla con vectors, índice DiskANN |
| 2 | Embeddings | Configurar HuggingFace API, script de ingesta |
| 3 | Agent Tools | Implementar searchKnowledgeBase, GitHub tool |
| 4 | API Route | Streaming con AI SDK 6, tool execution |
| 5 | UI Update | Tool visualization, improved chat component |
| 6 | Testing | Semantic search vs keywords, multi-step flows |

---

## Features Avanzadas para Demostrar

### 1. Multi-Step Reasoning
El agente puede encadenar múltiples herramientas:
- "¿Qué proyectos recientes tienes con React?" → searchKnowledgeBase → getGitHubActivity → respuesta

### 2. Tool Call Visualization
Mostrar en la UI qué herramientas está usando el agente en tiempo real.

### 3. Semantic Understanding
Preguntas como "trabajos anteriores" encuentran "experience" aunque no usen las mismas palabras.

### 4. Bilingual Support
Detecta automáticamente español/inglés y responde en el mismo idioma.

### 5. Real-time Data
GitHub activity se obtiene en tiempo real, no de datos estáticos.

---

## Comparativa: Turso vs Supabase

| Aspecto | Turso | Supabase pgvector |
|---------|-------|-------------------|
| **Setup** | Zero config, vector nativo | Requiere extensión |
| **Algoritmo** | DiskANN (edge-optimized) | IVFFlat/HNSW |
| **Free Tier** | 9GB storage, 500 DBs | 500MB storage |
| **Edge Runtime** | ✅ Nativo | ❌ No compatible |
| **Latencia** | ~10ms (edge) | ~50-100ms |
| **Ideal para** | Apps edge-first | Apps full-stack |

**Decisión: Turso** - Mejor para Vercel edge runtime y free tier más generoso.

---

## OpenRouter Free Models

| Modelo | Fortaleza | Context | Uso Ideal |
|--------|-----------|---------|-----------|
| Llama 3.3 70B | GPT-4 level | 128K | Chat general |
| Gemini 2.0 Flash | Long context | 1M | Documentos largos |
| DeepSeek R1 | Reasoning | 64K | Debugging, análisis |
| Qwen3 Coder | Código | 262K | Code generation |

---

## Referencias

- [AI SDK 6 Documentation](https://ai-sdk.dev/docs/introduction)
- [AI SDK 6 Agents Guide](https://sdk.vercel.ai/docs/foundations/agents)
- [Turso Vector Search](https://docs.turso.tech/features/ai-and-embeddings)
- [OpenRouter Free Models](https://openrouter.ai/collections/free-models)
- [ToolLoopAgent Example](https://vercel.com/kb/guide/how-to-build-ai-agents-with-vercel-and-the-ai-sdk)
