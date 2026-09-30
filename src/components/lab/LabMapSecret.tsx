import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { LabMapSecretConfig } from '../../types/lab';
import { soundManager } from '../../utils/sound';
import { Byte } from './Byte';
import confetti from 'canvas-confetti';
import { Sparkles, Star, Compass, Check, X } from 'lucide-react';

interface LabMapSecretProps {
  config: LabMapSecretConfig;
  isDiscovered: boolean;
  onDiscover: (secretId: string, bonusStars: number) => void;
}

export const LabMapSecret: React.FC<LabMapSecretProps> = ({
  config,
  isDiscovered,
  onDiscover,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDiscovered) {
      soundManager.playSecretFound();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.65 },
      });
      onDiscover(config.id, config.bonusStars);
    } else {
      soundManager.playClick();
    }
    setShowModal(true);
  };

  return (
    <>
      {/* Map Interactive Secret Spot */}
      <div
        onClick={handleClick}
        className={`group relative cursor-pointer select-none transition-all duration-300 hover:scale-125 z-20 ${
          isDiscovered ? 'opacity-85' : 'hover:animate-wiggle'
        }`}
        title={isDiscovered ? `${config.title} (Descubierto)` : '¿Qué habrá acá...? 🤔'}
      >
        {/* Subtle glowing beacon before discovery */}
        {!isDiscovered && (
          <div className="absolute -inset-1.5 bg-cyan-400/40 dark:bg-cyan-500/30 rounded-full blur-xs animate-pulse pointer-events-none" />
        )}

        <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs border border-cyan-400/60 shadow-md flex items-center justify-center text-lg sm:text-xl">
          {config.icon}
          {isDiscovered && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
              <Check className="w-2.5 h-2.5" />
            </span>
          )}
        </div>

        {/* Hover hint */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-cyan-300 text-[9px] font-black px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
          {isDiscovered ? 'Secreto descubierto ✓' : '¿Qué es esto? ✨'}
        </div>
      </div>

      {/* Secret Detail Modal */}
      {showModal && createPortal(
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in no-print"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-white dark:bg-slate-900 border-4 border-cyan-400 dark:border-cyan-500 rounded-3xl p-5 shadow-2xl space-y-3.5 text-center animate-pop-in"
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex justify-center pt-1">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-teal-400 border-2 border-cyan-300 flex items-center justify-center text-3xl shadow-md animate-bounce-gentle">
                {config.icon}
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">
                <Compass className="w-3 h-3" />
                <span>¡Secreto de la Isla Descubierto!</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {config.title}
              </h3>
            </div>

            <div className="flex justify-center">
              <Byte
                mood="sorpresa"
                size="sm"
                interactive={true}
                showSpeaker={false}
              />
            </div>

            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed px-2">
              {config.discoveryMessage}
            </p>

            <div className="inline-flex items-center gap-1.5 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-200 border border-cyan-300 dark:border-cyan-700 px-3 py-1 rounded-full font-black text-xs">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>+{config.bonusStars} Estrella de Exploración</span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            </div>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowModal(false);
              }}
              className="w-full btn-game-primary bg-cyan-600 hover:bg-cyan-700 text-white font-black py-2 rounded-2xl text-xs sm:text-sm cursor-pointer shadow transition"
            >
              ¡Seguir Explorando! 🔍
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
