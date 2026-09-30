import React from 'react';
import { Byte } from './Byte';
import { LAB_WORLDS_CONFIG } from '../../data/labData';
import { soundManager } from '../../utils/sound';
import { ArrowRight, ShieldCheck, X } from 'lucide-react';

interface LabIntroModalProps {
  studentName: string;
  onStart: () => void;
  onClose?: () => void;
}

export const LabIntroModal: React.FC<LabIntroModalProps> = ({
  studentName,
  onStart,
  onClose,
}) => {
  const handleProceed = () => {
    soundManager.playClick();
    soundManager.playByteHello();
    onStart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="max-w-2xl w-full my-auto bg-white/95 dark:bg-slate-900/95 border-4 border-emerald-400 dark:border-emerald-600 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 animate-pop-in relative">
        
        {/* Close Button if optional */}
        {onClose && (
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header with Mascot Byte */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Byte
              mood="saludo"
              size="lg"
              worldId={1}
              interactive={true}
              showClickPrompt={true}
              showSpeaker={true}
              speechText={`¡Hola, ${studentName || 'Aventurero'}! Soy Byte. ¿Listo para comenzar la misión?`}
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>NUEVO TERRITORIO • GUARDIANES DE LA SALA</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">
            🖥️ GUARDIANES DE LA SALA
          </h1>

          <p className="font-body text-sm sm:text-base font-medium text-emerald-800 dark:text-emerald-300 italic">
            “Una misión para aprender a cuidar nuestro espacio tecnológico.”
          </p>

          <p className="font-body text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
            ¡Hola, <span className="text-emerald-600 dark:text-emerald-400 font-bold">{studentName || 'Aventurero'}</span>!
            Byte será tu compañero durante todo el viaje. Juntos van a explorar los 7 territorios tecnológicos, desbloquear insignias y aprender las normas para proteger nuestra sala de informática.
          </p>
        </div>

        {/* Worlds Preview Grid */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-slate-400 tracking-wider block font-display">
            Territorios a explorar y proteger:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {LAB_WORLDS_CONFIG.map((world) => (
              <div
                key={world.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left transition hover:scale-[1.02]"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-xl flex-shrink-0">
                  {world.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-display text-xs font-bold text-slate-900 dark:text-white truncate">
                    Mundo {world.id}: {world.name}
                  </h4>
                  <p className="font-body text-[11px] font-normal text-slate-500 dark:text-slate-400 truncate">
                    {world.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={handleProceed}
            className="w-full sm:w-auto btn-game-primary bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-2xl text-base sm:text-lg inline-flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95 transition"
          >
            <span>¡ENTRAR AL MAPA CON BYTE! 🚀</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
