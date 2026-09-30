import React, { useState, useEffect, useMemo } from 'react';
import type { LabBadge, ByteMood } from '../../types/lab';
import { Byte } from './Byte';
import { soundManager } from '../../utils/sound';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  Award,
  Zap,
  CreditCard,
} from 'lucide-react';

export interface ByteAuraCelebrationProps {
  isOpen: boolean;
  mode?: 'world' | 'final';
  worldName?: string;
  badge?: LabBadge;
  studentName?: string;
  onContinue: () => void;
  onOpenCertificate?: () => void;
  onOpenGuardianCard?: () => void;
}

const CELEBRATION_PHRASES = [
  '¡Eso fue genial!',
  '¡Misión cumplida!',
  '¡Así se hace, Guardián!',
  '¡Nivel de aura: máximo!',
  '¡Ese desafío no pudo contigo!',
  '¡Byte aprueba esta misión!',
  '¡Seguimos conquistando mundos!',
  '¡Eso merece una celebración!',
  '¡Aura desbloqueada!',
];

interface AnimationConfig {
  id: number;
  name: string;
  className: string;
  byteMood: ByteMood;
  auraStyle: string;
  auraLabel: string;
}

const ANIMATIONS: AnimationConfig[] = [
  {
    id: 1,
    name: 'Pequeño baile',
    className: 'animate-dance-hop',
    byteMood: 'baile',
    auraStyle: 'from-amber-400 via-teal-400 to-emerald-500',
    auraLabel: '🕺 RITMO GUARDIÁN',
  },
  {
    id: 2,
    name: 'Salto y brazos arriba',
    className: 'animate-arm-wave',
    byteMood: 'victoria',
    auraStyle: 'from-cyan-400 via-sky-500 to-indigo-500',
    auraLabel: '🙌 ¡VICTORIA TOTAL!',
  },
  {
    id: 3,
    name: 'Giro y pose heroica',
    className: 'animate-hero-spin',
    byteMood: 'celebracion',
    auraStyle: 'from-purple-500 via-pink-500 to-amber-400',
    auraLabel: '🦸 POSE HEROICA',
  },
  {
    id: 4,
    name: 'Baile de victoria',
    className: 'animate-wiggle',
    byteMood: 'baile',
    auraStyle: 'from-emerald-400 via-teal-400 to-yellow-400',
    auraLabel: '⚡ FARMEANDO AURA',
  },
  {
    id: 5,
    name: 'Aura cargando',
    className: 'animate-bounce-gentle',
    byteMood: 'alegria',
    auraStyle: 'from-amber-400 via-orange-400 to-yellow-300',
    auraLabel: '🔥 AURA MÁXIMA',
  },
  {
    id: 6,
    name: 'Pose ¡Lo logramos!',
    className: 'animate-pop-in',
    byteMood: 'victoria',
    auraStyle: 'from-teal-300 via-emerald-400 to-cyan-400',
    auraLabel: '✨ ¡MISIÓN CUMPLIDA!',
  },
];

