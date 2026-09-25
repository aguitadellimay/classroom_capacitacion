import React from 'react';
import type { UserProgress } from '../types';
import { SCHOOL_NAME, SCHOOL_LOGO } from '../constants/school';
import { GRADES_INFO } from '../utils/gradeAdapter';
import { soundManager } from '../utils/sound';
import { Clasito } from './Clasito';
import { Printer, X, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CertificateModalProps {
  progress: UserProgress;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ progress, onClose }) => {
  const gradeInfo = GRADES_INFO[progress.grade];
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto no-print">
      <div className="max-w-4xl w-full my-auto animate-pop-in space-y-4 no-print">
        
        {/* Modal Actions Bar (hidden when printing) */}
        <div className="flex items-center justify-between bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 px-5 py-3 rounded-2xl shadow-lg no-print">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
              ¡Tu Certificado Oficial de Experto/a en Classroom!
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="btn-game-primary bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 py-2 rounded-xl text-sm flex items-center gap-2 cursor-pointer shadow active:scale-95 transition"
            >
              <Printer className="w-4 h-4" />
              <span>IMPRIMIR DIPLOMA</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper Sheet (on-screen preview) */}
        <div
          id="screen-certificate-preview"
          className="bg-amber-50 text-slate-900 p-5 sm:p-8 md:p-10 rounded-3xl border-8 sm:border-12 border-amber-400 shadow-2xl relative overflow-hidden"
        >
          {/* Inner Decorative Golden Border */}
          <div className="border-3 sm:border-5 border-dashed border-amber-600/40 rounded-2xl p-4 sm:p-7 relative">
            
            {/* Corner Decorative Medals */}
            <div className="absolute top-2 left-2 text-xl sm:text-2xl select-none">⭐</div>
            <div className="absolute top-2 right-2 text-xl sm:text-2xl select-none">⭐</div>
            <div className="absolute bottom-2 left-2 text-xl sm:text-2xl select-none">⭐</div>
            <div className="absolute bottom-2 right-2 text-xl sm:text-2xl select-none">⭐</div>

            {/* Header: Institutional School Logo & Title */}
            <div className="text-center space-y-1.5">
              {/* School Logo */}
              <div className="flex flex-col items-center">
                <img
                  src={SCHOOL_LOGO}
                  alt={SCHOOL_NAME}
                  className="h-16 sm:h-20 md:h-22 w-auto object-contain select-none mb-1 filter drop-shadow-sm"
                />
                <span className="text-[11px] sm:text-xs font-black uppercase text-indigo-900 tracking-widest block">
                  {SCHOOL_NAME}
                </span>
              </div>

              {/* Honor Badge Ribbon */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-[10px] sm:text-xs uppercase tracking-widest px-3 sm:px-4 py-1 rounded-full shadow mt-1">
                <Award className="w-3.5 h-3.5" />
                <span>MI AVENTURA EN CLASSROOM • RECONOCIMIENTO DE HONOR</span>
                <Award className="w-3.5 h-3.5" />
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-indigo-950 tracking-tight uppercase pt-1">
                CERTIFICADO DE EXPERTO/A EN CLASSROOM
              </h1>

              <p className="text-[11px] sm:text-xs font-bold text-amber-900 uppercase tracking-widest">
                Educación Digital Responsable y Trabajo Colaborativo
              </p>
            </div>

            {/* Recipient Details */}
            <div className="text-center my-4 sm:my-6 space-y-2 sm:space-y-3">
              <p className="text-xs sm:text-sm font-extrabold text-slate-600 uppercase tracking-wider">
                Se otorga con orgullo y distinción a:
              </p>

              <div className="text-2xl sm:text-4xl lg:text-5xl font-black text-indigo-700 tracking-wide border-b-4 border-amber-400 inline-block px-6 sm:px-10 pb-1 sm:pb-2">
                {progress.name.toUpperCase()}
              </div>

              <p className="text-sm sm:text-lg font-black text-slate-800">
                Alumno/a de {gradeInfo.name.toUpperCase()} • {gradeInfo.badgeName.toUpperCase()}
              </p>

              <p className="text-xs sm:text-sm font-semibold text-slate-700 max-w-xl mx-auto leading-relaxed mt-2 italic px-4">
                "Por completar satisfactoriamente la aventura sobre el uso responsable de Google Classroom,
                demostrando excelencia en la entrega de tareas, cuidado de su cuenta escolar,
                respeto mutuo y ciudadanía digital."
              </p>
            </div>

            {/* Achievements row */}
            <div className="bg-white/85 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 my-3 sm:my-4 max-w-lg mx-auto flex items-center justify-around text-center shadow-sm">
              <div>
                <span className="text-xl sm:text-2xl block">⭐</span>
                <span className="font-black text-sm sm:text-base text-amber-800">10 / 10</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 block uppercase">Estrellas</span>
              </div>
              <div className="h-8 sm:h-10 w-px bg-amber-300" />
              <div>
                <span className="text-xl sm:text-2xl block">🏅</span>
                <span className="font-black text-sm sm:text-base text-amber-800">10 / 10</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 block uppercase">Insignias</span>
              </div>
              <div className="h-8 sm:h-10 w-px bg-amber-300" />
              <div>
                <span className="text-xl sm:text-2xl block">📚</span>
                <span className="font-black text-sm sm:text-base text-emerald-700">10 / 10</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 block uppercase">Niveles</span>
              </div>
              <div className="h-8 sm:h-10 w-px bg-amber-300" />
              <div>
                <span className="text-xl sm:text-2xl block">🏆</span>
                <span className="font-black text-sm sm:text-base text-indigo-700">EXPERTO</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 block uppercase">Diploma</span>
              </div>
            </div>

            {/* Official Signatures and Seals */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 sm:pt-6 mt-3 border-t-2 border-slate-200">
              {/* Seal 1: School Official Seal */}
              <div className="text-center flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 sm:border-4 border-amber-500 bg-amber-100 flex items-center justify-center text-amber-800 shadow mb-1 relative">
                  <ShieldCheck className="w-7 h-7 sm:w-9 sm:h-9 text-amber-600" />
                  <span className="absolute -bottom-1 bg-amber-600 text-white text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full">
                    OFICIAL
                  </span>
                </div>
                <div className="w-20 sm:w-32 border-b-2 border-slate-400 mt-1 mb-1" />
                <span className="text-[11px] sm:text-xs font-black text-slate-800 block leading-tight">
                  Sello Institucional
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold block">
                  Fecha: {currentDate}
                </span>
              </div>

              {/* Seal 2: Clasito Mascot Approved */}
              <div className="text-center flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 sm:border-4 border-sky-400 bg-sky-100 flex items-center justify-center mb-1 shadow relative">
                  <Clasito mood="celebrating" size="sm" showSpeaker={false} />
                  <span className="absolute -bottom-1 bg-sky-600 text-white text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full">
                    APROBADO
                  </span>
                </div>
                <div className="w-20 sm:w-32 border-b-2 border-slate-400 mt-1 mb-1" />
                <span className="text-[11px] sm:text-xs font-black text-slate-800 block leading-tight">
                  Clasito el Robot
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold block">
                  Guía de la Aventura
                </span>
              </div>

              {/* Seal 3: School Direction / Teaching Team */}
              <div className="text-center flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-3 sm:border-4 border-emerald-500 bg-emerald-100 flex items-center justify-center text-emerald-800 shadow mb-1 relative">
                  <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-600" />
                  <span className="absolute -bottom-1 bg-emerald-600 text-white text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full">
                    VALIDADO
                  </span>
                </div>
                <div className="w-20 sm:w-32 border-b-2 border-slate-400 mt-1 mb-1" />
                <span className="text-[11px] sm:text-xs font-black text-slate-800 block leading-tight">
                  Equipo Docente
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold block">
                  {SCHOOL_NAME}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
