import React, { useState } from 'react';
import type { QuizQuestion, Grade } from '../types';
import { formatGradeText } from '../utils/gradeAdapter';
import { soundManager } from '../utils/sound';
import { Clasito } from './Clasito';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizRunnerProps {
  questions: QuizQuestion[];
  grade: Grade;
  onComplete: (score: number, total: number) => void;
  levelNumber: number;
  title?: string;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  questions,
  grade,
  onComplete,
  levelNumber,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Safe fallback if questions is empty
  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 border-4 border-amber-300 rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-pop-in text-slate-800 dark:text-slate-100">
        <div className="flex justify-center">
          <Clasito mood="celebrating" size="md" speechText="¡Excelente trabajo en este nivel!" grade={grade} />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
          {formatGradeText('¡Nivel completado con éxito!', grade)}
        </h3>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          {formatGradeText('Completaste todas las actividades y aprendizajes.', grade)}
        </p>
        <button
          type="button"
          onClick={() => onComplete(1, 1)}
          className="btn-game-primary bg-emerald-500 hover:bg-emerald-600 text-white font-black px-6 py-3.5 rounded-2xl cursor-pointer"
        >
          {formatGradeText('¡VOLVER AL MAPA CON MI ESTRELLA! ⭐', grade)}
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (selectedOptionId !== null) return; // prevent multiple clicks
    setSelectedOptionId(optionId);

    if (isCorrect) {
      soundManager.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      soundManager.playError();
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
    } else {
      setIsFinished(true);
      soundManager.playLevelComplete();
      try {
        confetti({
          particleCount: levelNumber === 10 ? 120 : 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore
      }
    }
  };

  const selectedOpt = currentQ?.options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOpt?.isCorrect ?? false;

  // Final motivational message
  const getMotivationalMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return { title: '🌟 ¡EXCELENTE!', sub: '¡Puntaje perfecto! Dominás este tema como un maestro.' };
    if (percentage >= 70) return { title: '👏 ¡MUY BIEN!', sub: '¡Gran trabajo! Demostraste que sabés cómo usar Classroom.' };
    if (percentage >= 50) return { title: '💪 ¡CASI LO LOGRAMOS!', sub: '¡Buen intento! Cada día aprendés más.' };
    return { title: '🚀 ¡SEGUÍ PRACTICANDO!', sub: '¡Ánimo! El secreto de aprender es volver a intentar.' };
  };

  if (isFinished) {
    const message = getMotivationalMessage();
    return (
      <div className="bg-white dark:bg-slate-800 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 text-center space-y-6 animate-pop-in shadow-xl text-slate-900 dark:text-white">
        <div className="flex justify-center">
          <Clasito
            mood="celebrating"
            size="lg"
            speechText={
              grade === 1
                ? '¡NIVEL SUPERADO! ¡GANASTE UNA ESTRELLA!'
                : '¡Felicitaciones! Has completado el desafío con éxito.'
            }
            grade={grade}
          />
        </div>

        <div>
          <span className="text-4xl sm:text-5xl block mb-2">🎉 ⭐ 🏆</span>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            {formatGradeText(message.title, grade)}
          </h3>
          <p className="text-base sm:text-lg font-bold text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
            {formatGradeText(message.sub, grade)}
          </p>
        </div>

        {/* Score indicator */}
        <div className="bg-amber-50 dark:bg-amber-950/50 border-3 border-amber-300 dark:border-amber-600/60 rounded-2xl p-4 max-w-xs mx-auto">
          <span className="text-xs font-black uppercase text-amber-800 dark:text-amber-300 tracking-wider block">
            Respuestas correctas:
          </span>
          <span className="text-3xl sm:text-4xl font-black text-amber-900 dark:text-amber-200">
            {score} / {questions.length}
          </span>
          <div className="flex justify-center gap-1 mt-2 text-2xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 150}ms` }}>
                ⭐
              </span>
            ))}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => onComplete(score, questions.length)}
            className="btn-game-primary bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg sm:text-xl px-8 py-4 rounded-2xl shadow-xl cursor-pointer"
          >
            <span>
              {formatGradeText(
                levelNumber === 10 ? '¡VER MI CERTIFICADO FINAL! 🏆' : '¡VOLVER AL MAPA CON MI ESTRELLA! ⭐',
                grade
              )}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with question counter */}
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 p-3 sm:p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/80 px-3 py-1 rounded-full uppercase">
            {title ? formatGradeText(title, grade) : `Pregunta ${currentIndex + 1} de ${questions.length}`}
          </span>
        </div>

        <div className="flex items-center gap-1 font-extrabold text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <span>Aciertos:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-black">{score}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-850 dark:bg-slate-800/90 border-3 border-indigo-200 dark:border-indigo-900/60 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5 text-slate-800 dark:text-slate-100">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Clasito
            mood={
              selectedOptionId === null
                ? 'thinking'
                : isCorrect
                ? 'celebrating'
                : 'wrong'
            }
            size="md"
            speechText={currentQ.question}
            grade={grade}
          />
          <div className="flex-1 text-center sm:text-left">
            <h3
              className={`font-black text-slate-900 dark:text-white leading-snug ${
                grade === 1 ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
              }`}
            >
              {formatGradeText(currentQ.question, grade)}
            </h3>
            {currentQ.subtext && (
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                {formatGradeText(currentQ.subtext, grade)}
              </p>
            )}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {currentQ.options.map((opt, idx) => {
            const isChosen = selectedOptionId === opt.id;
            const isRevealed = selectedOptionId !== null;

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isRevealed}
                onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                className={`p-4 sm:p-5 rounded-2xl border-3 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                  isRevealed
                    ? opt.isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-300 dark:ring-emerald-800 shadow-sm'
                      : isChosen
                      ? 'bg-rose-50 dark:bg-rose-950/80 border-rose-400'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50'
                    : 'bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 shadow-sm hover:scale-101'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-slate-700 text-indigo-900 dark:text-indigo-200 font-black flex items-center justify-center text-sm flex-shrink-0">
                    {idx === 0 ? 'A' : idx === 1 ? 'B' : 'C'}
                  </span>
                  {opt.icon && <span className="text-2xl sm:text-3xl flex-shrink-0">{opt.icon}</span>}
                  <span
                    className={`font-bold ${
                      grade === 1 ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                    } ${
                      isRevealed && opt.isCorrect
                        ? 'text-emerald-900 dark:text-emerald-200'
                        : isRevealed && isChosen && !opt.isCorrect
                        ? 'text-rose-900 dark:text-rose-200'
                        : 'text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {formatGradeText(opt.text, grade)}
                  </span>
                </div>

                {isRevealed && (
                  <div>
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 animate-pop-in" />
                    ) : isChosen ? (
                      <XCircle className="w-6 h-6 text-rose-500 dark:text-rose-400 animate-wiggle" />
                    ) : null}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation */}
        {selectedOptionId !== null && selectedOpt && (
          <div
            className={`p-4 rounded-2xl border-2 animate-pop-in font-bold text-sm sm:text-base ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-300 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 dark:border-rose-600 text-rose-900 dark:text-rose-200'
            }`}
          >
            <p>
              {isCorrect ? '🎉 ' : '💡 '}
              {selectedOpt.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Next Question button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          disabled={selectedOptionId === null}
          onClick={handleNextQuestion}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            selectedOptionId !== null
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>
            {currentIndex < questions.length - 1
              ? formatGradeText('SIGUIENTE PREGUNTA ➡️', grade)
              : formatGradeText('VER RESULTADO FINAL ⭐', grade)}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
