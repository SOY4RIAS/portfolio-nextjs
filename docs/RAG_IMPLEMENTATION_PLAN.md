# Plan de Implementación: RAG Chat Real

## Resumen Ejecutivo

Este documento detalla el plan para migrar el chat simulado actual (basado en keyword matching) a un sistema RAG (Retrieval-Augmented Generation) real con embeddings semánticos, vector database, y un LLM para generación de respuestas.

---

## Estado Actual

### Arquitectura Simulada
```
User Input → Keyword Matching → Template Response
```

**Limitaciones:**
- Solo detecta palabras clave exactas (substring matching)
- Sin comprensión semántica
- Respuestas hardcodeadas en templates
- Sin memoria de conversación
- No maneja sinónimos ni errores de escritura

**Archivos Actuales:**
- `features/ai/components/AIChat.tsx` - Componente UI (reutilizable)
- `features/ai/lib/rag-service.ts` - Servicio simulado (a reemplazar)
- `features/ai/data/knowledge-base.ts` - Data estática
- `data/resume.ts` - Datos del CV completos

---

## Arquitectura Propuesta

### RAG Pipeline Real
```
User Query
    ↓
[1] API Route (/api/chat)
    ↓
[2] Generate Query Embedding (OpenAI/Voyage)
    ↓
[3] Vector Similarity Search (Supabase pgvector)
    ↓
[4] Retrieve Relevant Chunks
    ↓
[5] Construct Prompt with Context
    ↓
[6] LLM Generation (Claude/GPT-4)
    ↓
[7] Stream Response to Client
    ↓
Animated Response in UI
```

---

## Stack Tecnológico Recomendado

### Opción A: Stack Económico (Recomendado para Portfolio)

| Componente | Tecnología | Costo |
|------------|------------|-------|
| **Vector DB** | Supabase pgvector | Free tier (500MB) |
| **Embeddings** | OpenAI text-embedding-3-small | ~$0.02/1M tokens |
| **LLM** | Claude 3.5 Haiku | ~$0.25/1M input tokens |
| **Framework** | Vercel AI SDK | Gratis |
| **Hosting** | Vercel | Free tier |

**Costo Estimado:** $0-5/mes para uso moderado

### Opción B: Stack Premium

| Componente | Tecnología | Costo |
|------------|------------|-------|
| **Vector DB** | Pinecone | Free tier (1 index) |
| **Embeddings** | Voyage AI | Mayor precisión |
| **LLM** | Claude 3.5 Sonnet | ~$3/1M tokens |
| **Memory** | Upstash Redis | Pay-per-use |

**Costo Estimado:** $10-25/mes

### Decisión: **Opción A**
- Supabase ofrece hybrid search (vector + full-text)
- Free tier generoso para portfolio
- Integración nativa con Next.js

---

## Fases de Implementación

### Fase 1: Infraestructura Base
**Duración estimada: 1-2 horas**

#### 1.1 Configurar Supabase
- [ ] Crear proyecto en Supabase
- [ ] Habilitar extensión pgvector
- [ ] Crear tabla para embeddings

```sql
-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table
CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create similarity search function
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.7,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Create index for faster searches
CREATE INDEX ON documents
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```

#### 1.2 Configurar Variables de Entorno
```env
# .env.local
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

OPENAI_API_KEY=sk-xxx
# O para Claude:
ANTHROPIC_API_KEY=sk-ant-xxx
```

---

### Fase 2: Ingesta de Datos
**Duración estimada: 2-3 horas**

#### 2.1 Crear Script de Chunking
El contenido del CV se divide en chunks semánticos:

