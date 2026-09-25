import React, { useState } from 'react';
import type { Grade, UserProgress } from '../types';
import { LEVELS_CONFIG, getLevelQuestions, getFinalChallengeQuestions } from '../data/levelsData';
import { LEARNING_CONTENT } from '../data/learningData';
import { BADGES } from '../data/badges';
import { formatGradeText } from '../utils/gradeAdapter';
import { soundManager } from '../utils/sound';
import { LearningCapsule } from './LearningCapsule';
import { Level1Content } from './levels/Level1Content';
import { Level2Content } from './levels/Level2Content';
import { Level3Content } from './levels/Level3Content';
import { Level4Content } from './levels/Level4Content';
import { Level5Content } from './levels/Level5Content';
import { Level6Content } from './levels/Level6Content';
import { Level7Content } from './levels/Level7Content';
import { Level8Content } from './levels/Level8Content';
import { Level9Content } from './levels/Level9Content';
import { QuizRunner } from './QuizRunner';
import { ErrorBoundary } from './ErrorBoundary';
import { X, Award, ChevronLeft } from 'lucide-react';

interface LevelModalProps {
  levelId: number;
  grade: Grade;
  progress: UserProgress;
  onClose: () => void;
  onLevelComplete: (levelId: number, score: number) => void;
}

export const LevelModal: React.FC<LevelModalProps> = ({
  levelId,
  grade,
  progress: _progress,
  onClose,
  onLevelComplete,
}) => {
  // Always start at 'learn' phase for all levels!
  const [phase, setPhase] = useState<'learn' | 'content' | 'quiz'>('learn');

  const levelConfig = LEVELS_CONFIG.find((l) => l.id === levelId) || LEVELS_CONFIG[0];
  const badgeObj = BADGES.find((b) => b.levelNumber === levelId);
  const learningData = LEARNING_CONTENT[levelId] || LEARNING_CONTENT[1];

  // Get questions for this level
  const questions =
    levelId === 10
      ? getFinalChallengeQuestions(grade)
      : getLevelQuestions(levelId, grade);

  const handleQuizComplete = (score: number, _total: number) => {
    onLevelComplete(levelId, score);
  };

  const handleBackPhase = () => {
    soundManager.playClick();
    if (phase === 'quiz') {
      if (levelId === 10) {
        setPhase('learn');
      } else {
        setPhase('content');
      }
    } else if (phase === 'content') {
      setPhase('learn');
    }
  };

  const renderContentPhase = () => {
    switch (levelId) {
      case 1:
        return <Level1Content grade={grade} onNext={() => setPhase('quiz')} />;
      case 2:
        return <Level2Content grade={grade} onNext={() => setPhase('quiz')} />;
      case 3:
        return <Level3Content grade={grade} onNext={() => setPhase('quiz')} />;
      case 4:
        return <Level4Content grade={grade} onNext={() => setPhase('quiz')} />;
      case 5:
        return <Level5Content grade={grade} onNext={() => setPhase('quiz')} />;
      case 6:
        return <Level6Content grade={grade} onNext={() => setPhase('quiz')} />;
      case 7:
        return <Level7Content grade={grade} onNext={() => setPhase('quiz')} />;
      case 8:
        return <Level8Content grade={grade} onNext={() => setPhase('quiz')} />;
      case 9:
        return <Level9Content grade={grade} onNext={() => setPhase('quiz')} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl sm:rounded-4xl max-w-4xl w-full border-4 border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-pop-in text-slate-800 dark:text-slate-100">
        
        {/* Modal Header */}
        <div className={`${levelConfig.color.bg} text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-sm flex-shrink-0`}>
          <div className="flex items-center gap-3">
            {phase !== 'learn' && (
              <button
                type="button"
                onClick={handleBackPhase}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition cursor-pointer"
                title="Volver al paso anterior"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            )}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl sm:text-3xl shadow-inner flex-shrink-0">
              {levelConfig.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-white/25 px-2.5 py-0.5 rounded-full">
                  NIVEL {levelId} DE 10
                </span>
                {badgeObj && (
                  <span className="text-xs font-bold text-amber-200 hidden sm:flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Insignia: {badgeObj.title}</span>
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-2xl font-black mt-0.5 leading-tight">
                {formatGradeText(levelConfig.title, grade)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Step Breadcrumbs in Header */}
            <div className="flex bg-black/20 p-1 rounded-2xl text-[11px] sm:text-xs font-black">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setPhase('learn');
                }}
                className={`px-2.5 py-1 rounded-xl transition cursor-pointer ${
                  phase === 'learn'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {levelId === 10 ? '📚 Repasamos' : '📚 Aprendemos'}
              </button>

              {levelId !== 10 && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setPhase('content');
                  }}
                  className={`px-2.5 py-1 rounded-xl transition cursor-pointer ${
                    phase === 'content'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  🎮 Actividad
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setPhase('quiz');
                }}
                className={`px-2.5 py-1 rounded-xl transition cursor-pointer ${
                  phase === 'quiz'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {levelId === 10 ? '🏆 Gran Desafío' : '⭐ Desafío'}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 sm:p-2.5 bg-black/20 hover:bg-black/30 rounded-2xl transition cursor-pointer text-white"
              title="Cerrar nivel"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 dark:bg-slate-900">
          <ErrorBoundary
            fallbackMessage="Ocurrió un pequeño inconveniente en este nivel. Podés reiniciar la lección o continuar."
            onReset={() => setPhase('learn')}
          >
            {phase === 'learn' ? (
              <LearningCapsule
                levelId={levelId}
                grade={grade}
                learningData={learningData}
                onReady={() => setPhase(levelId === 10 ? 'quiz' : 'content')}
              />
            ) : phase === 'content' && levelId !== 10 ? (
              renderContentPhase()
            ) : (
              <QuizRunner
                questions={questions}
                grade={grade}
                levelNumber={levelId}
                title={
                  levelId === 10
                    ? 'Gran Desafío Final: Experto en Classroom'
                    : `Mini Desafío del Nivel ${levelId}`
                }
                onComplete={handleQuizComplete}
              />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};
