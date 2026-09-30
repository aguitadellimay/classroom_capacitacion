import React, { useState, useEffect, useRef } from 'react';
import type { ByteMicroscene, MicrosceneVisualType } from '../../types/lab';
import { Byte } from './Byte';
import { soundManager } from '../../utils/sound';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Pause,
  X,
} from 'lucide-react';

interface ByteMicroscenePlayerProps {
  microscene: ByteMicroscene;
  onFinished?: () => void;
  className?: string;
  initialOpen?: boolean;
}

export const ByteMicroscenePlayer: React.FC<ByteMicroscenePlayerProps> = ({
  microscene,
  onFinished,
  className = '',
  initialOpen = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(initialOpen);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hasFinishedOnce, setHasFinishedOnce] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = microscene.steps;
  const currentStep = steps[currentStepIdx] || steps[0];
  const isLastStep = currentStepIdx === steps.length - 1;

  // Sound effects on step change
  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep.badgeType === 'danger' || currentStep.badgeType === 'warning') {
      soundManager.playMicrosceneAlert();
    } else if (currentStep.badgeType === 'success') {
      soundManager.playMicrosceneMagic();
    } else {
      soundManager.playMicrosceneTransition();
    }
  }, [currentStepIdx, isPlaying]);

  // Autoplay progression
  useEffect(() => {
    if (!isPlaying || !isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          // Finished scene
          setIsAutoPlaying(false);
          setHasFinishedOnce(true);
          if (timerRef.current) clearInterval(timerRef.current);
          return prev;
        }
      });
    }, 2800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isAutoPlaying, steps.length]);

  const handleStartScene = () => {
    soundManager.playClick();
    setCurrentStepIdx(0);
    setIsPlaying(true);
    setIsAutoPlaying(true);
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentStepIdx(0);
    setIsAutoPlaying(true);
  };

  const handleNextStep = () => {
    soundManager.playClick();
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    } else {
      setHasFinishedOnce(true);
      if (onFinished) onFinished();
    }
  };

  const handlePrevStep = () => {
    soundManager.playClick();
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const toggleAutoPlay = () => {
    soundManager.playClick();
    setIsAutoPlaying(!isAutoPlaying);
  };

  // -------------------------------------------------------------
  // RENDER DEDICATED ANIMATED SVG SCENE BASED ON VISUAL TYPE
  // -------------------------------------------------------------
  const renderVisualStage = (type: MicrosceneVisualType) => {
    const isDangerState = currentStep.badgeType === 'danger' || currentStep.badgeType === 'warning';
    const isSuccessState = currentStep.badgeType === 'success';

    return (
      <div className="relative w-full h-44 sm:h-52 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700 flex items-center justify-center p-3 select-none">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

        {/* Dynamic status lighting glow */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
            isDangerState
              ? 'bg-rose-500/15'
              : isSuccessState
              ? 'bg-emerald-500/15'
              : 'bg-teal-500/10'
          }`}
        />

        {/* Visual elements for each case */}
        {(() => {
          switch (type) {
            case 'drink_spill':
              return (
                <div className="flex items-center justify-center gap-4 sm:gap-8 relative z-10 w-full max-w-sm">
                  {/* Glass / Bottle with animated tip */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`text-4xl sm:text-5xl transition-transform duration-500 ${
                        isDangerState ? 'rotate-45 translate-x-2' : isSuccessState ? 'scale-90 opacity-60' : 'animate-bounce-gentle'
                      }`}
                    >
                      🥤
                    </div>
                    {isDangerState && (
                      <div className="text-xl animate-bounce text-cyan-400 mt-1">
                        💦 💧
                      </div>
                    )}
                  </div>

                  {/* Flow Arrow */}
                  <div className="text-slate-500 text-lg sm:text-xl font-black">
                    {isDangerState ? '⚠️ ➔' : isSuccessState ? '✨ ➔' : '➔'}
                  </div>

                  {/* Keyboard & Computer Screen */}
                  <div className="flex flex-col items-center">
                    <div className="text-3xl sm:text-4xl relative">
                      🖥️
                      {isDangerState && (
                        <span className="absolute -top-2 -right-2 text-rose-400 text-base animate-ping">
                          ⚠️
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-2xl sm:text-3xl mt-1 transition-all ${
                        isDangerState ? 'animate-wiggle ring-2 ring-rose-500 rounded-lg p-0.5' : ''
                      }`}
                    >
                      ⌨️
                    </div>
                  </div>
                </div>
              );

            case 'keyboard_slam':
              return (
                <div className="flex items-center justify-center gap-6 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className={`text-4xl sm:text-5xl ${isDangerState ? 'scale-110 text-rose-400 animate-pulse' : 'text-slate-200'}`}>
                      {isDangerState ? '😡' : isSuccessState ? '😊' : '😐'}
                    </span>
                  </div>
                  <div className="text-2xl">➔</div>
                  <div className="flex flex-col items-center relative">
                    <span className={`text-5xl sm:text-6xl transition-transform ${isDangerState ? 'animate-wiggle' : ''}`}>
                      ⌨️
                    </span>
                    {isDangerState && (
                      <span className="absolute -top-3 right-0 text-amber-400 text-xs font-black bg-rose-950 px-1.5 py-0.5 rounded border border-rose-500 animate-bounce">
                        ¡PAF! 💥
                      </span>
                    )}
                  </div>
                </div>
              );

            case 'screen_touch':
              return (
                <div className="flex items-center justify-center gap-5 relative z-10">
                  <span className={`text-4xl sm:text-5xl transition-all duration-300 ${isDangerState ? 'translate-x-3 rotate-12 text-rose-300' : ''}`}>
                    ✏️
                  </span>
                  <div className="relative">
                    <span className="text-5xl sm:text-6xl">🖥️</span>
                    {isDangerState && (
                      <span className="absolute inset-0 flex items-center justify-center text-rose-500 text-2xl animate-ping">
                        🚫
                      </span>
                    )}
                    {isSuccessState && (
                      <span className="absolute -top-2 -right-2 text-emerald-400 text-lg">
                        ✨
                      </span>
                    )}
                  </div>
                </div>
              );

            case 'move_equipment':
            case 'cable_pull':
              return (
                <div className="flex items-center justify-center gap-4 sm:gap-6 relative z-10">
                  <span className={`text-4xl sm:text-5xl ${isDangerState ? 'text-amber-400 animate-wiggle' : ''}`}>
                    🖥️
                  </span>
                  <div className="flex items-center">
                    <span className={`text-xl sm:text-2xl font-black ${isDangerState ? 'text-rose-400 animate-pulse' : 'text-teal-400'}`}>
                      ~~~🔌~~~
                    </span>
                  </div>
                  <span className={`text-3xl sm:text-4xl ${isDangerState ? 'animate-bounce' : ''}`}>
                    {isDangerState ? '⚠️' : '🛡️'}
                  </span>
                </div>
              );

            case 'running':
              return (
                <div className="flex items-center justify-center gap-5 sm:gap-8 relative z-10">
                  <span className={`text-4xl sm:text-5xl ${isDangerState ? 'animate-wiggle text-rose-400' : 'animate-float'}`}>
                    {isDangerState ? '🏃💨' : '🚶✨'}
                  </span>
                  <div className="text-xl">➔</div>
                  <span className={`text-4xl sm:text-5xl ${isDangerState ? 'rotate-12 animate-pulse' : ''}`}>
                    🪑
                  </span>
                </div>
              );

            case 'chair_swing':
              return (
                <div className="flex items-center justify-center gap-6 relative z-10">
                  <div className={`text-5xl sm:text-6xl transition-transform duration-500 ${isDangerState ? 'rotate-25 translate-x-2' : ''}`}>
                    🪑
                  </div>
                  {isDangerState && (
                    <span className="text-rose-400 font-black text-xs sm:text-sm bg-rose-950/80 px-2 py-1 rounded-xl border border-rose-500 animate-bounce">
                      ¡Inestable! ⚠️
                    </span>
                  )}
                  {isSuccessState && (
                    <span className="text-emerald-400 font-black text-xs sm:text-sm bg-emerald-950/80 px-2 py-1 rounded-xl border border-emerald-500 flex items-center gap-1">
                      <span>4 patas firmes</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                </div>
              );

            case 'messy_desk':
            case 'clean_desk':
              return (
                <div className="flex items-center justify-center gap-4 sm:gap-8 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl">
                      {isDangerState ? '🗑️ 📜' : '✨ 🪑'}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">
                      {isDangerState ? 'Mesa con residuos' : 'Mesa lista y limpia'}
                    </span>
                  </div>
                  <div className="text-xl">➔</div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl">
                      {isDangerState ? '🙁' : '😄'}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 mt-1">
                      {isDangerState ? 'Compañero que llega' : 'Próximo compañero'}
                    </span>
                  </div>
                </div>
              );

            case 'touch_socket':
              return (
                <div className="flex items-center justify-center gap-6 relative z-10">
                  <span className={`text-4xl sm:text-5xl ${isDangerState ? 'animate-pulse' : ''}`}>
                    🖐️
                  </span>
                  <div className="relative">
                    <span className="text-5xl sm:text-6xl">⚡ 🔌</span>
                    {isDangerState && (
                      <span className="absolute -top-3 -right-3 text-rose-500 text-2xl font-black bg-rose-950 px-1 rounded-full animate-ping">
                        🚫
                      </span>
                    )}
                  </div>
                </div>
              );

            case 'report_teacher':
              return (
                <div className="flex items-center justify-center gap-4 sm:gap-6 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl">🖥️❓</span>
                  </div>
                  <div className="text-slate-400 font-black text-sm">➔</div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl animate-bounce-gentle">🙋 👨‍🏫</span>
                    <span className="text-[10px] text-emerald-400 font-bold mt-1">Avisar al docente</span>
                  </div>
                </div>
              );

            case 'grab_mouse':
              return (
                <div className="flex items-center justify-center gap-3 sm:gap-6 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl">👦 (A)</span>
                    <span className="text-2xl mt-1">🖱️</span>
                  </div>
                  <span className={`text-2xl sm:text-3xl font-black ${isDangerState ? 'text-rose-500 animate-wiggle' : 'text-emerald-400'}`}>
                    {isDangerState ? '🖐️❌' : '💬🤝'}
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl">👧 (B)</span>
                    <span className="text-[10px] font-bold text-slate-300 mt-1">
                      {isDangerState ? 'Intenta arrebatar' : 'Pide su turno'}
                    </span>
                  </div>
                </div>
              );

            case 'grab_keyboard':
              return (
                <div className="flex items-center justify-center gap-3 sm:gap-6 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl">👦</span>
                    <span className="text-2xl mt-1">⌨️</span>
                  </div>
                  <span className={`text-2xl sm:text-3xl font-black ${isDangerState ? 'text-rose-500 animate-pulse' : 'text-teal-400'}`}>
                    {isDangerState ? '⛔' : '✨'}
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl">👧</span>
                    <span className="text-[10px] font-bold text-slate-300 mt-1">
                      {isDangerState ? 'Fuerza el turno' : 'Espera su turno'}
                    </span>
                  </div>
                </div>
              );

            case 'help_not_replace':
              return (
                <div className="flex items-center justify-center gap-4 sm:gap-6 relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl">🤔</span>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">Aprende</span>
                  </div>
                  <div className="text-xl">➔</div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl">
                      {isDangerState ? '🙅 Quitar mouse' : '🗣️ Explicar con calma'}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400 mt-1">
                      {isSuccessState ? '¡Eso sí es ayudar!' : ''}
                    </span>
                  </div>
                </div>
              );

            case 'take_turns':
              return (
                <div className="flex items-center justify-center gap-2 sm:gap-4 relative z-10">
                  <div className="bg-slate-800 border border-teal-500/60 px-2 py-1 rounded-xl text-center">
                    <span className="text-2xl block">👦</span>
                    <span className="text-[10px] font-black text-teal-300">Turno 1</span>
                  </div>
                  <span className="text-slate-500 font-black">➔</span>
                  <div className="bg-slate-800 border border-teal-500/60 px-2 py-1 rounded-xl text-center">
                    <span className="text-2xl block">👧</span>
                    <span className="text-[10px] font-black text-teal-300">Turno 2</span>
                  </div>
                  <span className="text-slate-500 font-black">➔</span>
                  <div className="bg-slate-800 border border-teal-500/60 px-2 py-1 rounded-xl text-center">
                    <span className="text-2xl block">👦</span>
                    <span className="text-[10px] font-black text-teal-300">Turno 3</span>
                  </div>
                </div>
              );

            case 'unrelated_web':
            case 'inappropriate_site':
            case 'download_risk':
            case 'personal_data':
            default:
              return (
                <div className="flex items-center justify-center gap-4 sm:gap-6 relative z-10">
                  <div className="flex flex-col items-center bg-slate-800/90 border border-slate-700 p-2.5 rounded-xl text-center max-w-[180px]">
                    <span className="text-3xl block mb-1">
                      {type === 'download_risk' ? '📥' : type === 'personal_data' ? '📋' : '🌐'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-300 truncate w-full">
                      {type === 'download_risk'
                        ? 'DESCARGAR.EXE'
                        : type === 'personal_data'
                        ? 'Formulario Privado'
                        : 'Página ajena a la clase'}
                    </span>
                  </div>
                  <div className="text-lg">➔</div>
                  <div className="flex flex-col items-center">
                    <span className={`text-4xl ${isDangerState ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isDangerState ? '🚫' : '🛡️'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-300 mt-1">
                      {isDangerState ? 'Peligro o distracción' : 'Protección escolar'}
                    </span>
                  </div>
                </div>
              );
          }
        })()}

        {/* Byte Observer Bubble inside the visual stage */}
        {currentStep.byteBubble && (
          <div className="absolute bottom-2 right-2 flex items-center gap-2 bg-slate-900/90 border border-emerald-400/80 rounded-2xl px-2.5 py-1.5 shadow-lg backdrop-blur-sm animate-pop-in max-w-[200px] sm:max-w-xs">
            <Byte
              mood={currentStep.byteBubble.mood}
              size="sm"
              interactive={false}
              showSpeaker={false}
            />
            <p className="text-[10px] sm:text-xs font-black text-emerald-300 leading-tight">
              {currentStep.byteBubble.speech}
            </p>
          </div>
        )}
      </div>
    );
  };

  // -------------------------------------------------------------
  // INITIAL UNOPENED BUTTON
  // -------------------------------------------------------------
  if (!isPlaying) {
    return (
      <div ref={containerRef} className={`bg-gradient-to-r from-amber-50 via-teal-50 to-indigo-50 dark:from-slate-900/90 dark:via-emerald-950/40 dark:to-slate-900/90 border-2 border-dashed border-teal-400 dark:border-teal-600 rounded-3xl p-4 sm:p-5 space-y-3 shadow-md animate-pop-in ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl shadow-md flex-shrink-0 animate-bounce-gentle">
              🎬
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase text-teal-700 dark:text-teal-400 tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Historias de Byte • Microescena</span>
                {hasFinishedOnce && (
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-black border border-emerald-300">
                    ✓ Ya vista
                  </span>
                )}
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {microscene.title}
              </h4>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                {microscene.initialQuestion || '¿Qué podría pasar si no cuidamos este detalle en la sala?'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartScene}
            className="btn-game-amber bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-5 py-2.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition self-start sm:self-center"
            title="Ver qué puede pasar"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Ver qué puede pasar ▶️</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ACTIVE MICROSCENE PLAYER
  // -------------------------------------------------------------
  return (
    <div ref={containerRef} className={`bg-white/95 dark:bg-slate-900/95 border-3 border-teal-400 dark:border-teal-500 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 animate-pop-in ${className}`}>
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎬</span>
          <div>
            <span className="text-[10px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider block">
              HISTORIAS DE BYTE • PASO {currentStepIdx + 1} DE {steps.length}
            </span>
            <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              {microscene.title}
            </h4>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleAutoPlay}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
            title={isAutoPlaying ? 'Pausar reproducción automática' : 'Reanudar reproducción automática'}
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          <button
            type="button"
            onClick={handleRestart}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
            title="Reiniciar microescena"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsPlaying(false);
              setIsAutoPlaying(false);
            }}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition cursor-pointer"
            title="Cerrar microescena"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Pills */}
      <div className="flex items-center gap-1.5">
        {steps.map((step, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              soundManager.playClick();
              setCurrentStepIdx(idx);
              setIsAutoPlaying(false);
            }}
            className={`h-2.5 flex-1 rounded-full transition-all cursor-pointer ${
              idx === currentStepIdx
                ? 'bg-teal-500 ring-2 ring-teal-300/60'
                : idx < currentStepIdx
                ? 'bg-emerald-400'
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
            title={`Paso ${idx + 1}: ${step.label}`}
          />
        ))}
      </div>

      {/* The Visual Animated Stage */}
      {renderVisualStage(microscene.visualType)}

      {/* Narrative & Description of Current Step */}
      <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
              currentStep.badgeType === 'danger'
                ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300'
                : currentStep.badgeType === 'warning'
                ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                : currentStep.badgeType === 'success'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                : 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200'
            }`}
          >
            {currentStep.badge}
          </span>

          <span className="text-xs font-bold text-slate-400">
            {currentStep.label}
          </span>
        </div>

        <p className="font-body text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
          {currentStep.narrative}
        </p>

        <p className="font-body text-[11px] sm:text-xs font-normal text-slate-500 dark:text-slate-400">
          {currentStep.visualDetail}
        </p>
      </div>

      {/* Final Step: Byte Explanation Box */}
      {isLastStep && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-cyan-950/40 border-2 border-emerald-400 p-3.5 sm:p-4 rounded-2xl flex items-start gap-3 animate-pop-in">
          <Byte
            mood="alegria"
            size="sm"
            interactive={true}
            showSpeaker={false}
          />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider block font-display">
              💡 EXPLICACIÓN DE BYTE (GUARDIÁN):
            </span>
            <p className="font-body text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
              {microscene.byteExplanation}
            </p>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={handlePrevStep}
          disabled={currentStepIdx === 0}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
            currentStepIdx === 0
              ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer'
          }`}
        >
          Anterior
        </button>

        <div className="flex items-center gap-2">
          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="btn-game-primary bg-teal-600 hover:bg-teal-700 text-white font-black px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                soundManager.playByteCheer();
                setHasFinishedOnce(true);
                if (onFinished) onFinished();
              }}
              className="btn-game-amber bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow animate-bounce-gentle"
            >
              <span>¡Entendido! Vamos al Desafío 🎮</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
