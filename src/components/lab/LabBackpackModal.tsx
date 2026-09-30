import React, { useState } from 'react';
import type { LabProgress, LabBadge } from '../../types/lab';
import type { Grade } from '../../types';
import { LAB_BADGES, LAB_TREASURE_CHESTS, LAB_MAP_SECRETS } from '../../data/labData';
import { GRADES_INFO } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import {
  X,
  Award,
  Gift,
  CreditCard,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';

interface LabBackpackModalProps {
  studentName: string;
  grade: Grade;
  labProgress: LabProgress;
  onClose: () => void;
  onOpenCertificate: () => void;
  onOpenGuardianCard: () => void;
}

export const LabBackpackModal: React.FC<LabBackpackModalProps> = ({
  studentName,
  grade,
  labProgress,
  onClose,
  onOpenCertificate,
  onOpenGuardianCard,
}) => {
  const gradeInfo = GRADES_INFO[grade];
  const [selectedBadge, setSelectedBadge] = useState<LabBadge | null>(null);

  const completedWorldsCount = labProgress.completedWorlds.length;
  const unlockedBadgesCount = labProgress.unlockedBadges.length;
  const openedChestsCount = (labProgress.openedChests || []).length;
  const foundSecretsCount = (labProgress.foundSecrets || []).length;
  const isFinalCompleted = labProgress.completedWorlds.includes(7);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print">
      <div className="relative max-w-2xl w-full my-auto bg-white/95 dark:bg-slate-900/95 border-4 border-amber-400 dark:border-amber-500 rounded-3xl sm:rounded-4xl p-5 sm:p-7 shadow-2xl space-y-5 animate-pop-in">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-400 text-slate-950 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
              🎒
            </div>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider block">
                Colección de Aventurero
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                Mi Mochila de Guardián
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
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 dark:from-slate-800 dark:via-emerald-950/30 dark:to-slate-800 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-sm flex-shrink-0">
              {gradeInfo.avatar}
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">
                Guardián de la Sala
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase">
                {studentName}
              </h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {gradeInfo.name} • Escuela Agüita del Limay
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 w-full sm:w-auto">
            <div className="bg-white dark:bg-slate-700/80 px-2.5 py-1.5 rounded-xl border border-amber-300 text-center">
              <span className="text-xs">⭐</span>
              <span className="block font-black text-xs text-amber-700 dark:text-amber-300">
                {labProgress.stars}
              </span>
              <span className="text-[9px] font-bold text-slate-400">Estrellas</span>
            </div>
            <div className="bg-white dark:bg-slate-700/80 px-2.5 py-1.5 rounded-xl border border-emerald-300 text-center">
              <span className="text-xs">🌳</span>
              <span className="block font-black text-xs text-emerald-700 dark:text-emerald-300">
                {completedWorldsCount}/7
              </span>
              <span className="text-[9px] font-bold text-slate-400">Mundos</span>
            </div>
            <div className="bg-white dark:bg-slate-700/80 px-2.5 py-1.5 rounded-xl border border-teal-300 text-center">
              <span className="text-xs">🏅</span>
              <span className="block font-black text-xs text-teal-700 dark:text-teal-300">
                {unlockedBadgesCount}/7
              </span>
              <span className="text-[9px] font-bold text-slate-400">Insignias</span>
            </div>
            <div className="bg-white dark:bg-slate-700/80 px-2.5 py-1.5 rounded-xl border border-purple-300 text-center">
              <span className="text-xs">💎</span>
              <span className="block font-black text-xs text-purple-700 dark:text-purple-300">
                {openedChestsCount + foundSecretsCount}
              </span>
              <span className="text-[9px] font-bold text-slate-400">Secretos</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: BADGES GALLERY */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs sm:text-sm font-black uppercase text-slate-800 dark:text-slate-200 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Galería de Insignias Oficiales</span>
            </h4>
            <span className="text-xs font-bold text-slate-500">
              {unlockedBadgesCount} de 7 desbloqueadas
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {LAB_BADGES.map((badge) => {
              const isUnlocked = labProgress.unlockedBadges.includes(badge.id);
              const isSelected = selectedBadge?.id === badge.id;

              return (
                <button
                  key={badge.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedBadge(badge);
                  }}
                  className={`p-3 rounded-2xl border-2 text-left transition cursor-pointer select-none flex flex-col items-center text-center space-y-1 ${
                    isUnlocked
                      ? isSelected
                        ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-500 shadow-md scale-102'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                      : 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-1 relative">
                    {isUnlocked ? badge.icon : '🔒'}
                    {isUnlocked && (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white leading-tight line-clamp-1">
                    {badge.title}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    {badge.worldId === 7 ? 'Mundo Final' : `Mundo ${badge.worldId}`}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Badge Explanation Banner */}
          {selectedBadge && (
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700 rounded-2xl flex items-center gap-3 animate-pop-in">
              <span className="text-4xl animate-bounce-gentle select-none flex-shrink-0">
                {selectedBadge.icon}
              </span>
              <div className="text-left flex-1">
                <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-wider block">
                  {labProgress.unlockedBadges.includes(selectedBadge.id)
                    ? 'Insignia Conquistada ✓'
                    : 'Insignia por desbloquear 🔒'}
                </span>
                <h5 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                  {selectedBadge.title}
                </h5>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                  {selectedBadge.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: DISCOVERIES & CHESTS */}
        <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs sm:text-sm font-black uppercase text-slate-800 dark:text-slate-200 tracking-wider flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-emerald-500" />
            <span>Tesoros y Secretos de la Isla</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Chests progress */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between font-black">
                <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                  <span>🎁</span>
                  <span>Cofres del Tesoro</span>
                </span>
                <span>{openedChestsCount} / {LAB_TREASURE_CHESTS.length}</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500">
                Se habilitan explorando la isla tras completar determinados mundos.
              </p>
            </div>

            {/* Secrets progress */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between font-black">
                <span className="flex items-center gap-1.5 text-cyan-700 dark:text-cyan-400">
                  <span>🔍</span>
                  <span>Secretos Ocultos</span>
                </span>
                <span>{foundSecretsCount} / {LAB_MAP_SECRETS.length}</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500">
                Detalles escondidos en la costa, colinas y tocando a Byte repetidamente.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: QUICK ACTIONS: CREDENTIALS */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenGuardianCard();
              }}
              className="btn-game-primary bg-teal-600 hover:bg-teal-700 text-white font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow flex-1 sm:flex-initial"
            >
              <CreditCard className="w-4 h-4" />
              <span>Ver mi Carnet 🪪</span>
            </button>

            {isFinalCompleted && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenCertificate();
                }}
                className="btn-game-amber bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow animate-bounce-gentle flex-1 sm:flex-initial"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Diploma Oficial 📜</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs cursor-pointer transition"
          >
            Volver a la Isla 🏝️
          </button>
        </div>

      </div>
    </div>
  );
};
