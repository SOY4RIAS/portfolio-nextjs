'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Search, Github, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Constants
const SUGGESTED_QUESTIONS = [
  "What's your experience with AI tools?",
  "Show me your recent GitHub activity",
  "What tech stack do you specialize in?",
  "Tell me about your leadership experience",
] as const;

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Hey! I'm Santiago's AI assistant powered by **real RAG** with AI SDK 6.

I use **agent tools** to search a vector database (Turso) and fetch real-time GitHub data.

Try asking me something about Santiago's experience, skills, or recent projects.`,
};

// Tool icons mapping
const TOOL_ICONS: Record<string, typeof Search> = {
  searchKnowledgeBase: Search,
  getGitHubActivity: Github,
  getCurrentDate: Calendar,
};

const TOOL_LABELS: Record<string, string> = {
  searchKnowledgeBase: 'Searching knowledge base',
  getGitHubActivity: 'Fetching GitHub activity',
  getCurrentDate: 'Getting current date',
};

export function AIChat() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTools, setShowTools] = useState(true);
  const [currentTool, setCurrentTool] = useState<string | null>(null);

  // Auto-scroll on new messages
  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setCurrentTool(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      // Read the streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantContent += chunk;

          // Update the assistant message with new content
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: assistantContent }
                : m
            )
          );
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setCurrentTool(null);
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <section id="ai-chat" className="py-20 bg-muted/30">
      <div className="container">
        <SectionHeader />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-background border-2 border-primary/20 rounded-xl shadow-lg overflow-hidden">
            <ChatHeader showTools={showTools} onToggleTools={() => setShowTools(!showTools)} />

            <div
              ref={messagesContainerRef}
              className="h-[450px] overflow-y-auto p-6 space-y-4"
            >
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </AnimatePresence>

              {isLoading && (
                <>
                  {showTools && currentTool && <ToolCallBadge toolName={currentTool} />}
                  <TypingIndicator />
                </>
              )}
            </div>

            {messages.length === 1 && (
              <SuggestedQuestions onSelect={handleSuggestionClick} />
            )}

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, skills, AI expertise..."
                  className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Sub-components

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">AI SDK 6 + RAG</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
        Ask Me Anything
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        This chat uses <strong>real RAG</strong> with vector search (Turso) and <strong>AI SDK 6 agent tools</strong>.
        Watch the tool calls to see semantic retrieval in action!
      </p>
    </motion.div>
  );
}

function ChatHeader({ showTools, onToggleTools }: { showTools: boolean; onToggleTools: () => void }) {
  return (
    <div className="px-6 py-4 border-b bg-muted/50 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Bot className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Santiago&apos;s AI Assistant</h3>
        <p className="text-sm text-muted-foreground">AI SDK 6 + Turso + OpenRouter</p>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={onToggleTools}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {showTools ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          Tools
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Online</span>
        </div>
      </div>
    </div>
  );
}

function ToolCallBadge({ toolName }: { toolName: string }) {
  const Icon = TOOL_ICONS[toolName] || Search;
  const label = TOOL_LABELS[toolName] || toolName;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-2 text-xs text-muted-foreground mb-3 ml-11"
    >
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-primary/10 border-primary/30 text-primary">
        <Icon className="w-3 h-3" />
        <span>{label}</span>
        <span className="animate-pulse">...</span>
      </div>
    </motion.div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      }`}>
        <MessageContent content={message.content} />
      </div>
    </motion.div>
  );
}

function MessageContent({ content }: { content: string }) {
  if (!content) return null;

  return (
    <div className="text-sm whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none [&_strong]:font-semibold [&_code]:bg-background/50 [&_code]:px-1 [&_code]:rounded">
      {content.split('\n').map((line, i) => (
        <span key={i}>
          {line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('`') && part.endsWith('`')) {
              return <code key={j} className="bg-background/50 px-1 rounded text-xs">{part.slice(1, -1)}</code>;
            }
            return part;
          })}
          {i < content.split('\n').length - 1 && <br />}
        </span>
      ))}
    </div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
        <Bot className="w-4 h-4" />
      </div>
      <div className="bg-muted rounded-2xl px-4 py-3">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </motion.div>
  );
}

function SuggestedQuestions({ onSelect }: { onSelect: (question: string) => void }) {
  return (
    <div className="px-6 py-3 border-t bg-muted/30">
      <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_QUESTIONS.map((question, i) => (
          <button
            key={i}
            onClick={() => onSelect(question)}
            className="text-xs px-3 py-1.5 rounded-full bg-background border hover:bg-muted transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