```typescript
// scripts/ingest-data.ts
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { resumeData } from '../data/resume';

const CHUNK_SIZE = 500; // tokens aproximados
const CHUNK_OVERLAP = 50;

interface DocumentChunk {
  content: string;
  metadata: {
    source: string;
    category: string;
    keywords: string[];
  };
}

function chunkResumeData(): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];

  // Chunk: Personal Info & Summary
  chunks.push({
    content: `Santiago Arias es ${resumeData.personalInfo.title}. ${resumeData.personalInfo.summary}`,
    metadata: {
      source: 'personal_info',
      category: 'overview',
      keywords: ['about', 'summary', 'introduction']
    }
  });

  // Chunk: Each work experience
  resumeData.experience.forEach(exp => {
    const highlights = exp.highlights?.join('. ') || '';
    chunks.push({
      content: `Experiencia en ${exp.company} (${exp.period}) como ${exp.position}. ${exp.description} ${highlights}`,
      metadata: {
        source: 'experience',
        category: exp.company.toLowerCase(),
        keywords: ['work', 'job', 'experience', exp.company.toLowerCase()]
      }
    });
  });

  // Chunk: Skills by category
  const skillsByCategory = resumeData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  Object.entries(skillsByCategory).forEach(([category, skills]) => {
    chunks.push({
      content: `Habilidades de ${category}: ${skills.join(', ')}`,
      metadata: {
        source: 'skills',
        category: category.toLowerCase(),
        keywords: ['skills', 'technologies', category.toLowerCase()]
      }
    });
  });

  // Chunk: AI Expertise
  resumeData.aiExpertise.forEach(expertise => {
    chunks.push({
      content: `${expertise.title}: ${expertise.description}. Herramientas: ${expertise.tools.join(', ')}`,
      metadata: {
        source: 'ai_expertise',
        category: expertise.title.toLowerCase(),
        keywords: ['ai', 'artificial intelligence', expertise.title.toLowerCase()]
      }
    });
  });

  // Chunk: Education
  resumeData.education.forEach(edu => {
    chunks.push({
      content: `Educación: ${edu.degree} en ${edu.institution} (${edu.period})`,
      metadata: {
        source: 'education',
        category: 'education',
        keywords: ['education', 'study', 'degree']
      }
    });
  });

  // Chunk: Contact Information
  chunks.push({
    content: `Contacto: Email ${resumeData.personalInfo.email}, GitHub ${resumeData.personalInfo.github}, LinkedIn ${resumeData.personalInfo.linkedin}`,
    metadata: {
      source: 'contact',
      category: 'contact',
      keywords: ['contact', 'email', 'hire', 'reach']
    }
  });

  return chunks;
}
```

#### 2.2 Generar Embeddings y Almacenar

```typescript
// scripts/ingest-data.ts (continuación)
async function generateAndStoreEmbeddings() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const chunks = chunkResumeData();

  console.log(`Processing ${chunks.length} chunks...`);

  for (const chunk of chunks) {
    // Generate embedding
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk.content,
    });

    const embedding = embeddingResponse.data[0].embedding;

    // Store in Supabase
    const { error } = await supabase.from('documents').insert({
      content: chunk.content,
      metadata: chunk.metadata,
      embedding: embedding,
    });

    if (error) {
      console.error('Error inserting chunk:', error);
    } else {
      console.log(`✓ Stored: ${chunk.metadata.source}/${chunk.metadata.category}`);
    }
  }

  console.log('Ingestion complete!');
}

generateAndStoreEmbeddings();
```

---

### Fase 3: API Route para Chat
**Duración estimada: 2-3 horas**

#### 3.1 Crear Route Handler con Streaming

```typescript
// app/api/chat/route.ts
import { createClient } from '@supabase/supabase-js';
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // 1. Generate embedding for the query
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: lastMessage.content,
  });

  const queryEmbedding = embeddingResponse.data[0].embedding;

  // 2. Search for relevant documents
  const { data: documents, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.5,
    match_count: 5
  });

  if (error) {
    console.error('Search error:', error);
    return new Response('Error searching documents', { status: 500 });
  }

  // 3. Build context from retrieved documents
  const context = documents
    ?.map((doc: any) => doc.content)
    .join('\n\n') || '';

  // 4. Create system prompt with context
  const systemPrompt = `Eres el asistente virtual del portfolio de Santiago Arias, Senior Frontend Developer con 8+ años de experiencia.

CONTEXTO RECUPERADO (usa esta información para responder):
${context}

INSTRUCCIONES:
- Responde en el mismo idioma que el usuario (español o inglés)
- Sé conciso pero informativo
- Si la información no está en el contexto, indica que no tienes esa información
- Mantén un tono profesional pero amigable
- Puedes usar markdown para formatear la respuesta
- Si preguntan sobre contacto, incluye: me@santiagoarias.dev`;

  // 5. Stream response from Claude
  const result = streamText({
    model: anthropic('claude-3-5-haiku-20241022'),
    system: systemPrompt,
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.content
    })),
    maxTokens: 500,
  });

  return result.toDataStreamResponse();
}
```

