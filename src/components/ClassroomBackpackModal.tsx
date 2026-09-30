import React, { useState } from 'react';
import type { UserProgress, Grade, Badge } from '../types';
import { BADGES } from '../data/badges';
import { LEVELS_CONFIG } from '../data/levelsData';
import { CAMPUS_SECRETS } from '../data/campusSecrets';
import { GRADES_INFO } from '../utils/gradeAdapter';
import { soundManager } from '../utils/sound';
import {
  X,
  Award,
  GraduationCap,
  CheckCircle2,
  Lock,
  Sparkles,
  MapPin,
  Search,
} from 'lucide-react';

interface ClassroomBackpackModalProps {
  progress: UserProgress;
  onClose: () => void;
  onOpenCertificate: () => void;
}

export const ClassroomBackpackModal: React.FC<ClassroomBackpackModalProps> = ({
  progress,
  onClose,
  onOpenCertificate,
}) => {
  const gradeInfo = GRADES_INFO[progress.grade as Grade] || GRADES_INFO[1];
  const [activeTab, setActiveTab] = useState<'badges' | 'missions' | 'secrets'>('badges');
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const completedCount = progress.completedLevels.length;
  const badgesCount = progress.unlockedBadges.length;
  const foundSecrets = progress.foundCampusSecrets || [];
  const isAllCompleted = completedCount >= 10;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print">
      <div className="relative max-w-2xl w-full my-auto bg-white/95 dark:bg-slate-900/95 border-4 border-indigo-400 dark:border-indigo-600 rounded-3xl sm:rounded-4xl p-5 sm:p-7 shadow-2xl space-y-5 animate-pop-in text-slate-800 dark:text-slate-100">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 text-white flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
              🎒
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider block font-display">
                Campus Digital • Mochila del Estudiante
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight font-display">
                Mi Mochila Digital
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            title="Cerrar mochila"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Profile Card Banner */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-indigo-950/40 dark:to-slate-800 border-2 border-indigo-200 dark:border-indigo-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-sm flex-shrink-0">
              {gradeInfo.avatar}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-400 tracking-wider font-display">
                Aventurero del Campus
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white uppercase font-display">
                {progress.name || 'Estudiante'}
              </h3>
              <p className="font-body text-xs font-medium text-slate-500 dark:text-slate-400">
                {gradeInfo.name} • Escuela Agüita del Limay
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 w-full sm:w-auto">
            <div className="bg-white dark:bg-slate-700/80 px-2.5 py-1.5 rounded-xl border border-amber-300 dark:border-amber-600 text-center shadow-xs">
              <span className="text-xs">⭐</span>
              <span className="block font-display font-bold text-xs text-amber-700 dark:text-amber-300">
                {progress.stars}
              </span>
              <span className="text-[9px] font-body text-slate-400 uppercase">Estrellas</span>
            </div>

            <div className="bg-white dark:bg-slate-700/80 px-2.5 py-1.5 rounded-xl border border-indigo-300 dark:border-indigo-600 text-center shadow-xs">
              <span className="text-xs">🏅</span>
              <span className="block font-display font-bold text-xs text-indigo-700 dark:text-indigo-300">
                {badgesCount}/10
              </span>
              <span className="text-[9px] font-body text-slate-400 uppercase">Medallas</span>
            </div>

            <div className="bg-white dark:bg-slate-700/80 px-2.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-600 text-center shadow-xs">
              <span className="text-xs">🏫</span>
              <span className="block font-display font-bold text-xs text-emerald-700 dark:text-emerald-300">
                {completedCount}/10
              </span>
              <span className="text-[9px] font-body text-slate-400 uppercase">Zonas</span>
            </div>

            <div className="bg-white dark:bg-slate-700/80 px-2.5 py-1.5 rounded-xl border border-purple-300 dark:border-purple-600 text-center shadow-xs">
              <span className="text-xs">✨</span>
              <span className="block font-display font-bold text-xs text-purple-700 dark:text-purple-300">
                {foundSecrets.length}/5
              </span>
              <span className="text-[9px] font-body text-slate-400 uppercase">Secretos</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('badges');
            }}
            className={`flex-1 py-2 rounded-xl font-display text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Insignias ({badgesCount}/10)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('missions');
            }}
            className={`flex-1 py-2 rounded-xl font-display text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'missions'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Misiones ({completedCount}/10)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setActiveTab('secrets');
            }}
            className={`flex-1 py-2 rounded-xl font-display text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'secrets'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Secretos ({foundSecrets.length}/5)</span>
          </button>
        </div>

        {/* TAB 1: INSIGNIAS */}
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {BADGES.map((b) => {
                const isUnlocked = progress.unlockedBadges.includes(b.id);
                const isSelected = selectedBadge?.id === b.id;

                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedBadge(b);
                    }}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 scale-105 shadow-md'
                        : isUnlocked
                        ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-700 hover:scale-102 shadow-xs'
                        : 'bg-slate-100/80 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <span className="text-3xl mb-1 select-none">
                      {isUnlocked ? b.icon : '🔒'}
                    </span>
                    <span className="font-display text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate w-full">
                      {b.title}
                    </span>
                    <span className="text-[9px] font-body font-semibold text-slate-400 mt-0.5">
                      Nivel {b.levelNumber}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Badge Spotlight */}
            {selectedBadge ? (
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-slate-800 border-2 border-indigo-200 dark:border-slate-700 flex items-start gap-3">
                <span className="text-3xl select-none">{selectedBadge.icon}</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      {selectedBadge.title}
                    </h4>
                    {progress.unlockedBadges.includes(selectedBadge.id) ? (
                      <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        ✓ Desbloqueada
                      </span>
                    ) : (
                      <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Bloqueada
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                    {selectedBadge.description}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-center font-body text-xs text-slate-400">
                Tocá una insignia para ver los detalles y cómo ganarla.
              </p>
            )}
          </div>
        )}

        {/* TAB 2: MISIONES DEL CAMPUS */}
        {activeTab === 'missions' && (
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {LEVELS_CONFIG.map((lvl) => {
              const isCompleted = progress.completedLevels.includes(lvl.id);
              const isUnlocked = lvl.id === 1 || progress.completedLevels.includes(lvl.id - 1);

              return (
                <div
                  key={lvl.id}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                    isCompleted
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                      : isUnlocked
                      ? 'bg-white dark:bg-slate-800 border-indigo-200 dark:border-indigo-800'
                      : 'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-lg shadow-xs flex-shrink-0">
                      {isUnlocked ? lvl.icon : '🔒'}
                    </div>
                    <div>
                      <span className="font-display text-xs font-bold text-slate-900 dark:text-white block">
                        Misión {lvl.id}: {lvl.shortTitle}
                      </span>
                      <span className="font-body text-[11px] text-slate-500 dark:text-slate-400">
                        {lvl.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs px-2.5 py-1 rounded-xl flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completada</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-bold text-xs px-2.5 py-1 rounded-xl">
                        Disponible
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Bloqueada</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: SECRETOS DEL CAMPUS */}
        {activeTab === 'secrets' && (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-2xl flex items-center gap-2 text-xs font-medium text-purple-900 dark:text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>Explorá el Campus Digital con el cursor o el dedo para encontrar objetos especiales y ganar estrellas adicionales.</span>
            </div>

            <div className="space-y-2">
              {CAMPUS_SECRETS.map((secret) => {
                const isFound = foundSecrets.includes(secret.id);

                return (
                  <div
                    key={secret.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                      isFound
                        ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-lg shadow-xs flex-shrink-0">
                        {isFound ? secret.icon : '❓'}
                      </div>
                      <div>
                        <span className="font-display text-xs font-bold text-slate-900 dark:text-white block">
                          {secret.name}
                        </span>
                        <p className="font-body text-[11px] text-slate-500 dark:text-slate-400">
                          {isFound ? secret.lore : secret.hint}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {isFound ? (
                        <span className="font-display text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span>+1 ⭐</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs font-body font-medium">
                          Sin hallar
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions: Diploma & Close */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onOpenCertificate}
            className={`btn-game-amber px-4 py-2.5 rounded-2xl font-display text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md ${
              isAllCompleted
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 animate-bounce-gentle'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{isAllCompleted ? 'Ver Diploma Oficial 📜' : 'Vista Previa Diploma'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="btn-game-primary bg-indigo-600 hover:bg-indigo-700 text-white font-display text-xs sm:text-sm font-bold px-5 py-2.5 rounded-2xl shadow-md cursor-pointer"
          >
            ¡Volver al Campus! 🎒
          </button>
        </div>

      </div>
    </div>
  );
};
