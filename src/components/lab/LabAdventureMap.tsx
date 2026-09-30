import React, { useState } from 'react';
import type { UserProgress } from '../../types';
import type { LabProgress } from '../../types/lab';
import type { Theme } from '../../utils/theme';
import { SCHOOL_NAME, SCHOOL_LOGO } from '../../constants/school';
import { GRADES_INFO } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { ThemeToggle } from '../ThemeToggle';
import { LabIslandMap } from './LabIslandMap';
import { LabBackpackModal } from './LabBackpackModal';
import {
  Volume2,
  VolumeX,
  Award,
  User,
  GraduationCap,
  ShieldCheck,
  CreditCard,
  Star,
} from 'lucide-react';

interface LabAdventureMapProps {
  progress: UserProgress;
  labProgress: LabProgress;
  theme: Theme;
  onToggleTheme: () => void;
  onSwitchAdventure: (adventure: 'classroom' | 'lab') => void;
  onGoToHub?: () => void;
  onSelectWorld: (worldId: number) => void;
  onOpenProfile: () => void;
  onOpenCertificate: () => void;
  onOpenGuardianCard: () => void;
  onToggleSound: () => void;
  onOpenChest?: (chestId: string, bonusStars: number) => void;
  onDiscoverSecret?: (secretId: string, bonusStars: number) => void;
}

