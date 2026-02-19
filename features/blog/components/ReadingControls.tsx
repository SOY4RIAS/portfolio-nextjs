'use client';

import * as React from 'react';
import { Settings, Type, Minus, Plus, X } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import {
  FONT_OPTIONS,
  WIDTH_OPTIONS,
  THEME_OPTIONS,
  DEFAULT_READING_PREFERENCES,
  type ReadingPreferences,
} from '../data/blog-types';

interface ReadingControlsProps {
  preferences: ReadingPreferences;
  onUpdate: (updates: Partial<ReadingPreferences>) => void;
}

export function ReadingControls({ preferences, onUpdate }: ReadingControlsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleReset = () => {
    onUpdate(DEFAULT_READING_PREFERENCES);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all',
          isOpen
            ? 'border-[var(--reader-fg)] bg-[var(--reader-fg)] text-[var(--reader-bg)]'
            : 'border-[var(--reader-border)] bg-[var(--reader-code-bg)] text-[var(--reader-fg)] hover:border-[var(--reader-fg)]/50'
        )}
        aria-label="Reading settings"
      >
        <Settings className="h-4 w-4" />
        <Type className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-full z-50 mt-2 w-80 animate-in fade-in slide-in-from-top-2 rounded-xl border border-[var(--reader-border)] bg-[var(--reader-bg)] p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-[var(--reader-fg)]">
                Reading Settings
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md p-1 text-[var(--reader-muted)] hover:text-[var(--reader-fg)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Theme */}
            <div className="mb-5">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--reader-muted)]">
                Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {THEME_OPTIONS.map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => onUpdate({ theme: theme.value })}
                    className={cn(
                      'flex flex-col items-center gap-1 rounded-lg border-2 p-2 text-xs transition-all',
                      preferences.theme === theme.value
                        ? 'border-[var(--reader-fg)] bg-[var(--reader-fg)]/10'
                        : 'border-transparent hover:border-[var(--reader-border)]'
                    )}
                  >
                    <span className="text-lg">{theme.icon}</span>
                    <span>{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div className="mb-5">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--reader-muted)]">
                Font
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FONT_OPTIONS.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => onUpdate({ fontFamily: font.value })}
                    className={cn(
                      'rounded-lg border-2 px-3 py-2 text-sm transition-all',
                      preferences.fontFamily === font.value
                        ? 'border-[var(--reader-fg)] bg-[var(--reader-fg)]/10 font-medium'
                        : 'border-transparent hover:border-[var(--reader-border)]'
                    )}
                    style={{ fontFamily: font.family }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-[var(--reader-muted)]">
                  Size
                </label>
                <span className="text-xs text-[var(--reader-muted)]">
                  {preferences.fontSize}px
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    onUpdate({ fontSize: Math.max(14, preferences.fontSize - 1) })
                  }
                  className="rounded-md border border-[var(--reader-border)] p-1.5 hover:bg-[var(--reader-code-bg)]"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="range"
                  min={14}
                  max={24}
                  value={preferences.fontSize}
                  onChange={(e) =>
                    onUpdate({ fontSize: parseInt(e.target.value) })
                  }
                  className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-[var(--reader-border)] accent-[var(--reader-fg)] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--reader-fg)]"
                />
                <button
                  onClick={() =>
                    onUpdate({ fontSize: Math.min(24, preferences.fontSize + 1) })
                  }
                  className="rounded-md border border-[var(--reader-border)] p-1.5 hover:bg-[var(--reader-code-bg)]"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Line Height */}
            <div className="mb-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-[var(--reader-muted)]">
                  Line Spacing
                </label>
                <span className="text-xs text-[var(--reader-muted)]">
                  {preferences.lineHeight.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    onUpdate({
                      lineHeight: Math.max(1.4, +(preferences.lineHeight - 0.1).toFixed(1)),
                    })
                  }
                  className="rounded-md border border-[var(--reader-border)] p-1.5 hover:bg-[var(--reader-code-bg)]"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  type="range"
                  min={14}
                  max={22}
                  value={preferences.lineHeight * 10}
                  onChange={(e) =>
                    onUpdate({ lineHeight: parseInt(e.target.value) / 10 })
                  }
                  className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-[var(--reader-border)] accent-[var(--reader-fg)] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--reader-fg)]"
                />
                <button
                  onClick={() =>
                    onUpdate({
                      lineHeight: Math.min(2.2, +(preferences.lineHeight + 0.1).toFixed(1)),
                    })
                  }
                  className="rounded-md border border-[var(--reader-border)] p-1.5 hover:bg-[var(--reader-code-bg)]"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Content Width */}
            <div className="mb-4">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-[var(--reader-muted)]">
                Width
              </label>
              <div className="grid grid-cols-3 gap-2">
                {WIDTH_OPTIONS.map((width) => (
                  <button
                    key={width.value}
                    onClick={() => onUpdate({ contentWidth: width.value })}
                    className={cn(
                      'rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all',
                      preferences.contentWidth === width.value
                        ? 'border-[var(--reader-fg)] bg-[var(--reader-fg)]/10'
                        : 'border-transparent hover:border-[var(--reader-border)]'
                    )}
                  >
                    {width.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="w-full rounded-lg border border-[var(--reader-border)] py-2 text-xs font-medium text-[var(--reader-muted)] transition-colors hover:bg-[var(--reader-code-bg)] hover:text-[var(--reader-fg)]"
            >
              Reset to defaults
            </button>
          </div>
        </>
      )}
    </div>
  );
}
