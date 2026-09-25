import React, { useState } from 'react';
import type { Grade } from '../../types';
import { formatGradeText } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { Clasito } from '../Clasito';
import { ShieldCheck, Key, ArrowRight, Check, X } from 'lucide-react';

interface Level2ContentProps {
  grade: Grade;
  onNext: () => void;
}

export const Level2Content: React.FC<Level2ContentProps> = ({ grade, onNext }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const scenarios = [
    {
      title: grade === 1 ? '¿QUÉ HACEMOS CON LA CONTRASEÑA?' : 'Situación 1: Tu compañero te pide la clave',
      story:
        grade === 1
          ? 'UN AMIGO TE PIDE TU CONTRASEÑA. ¿QUÉ HACÉS?'
          : 'Estás en clase y un amigo te dice: "¡Pasame tu contraseña de Classroom así veo qué tarea hay!". ¿Qué hacés?',
      options: [
        {
          text: grade === 1 ? 'NO LA COMPARTO, ES SECRETA' : 'No la comparto: mi contraseña es personal y secreta.',
          isCorrect: true,
          feedback:
            grade === 1
              ? '¡EXCELENTE! TU CONTRASEÑA ES COMO LA LLAVE DE TU CASA.'
              : '¡Correcto! Tu cuenta contiene tus trabajos escolares y tu identidad. No se comparte ni con amigos.',
        },
        {
          text: grade === 1 ? 'SE LA DIGO EN VOZ ALTA' : 'Se la paso por un papelito rápido.',
          isCorrect: false,
          feedback:
            grade === 1
              ? '¡CUIDADO! SI OTRO TIENE TU CONTRASEÑA, PUEDE BORRAR TUS TAREAS.'
              : '¡Error! Aunque sea de confianza, compartir contraseñas es peligroso y pone en riesgo tu cuenta.',
        },
      ],
    },
    {
      title: grade === 1 ? 'EN LA COMPUTADORA DE LA ESCUELA' : 'Situación 2: Computadora compartida',
      story:
        grade === 1
          ? 'TERMINÓ LA CLASE EN LA ESCUELA. ¿QUÉ HACEMOS?'
          : 'Terminaste de hacer tu tarea en una computadora compartida de la escuela. ¿Qué debés hacer antes de irte?',
      options: [
        {
          text: grade === 1 ? 'CERRAR LA SESIÓN DE MI CUENTA' : 'Cerrar la sesión de Google Classroom por completo.',
          isCorrect: true,
          feedback:
            grade === 1
              ? '¡PERFECTO! ASÍ NADIE PUEDE TOCAR TUS COSAS.'
              : '¡Impecable! Cerrar sesión asegura que el próximo alumno no acceda a tus archivos ni mensajes.',
        },
        {
          text: grade === 1 ? 'DEJAR TODO ABIERTO' : 'Dejar la sesión abierta para no tener que ingresar mañana.',
          isCorrect: false,
          feedback:
            grade === 1
              ? '¡NO! CUALQUIERA PODRÍA ENTRAR A TU CUENTA.'
              : '¡Peligroso! Alguien podría enviar comentarios inadecuados con tu nombre o borrar tus entregas.',
        },
      ],
    },
    {
      title: grade === 1 ? 'SI ALGO RARO SUCEDE...' : 'Situación 3: Mensajes extraños o dudas',
      story:
        grade === 1
          ? 'SI APARECE ALGO RARO O QUE TE ASUSTE:'
          : 'Recibís una notificación extraña o alguien desconocido te escribe pidiendo tus datos. ¿Qué hacés?',
      options: [
        {
          text:
            grade === 1
              ? 'LE AVISO A MI SEÑO O A MI FAMILIA'
              : 'Aviso de inmediato a mi maestra, docente o a un adulto de confianza.',
          isCorrect: true,
          feedback:
            grade === 1
              ? '¡SÍ! LOS ADULTOS DE CONFIANZA SIEMPRE TE AYUDAN.'
              : '¡Excelente! Los adultos están para cuidarte y proteger tu seguridad en el entorno virtual.',
        },
        {
          text: grade === 1 ? 'ME QUEDO CALLADO' : 'Intento solucionarlo solo sin decirle a nadie.',
          isCorrect: false,
          feedback:
            grade === 1
              ? '¡RECUERDA SIEMPRE PEDIR AYUDA!'
              : '¡Nunca te guardes dudas o situaciones incómodas! Compartirlo con un adulto te mantiene a salvo.',
        },
      ],
    },
  ];

  const handleSelectOption = (idx: number, isCorrect: boolean) => {
    setSelectedAnswer(idx);
    if (isCorrect) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
  };

  const handleNextScenario = () => {
    soundManager.playClick();
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
    } else {
      onNext();
    }
  };

  const current = scenarios[currentScenario];
  const isSelected = selectedAnswer !== null;
  const isAnswerCorrect = selectedAnswer !== null && current.options[selectedAnswer].isCorrect;

  return (
    <div className="space-y-6">
      {/* Header with Shield Icon */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-amber-50 border-3 border-amber-300 p-4 rounded-3xl">
        <Clasito
          mood={isAnswerCorrect ? 'celebrating' : selectedAnswer !== null ? 'wrong' : 'motivating'}
          size="md"
          speechText={
            grade === 1
              ? '¡TU CONTRASEÑA ES UN TESORO! ¡VAMOS A PROTEGERLA!'
              : 'Tu cuenta escolar es tu casita digital. ¡Aprendamos a cuidarla juntos!'
          }
          grade={grade}
        />
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
              Caso {currentScenario + 1} de {scenarios.length}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-amber-950 mt-0.5">
            {formatGradeText(current.title, grade)}
          </h3>
        </div>
      </div>

      {/* Scenario Card */}
      <div className="bg-white border-3 border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-start gap-3">
          <Key className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
          <p
            className={`font-extrabold text-slate-800 ${
              grade === 1 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}
          >
            {formatGradeText(current.story, grade)}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {current.options.map((opt, idx) => {
            const isThisSelected = selectedAnswer === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx, opt.isCorrect)}
                className={`p-4 sm:p-5 rounded-2xl border-3 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isThisSelected
                    ? opt.isCorrect
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                      : 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                    : 'bg-slate-50 hover:bg-amber-50 border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 font-black flex items-center justify-center text-sm flex-shrink-0">
                    {idx === 0 ? 'A' : 'B'}
                  </span>
                  <span
                    className={`font-bold ${
                      grade === 1 ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                    } ${
                      isThisSelected && opt.isCorrect
                        ? 'text-emerald-900'
                        : isThisSelected && !opt.isCorrect
                        ? 'text-rose-900'
                        : 'text-slate-800'
                    }`}
                  >
                    {formatGradeText(opt.text, grade)}
                  </span>
                </div>

                {isThisSelected && (
                  <div>
                    {opt.isCorrect ? (
                      <Check className="w-6 h-6 text-emerald-600 animate-pop-in" />
                    ) : (
                      <X className="w-6 h-6 text-rose-500 animate-wiggle" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation box */}
        {isSelected && (
          <div
            className={`p-4 rounded-2xl border-2 animate-pop-in ${
              isAnswerCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            <p className="font-bold text-sm sm:text-base">
              {isAnswerCorrect ? '🎉 ' : '⚠️ '}
              {current.options[selectedAnswer].feedback}
            </p>
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          disabled={!isSelected}
          onClick={handleNextScenario}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            isSelected
              ? 'bg-amber-500 hover:bg-amber-600 text-slate-900'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>
            {currentScenario < scenarios.length - 1
              ? formatGradeText('SIGUIENTE CASO ➡️', grade)
              : formatGradeText('IR AL MINI DESAFÍO ⭐', grade)}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
