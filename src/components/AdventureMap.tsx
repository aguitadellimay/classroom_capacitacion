import React, { useState } from 'react';
import type { UserProgress } from '../types';
import type { Theme } from '../utils/theme';
import { SCHOOL_NAME, SCHOOL_LOGO } from '../constants/school';
import { GRADES_INFO, formatGradeText } from '../utils/gradeAdapter';
import { soundManager } from '../utils/sound';
import { Clasito } from './Clasito';
import { ThemeToggle } from './ThemeToggle';
import { ClassroomCampusMap } from './ClassroomCampusMap';
import { ClassroomBackpackModal } from './ClassroomBackpackModal';
import {
  Volume2,
  VolumeX,
  Star,
  Award,
  User,
  GraduationCap,
  Backpack,
} from 'lucide-react';

interface AdventureMapProps {
  progress: UserProgress;
  theme: Theme;
  onToggleTheme: () => void;
  onSwitchAdventure?: (adventure: 'classroom' | 'lab') => void;
  onGoToHub?: () => void;
  onSelectLevel: (levelId: number) => void;
  onOpenProfile: () => void;
  onOpenCertificate: () => void;
  onToggleSound: () => void;
  onDiscoverSecret?: (secretId: string, bonusStars: number) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  progress,
  theme,
  onToggleTheme,
  onSwitchAdventure,
  onGoToHub,
  onSelectLevel,
  onOpenProfile,
  onOpenCertificate,
  onToggleSound,
  onDiscoverSecret,
}) => {
  const gradeInfo = GRADES_INFO[progress.grade];
  const percentage = Math.round((progress.completedLevels.length / 10) * 100);
  const isAllCompleted = progress.completedLevels.length >= 10;
  const [isBackpackOpen, setIsBackpackOpen] = useState(false);

  const handleDiscoverSecret = (secretId: string, bonusStars: number) => {
    if (onDiscoverSecret) {
      onDiscoverSecret(secretId, bonusStars);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-700 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex flex-col relative overflow-x-hidden transition-colors duration-300">
      
      {/* Background clouds and game elements */}
      <div className="absolute top-16 left-6 text-white/20 dark:text-white/10 text-6xl select-none animate-float pointer-events-none">☁️</div>
      <div className="absolute top-48 right-10 text-white/20 dark:text-white/10 text-7xl select-none animate-bounce-gentle pointer-events-none">⭐</div>
      <div className="absolute bottom-60 left-12 text-white/15 dark:text-white/5 text-8xl select-none animate-float pointer-events-none">🏫</div>
      <div className="absolute bottom-20 right-8 text-white/20 dark:text-white/10 text-6xl select-none animate-wiggle pointer-events-none">🚀</div>

      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-indigo-200 dark:border-slate-800 px-3 sm:px-6 py-2 sm:py-3 shadow-md transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: School Logo & Navigation */}
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
              <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider block font-display">
                {SCHOOL_NAME}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                Campus Digital de Classroom 🏫
              </span>
            </div>

            {/* Back to Hub Button */}
            {onGoToHub && (
              <button
                id="btn-return-hub"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onGoToHub();
                }}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display text-xs font-bold shadow-sm flex items-center gap-1 cursor-pointer transition active:scale-95"
                title="Volver al menú de aventuras"
              >
                <span>🌟</span>
                <span className="hidden sm:inline">Aventuras</span>
              </button>
            )}

            {/* Adventure Switcher Pills */}
            {onSwitchAdventure && (
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-600 text-white shadow-sm flex items-center gap-1 cursor-default font-bold font-display"
                  title="Campus de Classroom activo"
                >
                  <span>🏫</span>
                  <span className="hidden sm:inline">Classroom</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onSwitchAdventure('lab');
                  }}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition cursor-pointer flex items-center gap-1 font-display"
                  title="Ir a Cuidamos Nuestra Sala de Informática"
                >
                  <span>🖥️</span>
                  <span className="hidden sm:inline">Sala de Informática</span>
                </button>
              </div>
            )}

            {/* User Avatar & Name Button */}
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-2 cursor-pointer p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Ver mi perfil de estudiante"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center text-lg sm:text-xl shadow-sm flex-shrink-0">
                {gradeInfo.avatar}
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-tight font-display">
                    {progress.name ? progress.name.toUpperCase() : 'ESTUDIANTE'}
                  </span>
                  <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-display">
                    {gradeInfo.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Gamification Stats & Mochila */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Stars pill */}
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-600/60 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl cursor-pointer hover:scale-105 transition shadow-sm"
              title="Estrellas ganadas"
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500 animate-spin-slow" />
              <span className="font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-display">
                {progress.stars}
              </span>
            </div>

            {/* Badges pill */}
            <div
              onClick={() => {
                soundManager.playClick();
                setIsBackpackOpen(true);
              }}
              className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-300 dark:border-indigo-600/60 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-2xl cursor-pointer hover:scale-105 transition shadow-sm"
              title="Ver insignias en mi mochila"
            >
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 font-display">
                {progress.unlockedBadges.length}/10
              </span>
            </div>

            {/* Mochila Digital Button */}
            <button
              id="btn-classroom-backpack"
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsBackpackOpen(true);
              }}
              className="px-2.5 sm:px-3 py-1.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-display font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer transition active:scale-95"
              title="Abrir Mochila Digital (Insignias, Misiones y Secretos)"
            >
              <Backpack className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mochila</span>
            </button>

            {/* Certificate Button (if completed) */}
            {isAllCompleted && (
              <button
                type="button"
                onClick={onOpenCertificate}
                className="btn-game-amber bg-amber-500 hover:bg-amber-600 text-slate-950 font-display font-bold px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow animate-bounce-gentle"
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
      <main className="flex-1 max-w-4xl w-full mx-auto p-3 sm:p-6 space-y-5">
        
        {/* Progress Card Banner */}
        <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-xl border-4 border-white/80 dark:border-slate-800 space-y-3 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider font-display">
                Campus Digital Escolar
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight font-display">
                {formatGradeText(
                  isAllCompleted
                    ? '¡MISIÓN CUMPLIDA! SOS UN EXPERTO EN CLASSROOM 🏆'
                    : 'MAPA DEL CAMPUS DIGITAL DE CLASSROOM 🏫',
                  progress.grade
                )}
              </h2>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl font-display">
                {progress.completedLevels.length} de 10 zonas
              </span>
              <span className="font-bold text-base text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 font-display">
                {percentage}%
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-3.5 rounded-full overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 h-full rounded-full transition-all duration-700"
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
                  <h4 className="font-bold text-sm sm:text-base leading-tight font-display">
                    ¡COMPLETASTE TODO EL CAMPUS DE CLASSROOM!
                  </h4>
                  <p className="font-body text-xs font-semibold text-amber-950">
                    Hacé clic acá para ver e imprimir tu Certificado Oficial
                  </p>
                </div>
              </div>
              <span className="font-bold text-xs bg-slate-950 text-white px-3 py-1.5 rounded-xl flex-shrink-0 font-display">
                VER DIPLOMA 📜
              </span>
            </div>
          )}
        </div>

        {/* ----------------------------------------------------------- */}
        {/* THE CAMPUS DIGITAL LIVING MAP COMPONENT                     */}
        {/* ----------------------------------------------------------- */}
        <ClassroomCampusMap
          progress={progress}
          onSelectLevel={onSelectLevel}
          onOpenBackpack={() => setIsBackpackOpen(true)}
          onDiscoverSecret={handleDiscoverSecret}
          onOpenCertificate={onOpenCertificate}
        />

        {/* Bottom Mascot Guidance */}
        <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-3xl p-5 border-4 border-white/80 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left transition-colors duration-200">
          <Clasito mood="waving" size="md" grade={progress.grade} />
          <div>
            <h4 className="text-lg font-bold text-indigo-950 dark:text-indigo-200 font-display">
              {formatGradeText('¡Recordá!', progress.grade)}
            </h4>
            <p className="font-body text-sm font-medium text-slate-700 dark:text-slate-300 mt-1">
              {formatGradeText(
                'Cada zona del campus te enseña una habilidad especial para que tu experiencia en Google Classroom sea divertida, segura y responsable.',
                progress.grade
              )}
            </p>
          </div>
        </div>
      </main>

      {/* Mochila Digital Modal */}
      {isBackpackOpen && (
        <ClassroomBackpackModal
          progress={progress}
          onClose={() => setIsBackpackOpen(false)}
          onOpenCertificate={onOpenCertificate}
        />
      )}
    </div>
  );
};
