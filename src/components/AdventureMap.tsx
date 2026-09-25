import React from 'react';
import type { UserProgress } from '../types';
import type { Theme } from '../utils/theme';
import { SCHOOL_NAME, SCHOOL_LOGO } from '../constants/school';
import { LEVELS_CONFIG } from '../data/levelsData';
import { GRADES_INFO, formatGradeText } from '../utils/gradeAdapter';
import { soundManager } from '../utils/sound';
import { Clasito } from './Clasito';
import { ThemeToggle } from './ThemeToggle';
import {
  Volume2,
  VolumeX,
  Star,
  Award,
  Lock,
  User,
  GraduationCap,
} from 'lucide-react';

interface AdventureMapProps {
  progress: UserProgress;
  theme: Theme;
  onToggleTheme: () => void;
  onSelectLevel: (levelId: number) => void;
  onOpenProfile: () => void;
  onOpenCertificate: () => void;
  onToggleSound: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  progress,
  theme,
  onToggleTheme,
  onSelectLevel,
  onOpenProfile,
  onOpenCertificate,
  onToggleSound,
}) => {
  const gradeInfo = GRADES_INFO[progress.grade];
  const percentage = Math.round((progress.completedLevels.length / 10) * 100);
  const isAllCompleted = progress.completedLevels.length >= 10;

  const handleLevelClick = (levelId: number, isUnlocked: boolean) => {
    if (!isUnlocked) {
      soundManager.playError();
      return;
    }
    soundManager.playClick();
    onSelectLevel(levelId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-700 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex flex-col relative overflow-x-hidden transition-colors duration-300">
      
      {/* Background clouds and game elements */}
      <div className="absolute top-16 left-6 text-white/20 dark:text-white/10 text-6xl select-none animate-float pointer-events-none">☁️</div>
      <div className="absolute top-48 right-10 text-white/20 dark:text-white/10 text-7xl select-none animate-bounce-gentle pointer-events-none">⭐</div>
      <div className="absolute bottom-60 left-12 text-white/15 dark:text-white/5 text-8xl select-none animate-float pointer-events-none">🏰</div>
      <div className="absolute bottom-20 right-8 text-white/20 dark:text-white/10 text-6xl select-none animate-wiggle pointer-events-none">🚀</div>

      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-indigo-200 dark:border-slate-800 px-3 sm:px-6 py-2.5 sm:py-3 shadow-md transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: School Logo & User Avatar/Name */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* School Logo */}
            <div className="bg-white/90 dark:bg-slate-800 p-1 sm:p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex-shrink-0">
              <img
                src={SCHOOL_LOGO}
                alt={SCHOOL_NAME}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain select-none"
              />
            </div>

            {/* School and App title on larger screens */}
            <div className="hidden lg:block leading-tight select-none">
              <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider block">
                {SCHOOL_NAME}
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                Mi Aventura en Classroom
              </span>
            </div>

            {/* User Avatar & Name Button */}
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-2 cursor-pointer p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Ver mi perfil de aventurero"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-lg sm:text-xl shadow-sm flex-shrink-0">
                {gradeInfo.avatar}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-tight">
                    {progress.name.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-black bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                    {gradeInfo.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Gamification Stats */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Stars pill */}
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-600/60 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl cursor-pointer hover:scale-105 transition shadow-sm"
              title="Estrellas ganadas"
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500 animate-spin-slow" />
              <span className="font-black text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                {progress.stars}
              </span>
            </div>

            {/* Badges pill */}
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-300 dark:border-indigo-600/60 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl cursor-pointer hover:scale-105 transition shadow-sm"
              title="Insignias desbloqueadas"
            >
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-black text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
                {progress.unlockedBadges.length}/10
              </span>
            </div>

            {/* Certificate Button (if completed) */}
            {isAllCompleted && (
              <button
                type="button"
                onClick={onOpenCertificate}
                className="btn-game-amber bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow animate-bounce-gentle"
                title="Ver Certificado Oficial"
              >
                <GraduationCap className="w-4 h-4" />
                <span className="hidden md:inline">Certificado</span>
              </button>
            )}
          </div>

          {/* Right Controls: Theme Toggle, Sound Toggle and Profile */}
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} showText={false} />

            <button
              type="button"
              onClick={onToggleSound}
              className={`p-2 sm:p-2.5 rounded-2xl transition cursor-pointer border ${
                progress.soundEnabled
                  ? 'bg-sky-100 hover:bg-sky-200 dark:bg-sky-950/60 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-800'
                  : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
              title={progress.soundEnabled ? 'Sonido activado' : 'Sonido silenciado'}
            >
              {progress.soundEnabled ? (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            <button
              type="button"
              onClick={onOpenProfile}
              className="p-2 sm:p-2.5 bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 rounded-2xl transition cursor-pointer"
              title="Mi perfil y progreso"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Progress Card Banner */}
        <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-xl border-4 border-white/80 dark:border-slate-800 space-y-3 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                Tu Recorrido de Aventuras
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                {formatGradeText(
                  isAllCompleted
                    ? '¡MISIÓN CUMPLIDA! SOS UN EXPERTO EN CLASSROOM 🏆'
                    : 'MAPA DE AVENTURA EN CLASSROOM 🚀',
                  progress.grade
                )}
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">
                {progress.completedLevels.length} de 10 niveles
              </span>
              <span className="font-black text-base text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800">
                {percentage}%
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 h-3.5 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Completed Certificate Callout */}
          {isAllCompleted && (
            <div
              onClick={onOpenCertificate}
              className="p-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 rounded-2xl flex items-center justify-between gap-3 cursor-pointer shadow-md hover:scale-101 transition animate-pop-in"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">🎓</span>
                <div>
                  <h4 className="font-black text-sm sm:text-base leading-tight">
                    ¡COMPLETASTE LA AVENTURA DE CLASSROOM!
                  </h4>
                  <p className="text-xs font-bold text-amber-950">
                    Hacé clic acá para ver e imprimir tu Certificado Oficial
                  </p>
                </div>
              </div>
              <span className="font-black text-xs bg-slate-950 text-white px-3 py-1.5 rounded-xl flex-shrink-0">
                VER DIPLOMA 📜
              </span>
            </div>
          )}
        </div>

        {/* Winding Video Game Map Stations */}
        <div className="relative py-6 sm:py-10 space-y-12 sm:space-y-16">
          
          {/* Connector Path Indicator */}
          <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-4 bg-white/20 rounded-full border-2 border-white/40 border-dashed pointer-events-none hidden sm:block" />

          {LEVELS_CONFIG.map((level, idx) => {
            const isCompleted = progress.completedLevels.includes(level.id);
            // Level is unlocked if it's Level 1 OR the previous level is completed
            const isUnlocked = level.id === 1 || progress.completedLevels.includes(level.id - 1);
            const isCurrent = isUnlocked && !isCompleted;
            const isClasitoHere = isCurrent || (isAllCompleted && level.id === 10);

            // Zigzag alignment for winding adventure feel
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={level.id}
                className={`relative flex items-center ${
                  isLeft ? 'justify-start sm:justify-start' : 'justify-end sm:justify-end'
                }`}
              >
                {/* Station Node Card */}
                <div
                  className={`w-full sm:w-[48%] relative transition-all duration-300 ${
                    isLeft ? 'sm:mr-auto' : 'sm:ml-auto'
                  }`}
                >
                  {/* Floating Clasito Robot if this is the active station */}
                  {isClasitoHere && (
                    <div
                      className={`absolute -top-14 sm:-top-16 ${
                        isLeft ? 'right-2 sm:right-6' : 'left-2 sm:left-6'
                      } z-20 animate-bounce-gentle`}
                    >
                      <Clasito
                        mood={isCompleted ? 'celebrating' : 'motivating'}
                        size="md"
                        speechText={
                          isCompleted
                            ? '¡Nivel superado con éxito!'
                            : `¡Estás aquí! ¡Vamos a jugar al Nivel ${level.id}!`
                        }
                        grade={progress.grade}
                      />
                    </div>
                  )}

                    <div
                    onClick={() => handleLevelClick(level.id, isUnlocked)}
                    className={`rounded-3xl p-4 sm:p-5 border-4 transition-all relative overflow-hidden ${
                      isUnlocked
                        ? 'cursor-pointer hover:scale-103 shadow-xl'
                        : 'cursor-not-allowed opacity-60'
                    } ${
                      isCompleted
                        ? 'bg-white dark:bg-slate-800 border-emerald-400 dark:border-emerald-500 ring-4 ring-emerald-200/50 dark:ring-emerald-950'
                        : isCurrent
                        ? 'bg-white dark:bg-slate-800 border-amber-400 dark:border-amber-400 ring-6 ring-amber-300/70 dark:ring-amber-500/40 animate-pulse-glow'
                        : 'bg-slate-100 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {/* Status Top Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                            : isCurrent
                            ? 'bg-amber-400 text-slate-950 animate-bounce'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {isCompleted
                          ? '✅ SUPERADO'
                          : isCurrent
                          ? '⭐ ¡JUGAR AHORA!'
                          : '🔒 BLOQUEADO'}
                      </span>

                      {/* Star or Lock icon */}
                      {isCompleted ? (
                        <div className="flex items-center gap-1 text-amber-500 font-black text-sm">
                          <Star className="w-5 h-5 fill-amber-400" />
                          <span>+1 ⭐</span>
                        </div>
                      ) : !isUnlocked ? (
                        <Lock className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                      ) : null}
                    </div>

                    {/* Level Icon and Title */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-md flex-shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? `${level.color.bg} text-white`
                            : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {level.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] sm:text-xs font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
                          Nivel {level.id}
                        </span>
                        <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-xl leading-tight truncate">
                          {formatGradeText(level.shortTitle, progress.grade)}
                        </h3>
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {level.badgeId}
                        </p>
                      </div>
                    </div>

                    {/* Action prompt footer */}
                    {isUnlocked && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-extrabold">
                        <span className={isCompleted ? 'text-emerald-700 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}>
                          {isCompleted ? 'Volver a repasar' : 'Toca para comenzar'}
                        </span>
                        <span className="text-lg">➡️</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Mascot Guidance */}
        <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 border-4 border-white/80 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left transition-colors duration-200">
          <Clasito mood="waving" size="md" grade={progress.grade} />
          <div>
            <h4 className="text-lg font-black text-indigo-950 dark:text-indigo-200">
              {formatGradeText('¡Recordá!', progress.grade)}
            </h4>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-1">
              {formatGradeText(
                'Cada nivel te enseña una habilidad especial para que tu experiencia en Google Classroom sea divertida, segura y responsable.',
                progress.grade
              )}
            </p>
          </div>
        </div>
      </main>

    </div>
  );
};
