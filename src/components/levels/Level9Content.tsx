import React, { useState } from 'react';
import type { Grade, ShareItem } from '../../types';
import { LEVEL_9_ITEMS } from '../../data/levelsData';
import { formatGradeText } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { Clasito } from '../Clasito';
import { ShieldCheck, ShieldAlert, ArrowRight } from 'lucide-react';

interface Level9ContentProps {
  grade: Grade;
  onNext: () => void;
}

export const Level9Content: React.FC<Level9ContentProps> = ({ grade, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [classifiedResults, setClassifiedResults] = useState<
    Record<string, { choice: boolean; isCorrect: boolean }>
  >({});
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const currentItem: ShareItem | undefined = LEVEL_9_ITEMS[currentIndex];

  const handleClassify = (canShareChoice: boolean) => {
    if (!currentItem) return;
    soundManager.playClick();

    const isCorrect = canShareChoice === currentItem.canShare;
    if (isCorrect) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }

    setClassifiedResults({
      ...classifiedResults,
      [currentItem.id]: { choice: canShareChoice, isCorrect },
    });

    setLastFeedback(currentItem.reason);

    // Advance to next item after brief pause
    setTimeout(() => {
      if (currentIndex < LEVEL_9_ITEMS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setLastFeedback(null);
      } else {
        soundManager.playLevelComplete();
      }
    }, 1800);
  };

  const isFinished = Object.keys(classifiedResults).length === LEVEL_9_ITEMS.length;

  return (
    <div className="space-y-6">
      {/* Introduction with Clasito */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-indigo-50 border-3 border-indigo-300 p-4 rounded-3xl">
        <Clasito
          mood={isFinished ? 'celebrating' : 'thinking'}
          size="md"
          speechText={
            grade === 1
              ? '¿SE PUEDE COMPARTIR? ¡PROTEGEMOS NUESTROS SECRETOS!'
              : 'En Internet cuidamos nuestros datos privados. ¡Descubrí qué podemos compartir y qué no!'
          }
          grade={grade}
        />
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-indigo-950">
            {formatGradeText('Juego: ¿Se puede compartir en Classroom?', grade)}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-indigo-800 mt-1">
            {formatGradeText(
              `Elemento ${Math.min(currentIndex + 1, LEVEL_9_ITEMS.length)} de ${
                LEVEL_9_ITEMS.length
              }`,
              grade
            )}
          </p>
          <div className="w-full bg-indigo-200 h-2.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${(Object.keys(classifiedResults).length / LEVEL_9_ITEMS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Game Arena */}
      {!isFinished && currentItem ? (
        <div className="bg-white border-3 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-center animate-pop-in">
          <span className="text-xs sm:text-sm font-black uppercase text-indigo-600 tracking-wider">
            ¿Qué hacemos con este dato?
          </span>

          {/* Current Card to classify */}
          <div className="p-6 bg-slate-50 border-3 border-indigo-200 rounded-3xl max-w-md mx-auto shadow-md">
            <span className="text-6xl sm:text-7xl block mb-3 animate-bounce-gentle">
              {currentItem.icon}
            </span>
            <h4
              className={`font-black text-slate-900 ${
                grade === 1 ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
              }`}
            >
              {formatGradeText(currentItem.text, grade)}
            </h4>
          </div>

          {/* Classification Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <button
              type="button"
              onClick={() => handleClassify(true)}
              className="btn-game-green bg-emerald-500 hover:bg-emerald-600 text-white font-black p-5 rounded-2xl flex flex-col items-center gap-2 cursor-pointer shadow-lg"
            >
              <ShieldCheck className="w-8 h-8" />
              <span className={grade === 1 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}>
                {formatGradeText('SÍ, ES PARA LA CLASE ✅', grade)}
              </span>
              <span className="text-xs text-emerald-100 font-semibold">
                (Tareas, dibujos, dudas escolares)
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleClassify(false)}
              className="btn-game-primary bg-rose-600 hover:bg-rose-700 text-white font-black p-5 rounded-2xl flex flex-col items-center gap-2 cursor-pointer shadow-lg"
            >
              <ShieldAlert className="w-8 h-8" />
              <span className={grade === 1 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}>
                {formatGradeText('NO, ES PRIVADO / SECRETO 🔒', grade)}
              </span>
              <span className="text-xs text-rose-100 font-semibold">
                (Contraseñas, teléfono, dirección)
              </span>
            </button>
          </div>

          {/* Feedback popup after classification */}
          {lastFeedback && (
            <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl font-bold text-amber-900 text-sm sm:text-base animate-pop-in max-w-lg mx-auto">
              💡 {lastFeedback}
            </div>
          )}
        </div>
      ) : (
        /* Finished celebration screen */
        <div className="bg-emerald-50 border-3 border-emerald-400 rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-pop-in">
          <span className="text-6xl block">🛡️</span>
          <h4 className="text-2xl sm:text-3xl font-black text-emerald-950">
            {formatGradeText('¡ERES UN GUARDIÁN DE LA PRIVACIDAD!', grade)}
          </h4>
          <p className="text-base sm:text-lg font-bold text-emerald-800 max-w-md mx-auto">
            {formatGradeText(
              'Has aprendido qué datos son privados y cómo proteger tu seguridad y la de tu familia.',
              grade
            )}
          </p>
        </div>
      )}

      {/* Bottom Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            isFinished
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          <span>{formatGradeText(isFinished ? '¡CONTINUAR AL DESAFÍO! ⭐' : 'IR AL MINI DESAFÍO', grade)}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
