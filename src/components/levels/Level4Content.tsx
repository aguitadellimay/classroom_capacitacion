import React, { useState } from 'react';
import type { Grade } from '../../types';
import { LEVEL_4_STEPS } from '../../data/levelsData';
import { formatGradeText } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { Clasito } from '../Clasito';
import { RotateCcw, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface Level4ContentProps {
  grade: Grade;
  onNext: () => void;
}

export const Level4Content: React.FC<Level4ContentProps> = ({ grade, onNext }) => {
  // Steps pool to click and add in order
  const [orderedSteps, setOrderedSteps] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle clicking an available step
  const handleSelectStep = (stepId: string) => {
    soundManager.playClick();
    if (orderedSteps.includes(stepId)) return;

    const nextOrder = [...orderedSteps, stepId];
    setOrderedSteps(nextOrder);
    setErrorMessage('');

    // Check if right sequence
    const correctStepForThisPosition = LEVEL_4_STEPS[nextOrder.length - 1].id;
    if (stepId !== correctStepForThisPosition) {
      soundManager.playError();
      setErrorMessage(
        grade === 1
          ? '¡UPS! ESE PASO VA EN OTRO MOMENTO. ¡RECORDÁ LEER PRIMERO!'
          : '¡Ese paso no va en este orden! Recordá: antes de hacer o entregar, primero hay que leer con calma.'
      );
    } else {
      soundManager.playSuccess();
      if (nextOrder.length === LEVEL_4_STEPS.length) {
        setIsSuccess(true);
        soundManager.playLevelComplete();
      }
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setOrderedSteps([]);
    setIsSuccess(false);
    setErrorMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Introduction with Clasito */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-purple-50 border-3 border-purple-300 p-4 rounded-3xl">
        <Clasito
          mood={isSuccess ? 'celebrating' : 'thinking'}
          size="md"
          speechText={
            grade === 1
              ? '¡REGLA DE ORO! ANTES DE HACER LA TAREA: ¡LEER TODA LA CONSIGNA!'
              : 'La regla número 1 de Classroom: ¡Antes de hacer cualquier cosa, leemos la consigna completa!'
          }
          grade={grade}
        />
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-purple-950">
            {formatGradeText('¡El Camino de la Consigna!', grade)}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-purple-800 mt-1">
            {formatGradeText(
              'Tocá los pasos en el orden correcto en el que debemos trabajar:',
              grade
            )}
          </p>
        </div>
      </div>

      {/* Pictogram banner for Grade 1 and 2 */}
      {(grade === 1 || grade === 2) && (
        <div className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-500 text-white p-3 sm:p-4 rounded-2xl shadow flex flex-wrap items-center justify-around gap-2 text-center font-black">
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">📚</span>
            <span className="text-xs sm:text-sm">1. LEER</span>
          </div>
          <span className="text-xl">➡️</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">👀</span>
            <span className="text-xs sm:text-sm">2. MIRAR</span>
          </div>
          <span className="text-xl">➡️</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">✏️</span>
            <span className="text-xs sm:text-sm">3. HACER</span>
          </div>
          <span className="text-xl">➡️</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">🔍</span>
            <span className="text-xs sm:text-sm">4. REVISAR</span>
          </div>
          <span className="text-xl">➡️</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl sm:text-3xl">📤</span>
            <span className="text-xs sm:text-sm">5. ENTREGAR</span>
          </div>
        </div>
      )}

      {/* Real Consigna Example Box */}
      <div className="bg-amber-50 border-3 border-amber-300 rounded-2xl p-4 flex items-start gap-3">
        <BookOpen className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
        <div>
          <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
            Ejemplo de Consigna Escolar:
          </span>
          <p className="font-extrabold text-slate-800 text-sm sm:text-base mt-0.5">
            "Realizá un dibujo de tu animal favorito con témperas o lápices, escribí su nombre debajo y adjuntalo como imagen antes del viernes."
          </p>
        </div>
      </div>

      {/* Ordered Slots Section */}
      <div className="bg-slate-50 border-3 border-slate-300 rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
            Tu orden de trabajo ({orderedSteps.length}/5 pasos colocados):
          </h4>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-300 cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar orden</span>
          </button>
        </div>

        {/* Ordered Step Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-3">
          {[0, 1, 2, 3, 4].map((idx) => {
            const stepId = orderedSteps[idx];
            const stepObj = LEVEL_4_STEPS.find((s) => s.id === stepId);
            const isCorrect = stepId === LEVEL_4_STEPS[idx].id;

            return (
              <div
                key={idx}
                className={`min-h-[75px] sm:min-h-[110px] rounded-2xl border-3 border-dashed p-3 flex flex-col items-center justify-center text-center transition-all ${
                  stepObj
                    ? isCorrect
                      ? 'bg-emerald-50 border-emerald-500 border-solid shadow-sm'
                      : 'bg-rose-50 border-rose-400 border-solid'
                    : 'bg-white/80 border-slate-300 text-slate-400'
                }`}
              >
                {stepObj ? (
                  <>
                    <span className="text-2xl sm:text-3xl mb-1">{stepObj.icon}</span>
                    <span
                      className={`font-black text-xs sm:text-sm leading-tight ${
                        isCorrect ? 'text-emerald-900' : 'text-rose-900'
                      }`}
                    >
                      {formatGradeText(stepObj.text, grade)}
                    </span>
                  </>
                ) : (
                  <span className="font-black text-slate-400 text-xs sm:text-sm">
                    Paso {idx + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Error / Encouragement Feedback */}
      {errorMessage && (
        <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-2xl text-center font-bold text-rose-800 text-sm animate-wiggle">
          ⚠️ {errorMessage}
        </div>
      )}

      {isSuccess && (
        <div className="p-4 bg-emerald-50 border-3 border-emerald-400 rounded-2xl text-center font-black text-emerald-900 text-base sm:text-lg animate-pop-in flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <span>
            {formatGradeText(
              '¡FELICITACIONES! ORDENASTE TODOS LOS PASOS PERFECTAMENTE.',
              grade
            )}
          </span>
        </div>
      )}

      {/* Available Step Choices (Shuffled or distinct) */}
      <div className="space-y-2">
        <span className="text-xs sm:text-sm font-extrabold text-slate-700 block">
          Toca los pasos para ordenarlos:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {LEVEL_4_STEPS.map((step) => {
            const isUsed = orderedSteps.includes(step.id);
            return (
              <button
                key={step.id}
                type="button"
                disabled={isUsed || isSuccess}
                onClick={() => handleSelectStep(step.id)}
                className={`p-3 sm:p-4 rounded-2xl border-3 text-left transition-all flex items-center gap-3 cursor-pointer ${
                  isUsed
                    ? 'opacity-40 bg-slate-200 border-slate-300 cursor-not-allowed'
                    : 'bg-white hover:bg-purple-50 border-purple-200 hover:border-purple-400 shadow-sm hover:scale-102'
                }`}
              >
                <span className="text-2xl sm:text-3xl">{step.icon}</span>
                <span className="font-extrabold text-slate-800 text-xs sm:text-sm">
                  {formatGradeText(step.text, grade)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            isSuccess
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          <span>{formatGradeText(isSuccess ? '¡CONTINUAR AL DESAFÍO! ⭐' : 'IR AL MINI DESAFÍO', grade)}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
