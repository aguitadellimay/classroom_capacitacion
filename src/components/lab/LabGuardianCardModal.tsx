import React from 'react';
import type { Grade } from '../../types';
import type { LabProgress } from '../../types/lab';
import { SCHOOL_NAME, SCHOOL_LOGO } from '../../constants/school';
import { GRADES_INFO } from '../../utils/gradeAdapter';
import { LAB_BADGES } from '../../data/labData';
import { Byte } from './Byte';
import { soundManager } from '../../utils/sound';
import { Sparkles, X, CheckCircle2, Printer } from 'lucide-react';

interface LabGuardianCardModalProps {
  studentName: string;
  grade: Grade;
  labProgress: LabProgress;
  onClose: () => void;
}

export const LabGuardianCardModal: React.FC<LabGuardianCardModalProps> = ({
  studentName,
  grade,
  labProgress,
  onClose,
}) => {
  const gradeInfo = GRADES_INFO[grade];
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-print">
      <div className="max-w-xl w-full my-auto bg-white/95 dark:bg-slate-900/95 border-4 border-emerald-400 dark:border-emerald-600 rounded-3xl sm:rounded-4xl p-5 sm:p-7 shadow-2xl space-y-5 animate-pop-in relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">🪪</span>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                Credencial Digital de Aventurero
              </span>
              <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Carnet de Guardián de la Sala
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
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* THE GUARDIAN DIGITAL ID CARD                                  */}
        {/* ------------------------------------------------------------- */}
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 border-3 border-emerald-400/80 shadow-2xl overflow-hidden space-y-4">
          
          {/* Background cyber circuit lines */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Card Row: School Logo & Title */}
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
                <img src={SCHOOL_LOGO} alt={SCHOOL_NAME} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[9px] font-black tracking-wider uppercase text-emerald-400 block">
                  {SCHOOL_NAME}
                </span>
                <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1">
                  <span>🤖 CARNET DE GUARDIÁN</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </span>
              </div>
            </div>

            <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase font-bold">
              ID: GDN-2026-OK
            </div>
          </div>

          {/* Card Body: Byte on Left, Student Details on Right */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            
            {/* Left: Byte Companion Avatar */}
            <div className="sm:col-span-1 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30">
              <Byte
                mood="victoria"
                size="md"
                worldId={7}
                interactive={true}
                showSpeaker={false}
              />
              <span className="text-[10px] font-black uppercase text-emerald-400 mt-1">
                COMPAÑERO: BYTE
              </span>
              <span className="text-[9px] text-slate-400">
                Guardián de la Sala
              </span>
            </div>

            {/* Right: Data fields */}
            <div className="sm:col-span-2 space-y-2 text-xs">
              <div className="border-b border-slate-800 pb-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  👤 Alumno / Alumna:
                </span>
                <span className="font-display text-base sm:text-lg font-bold text-white tracking-wide">
                  {studentName.toUpperCase() || 'GUARDIÁN'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 border-b border-slate-800 pb-1.5">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    🎒 Grado:
                  </span>
                  <span className="font-body font-semibold text-slate-200">
                    {gradeInfo.name}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    🏆 Nivel:
                  </span>
                  <span className="font-body font-semibold text-amber-300">
                    Guardián de la Sala
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    🌳 Mundos Conquistados:
                  </span>
                  <span className="font-body font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{labProgress.completedWorlds.length} / 7</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">
                    📅 Fecha de Emisión:
                  </span>
                  <span className="font-body font-semibold text-slate-300">
                    {currentDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Unlocked Badges Mini Strip */}
          <div className="pt-2 border-t border-emerald-500/20">
            <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider block mb-1.5">
              🏅 Insignias de Territorio ({labProgress.unlockedBadges.length}/7):
            </span>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {LAB_BADGES.map((badge) => {
                const isUnlocked = labProgress.unlockedBadges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    title={isUnlocked ? badge.title : 'Territorio por conquistar'}
                    className={`p-1.5 rounded-xl border flex flex-col items-center ${
                      isUnlocked
                        ? 'bg-emerald-950/80 border-emerald-400/60 text-white'
                        : 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-40'
                    }`}
                  >
                    <span className="text-base sm:text-lg">{badge.icon}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center sm:text-left">
            ✨ Esta credencial certifica que aprendiste todas las normas y cuidás nuestra sala de informática.
          </p>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto btn-game-primary bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Credencial</span>
          </button>
        </div>

      </div>
    </div>
  );
};