export const ByteAuraCelebration: React.FC<ByteAuraCelebrationProps> = ({
  isOpen,
  mode = 'world',
  worldName,
  badge,
  studentName = 'Guardián',
  onContinue,
  onOpenCertificate,
  onOpenGuardianCard,
}) => {
  const isFinal = mode === 'final';

  // Random selection state
  const [animIndex, setAnimIndex] = useState(0);
  const [phrase, setPhrase] = useState(CELEBRATION_PHRASES[0]);
  const [progressPercent, setProgressPercent] = useState(0);

  // Trigger celebration setup when opened
  useEffect(() => {
    if (!isOpen) {
      setProgressPercent(0);
      return;
    }

    // Pick random animation and phrase
    const randomAnim = Math.floor(Math.random() * ANIMATIONS.length);
    const randomPhrase = CELEBRATION_PHRASES[Math.floor(Math.random() * CELEBRATION_PHRASES.length)];
    setAnimIndex(randomAnim);
    setPhrase(randomPhrase);

    // Audio and confetti
    if (isFinal) {
      soundManager.playFinalAuraFanfare();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
      });
    } else {
      soundManager.playAuraVictory();
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.65 },
      });
    }

    // Auto-dismiss countdown timer (for non-final celebration: ~4.2s)
    if (!isFinal) {
      const duration = 4200;
      const interval = 50;
      const step = (interval / duration) * 100;
      let current = 0;

      const timer = window.setInterval(() => {
        current += step;
        if (current >= 100) {
          clearInterval(timer);
          onContinue();
        } else {
          setProgressPercent(current);
        }
      }, interval);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isOpen, isFinal, onContinue]);

  const currentAnim = ANIMATIONS[animIndex] || ANIMATIONS[0];

  // Floating decorative aura particles
  const particles = useMemo(() => {
    return Array.from({ length: isFinal ? 16 : 10 }).map((_, i) => ({
      id: i,
      left: `${15 + (i * 70) / (isFinal ? 16 : 10)}%`,
      delay: `${(i * 0.2).toFixed(1)}s`,
      size: i % 3 === 0 ? 'text-2xl' : i % 2 === 0 ? 'text-lg' : 'text-sm',
      icon: i % 4 === 0 ? '⭐' : i % 3 === 0 ? '✨' : i % 2 === 0 ? '⚡' : '🌟',
    }));
  }, [isFinal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print select-none">
      
      {/* Background Rotating Sunburst Aura Rays */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
        <div className={`w-[700px] sm:w-[900px] h-[700px] sm:h-[900px] rounded-full bg-gradient-to-tr ${currentAnim.auraStyle} animate-aura-spin blur-3xl`} />
      </div>

      {/* Main Foreground Container */}
      <div className="relative max-w-xl w-full my-auto bg-white/95 dark:bg-slate-900/95 border-4 border-amber-400 dark:border-amber-500 rounded-3xl sm:rounded-4xl p-5 sm:p-8 shadow-2xl space-y-5 animate-pop-in text-center overflow-hidden">
        
        {/* Floating Particles in Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className={`absolute bottom-0 ${p.size} animate-float opacity-75`}
              style={{ left: p.left, animationDelay: p.delay, animationDuration: '3.5s' }}
            >
              {p.icon}
            </span>
          ))}
        </div>

        {/* ----------------------------------------------------------- */}
        {/* TOP HEADER: FARMEANDO AURA / MISIÓN COMPLETADA              */}
        {/* ----------------------------------------------------------- */}
        <div className="space-y-1.5 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-slate-950 px-4 py-1.5 rounded-full shadow-md font-black text-xs sm:text-sm tracking-wider uppercase animate-pulse">
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>{isFinal ? '¡MISIÓN CUMPLIDA! 🏆' : '✨ ¡AURA CONSEGUIDA! ✨'}</span>
            <Sparkles className="w-4 h-4 fill-slate-950" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {isFinal ? (
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                🤖✨ ¡SOS GUARDIÁN DE LA SALA! ✨🤖
              </span>
            ) : (
              <span>¡Nivel Superado con Éxito!</span>
            )}
          </h2>

          {isFinal ? (
            <div className="text-base sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
              ¡Felicitaciones, <span className="underline decoration-amber-400 underline-offset-4">{studentName}</span>!
            </div>
          ) : (
            <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
              {worldName ? `Territorio: ${worldName}` : '¡Desafío completado a la perfección!'}
            </p>
          )}
        </div>

        {/* ----------------------------------------------------------- */}
        {/* BYTE CENTERPIECE WITH DYNAMIC AURA RINGS & POSE             */}
        {/* ----------------------------------------------------------- */}
        <div className="relative py-4 sm:py-6 flex items-center justify-center z-10">
          
          {/* Staggered Concentric Aura Rings */}
          <div className="absolute w-44 sm:w-56 h-44 sm:h-56 rounded-full border-4 border-amber-400/80 animate-aura-pulse pointer-events-none" />
          <div
            className="absolute w-52 sm:w-64 h-52 sm:h-64 rounded-full border-4 border-teal-400/60 animate-aura-pulse pointer-events-none"
            style={{ animationDelay: '0.6s' }}
          />
          {isFinal && (
            <div
              className="absolute w-60 sm:w-72 h-60 sm:h-72 rounded-full border-4 border-orange-400/50 animate-aura-pulse pointer-events-none"
              style={{ animationDelay: '1.2s' }}
            />
          )}

          {/* Aura Energy Glow behind Byte */}
          <div className={`w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-gradient-to-tr ${currentAnim.auraStyle} opacity-60 blur-xl absolute pointer-events-none animate-pulse`} />

          {/* Byte Avatar in Spotlight */}
          <div className={`relative z-20 ${currentAnim.className} ${isFinal ? 'scale-125 sm:scale-135' : 'scale-110 sm:scale-115'} transition-transform`}>
            <Byte
              mood={isFinal ? 'victoria' : currentAnim.byteMood}
              size="lg"
              interactive={true}
              showSpeaker={false}
            />

            {/* Aura Tag Badge directly below Byte */}
            <div className="mt-2 inline-flex items-center gap-1.5 bg-slate-900/90 text-amber-300 border-2 border-amber-400 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black shadow-lg backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{isFinal ? '✨ FARMEANDO AURA MÁXIMA ✨' : currentAnim.auraLabel}</span>
              <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded text-[10px]">
                {isFinal ? '+100' : '+1'}
              </span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* BYTE SPEECH BALLOON & QUOTE                                 */}
        {/* ----------------------------------------------------------- */}
        <div className="relative z-10 max-w-md mx-auto bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 dark:from-slate-800 dark:via-emerald-950/40 dark:to-slate-800 border-2 border-emerald-400 dark:border-emerald-600 p-3.5 sm:p-4 rounded-2xl shadow-sm">
          <p className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 leading-snug">
            "{isFinal ? `¡Increíble trabajo, ${studentName}! Demostraste que cuidás los equipos y a tus compañeros. ¡Sos oficialmente un Guardián!` : phrase}"
          </p>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* BADGE / MEDAL DISPLAY                                       */}
        {/* ----------------------------------------------------------- */}
        {isFinal ? (
          <div className="relative z-10 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 dark:from-amber-950/40 dark:via-yellow-950/20 dark:to-amber-950/40 border-2 border-amber-400 dark:border-amber-600 p-3.5 rounded-2xl max-w-md mx-auto shadow-md">
            <span className="text-4xl animate-bounce-gentle select-none">🏆</span>
            <div className="text-left">
              <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider block">
                Medalla Oficial Conquistada
              </span>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                GUARDIÁN DE LA SALA DE INFORMÁTICA
              </h4>
            </div>
          </div>
        ) : badge ? (
          <div className="relative z-10 flex items-center justify-center gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/60 p-3 rounded-2xl max-w-md mx-auto">
            <span className="text-3xl sm:text-4xl animate-bounce-gentle select-none">{badge.icon}</span>
            <div className="text-left">
              <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider block">
                Insignia Desbloqueada
              </span>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                {badge.title}
              </h4>
            </div>
          </div>
        ) : null}

        {/* ----------------------------------------------------------- */}
        {/* PROGRESS TIMER & CONTINUE ACTIONS                           */}
        {/* ----------------------------------------------------------- */}
        <div className="relative z-10 space-y-3 pt-1">
          {/* Visual progress bar (only in non-final auto-dismiss mode) */}
          {!isFinal && (
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-400 via-amber-400 to-emerald-500 h-full rounded-full transition-all duration-75"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            {isFinal ? (
              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
                {onOpenCertificate && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onOpenCertificate();
                    }}
                    className="btn-game-amber bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition flex-1 sm:flex-initial"
                  >
                    <Award className="w-4 h-4 text-slate-950" />
                    <span>VER MI DIPLOMA OFICIAL 📜</span>
                  </button>
                )}

                {onOpenGuardianCard && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onOpenGuardianCard();
                    }}
                    className="btn-game-primary bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition flex-1 sm:flex-initial"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>VER CARNET 🪪</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onContinue();
                  }}
                  className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer w-full sm:w-auto"
                >
                  Continuar al Resumen ➡️
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onContinue();
                }}
                className="btn-game-primary bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-3 rounded-2xl text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition w-full sm:w-auto"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
