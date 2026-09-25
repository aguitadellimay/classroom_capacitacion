import React from 'react';
import type { Theme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  showText?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  showText = false,
  className = '',
}) => {
  const isDark = theme === 'dark';

  const handleClick = () => {
    soundManager.playClick();
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? '☀️ Cambiar a Modo Claro' : '🌙 Cambiar a Modo Oscuro'}
      className={`relative inline-flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-2xl font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm select-none ${
        isDark
          ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-2 border-slate-600'
          : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300'
      } ${className}`}
    >
      <span className="flex items-center justify-center transition-transform transform active:scale-90">
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-700" />
        )}
      </span>
      {showText && (
        <span className="hidden sm:inline font-black tracking-wide">
          {isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </span>
      )}
    </button>
  );
};
