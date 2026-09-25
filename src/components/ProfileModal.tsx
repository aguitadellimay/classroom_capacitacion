import React, { useState } from 'react';
import type { UserProgress, Grade } from '../types';
import { BADGES } from '../data/badges';
import { GRADES_INFO } from '../utils/gradeAdapter';
import { soundManager } from '../utils/sound';
import { Clasito } from './Clasito';
import { X, Award, Star, RotateCcw, Check } from 'lucide-react';

interface ProfileModalProps {
  progress: UserProgress;
  onClose: () => void;
  onUpdateGrade: (grade: Grade) => void;
  onResetProgress: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  progress,
  onClose,
  onUpdateGrade,
  onResetProgress,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const gradeInfo = GRADES_INFO[progress.grade];
  const percentage = Math.round((progress.completedLevels.length / 10) * 100);

  const handleGradeChange = (newGrade: Grade) => {
    soundManager.playClick();
    onUpdateGrade(newGrade);
  };

  const handleConfirmReset = () => {
    soundManager.playError();
    onResetProgress();
    setShowConfirmReset(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl sm:rounded-4xl max-w-2xl w-full border-4 border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-pop-in text-slate-800 dark:text-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow">
              {gradeInfo.avatar}
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-200 block">
                Perfil del Alumno
              </span>
              <h2 className="text-xl sm:text-2xl font-black">
                {progress.name.toUpperCase()}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-2xl transition cursor-pointer text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Progress Overview Card */}
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border-3 border-indigo-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Clasito mood="happy" size="md" showSpeaker={false} />
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {gradeInfo.name} — {gradeInfo.badgeName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-extrabold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{progress.stars} Estrellas</span>
                    </span>
                    <span className="text-sm font-extrabold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>{progress.unlockedBadges.length} / 10 Insignias</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-3xl sm:text-4xl font-black text-indigo-700 dark:text-indigo-400">
                  {percentage}%
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase">
                  {progress.completedLevels.length}/10 Niveles
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Badges Gallery */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Colección de Insignias ({progress.unlockedBadges.length}/10):</span>
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {BADGES.map((badge) => {
                const isUnlocked = progress.unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border-3 flex items-start gap-3 transition-all ${
                      isUnlocked
                        ? 'bg-amber-50/70 dark:bg-slate-800 border-amber-300 dark:border-amber-600/50 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-850/60 border-slate-200 dark:border-slate-800 opacity-50'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm ${
                        isUnlocked ? 'bg-amber-400 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-400'
                      }`}
                    >
                      {isUnlocked ? badge.icon : '🔒'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {badge.title}
                        </span>
                        {isUnlocked && <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-1" />}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium leading-tight mt-0.5 line-clamp-2">
                        {isUnlocked ? badge.description : `Desbloquea en Nivel ${badge.levelNumber}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Change Grade Selector */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 space-y-3">
            <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 block">
              Cambiar Grado Escolar:
            </span>
            <div className="grid grid-cols-5 gap-2">
              {([1, 2, 3, 4, 5] as Grade[]).map((g) => {
                const isSelected = progress.grade === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGradeChange(g)}
                    className={`p-2 rounded-xl text-center font-black text-xs sm:text-sm border-2 transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow ring-2 ring-indigo-200 dark:ring-indigo-800'
                        : 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {GRADES_INFO[g].name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Progress Section */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
            {!showConfirmReset ? (
              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reiniciar mi progreso y empezar de nuevo</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-800 rounded-xl space-y-2 animate-pop-in">
                <p className="text-xs font-bold text-rose-800 dark:text-rose-200">
                  ¿Seguro que querés reiniciar todas tus estrellas e insignias?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmReset}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-lg cursor-pointer"
                  >
                    Sí, reiniciar
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmReset(false)}
                    className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
