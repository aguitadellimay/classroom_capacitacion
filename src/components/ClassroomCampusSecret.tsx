import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { CampusSecretConfig } from '../data/campusSecrets';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';
import { Sparkles, Star, Check, X } from 'lucide-react';

interface ClassroomCampusSecretProps {
  config: CampusSecretConfig;
  isDiscovered: boolean;
  onDiscover: (secretId: string, bonusStars: number) => void;
}

export const ClassroomCampusSecret: React.FC<ClassroomCampusSecretProps> = ({
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
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
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
        title={isDiscovered ? `${config.name} (Descubierto)` : '¿Qué habrá escondido acá...? 🤔'}
      >
        {/* Pulsing golden aura before discovery */}
        {!isDiscovered && (
          <div className="absolute -inset-1.5 bg-amber-400/50 dark:bg-amber-500/40 rounded-full blur-xs animate-pulse pointer-events-none" />
        )}

        <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs border-2 border-amber-400/80 shadow-md flex items-center justify-center text-lg sm:text-xl">
          {config.icon}
          {isDiscovered && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
              <Check className="w-2.5 h-2.5" />
            </span>
          )}
        </div>

        {/* Hover label hint */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow z-30">
          {isDiscovered ? 'Secreto guardado ✓' : '¿Un secreto escolar? ✨'}
        </div>
      </div>

      {/* Secret Discovery / Detail Modal */}
      {showModal &&
        createPortal(
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in no-print"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-white dark:bg-slate-900 border-4 border-amber-400 dark:border-amber-500 rounded-3xl p-5 shadow-2xl space-y-4 text-center animate-pop-in"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 transition cursor-pointer"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 text-white flex items-center justify-center text-3xl shadow-lg animate-bounce-gentle">
                {config.icon}
              </div>

              <div>
                <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Secreto del Campus Digital</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight mt-0.5 font-display">
                  {config.name}
                </h3>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-3 text-xs text-amber-950 dark:text-amber-200 font-body leading-relaxed text-left">
                <p className="font-semibold">{config.lore}</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>¡Recompensa guardada en tu Mochila Digital!</span>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-black text-xs rounded-2xl shadow-md cursor-pointer transition active:scale-95"
              >
                ¡GENIAL, SEGUIR EXPLORANDO! 🚀
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
