import React, { useState, useEffect } from 'react';
import { FINAL_LAB_EXAM_QUESTIONS } from '../../data/labData';
import { Byte } from './Byte';
import { ByteMicroscenePlayer } from './ByteMicroscenePlayer';
import { ByteAuraCelebration } from './ByteAuraCelebration';
import { soundManager } from '../../utils/sound';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  X,
  GraduationCap,
  Lightbulb,
  CreditCard,
} from 'lucide-react';
import { triggerCorrectAnswerReward } from '../../utils/rewardEffects';
import { StarRewardBanner } from '../StarRewardBanner';

interface LabFinalExamModalProps {
  studentName: string;
  onClose: () => void;
  onSuccess: (score: number) => void;
  onOpenCertificate: () => void;
  onOpenGuardianCard?: () => void;
}

type ExamState = 'intro' | 'quiz' | 'result';

export const LabFinalExamModal: React.FC<LabFinalExamModalProps> = ({
  studentName,
  onClose,
  onSuccess,
  onOpenCertificate,
  onOpenGuardianCard,
}) => {
  const [examState, setExamState] = useState<ExamState>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showStarReward, setShowStarReward] = useState(false);
  const [showFinalAuraCelebration, setShowFinalAuraCelebration] = useState(false);

  // Byte guide reactions
  const [byteMood, setByteMood] = useState<'idle' | 'pensamiento' | 'alegria' | 'baile' | 'victoria'>('victoria');
  const [byteSpeech, setByteSpeech] = useState<string | undefined>(undefined);

  const questions = FINAL_LAB_EXAM_QUESTIONS;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIdx];

  // Ambient sound on mount
  useEffect(() => {
    soundManager.playLabAmbient('final');
    return () => {
      soundManager.stopLabAmbient();
    };
  }, []);

  const handleStartExam = () => {
    soundManager.playClick();
    setShowStarReward(false);
    setExamState('quiz');
    setCurrentIdx(0);
    setScore(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setByteMood('idle');
    setByteSpeech('¡Adelante! Leé cada pregunta con tranquilidad.');
  };

  const handleRequestHint = () => {
    soundManager.playByteHint();
    setByteMood('pensamiento');
    const hintMsg = currentQuestion?.hint || 'Pista: pensá qué opción mantiene más segura la sala y cuida a todos.';
    setByteSpeech(hintMsg);
  };

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    if (isCorrect) {
      triggerCorrectAnswerReward(0.65);
      setShowStarReward(true);
      soundManager.playStarSparkle();
      soundManager.playSuccess();
      soundManager.playByteCheer();
      setScore((prev) => prev + 1);
      setByteMood('alegria');
      setByteSpeech('¡Excelente decisión de guardián! 🏆');
    } else {
      soundManager.playError();
      setByteMood('pensamiento');
      setByteSpeech('🤔 Pensá qué opción cuida mejor a los equipos y a tus compañeros.');
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    setShowStarReward(false);
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setByteMood('idle');
      setByteSpeech(undefined);
    } else {
      // Finished all 10 questions!
      const finalScore = score + (questions[currentIdx].options.find(o => o.id === selectedOptionId)?.isCorrect ? 1 : 0);
      const passed = finalScore >= 8; // 80% or more

      if (passed) {
        setByteMood('baile');
        setByteSpeech(`¡LO LOGRASTE, ${studentName}! ¡Ahora sos oficialmente un Guardián de la Sala de Informática!`);
        onSuccess(finalScore);
        setShowFinalAuraCelebration(true);
      } else {
        soundManager.playError();
        setByteMood('pensamiento');
        setByteSpeech(`¡Estuviste muy cerca, ${studentName}! Repasá los mundos anteriores y volvé a intentarlo.`);
      }
      setExamState('result');
    }
  };

  const isPassed = score >= 8;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto no-print">
      <div className="max-w-3xl w-full my-auto bg-white/95 dark:bg-slate-900/95 border-4 border-amber-400 dark:border-amber-600 rounded-3xl sm:rounded-4xl p-5 sm:p-8 shadow-2xl space-y-5 animate-pop-in relative">
        {/* Immediate Star Reward Celebration */}
        <StarRewardBanner
          show={showStarReward}
          onComplete={() => setShowStarReward(false)}
          message="¡Muy bien!"
        />
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🏆</span>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
                Mundo Final • La Gran Sala
              </span>
              <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                Guardianes de la Sala de Informática
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
        {/* INTRO SCREEN CON BYTE COMO GUARDIÁN PRINCIPAL                 */}
        {/* ------------------------------------------------------------- */}
        {examState === 'intro' && (
          <div className="text-center py-3 space-y-5 animate-pop-in">
            <div className="flex justify-center">
              <Byte
                mood="victoria"
                size="lg"
                worldId={6}
                interactive={true}
                showSpeaker={true}
                speechText={`¡Has recorrido los 5 mundos y protegido cada territorio, ${studentName}! Pero todavía queda la gran misión final: el Desafío de los Guardianes.`}
              />
            </div>

            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-950 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>GRAN DESAFÍO FINAL</span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase">
                ¿Estás listo para consagrarte como Guardián?
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                Has recorrido los 5 territorios aprendiendo sobre cuidado físico, orden, software, conexiones seguras e Internet responsable.
                En esta misión final responderás <span className="font-black text-emerald-600 dark:text-emerald-400">10 situaciones cotidianas</span>.
                Para graduarte deberás acertar al menos el <span className="font-black text-amber-600 dark:text-amber-400">80% (8 de 10)</span>.
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800/60 rounded-2xl p-3.5 max-w-md mx-auto text-xs font-bold text-amber-950 dark:text-amber-200">
              ⭐ ¡Si no alcanzás el 80% en el primer intento, podrás repasar y volver a intentarlo las veces que quieras!
            </div>

            <button
              type="button"
              onClick={handleStartExam}
              className="btn-game-amber bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-8 py-3.5 rounded-2xl text-base sm:text-lg inline-flex items-center gap-3 cursor-pointer shadow-lg active:scale-95 transition"
            >
              <span>¡COMENZAR LA EVALUACIÓN FINAL!</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* QUIZ QUESTIONS                                                */}
        {/* ------------------------------------------------------------- */}
        {examState === 'quiz' && currentQuestion && (
          <div className="space-y-4 animate-pop-in">
            
            {/* Byte Header Guide & Hint Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 p-3 rounded-2xl">
              <div className="flex items-center gap-3">
                <Byte
                  mood={byteMood}
                  size="sm"
                  worldId={6}
                  interactive={true}
                  showSpeaker={Boolean(byteSpeech)}
                  speechText={byteSpeech}
                />
              </div>

              {!isAnswered && (
                <button
                  type="button"
                  onClick={handleRequestHint}
                  className="btn-game-amber bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-center"
                  title="Pedir una pista a Byte"
                >
                  <Lightbulb className="w-4 h-4 text-amber-900" />
                  <span>Pedir Pista 💡</span>
                </button>
              )}
            </div>

            {/* Progress Bar & Counter */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Pregunta {currentIdx + 1} de {totalQuestions}
                </span>
                <span className="bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                  Aciertos: {score} / {totalQuestions} (Mínimo: 8)
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Situation Context Banner */}
            {currentQuestion.situation && (
              <div className="bg-amber-100/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-xs">
                <span className="font-body text-xs sm:text-sm font-semibold text-amber-950 dark:text-amber-200">
                  {currentQuestion.situation}
                </span>
              </div>
            )}

            {/* Microscene Player for Situational Evaluation */}
            {currentQuestion.microscene && (
              <ByteMicroscenePlayer
                microscene={currentQuestion.microscene}
                key={`exam-ms-${currentIdx}`}
              />
            )}

            {/* Question Text */}
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-amber-400';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    optStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-200';
                  } else {
                    optStyle = 'opacity-50 bg-slate-50 dark:bg-slate-800/40 border-slate-200';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${optStyle}`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-display font-bold uppercase flex-shrink-0 mt-0.5">
                      {opt.id}
                    </span>
                    <span className="font-body text-xs sm:text-sm font-medium flex-1 leading-relaxed">
                      {opt.text}
                    </span>
                    {isAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {isAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Continue */}
            {isAnswered && (
              <div
                className={`p-4 rounded-2xl border-2 animate-pop-in space-y-2 ${
                  currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-950 dark:text-emerald-100'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-100'
                }`}
              >
                <div className="flex items-center gap-2 font-display font-bold text-sm uppercase">
                  {currentQuestion.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>¡Respuesta Correcta! ⭐</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <span>¡Buen intento! Pensemos juntos</span>
                    </>
                  )}
                </div>

                <p className="font-body text-xs sm:text-sm font-normal text-slate-700 dark:text-slate-200 leading-relaxed">
                  {currentQuestion.options.find((o) => o.id === selectedOptionId)?.explanation}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="btn-game-amber bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow"
                  >
                    <span>
                      {currentIdx < totalQuestions - 1 ? 'Siguiente Situación' : 'Ver Resultado Final 🏆'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* RESULT SCREEN                                                 */}
        {/* ------------------------------------------------------------- */}
        {examState === 'result' && (
          <div className="text-center py-4 space-y-5 animate-pop-in">
            {isPassed ? (
              <>
                <div className="flex justify-center">
                  <Byte
                    mood="baile"
                    size="xl"
                    worldId={6}
                    interactive={true}
                    showSpeaker={true}
                    speechText={`¡Extraordinario, ${studentName}! ¡Acertaste ${score} de 10 preguntas y ahora sos oficialmente un Guardián de la Sala de Informática!`}
                  />
                </div>

                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow">
                  <Sparkles className="w-4 h-4" />
                  <span>🎉 ¡MISIÓN COMPLETADA!</span>
                  <Sparkles className="w-4 h-4" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase">
                    ¡Ahora sos un GUARDIÁN DE LA SALA!
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
                    Puntaje obtenido: <span className="text-emerald-600 font-black">{score} / 10 correctas ({percentage}%)</span>
                  </p>
                </div>

                {/* Personalized Badge Card */}
                <div className="max-w-md mx-auto bg-gradient-to-tr from-amber-200 via-yellow-100 to-amber-300 border-4 border-amber-500 p-6 rounded-3xl shadow-2xl space-y-3 text-slate-950">
                  <div className="text-6xl animate-bounce-gentle select-none">
                    🏆
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight">
                    GUARDIÁN DE LA SALA DE INFORMÁTICA
                  </h4>
                  <div className="text-xs font-black uppercase text-amber-900 tracking-wider">
                    Otorgado con orgullo a:
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-900 tracking-wide border-b-2 border-amber-600 pb-1">
                    {studentName.toUpperCase()}
                  </div>
                  <p className="text-xs font-extrabold text-amber-950">
                    ✨ ¡Misión completada con éxito! ✨
                  </p>
                </div>

                {/* Actions: Diploma & Digital Card */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onOpenCertificate();
                    }}
                    className="btn-game-amber bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition"
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span>📜 DIPLOMA OFICIAL A4</span>
                  </button>

                  {onOpenGuardianCard && (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        onOpenGuardianCard();
                      }}
                      className="btn-game-primary bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3.5 rounded-2xl text-sm sm:text-base flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>🪪 CARNET DE GUARDIÁN</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onClose();
                    }}
                    className="px-6 py-3.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl text-sm cursor-pointer transition"
                  >
                    Volver al Mapa
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <Byte
                    mood="pensamiento"
                    size="lg"
                    worldId={6}
                    interactive={true}
                    showSpeaker={true}
                    speechText={`¡Estuviste muy cerca, ${studentName}! Obtuviste ${score} de 10. Repasá los mundos y volvé a intentarlo, ¡sé que lo vas a lograr!`}
                  />
                </div>

                <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                  <span>Puntaje: {score} / 10 ({percentage}%)</span>
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase">
                    Todavía no sos Guardián de la Sala
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
                    Para obtener el título oficial se requiere un mínimo de <span className="font-bold text-amber-600">8 respuestas correctas (80%)</span>.
                    ¡Repasá los territorios anteriores y volvé a intentarlo!
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="btn-game-primary bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-2xl text-sm flex items-center gap-2 cursor-pointer shadow"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reintentar Desafío Final</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      onClose();
                    }}
                    className="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl text-sm cursor-pointer transition"
                  >
                    Repasar Mundos en el Mapa
                  </button>
                </div>
              </>
            )}
          </div>
        )}

      </div>

      {/* Byte Aura Farming Final Graduation Celebration Modal */}
      <ByteAuraCelebration
        isOpen={showFinalAuraCelebration}
        mode="final"
        studentName={studentName}
        onContinue={() => {
          setShowFinalAuraCelebration(false);
          setExamState('result');
        }}
        onOpenCertificate={() => {
          setShowFinalAuraCelebration(false);
          onOpenCertificate();
        }}
        onOpenGuardianCard={
          onOpenGuardianCard
            ? () => {
                setShowFinalAuraCelebration(false);
                onOpenGuardianCard();
              }
            : undefined
        }
      />
    </div>
  );
};