---

### Fase 4: Actualizar Componente AIChat
**Duración estimada: 1-2 horas**

#### 4.1 Integrar useChat de Vercel AI SDK

```typescript
// features/ai/components/AIChat.tsx
'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, Input } from '@/shared';
import { Send, Bot, User, Sparkles } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "What's your experience with AI tools?",
  "Tell me about your leadership experience",
  "What tech stack do you use?",
  "How do you use RAG in development?",
];

export function AIChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Hi! I'm Santiago's AI assistant powered by **real RAG** (Retrieval-Augmented Generation).

I have semantic understanding of Santiago's experience, skills, and expertise. Ask me anything about his background!`
      }
    ],
  });

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestedQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any);
  };

  return (
    <section id="ai-chat" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeader />

        <Card className="max-w-2xl mx-auto overflow-hidden">
          <ChatHeader />

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </AnimatePresence>

            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <SuggestedQuestions
              questions={SUGGESTED_QUESTIONS}
              onSelect={handleSuggestedQuestion}
            />
          )}

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about Santiago's experience..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}

// Sub-components remain similar but simplified...
```

---

### Fase 5: Testing y Optimización
**Duración estimada: 1-2 horas**

#### 5.1 Tests a Realizar
- [ ] Query semántico vs keyword (e.g., "trabajos anteriores" debe encontrar "experience")
- [ ] Respuestas en español e inglés
- [ ] Manejo de preguntas fuera de contexto
- [ ] Velocidad de respuesta (< 3s first token)
- [ ] Streaming funciona correctamente

#### 5.2 Optimizaciones
- Implementar caché de embeddings para queries frecuentes
- Agregar rate limiting para proteger API keys
- Implementar fallback si Supabase/LLM falla

---

## Estructura de Archivos Final

```
portfolio-nextjs/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # NEW: API route con RAG
│   └── ...
├── features/
│   └── ai/
│       ├── components/
│       │   └── AIChat.tsx        # UPDATED: useChat hook
│       ├── lib/
│       │   ├── rag-service.ts    # DEPRECATED: puede eliminarse
│       │   ├── embeddings.ts     # NEW: utilidades de embeddings
│       │   └── supabase.ts       # NEW: cliente Supabase
│       └── ...
├── scripts/
│   └── ingest-data.ts            # NEW: script de ingesta
├── .env.local                    # NEW: variables de entorno
└── ...
```

---

## Dependencias a Instalar

```bash
npm install ai @ai-sdk/anthropic @supabase/supabase-js openai
```

---

## Costos Estimados (Mensual)

| Concepto | Free Tier | Uso Moderado |
|----------|-----------|--------------|
| Supabase | 500MB gratis | $0 |
| OpenAI Embeddings | ~$0.02/1M tokens | ~$0.10 |
| Claude Haiku | ~$0.25/1M input | ~$2-5 |
| Vercel | Free tier | $0 |
| **Total** | **$0** | **~$2-5/mes** |

---

## Cronograma Sugerido

| Fase | Tarea | Tiempo |
|------|-------|--------|
| 1 | Configurar Supabase + pgvector | 1-2h |
| 2 | Script de chunking e ingesta | 2-3h |
| 3 | API Route con streaming | 2-3h |
| 4 | Actualizar AIChat component | 1-2h |
| 5 | Testing y optimización | 1-2h |
| **Total** | | **7-12h** |

---

## Próximos Pasos

1. **Crear cuenta Supabase** (si no existe)
2. **Obtener API keys** (OpenAI + Anthropic)
3. **Comenzar con Fase 1**: Setup de infraestructura

---

## Referencias

- [Vercel AI SDK - RAG Guide](https://ai-sdk.dev/cookbook/guides/rag-chatbot)
- [Supabase pgvector Documentation](https://supabase.com/modules/vector)
- [Building RAG with Next.js](https://dev.to/emertechie/building-a-rag-chatbot-with-typescript-and-nextjs-53c6)
