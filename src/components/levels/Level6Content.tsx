import React, { useState } from 'react';
import type { Grade } from '../../types';
import { formatGradeText } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { Clasito } from '../Clasito';
import { Calendar, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface Level6ContentProps {
  grade: Grade;
  onNext: () => void;
}

export const Level6Content: React.FC<Level6ContentProps> = ({ grade, onNext }) => {
  const [selectedTaskOrder, setSelectedTaskOrder] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const days = [
    { name: 'Lunes', task: null, status: 'past' },
    { name: 'Martes', current: true, task: '📍 ¡HOY ES MARTES!' },
    { name: 'Miércoles', task: '📘 Cuento de Lengua (¡Vence mañana!)', urgent: true },
    { name: 'Jueves', task: '📐 Matemáticas (Vence en 2 días)' },
    { name: 'Viernes', task: '🔬 Ciencias (Vence en 3 días)' },
  ];

  const options = [
    {
      id: 'opt1',
      title: 'Hacer hoy el Cuento de Lengua (vence el Miércoles)',
      isCorrect: true,
      reason:
        grade === 1
          ? '¡EXCELENTE! HACEMOS PRIMERO LO QUE VENCE MAÑANA.'
          : '¡Brillante! Priorizar lo que vence más pronto te asegura entregar a tiempo y sin nervios.',
    },
    {
      id: 'opt2',
      title: 'No hacer nada hoy y esperar al viernes a la noche',
      isCorrect: false,
      reason:
        grade === 1
          ? '¡CUIDADO! SI DEJÁS TODO PARA EL FINAL, NO LLEGÁS.'
          : '¡Mala idea! Si dejás todo para el final, se te acumulan 3 tareas, podés quedarte sin internet o cometer errores por apuro.',
    },
    {
      id: 'opt3',
      title: 'Hacer solo lo que vence el viernes y olvidarte de lo del miércoles',
      isCorrect: false,
      reason:
        grade === 1
          ? '¡UPS! LA TAREA DEL MIÉRCOLES QUEDARÍA TARDÍA.'
          : '¡Atención! La tarea del miércoles vencería primero y quedaría como "Entrega tardía".',
    },
  ];

  const handleSelectOption = (opt: (typeof options)[0]) => {
    setSelectedTaskOrder(opt.id);
    if (opt.isCorrect) {
      soundManager.playSuccess();
      setIsSuccess(true);
      setFeedback(opt.reason);
    } else {
      soundManager.playError();
      setIsSuccess(false);
      setFeedback(opt.reason);
    }
  };

  return (
    <div className="space-y-6">
      {/* Introduction with Clasito */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-cyan-50 border-3 border-cyan-300 p-4 rounded-3xl">
        <Clasito
          mood={isSuccess ? 'celebrating' : 'thinking'}
          size="md"
          speechText={
            grade === 1
              ? '¡MIRÁ EL CALENDARIO! NO DEJES LAS TAREAS PARA ÚLTIMO MOMENTO.'
              : 'Ser responsable es organizar tu tiempo. ¡Mirá el calendario de la semana y decidí qué hacer!'
          }
          grade={grade}
        />
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-cyan-950">
            {formatGradeText('El Calendario Semanal de Responsabilidad', grade)}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-cyan-800 mt-1">
            {formatGradeText(
              'Hoy es martes por la tarde. ¿Cómo organizás tus tareas escolares?',
              grade
            )}
          </p>
        </div>
      </div>

      {/* Simulated Weekly Calendar UI */}
      <div className="bg-white border-3 border-slate-300 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-cyan-800 font-extrabold text-sm sm:text-base">
          <Calendar className="w-5 h-5 text-cyan-600" />
          <span>{formatGradeText('Semana Escolar en Classroom:', grade)}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {days.map((d, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl border-2 flex flex-col justify-between min-h-[100px] ${
                d.current
                  ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300'
                  : d.urgent
                  ? 'bg-rose-50 border-rose-300'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-black uppercase tracking-wider block ${
                    d.current ? 'text-amber-900' : 'text-slate-600'
                  }`}
                >
                  {d.name}
                </span>
                {d.current && (
                  <span className="text-[11px] font-black text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded mt-1 inline-block">
                    {d.task}
                  </span>
                )}
              </div>

              {d.task && !d.current && (
                <div
                  className={`text-xs font-extrabold p-1.5 rounded-lg mt-2 ${
                    d.urgent
                      ? 'bg-rose-200 text-rose-900 animate-pulse'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {d.task}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decision Question */}
      <div className="space-y-3">
        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
          {formatGradeText('¿Qué conviene hacer hoy martes?', grade)}
        </h4>

        <div className="grid grid-cols-1 gap-3">
          {options.map((opt) => {
            const isSelected = selectedTaskOrder === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className={`p-4 sm:p-5 rounded-2xl border-3 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? opt.isCorrect
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                      : 'bg-rose-50 border-rose-400 shadow-sm'
                    : 'bg-white hover:bg-cyan-50 border-slate-200 hover:border-cyan-300'
                }`}
              >
                <span
                  className={`font-bold ${
                    grade === 1 ? 'text-base' : 'text-sm sm:text-base'
                  } ${
                    isSelected && opt.isCorrect
                      ? 'text-emerald-900'
                      : isSelected && !opt.isCorrect
                      ? 'text-rose-900'
                      : 'text-slate-800'
                  }`}
                >
                  {formatGradeText(opt.title, grade)}
                </span>

                {isSelected && (
                  <div>
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-pop-in" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-rose-500 animate-wiggle" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border-2 font-bold text-sm sm:text-base animate-pop-in ${
            isSuccess
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          {isSuccess ? '🎉 ' : '⚠️ '} {feedback}
        </div>
      )}

      {/* Bottom Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            isSuccess
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
              : 'bg-cyan-600 hover:bg-cyan-700 text-white'
          }`}
        >
          <span>{formatGradeText(isSuccess ? '¡CONTINUAR AL DESAFÍO! ⭐' : 'IR AL MINI DESAFÍO', grade)}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
