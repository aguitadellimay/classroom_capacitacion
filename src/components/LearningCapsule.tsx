import React, { useState } from 'react';
import type { Grade, LearningCard, LevelLearningData } from '../types';
import { formatGradeText } from '../utils/gradeAdapter';
import { soundManager } from '../utils/sound';
import { Clasito } from './Clasito';
import { LevelIllustration } from './EducationalIllustrations';
import {
  ChevronLeft,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';

interface LearningCapsuleProps {
  levelId: number;
  grade: Grade;
  learningData: LevelLearningData;
  onReady: () => void;
}

export const LearningCapsule: React.FC<LearningCapsuleProps> = ({
  levelId,
  grade,
  learningData,
  onReady,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});
  const [chosenOptions, setChosenOptions] = useState<Record<string, number>>({});
  const [showIllustration, setShowIllustration] = useState(false);

  const cards: LearningCard[] = learningData.cardsByGrade[grade] || learningData.cardsByGrade[1] || [];
  const currentCard = cards[currentCardIndex] || cards[0];
  const isLastCard = currentCardIndex === cards.length - 1;

  const handleNextCard = () => {
    soundManager.playClick();
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      soundManager.playSuccess();
      onReady();
    }
  };

  const handlePrevCard = () => {
    soundManager.playClick();
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const handleReveal = (cardId: string) => {
    soundManager.playClick();
    soundManager.playStarSparkle();
    setRevealedCards((prev) => ({ ...prev, [cardId]: true }));
  };

  const handleChoice = (cardId: string, optionIdx: number, isCorrect: boolean) => {
    soundManager.playClick();
    if (isCorrect) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
    setChosenOptions((prev) => ({ ...prev, [cardId]: optionIdx }));
  };

  const isCurrentCardRevealed = Boolean(revealedCards[currentCard?.id]);
  const currentCardChoice = chosenOptions[currentCard?.id];

  return (
    <div className="space-y-6 animate-pop-in">
      {/* Top Banner with Clasito Introduction */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/90 border-3 border-amber-300 dark:border-amber-500/40 p-4 sm:p-5 rounded-3xl shadow-sm transition-colors">
        <Clasito
          mood={learningData.clasitoIntro.mood}
          size="md"
          speechText={learningData.clasitoIntro.text}
          grade={grade}
        />
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{levelId === 10 ? 'REPASO MAESTRO' : 'CÁPSULA DE APRENDIZAJE'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-300">
            {formatGradeText(levelId === 10 ? '📚 Repasamos antes del Gran Desafío' : '📚 Aprendemos antes del Desafío', grade)}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-amber-800 dark:text-slate-300 mt-0.5">
            {formatGradeText(
              'Leé y descubrí las tarjetas interactivas para prepararte al 100%.',
              grade
            )}
          </p>
        </div>
      </div>

      {/* Progress Pills / Dots */}
      <div className="flex items-center justify-between px-2">
        <span className="text-xs sm:text-sm font-black text-slate-500 dark:text-slate-400 uppercase">
          Tarjeta {currentCardIndex + 1} de {cards.length}
        </span>
        <div className="flex items-center gap-2">
          {cards.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setCurrentCardIndex(idx);
              }}
              className={`h-3 rounded-full transition-all cursor-pointer ${
                idx === currentCardIndex
                  ? 'w-8 bg-amber-500 shadow-sm'
                  : idx < currentCardIndex
                  ? 'w-3 bg-emerald-400'
                  : 'w-3 bg-slate-300 dark:bg-slate-700'
              }`}
              title={`Ir a tarjeta ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Interactive Learning Card */}
      {currentCard && (
        <div className="bg-white dark:bg-slate-850 dark:bg-slate-800/95 border-4 border-amber-300 dark:border-amber-500/40 rounded-3xl p-5 sm:p-7 shadow-lg space-y-5 relative overflow-hidden transition-all text-slate-800 dark:text-slate-100">
          
          {/* Card Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-600/60 text-3xl sm:text-4xl flex items-center justify-center flex-shrink-0 shadow-sm animate-bounce-gentle">
                {currentCard.icon}
              </div>
              <div>
                {currentCard.tag && (
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {formatGradeText(currentCard.tag, grade)}
                  </span>
                )}
                <h4
                  className={`font-black text-slate-900 dark:text-white leading-tight ${
                    grade === 1 ? 'text-xl sm:text-2xl' : 'text-lg sm:text-2xl'
                  }`}
                >
                  {formatGradeText(currentCard.title, grade)}
                </h4>
              </div>
            </div>
          </div>

          {/* Explanation Text */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-700 rounded-2xl">
            <p
              className={`font-extrabold text-slate-800 dark:text-slate-100 leading-relaxed ${
                grade === 1 ? 'text-lg sm:text-xl font-black' : 'text-base sm:text-lg'
              }`}
            >
              {formatGradeText(currentCard.explanation, grade)}
            </p>

            {/* Example snippet */}
            {currentCard.example && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-start gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                <span className="text-amber-500 font-black flex-shrink-0">Ejemplo:</span>
                <span className="italic">{formatGradeText(currentCard.example, grade)}</span>
              </div>
            )}
          </div>

          {/* Educational Visual Illustration */}
          {(currentCardIndex === 0 || showIllustration) && (
            <div className="bg-gradient-to-b from-sky-50/60 via-amber-50/40 to-white p-3 sm:p-4 rounded-3xl border-2 border-amber-200 shadow-sm flex flex-col items-center justify-center animate-pop-in">
              <LevelIllustration levelId={levelId} className="w-full max-w-sm sm:max-w-md h-36 sm:h-48" />
              <div className="mt-1.5 flex items-center justify-between w-full px-2 text-[10px] sm:text-xs font-black text-amber-900/80">
                <span className="flex items-center gap-1">
                  <span>🎨</span>
                  <span>{formatGradeText('Guía visual ilustrada de la lección', grade)}</span>
                </span>
                {currentCardIndex > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowIllustration(false)}
                    className="text-amber-700 hover:text-amber-900 underline cursor-pointer"
                  >
                    Ocultar
                  </button>
                )}
              </div>
            </div>
          )}

          {currentCardIndex > 0 && !showIllustration && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setShowIllustration(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full text-xs font-black transition cursor-pointer shadow-sm"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{formatGradeText('Ver ilustración didáctica del nivel', grade)}</span>
              </button>
            </div>
          )}

          {/* Interactive Feature: Reveal, Tip or Choice */}
          {currentCard.interactiveType === 'reveal' && currentCard.interactiveData && (
            <div className="space-y-3">
              {!isCurrentCardRevealed ? (
                <button
                  type="button"
                  onClick={() => handleReveal(currentCard.id)}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow transition hover:scale-101"
                >
                  <Eye className="w-5 h-5" />
                  <span>
                    {formatGradeText(
                      currentCard.interactiveData.revealButtonText || 'TOCÁ PARA DESCUBRIR MÁS',
                      grade
                    )}
                  </span>
                </button>
              ) : (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-emerald-950 font-black text-sm sm:text-base animate-pop-in flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div>
                    <span className="text-xs uppercase text-emerald-700 block font-bold">¡Dato Clave!</span>
                    <span>{formatGradeText(currentCard.interactiveData.revealText || '', grade)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentCard.interactiveType === 'tip' && currentCard.interactiveData && (
            <div className="p-4 bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-300 dark:border-sky-800 rounded-2xl text-sky-950 dark:text-sky-200 font-bold text-xs sm:text-sm flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-black uppercase text-sky-700 dark:text-sky-300 block">Consejo de Clasito:</span>
                <span>{formatGradeText(currentCard.interactiveData.revealText || '', grade)}</span>
              </div>
            </div>
          )}

          {currentCard.interactiveType === 'choice' && currentCard.interactiveData && (
            <div className="p-4 bg-amber-50/70 dark:bg-slate-900/60 border-2 border-amber-300 dark:border-amber-600/50 rounded-2xl space-y-3">
              <span className="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-300 block">
                💡 {formatGradeText(currentCard.interactiveData.choiceQuestion || 'Mini Comprobación:', grade)}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentCard.interactiveData.choiceOptions?.map((opt, idx) => {
                  const isSelected = currentCardChoice === idx;
                  const isRevealed = currentCardChoice !== undefined;

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isRevealed}
                      onClick={() => handleChoice(currentCard.id, idx, opt.isCorrect)}
                      className={`p-3 rounded-xl border-2 text-left font-black text-xs sm:text-sm transition flex items-center justify-between gap-2 cursor-pointer ${
                        isRevealed
                          ? opt.isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                            : isSelected
                            ? 'bg-rose-50 dark:bg-rose-950/80 border-rose-300 text-rose-900 dark:text-rose-200'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-50 text-slate-400'
                          : 'bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 border-amber-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                      }`}
                    >
                      <span>{formatGradeText(opt.text, grade)}</span>
                      {isRevealed && (
                        <div>
                          {opt.isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isSelected ? (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {currentCardChoice !== undefined && currentCard.interactiveData.choiceOptions && (
                <div
                  className={`p-3 rounded-xl text-xs sm:text-sm font-bold animate-pop-in ${
                    currentCard.interactiveData.choiceOptions[currentCardChoice]?.isCorrect
                      ? 'bg-emerald-100 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-200 border border-emerald-400'
                      : 'bg-rose-100 dark:bg-rose-950/90 text-rose-900 dark:text-rose-200 border border-rose-400'
                  }`}
                >
                  {currentCard.interactiveData.choiceOptions[currentCardChoice]?.feedback}
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          disabled={currentCardIndex === 0}
          onClick={handlePrevCard}
          className={`px-4 py-3 rounded-2xl font-black text-sm sm:text-base flex items-center gap-1.5 transition ${
            currentCardIndex > 0
              ? 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 cursor-pointer'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{formatGradeText('ANTERIOR', grade)}</span>
        </button>

        <button
          type="button"
          onClick={handleNextCard}
          className={`btn-game-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer shadow-lg ${
            isLastCard
              ? 'btn-game-green bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          <span>
            {formatGradeText(
              isLastCard
                ? levelId === 10
                  ? '¡ESTOY LISTO PARA EL DESAFÍO FINAL! 🏆'
                  : '✅ ¡YA ESTOY LISTO! 🚀'
                : 'SIGUIENTE ➡️',
              grade
            )}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
