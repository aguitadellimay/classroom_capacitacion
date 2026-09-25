import React, { useState } from 'react';
import type { Grade } from '../../types';
import { formatGradeText } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { Clasito } from '../Clasito';
import { Users, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';

interface Level8ContentProps {
  grade: Grade;
  onNext: () => void;
}

export const Level8Content: React.FC<Level8ContentProps> = ({ grade, onNext }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const scenes = [
    {
      title: grade === 1 ? 'AYUDAR A SOLI' : 'Misión 1: Soli no entiende la actividad',
      characterSpeech:
        grade === 1
          ? 'SOLI TIENE UNA DUDA. ¿CÓMO LA AYUDAMOS?'
          : 'Mi amiga Soli está triste porque no comprende el punto 3 de ciencias. ¿Cómo la ayudamos?',
      prompt:
        grade === 1
          ? '¿CÓMO AYUDA CLASITO A SU COMPAÑERA SOLI?'
          : '¿Cuál es la mejor manera de ayudar a un compañero en Classroom?',
      options: [
        {
          text:
            grade === 1
              ? 'LE EXPLICO CON PACIENCIA PARA QUE APRENDA'
              : 'Conectarme o escribirle un comentario explicándole con un ejemplo para que pueda resolverlo sola.',
          isCorrect: true,
          feedback:
            grade === 1
              ? '¡HERMOSO! AYUDAR ES ENSEÑAR A PENSAR.'
              : '¡Brillante! Ayudar de verdad significa acompañar para que el otro aprenda, fomentando su autonomía.',
        },
        {
          text:
            grade === 1
              ? 'LE PASO MI TAREA PARA QUE LA COPIE'
              : 'Mandarle mi archivo completo para que le cambie el nombre y lo entregue copiado.',
          isCorrect: false,
          feedback:
            grade === 1
              ? '¡NO! SI COPIA, NO APRENDE.'
              : '¡Error! Copiarse impide que tu compañero aprenda y perjudica a ambos ante el docente.',
        },
      ],
    },
    {
      title: grade === 1 ? 'TRABAJO EN EQUIPO' : 'Misión 2: Proyecto grupal compartido',
      characterSpeech:
        grade === 1
          ? '¡HACEMOS UN TRABAJO JUNTOS! ¿CÓMO NOS ORGANIZAMOS?'
          : 'Estamos haciendo un trabajo grupal en un documento compartido. Tienen ideas diferentes. ¿Qué hacen?',
      prompt:
        grade === 1
          ? 'EN UN GRUPO DE TRABAJO:'
          : '¿Cómo se construye un buen trabajo en equipo digital?',
      options: [
        {
          text:
            grade === 1
              ? 'ESCUCHAMOS LAS IDEAS DE TODOS CON RESPETO'
              : 'Escuchar y respetar las propuestas de todos, dividir tareas equitativamente y dialogar con empatía.',
          isCorrect: true,
          feedback:
            grade === 1
              ? '¡SÍ! ¡EL TRABAJO EN EQUIPO ES MARAVILLOSO!'
              : '¡Exacto! El trabajo colaborativo suma lo mejor de cada persona y hace crecer a todo el grupo.',
        },
        {
          text:
            grade === 1
              ? 'BORRO LO QUE HICIERON LOS DEMÁS'
              : 'Borrar los textos de mis compañeros sin avisarles y dejar solo lo que yo quiero.',
          isCorrect: false,
          feedback:
            grade === 1
              ? '¡CUIDADO! NO BORRAMOS EL TRABAJO DE OTROS.'
              : '¡Inadecuado! Borrar el trabajo ajeno sin consenso arruina el proyecto y daña la confianza del equipo.',
        },
      ],
    },
  ];

  const handleSelect = (idx: number, isCorrect: boolean) => {
    setSelectedChoice(idx);
    if (isCorrect) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1);
      setSelectedChoice(null);
    } else {
      onNext();
    }
  };

  const current = scenes[currentScene];
  const isSelected = selectedChoice !== null;
  const isChoiceCorrect = isSelected && current.options[selectedChoice].isCorrect;

  return (
    <div className="space-y-6">
      {/* Header with Clasito and Soli */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-orange-50 border-3 border-orange-300 p-4 rounded-3xl">
        <Clasito
          mood={isChoiceCorrect ? 'celebrating' : 'motivating'}
          size="md"
          speechText={current.characterSpeech}
          grade={grade}
        />
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-600" />
            <span className="text-xs font-black uppercase text-orange-800 tracking-wider">
              Historia Cooperativa — {currentScene + 1} de {scenes.length}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-orange-950 mt-0.5">
            {formatGradeText(current.title, grade)}
          </h3>
        </div>
      </div>

      {/* Interactive Story Box */}
      <div className="bg-white border-3 border-slate-300 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="p-4 bg-orange-50/60 rounded-2xl border-2 border-orange-200 flex items-start gap-3">
          <Lightbulb className="w-7 h-7 text-amber-500 flex-shrink-0 mt-0.5" />
          <p
            className={`font-black text-slate-800 ${
              grade === 1 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}
          >
            {formatGradeText(current.prompt, grade)}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {current.options.map((opt, idx) => {
            const isThis = selectedChoice === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx, opt.isCorrect)}
                className={`p-4 sm:p-5 rounded-2xl border-3 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isThis
                    ? opt.isCorrect
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                      : 'bg-rose-50 border-rose-400 ring-2 ring-rose-200'
                    : 'bg-slate-50 hover:bg-orange-50 border-slate-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-orange-200 text-orange-900 font-black flex items-center justify-center text-sm flex-shrink-0">
                    {idx === 0 ? 'A' : 'B'}
                  </span>
                  <span
                    className={`font-bold ${
                      grade === 1 ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                    } ${
                      isThis && opt.isCorrect
                        ? 'text-emerald-900'
                        : isThis && !opt.isCorrect
                        ? 'text-rose-900'
                        : 'text-slate-800'
                    }`}
                  >
                    {formatGradeText(opt.text, grade)}
                  </span>
                </div>

                {isThis && (
                  <div>
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-pop-in" />
                    ) : (
                      <span className="text-xl animate-wiggle">❌</span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback box */}
        {isSelected && (
          <div
            className={`p-4 rounded-2xl border-2 animate-pop-in ${
              isChoiceCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                : 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
            }`}
          >
            {isChoiceCorrect ? '🎉 ' : '⚠️ '}
            {current.options[selectedChoice].feedback}
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          disabled={!isSelected}
          onClick={handleNext}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            isSelected
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>
            {currentScene < scenes.length - 1
              ? formatGradeText('SIGUIENTE HISTORIA ➡️', grade)
              : formatGradeText('IR AL MINI DESAFÍO ⭐', grade)}
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
