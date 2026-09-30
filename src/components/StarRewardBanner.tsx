import React from 'react';
import { Sparkles } from 'lucide-react';

interface StarRewardBannerProps {
  show?: boolean;
  message?: string;
  onComplete?: () => void;
  className?: string;
}

export const StarRewardBanner: React.FC<StarRewardBannerProps> = ({
  show = true,
  message = '¡Muy bien!',
  onComplete,
  className = '',
}) => {
  React.useEffect(() => {
    if (!show || !onComplete) return;
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 font-black p-3 rounded-2xl shadow-lg border-2 border-amber-500 animate-pop-in flex items-center justify-between gap-3 ${className}`}
    >
      {/* Decorative Flying / Jumping Stars on left */}
      <div className="flex items-center gap-1 select-none">
        <span className="text-xl animate-bounce" style={{ animationDelay: '0ms' }}>⭐</span>
        <span className="text-sm text-amber-900 animate-ping" style={{ animationDelay: '100ms' }}>✨</span>
        <span className="text-2xl animate-bounce" style={{ animationDelay: '200ms' }}>⭐</span>
      </div>

      {/* Center Message */}
      <div className="flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wider text-center">
        <Sparkles className="w-4 h-4 text-amber-900 animate-spin-slow" />
        <span className="drop-shadow-xs">{message}</span>
        <Sparkles className="w-4 h-4 text-amber-900 animate-spin-slow" />
      </div>

      {/* Decorative Flying / Jumping Stars on right */}
      <div className="flex items-center gap-1 select-none">
        <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>⭐</span>
        <span className="text-sm text-amber-900 animate-ping" style={{ animationDelay: '50ms' }}>✨</span>
        <span className="text-xl animate-bounce" style={{ animationDelay: '250ms' }}>⭐</span>
      </div>
    </div>
  );
};
