'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { generateRAGResponse } from '../lib/rag-service';
import { resumeData } from '@/data/resume';

// Types - colocated with component (Clean Architecture)
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// Constants - extracted for maintainability
const SUGGESTED_QUESTIONS = [
  "What's your experience with AI tools?",
  "Tell me about your leadership experience",
  "What tech stack do you use?",
  "How do you use RAG in development?",
] as const;

const INITIAL_MESSAGE: Message = {
  id: '1',
  role: 'assistant',
  content: `Hey! 👋 I'm a RAG-powered assistant built into this portfolio. I have access to Santiago's resume and can answer questions about his experience, skills, and AI expertise.\n\nThis chat demonstrates how **Retrieval Augmented Generation** works - I retrieve relevant information from a knowledge base to answer your questions.\n\nTry asking me something!`
};

// Simulate AI response delay
const simulateThinkingDelay = () =>
  new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Refs for DOM elements that don't need to trigger re-renders (React Best Practice 5.12)
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll within container only - called from event handlers (React Best Practice 5.7)
  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, []);

  // Event handler with all interaction logic (React Best Practice 5.7)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    // Functional setState update (React Best Practice 5.9)
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Scroll after state update
    requestAnimationFrame(scrollToBottom);

    await simulateThinkingDelay();

    // Use RAG service for response generation
    const response = generateRAGResponse(userMessage.content, resumeData);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);

    requestAnimationFrame(scrollToBottom);
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
          <div className="bg-background border rounded-xl shadow-lg overflow-hidden">
            <ChatHeader />

            <MessagesContainer
              ref={messagesContainerRef}
              messages={messages}
              isTyping={isTyping}
            />

            <SuggestedQuestions onSelect={handleSuggestionClick} />

            <ChatInput
              ref={inputRef}
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              disabled={isTyping}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Sub-components extracted for readability and reusability

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
        <span className="text-sm font-medium">RAG-Powered Chat</span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
        Ask Me Anything
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        This chat demonstrates <strong>Retrieval Augmented Generation</strong> - it retrieves relevant information from my resume to answer your questions. Try it out!
      </p>
    </motion.div>
  );
}

function ChatHeader() {
  return (
    <div className="px-6 py-4 border-b bg-muted/50 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Bot className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Santiago&apos;s AI Assistant</h3>
        <p className="text-sm text-muted-foreground">Powered by RAG • Knowledge base: Resume data</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm text-muted-foreground">Online</span>
      </div>
    </div>
  );
}

interface MessagesContainerProps {
  messages: Message[];
  isTyping: boolean;
}

const MessagesContainer = ({ messages, isTyping, ref }: MessagesContainerProps & { ref: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={ref}
    className="h-[400px] overflow-y-auto p-6 space-y-4"
  >
    <AnimatePresence mode="popLayout">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </AnimatePresence>

    {isTyping && <TypingIndicator />}
  </div>
);

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
  return (
    <div className="text-sm whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none [&_strong]:font-semibold [&_code]:bg-background/50 [&_code]:px-1 [&_code]:rounded">
      {content.split('\n').map((line, i) => (
        <span key={i}>
          {line.split(/(\*\*[^*]+\*\*|\`[^`]+\`)/g).map((part, j) => {
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

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled: boolean;
}

const ChatInput = ({ value, onChange, onSubmit, disabled, ref }: ChatInputProps & { ref: React.RefObject<HTMLInputElement | null> }) => (
  <form onSubmit={onSubmit} className="p-4 border-t">
    <div className="flex gap-2">
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask about experience, skills, AI expertise..."
        className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        disabled={disabled}
      />
      <Button type="submit" size="icon" disabled={!value.trim() || disabled}>
        <Send className="w-4 h-4" />
      </Button>
    </div>
  </form>
);