export const LabAdventureMap: React.FC<LabAdventureMapProps> = ({
  progress,
  labProgress,
  theme,
  onToggleTheme,
  onSwitchAdventure,
  onGoToHub,
  onSelectWorld,
  onOpenProfile,
  onOpenCertificate,
  onOpenGuardianCard,
  onToggleSound,
  onOpenChest = () => {},
  onDiscoverSecret = () => {},
}) => {
  const gradeInfo = GRADES_INFO[progress.grade];
  const percentage = Math.round((labProgress.completedWorlds.length / 7) * 100);
  const isAllCompleted = labProgress.completedWorlds.includes(7);

  const [isBackpackOpen, setIsBackpackOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 via-sky-800 to-indigo-950 dark:from-slate-950 dark:via-teal-950 dark:to-slate-900 text-slate-800 dark:text-slate-100 flex flex-col relative overflow-x-hidden transition-colors duration-300">
      
      {/* Decorative ambient floating icons */}
      <div className="absolute top-20 left-6 text-white/10 text-7xl select-none animate-float pointer-events-none">🏝️</div>
      <div className="absolute top-52 right-8 text-white/10 text-8xl select-none animate-bounce-gentle pointer-events-none">⭐</div>
      <div className="absolute bottom-60 left-10 text-white/10 text-8xl select-none animate-float pointer-events-none">🤖</div>
      <div className="absolute bottom-24 right-10 text-white/10 text-7xl select-none animate-wiggle pointer-events-none">🏆</div>

      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-4 border-emerald-400 dark:border-slate-800 px-3 sm:px-6 py-2 sm:py-3 shadow-md transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: School Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-white/90 dark:bg-slate-800 p-1 sm:p-1.5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex-shrink-0">
              <img
                src={SCHOOL_LOGO}
                alt={SCHOOL_NAME}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain select-none"
              />
            </div>

            <div className="hidden lg:block leading-tight select-none">
              <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 tracking-wider block font-display">
                {SCHOOL_NAME}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display">
                Guardianes de la Sala 🖥️
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
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onSwitchAdventure('classroom');
                }}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition cursor-pointer flex items-center gap-1"
                title="Ir a Mi Aventura en Classroom"
              >
                <span>🚀</span>
                <span className="hidden sm:inline">Classroom</span>
              </button>

              <button
                type="button"
                className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-emerald-600 text-white shadow-sm flex items-center gap-1 cursor-default font-bold"
                title="Aventura Guardianes de la Sala activa"
              >
                <span>🖥️</span>
                <span className="hidden sm:inline">Guardianes</span>
              </button>
            </div>

            {/* User Avatar & Name Button */}
            <div
              onClick={onOpenProfile}
              className="hidden md:flex items-center gap-2 cursor-pointer p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Ver mi perfil de aventurero"
            >
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                {gradeInfo.avatar}
              </div>
              <div>
                <span className="font-black text-xs text-slate-900 dark:text-slate-100 leading-tight block">
                  {progress.name.toUpperCase()}
                </span>
                <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300">
                  {gradeInfo.name}
                </span>
              </div>
            </div>
          </div>

          {/* Center/Right: Gamification Stats & Backpack */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Stars pill */}
            <div
              className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-600/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl shadow-xs"
              title="Estrellas Acumuladas"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
              <span className="font-black text-xs sm:text-sm text-amber-900 dark:text-amber-200">
                {labProgress.stars}
              </span>
            </div>

            {/* Worlds pill */}
            <div
              className="hidden sm:flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-600/60 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl shadow-xs"
              title="Territorios Conquistados"
            >
              <span className="text-sm">🌳</span>
              <span className="font-black text-xs text-emerald-900 dark:text-emerald-200">
                {labProgress.completedWorlds.length}/7
              </span>
            </div>

            {/* Badges pill */}
            <div
              className="hidden sm:flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/40 border-2 border-teal-300 dark:border-teal-600/60 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl shadow-xs"
              title="Insignias de Guardián"
            >
              <Award className="w-4 h-4 text-teal-600" />
              <span className="font-black text-xs text-teal-900 dark:text-teal-200">
                {labProgress.unlockedBadges.length}/7
              </span>
            </div>

            {/* 🎒 Backpack Button */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsBackpackOpen(true);
              }}
              className="btn-game-amber bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 text-slate-950 border border-amber-500 font-black px-2.5 sm:px-3.5 py-1.5 rounded-2xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition"
              title="Abrir Mi Mochila de Guardián"
            >
              <span className="text-sm">🎒</span>
              <span className="hidden md:inline">Mochila</span>
            </button>

            {/* Guardian ID Card Button (Accessible on mobile via Mochila) */}
            <button
              type="button"
              id="lab-guardian-card-header-btn"
              onClick={onOpenGuardianCard}
              className="hidden sm:flex bg-teal-100 hover:bg-teal-200 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-200 border border-teal-300 dark:border-teal-700 font-black px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs items-center gap-1.5 cursor-pointer shadow-xs"
              title="Ver mi Carnet de Guardián Digital"
            >
              <CreditCard className="w-4 h-4 text-teal-700 dark:text-teal-300" />
              <span className="hidden md:inline">Carnet</span>
            </button>

            {/* Certificate Button (if completed) */}
            {isAllCompleted && (
              <button
                type="button"
                id="lab-certificate-header-btn"
                onClick={onOpenCertificate}
                className="btn-game-amber bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow animate-bounce-gentle"
                title="Ver Diploma de Guardián"
              >
                <GraduationCap className="w-4 h-4" />
                <span className="hidden md:inline">Diploma</span>
              </button>
            )}

            {/* Theme Toggle & Sound */}
            <ThemeToggle theme={theme} onToggle={onToggleTheme} showText={false} />

            <button
              type="button"
              onClick={onToggleSound}
              className={`p-2 rounded-2xl transition cursor-pointer border ${
                progress.soundEnabled
                  ? 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
              title={progress.soundEnabled ? 'Sonido: ACTIVADO' : 'Sonido: DESACTIVADO'}
            >
              {progress.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-800 dark:text-emerald-300" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={onOpenProfile}
              className="p-2 bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-slate-200 dark:border-slate-700 rounded-2xl transition cursor-pointer md:hidden"
              title="Mi perfil"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Island Adventure Viewport */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 sm:p-6 space-y-4">
        
        {/* Island Intro Banner */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-xl border-4 border-white/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 animate-pop-in">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>ISLA DE LOS GUARDIANES • MAPA DE AVENTURA 🏝️</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {isAllCompleted
                ? `¡FELICITACIONES, ${progress.name.toUpperCase()}! SOS UN GUARDIÁN 🏆`
                : `¡Bienvenido a la Isla, ${progress.name}!`}
            </h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
              Recorré los senderos, descubrí secretos, abrí cofres y conquistá cada territorio junto a Byte.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="text-xs font-black text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              {labProgress.completedWorlds.length} de 7 mundos ({percentage}%)
            </span>
          </div>
        </div>

        {/* 🏝️ THE VIDEO GAME ISLAND MAP */}
        <LabIslandMap
          studentName={progress.name}
          labProgress={labProgress}
          onSelectWorld={onSelectWorld}
          onOpenChest={onOpenChest}
          onDiscoverSecret={onDiscoverSecret}
        />

        {/* Completed Certificate Banner */}
        {isAllCompleted && (
          <div
            id="lab-certificate-banner-btn"
            onClick={onOpenCertificate}
            className="p-4 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 rounded-3xl flex items-center justify-between gap-3 cursor-pointer shadow-xl hover:scale-101 transition animate-pop-in border-4 border-amber-300"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl animate-bounce-gentle select-none">🏆</span>
              <div>
                <h4 className="font-black text-sm sm:text-base leading-tight">
                  ¡COMPLETASTE LA AVENTURA DE LA SALA DE INFORMÁTICA!
                </h4>
                <p className="text-xs font-bold text-amber-950">
                  Hacé clic acá para ver e imprimir tu Diploma Oficial de Guardián
                </p>
              </div>
            </div>
            <span className="font-black text-xs sm:text-sm bg-slate-950 text-white px-4 py-2 rounded-2xl flex-shrink-0 shadow">
              VER DIPLOMA 📜
            </span>
          </div>
        )}

      </main>

      {/* 🎒 Backpack Modal */}
      {isBackpackOpen && (
        <LabBackpackModal
          studentName={progress.name}
          grade={progress.grade}
          labProgress={labProgress}
          onClose={() => setIsBackpackOpen(false)}
          onOpenCertificate={onOpenCertificate}
          onOpenGuardianCard={onOpenGuardianCard}
        />
      )}

    </div>
  );
};
