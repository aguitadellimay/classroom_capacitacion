import React, { useState } from 'react';
import type { Grade } from '../../types';
import { LEVEL_1_PURPOSES } from '../../data/levelsData';
import { formatGradeText } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { Clasito } from '../Clasito';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface Level1ContentProps {
  grade: Grade;
  onNext: () => void;
}

export const Level1Content: React.FC<Level1ContentProps> = ({ grade, onNext }) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleCard = (id: string, isCorrect: boolean) => {
    soundManager.playClick();
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((c) => c !== id));
      return;
    }

    const nextSelected = [...selectedCards, id];
    setSelectedCards(nextSelected);

    if (!isCorrect) {
      soundManager.playError();
      setFeedback(
        grade === 1
          ? '¡UPS! CLASSROOM NO ES PARA JUGAR VIDEOJUEGOS TODO EL DÍA. ¡ES PARA LA ESCUELA!'
          : '¡Atención! Classroom no es para juegos de ocio ni redes de entretenimiento; es nuestra aula virtual para aprender.'
      );
    } else {
      soundManager.playSuccess();
      setFeedback(
        grade === 1
          ? '¡SÍ! ¡EXCELENTE! CLASSROOM NOS AYUDA A APRENDER.'
          : '¡Muy bien! Esa es una de las funciones principales de Google Classroom.'
      );
    }

    // Check if user selected all correct cards (p1, p2, p4, p6)
    const correctIds = ['p1', 'p2', 'p4', 'p6'];
    const hasAllCorrect = correctIds.every((cid) => nextSelected.includes(cid));
    const hasNoIncorrect = !nextSelected.includes('p3') && !nextSelected.includes('p5');

    if (hasAllCorrect && hasNoIncorrect) {
      setIsCompleted(true);
      soundManager.playLevelComplete();
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction with Clasito */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-sky-50 border-3 border-sky-300 p-4 rounded-3xl">
        <Clasito
          mood={isCompleted ? 'celebrating' : 'thinking'}
          size="md"
          speechText={
            grade === 1
              ? '¿PARA QUÉ USAMOS CLASSROOM? ¡TOCA LAS TARJETAS CORRECTAS!'
              : 'Classroom es nuestra escuela digital. ¿Podés descubrir para qué lo usamos?'
          }
          grade={grade}
        />
        <div className="text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-black text-sky-900">
            {formatGradeText('¿Para qué usamos Google Classroom?', grade)}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-sky-700 mt-1">
            {formatGradeText(
              'Toca todas las tarjetas que muestren para qué sirve nuestra aula virtual:',
              grade
            )}
          </p>
        </div>
      </div>

      {/* Interactive Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {LEVEL_1_PURPOSES.map((item) => {
          const isSelected = selectedCards.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleCard(item.id, item.isCorrect)}
              className={`p-4 sm:p-5 rounded-2xl border-3 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? item.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300 scale-102'
                    : 'bg-rose-50 border-rose-400 shadow-sm'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-sky-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl flex-shrink-0">{item.icon}</span>
                <span
                  className={`font-bold leading-tight ${
                    grade === 1 ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  } ${isSelected && item.isCorrect ? 'text-emerald-900' : 'text-slate-800'}`}
                >
                  {formatGradeText(item.text, grade)}
                </span>
              </div>

              {isSelected && (
                <div className="flex-shrink-0">
                  {item.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-pop-in" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-500 animate-wiggle" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div className="p-3 sm:p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-center font-bold text-amber-900 text-sm sm:text-base animate-pop-in">
          💡 {feedback}
        </div>
      )}

      {/* Bottom Button to proceed */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            isCompleted
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          <span>{formatGradeText(isCompleted ? '¡CONTINUAR AL DESAFÍO! ⭐' : 'IR AL MINI DESAFÍO', grade)}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
