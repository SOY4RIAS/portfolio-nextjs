'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';

// Types
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Constants
const SUGGESTED_QUESTIONS = [
  "What's your experience with AI tools?",
  'Show me your recent GitHub activity',
  'What tech stack do you specialize in?',
  'Tell me about your leadership experience',
] as const;

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Hey! I'm Santiago's AI assistant powered by **real RAG** with AI SDK 6.

I use **semantic search** to find relevant information from a vector database (Turso) about Santiago's experience, skills, and projects.

Try asking me something about Santiago's experience, skills, or recent projects.`,
};

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTools, setShowTools] = useState(true);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: input.trim(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

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

        const assistantMessage: ChatMessage = {
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
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const handleSuggestionClick = (question: string) => {
    setInput(question);
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
            <ChatHeader
              showTools={showTools}
              onToggleTools={() => setShowTools(!showTools)}
            />

            {/* Chat Messages with AI Elements */}
            <div className="h-[450px] flex flex-col">
              <Conversation className="flex-1">
                <ConversationContent className="gap-4 p-6">
                  <AnimatePresence mode="popLayout">
                    {messages.map((message) => (
                      <ChatMessageBubble key={message.id} message={message} />
                    ))}
                  </AnimatePresence>

                  {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <TypingIndicator />
                  )}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </div>

            {messages.length === 1 && (
              <SuggestedQuestions onSelect={handleSuggestionClick} />
            )}

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, skills, AI expertise..."
                  className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                >
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
        This chat uses <strong>real RAG</strong> with vector search (Turso) and{' '}
        <strong>AI SDK 6</strong>. Ask about Santiago&apos;s experience, skills,
        or projects!
      </p>
    </motion.div>
  );
}

function ChatHeader({
  showTools,
  onToggleTools,
}: {
  showTools: boolean;
  onToggleTools: () => void;
}) {
  return (
    <div className="px-6 py-4 border-b bg-muted/50 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Bot className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Santiago&apos;s AI Assistant</h3>
        <p className="text-sm text-muted-foreground">
          AI SDK 6 + Turso + OpenRouter
        </p>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={onToggleTools}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {showTools ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
          RAG Info
        </button>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Online</span>
        </div>
      </div>
    </div>
  );
}

function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <Message from={message.role}>
        <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}
          >
            {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          </div>
          <MessageContent
            className={
              isUser
                ? 'bg-primary text-primary-foreground rounded-2xl px-4 py-3'
                : 'bg-muted rounded-2xl px-4 py-3'
            }
          >
            {message.content ? (
              <MessageResponse>{message.content}</MessageResponse>
            ) : (
              <span className="text-muted-foreground italic">Thinking...</span>
            )}
          </MessageContent>
        </div>
      </Message>
    </motion.div>
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
          <span
            className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"
            style={{ animationDelay: '0ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"
            style={{ animationDelay: '150ms' }}
          />
          <span
            className="w-2 h-2 rounded-full bg-foreground/30 animate-bounce"
            style={{ animationDelay: '300ms' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

function SuggestedQuestions({
  onSelect,
}: {
  onSelect: (question: string) => void;
}) {
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
