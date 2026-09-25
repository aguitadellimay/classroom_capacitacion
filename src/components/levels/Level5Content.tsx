import React, { useState } from 'react';
import type { Grade } from '../../types';
import { formatGradeText } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { Clasito } from '../Clasito';
import {
  FileUp,
  Plus,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Level5ContentProps {
  grade: Grade;
  onNext: () => void;
}

export const Level5Content: React.FC<Level5ContentProps> = ({ grade, onNext }) => {
  const [fileAttached, setFileAttached] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sampleFiles = [
    { name: 'mi_dibujo_perrito.png', icon: '🐶', label: 'Dibujo de Perrito' },
    { name: 'mi_dibujo_gatito.png', icon: '🐱', label: 'Dibujo de Gatito' },
    { name: 'mi_dibujo_delfin.png', icon: '🐬', label: 'Dibujo de Delfín' },
  ];

  const handleAttachFile = (fileName: string) => {
    soundManager.playClick();
    setIsUploading(true);
    setTimeout(() => {
      setFileAttached(fileName);
      setIsUploading(false);
      soundManager.playSuccess();
    }, 700);
  };

  const handleOpenSubmitModal = () => {
    soundManager.playClick();
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    soundManager.playLevelComplete();
    setShowConfirmModal(false);
    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction with Clasito */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-rose-50 border-3 border-rose-300 p-4 rounded-3xl">
        <Clasito
          mood={isSubmitted ? 'celebrating' : fileAttached ? 'motivating' : 'thinking'}
          size="md"
          speechText={
            isSubmitted
              ? '¡GENIAL! ¡TAREA ENTREGADA A TIEMPO! ¡ERES UN EXPERTO!'
              : fileAttached
              ? '¡MUY BIEN! EL ARCHIVO ESTÁ LISTO. ¡AHORA TOCA "ENTREGAR"!'
              : grade === 1
              ? '¡SUBAMOS LA TAREA! ELEGÍ TU DIBUJO Y TOCÁ ENTREGAR.'
              : 'Vamos a practicar: adjuntá tu archivo escolar y presioná el botón Entregar.'
          }
          grade={grade}
        />
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-rose-950">
            {formatGradeText('Simulador de Entrega de Tareas', grade)}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-rose-800 mt-1">
            {formatGradeText(
              'Practicá los pasos reales para entregar tus deberes en Google Classroom:',
              grade
            )}
          </p>
        </div>
      </div>

      {/* Simulated Classroom Assignment Screen */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-4 sm:p-6 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Assignment Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-start gap-3 border-b pb-4 border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl flex-shrink-0">
                📄
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Ciencias Naturales • 100 puntos
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {formatGradeText('Tarea: Mi animal favorito', grade)}
                </h4>
                <span className="inline-block mt-1 text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                  ⏰ Fecha límite: Viernes, 18:00 hs
                </span>
              </div>
            </div>

            {/* Assignment instructions */}
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 text-slate-800 space-y-2">
              <span className="font-extrabold text-sm text-slate-700 block">
                {formatGradeText('Consigna de la maestra:', grade)}
              </span>
              <p
                className={`font-semibold ${
                  grade === 1 ? 'text-base font-bold' : 'text-sm'
                }`}
              >
                {formatGradeText(
                  '1. Dibuja tu animal favorito. 2. Adjunta la foto o dibujo aquí. 3. Presiona el botón ENTREGAR.',
                  grade
                )}
              </p>
            </div>

            {/* File selection drawer for student */}
            {!fileAttached && !isSubmitted && (
              <div className="p-4 bg-sky-50 border-2 border-dashed border-sky-300 rounded-2xl space-y-3">
                <span className="text-xs sm:text-sm font-bold text-sky-900 block">
                  📁 {formatGradeText('Elegí un dibujo para adjuntar a la tarea:', grade)}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {sampleFiles.map((file) => (
                    <button
                      key={file.name}
                      type="button"
                      onClick={() => handleAttachFile(file.name)}
                      className="p-3 bg-white hover:bg-sky-100 border-2 border-sky-200 rounded-xl flex items-center gap-2 cursor-pointer transition shadow-sm hover:scale-102"
                    >
                      <span className="text-2xl">{file.icon}</span>
                      <span className="font-bold text-xs text-slate-800 truncate">
                        {formatGradeText(file.label, grade)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: "Tu trabajo" Card */}
          <div className="bg-slate-50 border-3 border-slate-300 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-black text-slate-800 text-base sm:text-lg">
                  {formatGradeText('Tu trabajo', grade)}
                </h5>
                <span
                  className={`text-xs font-black uppercase px-2.5 py-1 rounded-full ${
                    isSubmitted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {isSubmitted ? '✅ Entregada' : 'Asignada'}
                </span>
              </div>

              {/* Uploading progress indicator */}
              {isUploading && (
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-2">
                  <div className="text-xs font-bold text-slate-600 animate-pulse">
                    Subiendo archivo a Classroom...
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
              )}

              {/* Attached file card */}
              {fileAttached && !isUploading && (
                <div className="p-3 bg-white border-2 border-emerald-400 rounded-xl flex items-center justify-between gap-2 shadow-sm animate-pop-in">
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-xs text-slate-800 truncate">
                      {fileAttached}
                    </span>
                  </div>
                  {!isSubmitted && (
                    <button
                      type="button"
                      onClick={() => setFileAttached(null)}
                      title="Quitar archivo"
                      className="text-xs text-rose-500 hover:text-rose-700 font-bold px-1.5 py-0.5 rounded cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}

              {/* Add file button if nothing attached */}
              {!fileAttached && !isUploading && (
                <button
                  type="button"
                  onClick={() => handleAttachFile('mi_dibujo_perrito.png')}
                  className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-rose-600 border-2 border-dashed border-rose-300 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>{formatGradeText('+ AGREGAR O CREAR', grade)}</span>
                </button>
              )}
            </div>

            {/* Deliver / Turn In Button */}
            <div>
              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={!fileAttached || isUploading}
                  onClick={handleOpenSubmitModal}
                  className={`w-full py-3.5 px-4 rounded-xl font-black text-base flex items-center justify-center gap-2 transition cursor-pointer ${
                    fileAttached && !isUploading
                      ? 'btn-game-primary bg-rose-600 hover:bg-rose-700 text-white shadow-lg animate-pulse'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <FileUp className="w-5 h-5" />
                  <span>{formatGradeText('ENTREGAR', grade)}</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-100 border-2 border-emerald-400 rounded-xl text-center text-emerald-900 font-black text-sm animate-pop-in">
                  🎉 {formatGradeText('¡TAREA ENTREGADA!', grade)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-4 border-rose-400 shadow-2xl animate-pop-in space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl">
              📤
            </div>
            <h4 className="text-xl font-black text-slate-900">
              {formatGradeText('¿Deseas entregar la tarea?', grade)}
            </h4>
            <p className="text-sm font-semibold text-slate-600">
              {formatGradeText(
                'Se enviará 1 archivo adjunto para "Mi animal favorito". ¿Revisaste que esté todo listo?',
                grade
              )}
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="flex-1 py-3 btn-game-green bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer"
              >
                {formatGradeText('SÍ, ENTREGAR', grade)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Button to proceed */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            isSubmitted
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
              : 'bg-rose-600 hover:bg-rose-700 text-white'
          }`}
        >
          <span>{formatGradeText(isSubmitted ? '¡CONTINUAR AL DESAFÍO! ⭐' : 'IR AL MINI DESAFÍO', grade)}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
