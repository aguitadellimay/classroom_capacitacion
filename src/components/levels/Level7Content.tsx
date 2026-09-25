import React, { useState } from 'react';
import type { Grade } from '../../types';
import { formatGradeText } from '../../utils/gradeAdapter';
import { soundManager } from '../../utils/sound';
import { Clasito } from '../Clasito';
import { MessageSquare, Check, X, ArrowRight, Sparkles } from 'lucide-react';

interface Level7ContentProps {
  grade: Grade;
  onNext: () => void;
}

interface SimulatedComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  isPositive: boolean;
  explanation: string;
}

export const Level7Content: React.FC<Level7ContentProps> = ({ grade, onNext }) => {
  const [evaluatedComments, setEvaluatedComments] = useState<Record<string, boolean>>({});

  const comments: SimulatedComment[] = [
    {
      id: 'c1',
      author: 'Lucas',
      avatar: '👦',
      text: '¡Hola Seño! No entiendo bien el punto 2, ¿podría explicarme por favor? Gracias.',
      isPositive: true,
      explanation:
        grade === 1
          ? '¡EXCELENTE! SALUDA CON RESPETO Y PIDE AYUDA AMABLEMENTE.'
          : '¡Comentario ejemplar! Saluda, especifica su duda y agradece con educación.',
    },
    {
      id: 'c2',
      author: 'Tobi',
      avatar: '😼',
      text: '¡Jajaja qué pregunta tonta! Eso lo sabe hasta mi hermanito de 3 años 😂',
      isPositive: false,
      explanation:
        grade === 1
          ? '¡MAL! NUNCA NOS BURLAMOS DE LAS DUDAS DE UN COMPAÑERO.'
          : '¡Inadecuado! Burlarse lastima los sentimientos de los demás y genera miedo a preguntar.',
    },
    {
      id: 'c3',
      author: 'Facu',
      avatar: '👻',
      text: 'aaaaaaaaaaaaaaaaaaaaa holiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii 🤪🤪🤪🤪🤪',
      isPositive: false,
      explanation:
        grade === 1
          ? '¡NO! NO ESCRIBIMOS MENSAJES INNECESARIOS QUE MOLESTAN.'
          : '¡Inadecuado! El spam y las cadenas de letras distraen a los compañeros y llenan el muro escolar.',
    },
    {
      id: 'c4',
      author: 'Mía',
      avatar: '👧',
      text: '¡Hola Lucas! Si querés te digo en qué video de la seño lo explican con dibujitos.',
      isPositive: true,
      explanation:
        grade === 1
          ? '¡HERMOSO! AYUDA CON CARIÑO A SU COMPAÑERO.'
          : '¡Compañerismo puro! Brinda una solución solidaria sin hacerle la tarea al otro.',
    },
  ];

  const handleEvaluate = (commentId: string, choice: boolean) => {
    soundManager.playClick();
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;

    if (choice === comment.isPositive) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }

    setEvaluatedComments({
      ...evaluatedComments,
      [commentId]: choice,
    });
  };

  const allCorrect = comments.every(
    (c) => evaluatedComments[c.id] === c.isPositive
  );

  return (
    <div className="space-y-6">
      {/* Introduction with Clasito */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-teal-50 border-3 border-teal-300 p-4 rounded-3xl">
        <Clasito
          mood={allCorrect ? 'celebrating' : 'motivating'}
          size="md"
          speechText={
            grade === 1
              ? '¡LAS PALABRAS TIENEN PODER! SIEMPRE HABLAMOS CON RESPETO Y AMOR.'
              : 'En Classroom nos comunicamos con amabilidad. ¡Aprendé la regla de las 3 preguntas antes de escribir!'
          }
          grade={grade}
        />
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-teal-950">
            {formatGradeText('Nos Comunicamos con Respeto', grade)}
          </h3>
          <p className="text-sm sm:text-base font-semibold text-teal-800 mt-1">
            {formatGradeText(
              'Detrás de cada pantalla hay una persona con sentimientos. ¡Usemos palabras que construyan!',
              grade
            )}
          </p>
        </div>
      </div>

      {/* The 3 Golden Questions Banner ("Pensá antes de publicar") */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-6 h-6 text-amber-300" />
          <h4 className="text-lg sm:text-xl font-black tracking-wide uppercase">
            💭 {formatGradeText('PENSÁ ANTES DE PUBLICAR:', grade)}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/30 text-center">
            <span className="text-2xl sm:text-3xl block mb-1">❤️</span>
            <span className="font-extrabold text-sm sm:text-base block">
              {formatGradeText('1. ¿ES RESPETUOSO?', grade)}
            </span>
            <p className="text-xs text-teal-100 mt-0.5">¿Trata con cariño y sin insultos?</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/30 text-center">
            <span className="text-2xl sm:text-3xl block mb-1">🎯</span>
            <span className="font-extrabold text-sm sm:text-base block">
              {formatGradeText('2. ¿ES NECESARIO?', grade)}
            </span>
            <p className="text-xs text-teal-100 mt-0.5">¿O es spam y letras que molestan?</p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-2xl border border-white/30 text-center">
            <span className="text-2xl sm:text-3xl block mb-1">💡</span>
            <span className="font-extrabold text-sm sm:text-base block">
              {formatGradeText('3. ¿AYUDA A APRENDER?', grade)}
            </span>
            <p className="text-xs text-teal-100 mt-0.5">¿Aporta algo bueno a la clase?</p>
          </div>
        </div>
      </div>

      {/* Interactive Comments Evaluation */}
      <div className="bg-slate-50 border-3 border-slate-300 rounded-3xl p-4 sm:p-5 space-y-4">
        <h4 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-teal-600" />
          <span>{formatGradeText('El Semáforo de Comentarios (¿Amable o Inadecuado?):', grade)}</span>
        </h4>

        <div className="space-y-3">
          {comments.map((comment) => {
            const userChoice = evaluatedComments[comment.id];
            const isEvaluated = userChoice !== undefined;
            const isUserRight = isEvaluated && userChoice === comment.isPositive;

            return (
              <div
                key={comment.id}
                className={`p-4 rounded-2xl border-3 transition-all ${
                  isEvaluated
                    ? isUserRight
                      ? 'bg-white border-emerald-400 shadow-sm'
                      : 'bg-rose-50 border-rose-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl flex-shrink-0">{comment.avatar}</span>
                    <div>
                      <span className="font-black text-xs text-slate-500 uppercase tracking-wider block">
                        {comment.author} escribió:
                      </span>
                      <p className="font-bold text-slate-800 text-sm sm:text-base mt-0.5">
                        "{comment.text}"
                      </p>
                    </div>
                  </div>

                  {/* Buttons: Amable vs Inadecuado */}
                  <div className="flex gap-2 self-end sm:self-center flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEvaluate(comment.id, true)}
                      className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition cursor-pointer ${
                        userChoice === true
                          ? comment.isPositive
                            ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-300'
                            : 'bg-rose-500 text-white'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>{formatGradeText('AMABLE Y ÚTIL', grade)}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEvaluate(comment.id, false)}
                      className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition cursor-pointer ${
                        userChoice === false
                          ? !comment.isPositive
                            ? 'bg-emerald-600 text-white shadow ring-2 ring-emerald-300'
                            : 'bg-rose-500 text-white'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-300'
                      }`}
                    >
                      <X className="w-4 h-4" />
                      <span>{formatGradeText('INADECUADO', grade)}</span>
                    </button>
                  </div>
                </div>

                {/* Explanation feedback */}
                {isEvaluated && (
                  <div className="mt-3 pt-2 border-t border-slate-100 text-xs sm:text-sm font-bold text-slate-700 animate-pop-in flex items-center gap-2">
                    <span>{isUserRight ? '✅' : '⚠️'}</span>
                    <span>{comment.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={() => {
            soundManager.playSuccess();
            onNext();
          }}
          className={`btn-game-primary font-black px-6 py-4 rounded-2xl text-base sm:text-lg flex items-center gap-2 cursor-pointer ${
            allCorrect
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse'
              : 'bg-teal-600 hover:bg-teal-700 text-white'
          }`}
        >
          <span>{formatGradeText(allCorrect ? '¡CONTINUAR AL DESAFÍO! ⭐' : 'IR AL MINI DESAFÍO', grade)}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
