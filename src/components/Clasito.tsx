import React, { useState } from 'react';
import type { ClasitoMood, Grade } from '../types';
import { formatGradeText } from '../utils/gradeAdapter';
import { soundManager } from '../utils/sound';
import { Volume2, VolumeX } from 'lucide-react';

interface ClasitoProps {
  mood?: ClasitoMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechText?: string;
  grade?: Grade;
  className?: string;
  showSpeaker?: boolean;
}

export const Clasito: React.FC<ClasitoProps> = ({
  mood = 'happy',
  size = 'md',
  speechText,
  grade = 1,
  className = '',
  showSpeaker = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  const handleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!speechText) return;
    if (isSpeaking) {
      soundManager.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      soundManager.speak(speechText);
      setTimeout(() => setIsSpeaking(false), Math.max(2500, speechText.length * 75));
    }
  };

  // Render SVG facial features based on mood
  const renderFace = () => {
    switch (mood) {
      case 'thinking':
        return (
          <>
            {/* Thinking eyes looking up */}
            <circle cx="39" cy="38" r="6" fill="#1E293B" />
            <circle cx="41" cy="36" r="2.5" fill="#FFFFFF" />
            <circle cx="61" cy="38" r="6" fill="#1E293B" />
            <circle cx="63" cy="36" r="2.5" fill="#FFFFFF" />
            {/* Puzzled mouth */}
            <path d="M 43 56 Q 50 52 57 56" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            {/* Question mark floating */}
            <text x="76" y="24" fontSize="18" fill="#F59E0B" fontWeight="bold" className="animate-bounce">?</text>
          </>
        );

      case 'surprised':
        return (
          <>
            {/* Wide eyes */}
            <circle cx="38" cy="42" r="8" fill="#1E293B" />
            <circle cx="40" cy="40" r="3.5" fill="#FFFFFF" />
            <circle cx="62" cy="42" r="8" fill="#1E293B" />
            <circle cx="64" cy="40" r="3.5" fill="#FFFFFF" />
            {/* O mouth */}
            <ellipse cx="50" cy="55" rx="6" ry="8" fill="#1E293B" />
          </>
        );

      case 'celebrating':
        return (
          <>
            {/* Star eyes */}
            <polygon points="38,36 40,41 45,41 41,44 43,49 38,46 33,49 35,44 31,41 36,41" fill="#F59E0B" />
            <polygon points="62,36 64,41 69,41 65,44 67,49 62,46 57,49 59,44 55,41 60,41" fill="#F59E0B" />
            {/* Big open joyful smile */}
            <path d="M 38 52 Q 50 66 62 52 Z" fill="#DC2626" stroke="#1E293B" strokeWidth="2.5" />
            <path d="M 44 58 Q 50 63 56 58" fill="#F472B6" />
            {/* Party sparkles */}
            <circle cx="20" cy="18" r="3" fill="#FBBF24" className="animate-ping" />
            <circle cx="80" cy="20" r="2.5" fill="#EC4899" className="animate-ping" />
          </>
        );

      case 'motivating':
        return (
          <>
            {/* Wink eye left, open bright right */}
            <path d="M 34 42 Q 39 37 44 42" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="62" cy="41" r="7" fill="#1E293B" />
            <circle cx="64" cy="39" r="2.5" fill="#FFFFFF" />
            {/* Cheerful confident smirk */}
            <path d="M 42 53 Q 52 61 60 51" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          </>
        );

      case 'wrong':
        return (
          <>
            {/* Soft encouraging eyes */}
            <ellipse cx="38" cy="43" rx="5" ry="6" fill="#1E293B" />
            <circle cx="39" cy="41" r="2" fill="#FFFFFF" />
            <ellipse cx="62" cy="43" rx="5" ry="6" fill="#1E293B" />
            <circle cx="63" cy="41" r="2" fill="#FFFFFF" />
            {/* Little sweat drop */}
            <path d="M 74 34 C 74 31 77 28 77 28 C 77 28 80 31 80 34 C 80 36 78 37 77 37 C 75 37 74 36 74 34 Z" fill="#38BDF8" />
            {/* Gentle encouraging mouth */}
            <path d="M 43 56 Q 50 51 57 56" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          </>
        );

      case 'waving':
      case 'happy':
      default:
        return (
          <>
            {/* Cheerful round eyes with glints */}
            <circle cx="38" cy="42" r="7" fill="#1E293B" />
            <circle cx="40" cy="40" r="2.5" fill="#FFFFFF" />
            <circle cx="62" cy="42" r="7" fill="#1E293B" />
            <circle cx="64" cy="40" r="2.5" fill="#FFFFFF" />
            {/* Big friendly smile */}
            <path d="M 41 53 Q 50 63 59 53" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          </>
        );
    }
  };

  const getAnimationClass = () => {
    switch (mood) {
      case 'celebrating':
        return 'animate-bounce-gentle';
      case 'thinking':
        return 'animate-float';
      case 'motivating':
        return 'animate-pulse';
      case 'surprised':
        return 'animate-wiggle';
      default:
        return 'animate-float';
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Robot SVG */}
      <div className={`relative flex-shrink-0 ${sizeClasses[size]} ${getAnimationClass()}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
          {/* Shadow underneath */}
          <ellipse cx="50" cy="94" rx="28" ry="6" fill="#000000" opacity="0.15" />

          {/* Ears/Side bolts */}
          <rect x="18" y="38" width="8" height="16" rx="4" fill="#0284C7" />
          <rect x="74" y="38" width="8" height="16" rx="4" fill="#0284C7" />

          {/* Robot Body */}
          <rect x="30" y="68" width="40" height="24" rx="10" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
          {/* Chest Screen Badge */}
          <rect x="40" y="74" width="20" height="12" rx="4" fill="#38BDF8" />
          <polygon points="50,76 52,80 57,80 53,83 54,87 50,85 46,87 47,83 43,80 48,80" fill="#FBBF24" />

          {/* Robot Head */}
          <rect x="22" y="22" width="56" height="48" rx="16" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3.5" />
          {/* Screen Face Inner */}
          <rect x="27" y="28" width="46" height="36" rx="12" fill="#E0F2FE" />

          {/* Antenna */}
          <rect x="48" y="12" width="4" height="11" fill="#0284C7" />
          <circle cx="50" cy="10" r="7" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="2.5" />
          {/* Antenna glow dot */}
          <circle cx="50" cy="10" r="2.5" fill="#FEF08A" />

          {/* Pink Cheeks */}
          <circle cx="32" cy="52" r="4.5" fill="#F472B6" opacity="0.75" />
          <circle cx="68" cy="52" r="4.5" fill="#F472B6" opacity="0.75" />

          {/* Face based on Mood */}
          {renderFace()}

          {/* Waving arm */}
          {mood === 'waving' && (
            <g className="animate-wiggle" style={{ transformOrigin: '76px 74px' }}>
              <path d="M 72 74 Q 86 64 88 50" fill="none" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="88" cy="48" r="5" fill="#FBBF24" />
            </g>
          )}

          {/* Motivating arm flex */}
          {mood === 'motivating' && (
            <g>
              <path d="M 28 75 Q 16 68 18 56" fill="none" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="18" cy="54" r="5" fill="#FBBF24" />
            </g>
          )}
        </svg>
      </div>

      {/* Speech Bubble */}
      {speechText && (
        <div className="relative bg-white border-2 sm:border-3 border-amber-300 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-lg max-w-sm sm:max-w-md animate-pop-in">
          {/* Arrow */}
          <div className="absolute top-1/2 -left-2 sm:-left-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 sm:border-r-12 border-r-white" />
          <div className="absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 w-0 h-0 border-t-9 border-t-transparent border-b-9 border-b-transparent border-r-9 sm:border-r-13 border-r-amber-300 -z-10" />

          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] sm:text-xs font-bold text-sky-600 uppercase tracking-wider block mb-0.5">
                Clasito dice:
              </span>
              <p className={`font-semibold text-slate-800 leading-snug ${grade === 1 ? 'text-sm sm:text-base tracking-wide uppercase' : 'text-xs sm:text-sm'}`}>
                {formatGradeText(speechText, grade)}
              </p>
            </div>

            {showSpeaker && (
              <button
                type="button"
                onClick={handleSpeech}
                title="Escuchar a Clasito"
                className={`flex-shrink-0 p-1.5 sm:p-2 rounded-xl transition-all ${
                  isSpeaking ? 'bg-amber-400 text-slate-900 animate-pulse' : 'bg-sky-100 hover:bg-sky-200 text-sky-700'
                }`}
                aria-label="Escuchar voz"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
