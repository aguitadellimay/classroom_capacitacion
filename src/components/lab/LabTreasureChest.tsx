import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import type { LabTreasureChestConfig } from '../../types/lab';
import { soundManager } from '../../utils/sound';
import { Byte } from './Byte';
import confetti from 'canvas-confetti';
import { Sparkles, Star, Check, X } from 'lucide-react';

interface LabTreasureChestProps {
  config: LabTreasureChestConfig;
  isUnlocked: boolean; // Has completed worldIdRequired
  isOpened: boolean;
  onOpen: (chestId: string, bonusStars: number) => void;
}

export const LabTreasureChest: React.FC<LabTreasureChestProps> = ({
  config,
  isUnlocked,
  isOpened,
  onOpen,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isUnlocked) {
      soundManager.playClick();
      setShowModal(true);
      return;
    }

    if (!isOpened) {
      soundManager.playChestOpen();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
      onOpen(config.id, config.bonusStars);
      setShowModal(true);
    } else {
      soundManager.playClick();
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Map Interactive Marker */}
      <div
        onClick={handleClick}
        className={`group relative cursor-pointer select-none transition-transform duration-300 hover:scale-125 z-20 ${
          isOpened ? 'opacity-90' : isUnlocked ? 'animate-bounce-gentle' : 'opacity-60 grayscale'
        }`}
        title={
          isOpened
            ? `${config.title} (Abierto)`
            : isUnlocked
            ? `¡Abrir ${config.title}!`
            : `${config.title} (Bloqueado - Completá el Mundo ${config.worldIdRequired})`
        }
      >
        {/* Glow halo when ready to open */}
        {isUnlocked && !isOpened && (
          <div className="absolute -inset-2 bg-amber-400/50 rounded-full blur-md animate-pulse pointer-events-none" />
        )}

        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 dark:from-amber-600 dark:to-yellow-500 border-2 border-amber-300 dark:border-amber-400 shadow-lg flex items-center justify-center text-xl sm:text-2xl">
          {isOpened ? '✨' : config.icon}

          {/* Mini star counter badge */}
          {!isOpened && isUnlocked && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow animate-pulse">
              +{config.bonusStars}
            </span>
          )}

          {isOpened && (
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
              <Check className="w-3 h-3" />
            </span>
          )}
        </div>

        {/* Floating tooltip */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow">
          {isOpened ? 'Abierto ✓' : isUnlocked ? '¡Abrir cofre! 🎁' : `Mundo ${config.worldIdRequired} requerido`}
        </div>
      </div>

      {/* Modal Details / Opened Celebration */}
      {showModal && createPortal(
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in no-print"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-white dark:bg-slate-900 border-4 border-amber-400 rounded-3xl p-5 shadow-2xl space-y-4 text-center animate-pop-in overflow-hidden"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Icon */}
            <div className="flex justify-center pt-2">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-amber-500 flex items-center justify-center text-4xl shadow-lg animate-bounce-gentle">
                {isOpened ? '🎁' : isUnlocked ? config.icon : '🔒'}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider block">
                {isOpened ? '¡Tesoro Conquistado!' : isUnlocked ? '¡Cofre del Guardián Abierto!' : 'Cofre Secreto Bloqueado'}
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                {config.title}
              </h3>
            </div>

            {/* Byte Companion Reaction */}
            <div className="flex items-center justify-center">
              <Byte
                mood={isOpened ? 'baile' : isUnlocked ? 'celebracion' : 'pensamiento'}
                size="sm"
                interactive={true}
                showSpeaker={false}
              />
            </div>

            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed px-2">
              {isUnlocked
                ? config.message
                : `Para abrir este cofre secreto primero necesitás completar todos los desafíos del Mundo ${config.worldIdRequired}. ¡Seguí explorando la isla!`}
            </p>

            {/* Reward pill */}
            {isUnlocked && (
              <div className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 px-3.5 py-1.5 rounded-full font-black text-xs shadow-xs">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>+{config.bonusStars} Estrellas de Bonificación</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setShowModal(false);
              }}
              className="w-full btn-game-amber bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black py-2.5 rounded-2xl text-xs sm:text-sm cursor-pointer shadow transition"
            >
              ¡Continuar Aventura! 🗺️
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
