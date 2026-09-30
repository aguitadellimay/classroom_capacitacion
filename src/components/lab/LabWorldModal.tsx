import React, { useState, useEffect } from 'react';
import type { LabWorldConfig } from '../../types/lab';
import { Byte } from './Byte';
import { ByteMicroscenePlayer } from './ByteMicroscenePlayer';
import { ByteAuraCelebration } from './ByteAuraCelebration';
import { soundManager } from '../../utils/sound';
import {
  BookOpen,
  Gamepad2,
  Trophy,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  X,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { triggerCorrectAnswerReward } from '../../utils/rewardEffects';
import { StarRewardBanner } from '../StarRewardBanner';

interface LabWorldModalProps {
  world: LabWorldConfig;
  studentName?: string;
  onClose: () => void;
  onCompleteWorld: (worldId: number) => void;
}

type ModalStage = 'learn' | 'challenges' | 'conquered';

export const LabWorldModal: React.FC<LabWorldModalProps> = ({
  world,
  studentName = 'Guardián',
  onClose,
  onCompleteWorld,
}) => {
  const [stage, setStage] = useState<ModalStage>('learn');
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);

  // Challenges state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showStarReward, setShowStarReward] = useState(false);
  const [showAuraCelebration, setShowAuraCelebration] = useState(false);

  // Byte interactive speech & mood during challenge
  const [showHint, setShowHint] = useState(false);
  const [byteSpeech, setByteSpeech] = useState<string | undefined>(undefined);
  const [byteMood, setByteMood] = useState<'idle' | 'pensamiento' | 'alegria' | 'baile' | 'victoria' | 'saludo'>('saludo');

  // Start world ambient sound on mount
  useEffect(() => {
    soundManager.playLabAmbient(world.ambientSoundTheme);
    return () => {
      soundManager.stopLabAmbient();
    };
  }, [world.ambientSoundTheme]);

  const currentRule = world.rules[currentRuleIndex];
  const totalRules = world.rules.length;

  const currentChallenge = world.challenges[currentQuestionIndex];
  const totalChallenges = world.challenges.length;

  const handleNextRule = () => {
    soundManager.playClick();
    if (currentRuleIndex < totalRules - 1) {
      setCurrentRuleIndex((prev) => prev + 1);
    } else {
      setStage('challenges');
      setByteMood('idle');
      setByteSpeech('¡Hora de jugar! Demostrá qué harías vos en estas situaciones cotidianas.');
    }
  };

  const handlePrevRule = () => {
    soundManager.playClick();
    if (currentRuleIndex > 0) {
      setCurrentRuleIndex((prev) => prev - 1);
    }
  };

  // Request Hint from Byte
  const handleRequestHint = () => {
    soundManager.playByteHint();
    setShowHint(true);
    setByteMood('pensamiento');
    const hintMsg = currentChallenge?.hint || 'Pista: pensá qué opción mantiene más segura la sala y a tus compañeros.';
    setByteSpeech(hintMsg);
  };

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    if (isCorrect) {
      triggerCorrectAnswerReward(0.65);
      setShowStarReward(true);
      soundManager.playSuccess();
      soundManager.playByteCheer();
      setCorrectAnswersCount((prev) => prev + 1);
      setByteMood('alegria');
      setByteSpeech('¡Excelente! ¡Ese era el camino correcto!');
    } else {
      soundManager.playError();
      setByteMood('pensamiento');
      setByteSpeech('🤔 No pasa nada. Pensá qué opción mantiene más segura la sala y volvé a intentar.');
    }
  };

  const handleNextChallenge = () => {
    soundManager.playClick();
    setShowStarReward(false);
    if (currentQuestionIndex < totalChallenges - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setShowHint(false);
      setByteMood('idle');
      setByteSpeech(undefined);
    } else {
      // Completed all challenges! Trigger Byte Aura Farming Celebration!
      setShowAuraCelebration(true);
    }
  };

  const handleRetryChallenge = () => {
    soundManager.playClick();
    setShowStarReward(false);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowHint(false);
    setByteMood('idle');
    setByteSpeech('¡Concentrate y volvé a elegir la opción más segura!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto no-print">
      <div className="max-w-3xl w-full my-auto bg-white/95 dark:bg-slate-900/95 border-4 border-emerald-400 dark:border-emerald-600 rounded-3xl sm:rounded-4xl p-4 sm:p-7 shadow-2xl space-y-4 animate-pop-in relative">
        {/* Immediate Star Reward Celebration */}
        <StarRewardBanner
          show={showStarReward}
          onComplete={() => setShowStarReward(false)}
          message="¡Muy bien!"
        />
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{world.icon}</span>
            <div>
              <span className="text-[10px] sm:text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                Mundo {world.id} • {world.subtitle}
              </span>
              <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                {world.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Stage Tabs */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-black">
              <span
                className={`px-3 py-1 rounded-xl flex items-center gap-1 ${
                  stage === 'learn'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-slate-400'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Aprendemos</span>
              </span>
              <span
                className={`px-3 py-1 rounded-xl flex items-center gap-1 ${
                  stage === 'challenges'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-slate-400'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Desafíos</span>
              </span>
              <span
                className={`px-3 py-1 rounded-xl flex items-center gap-1 ${
                  stage === 'conquered'
                    ? 'bg-amber-100 text-amber-800 shadow-sm'
                    : 'text-slate-400'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Insignia</span>
              </span>
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
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STAGE 1: APRENDEMOS CON BYTE (Escenas visuales interactivas)    */}
        {/* ------------------------------------------------------------- */}
        {stage === 'learn' && currentRule && (
          <div className="space-y-4 animate-pop-in">
            
            {/* Byte Companion Banner */}
            <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800/60 p-3 sm:p-4 rounded-2xl">
              <Byte
                mood={world.byteIntro.mood}
                size="sm"
                worldId={world.id}
                interactive={true}
                showSpeaker={true}
                speechText={
                  currentRuleIndex === 0
                    ? world.byteIntro.speech
                    : `Regla importante: ${currentRule.title}. ¡Mirá la escena antes de empezar el desafío!`
                }
              />
            </div>

            {/* Rule Progress Tracker */}
            <div className="flex items-center justify-between text-xs font-black text-slate-500">
              <span className="uppercase tracking-wider">
                Territorio: {world.name} (Escena {currentRuleIndex + 1} de {totalRules})
              </span>
              <div className="flex items-center gap-1">
                {world.rules.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentRuleIndex
                        ? 'w-6 bg-emerald-600 dark:bg-emerald-400'
                        : idx < currentRuleIndex
                        ? 'w-2 bg-emerald-400'
                        : 'w-2 bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Visual Scene Presentation Card */}
            <div className="bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 sm:p-6 space-y-4">
              
              {/* Scene Formula Pill if available */}
              {currentRule.scene && (
                <div className="bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 dark:from-emerald-950/60 dark:via-teal-950/40 dark:to-emerald-950/60 border-2 border-emerald-400/80 p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-sm">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    <span className="bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl shadow-xs border border-emerald-300 dark:border-emerald-700">
                      {currentRule.scene.formulaBefore}
                    </span>
                    <span className="text-xl font-black text-rose-500">
                      {currentRule.scene.symbol}
                    </span>
                    <span className="bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl shadow-xs border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300">
                      {currentRule.scene.formulaAfter}
                    </span>
                  </div>

                  <p className="text-xs font-extrabold text-emerald-900 dark:text-emerald-200">
                    💡 {currentRule.scene.headline}
                  </p>
                </div>
              )}

              {/* Title & Description */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">
                  {currentRule.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                    {currentRule.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                    {currentRule.description}
                  </p>
                </div>
              </div>

              {/* Good practice vs Bad practice comparison cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Good Practice */}
                <div className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-300 dark:border-emerald-800/60 p-3.5 rounded-2xl space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-display font-bold text-xs uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>¡Así cuidamos la sala!</span>
                  </div>
                  <p className="font-body text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                    {currentRule.goodPractice}
                  </p>
                </div>

                {/* Bad Practice */}
                <div className="bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-800/60 p-3.5 rounded-2xl space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-300 font-display font-bold text-xs uppercase">
                    <XCircle className="w-4 h-4" />
                    <span>¡Evitemos esto!</span>
                  </div>
                  <p className="font-body text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                    {currentRule.badPractice}
                  </p>
                </div>
              </div>
            </div>

            {/* Dedicated Microscene Player: Historias de Byte */}
            {currentRule.microscene && (
              <ByteMicroscenePlayer
                microscene={currentRule.microscene}
                onFinished={handleNextRule}
              />
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handlePrevRule}
                disabled={currentRuleIndex === 0}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition ${
                  currentRuleIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer'
                }`}
              >
                Anterior
              </button>

              <button
                type="button"
                onClick={handleNextRule}
                className="btn-game-primary bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow"
              >
                <span>
                  {currentRuleIndex < totalRules - 1
                    ? 'Siguiente Escena'
                    : '¿Qué harías en esta situación? ¡Vamos al Desafío! 🎮'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STAGE 2: DESAFÍOS GUIADOS POR BYTE                            */}
        {/* ------------------------------------------------------------- */}
        {stage === 'challenges' && currentChallenge && (
          <div className="space-y-4 animate-pop-in">
            
            {/* Byte Companion Header with Hint Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 p-3 rounded-2xl">
              <div className="flex items-center gap-3">
                <Byte
                  mood={byteMood}
                  size="sm"
                  worldId={world.id}
                  interactive={true}
                  showSpeaker={Boolean(byteSpeech)}
                  speechText={byteSpeech}
                />
              </div>

              {/* Pedir Pista Button */}
              {!isAnswered && (
                <button
                  type="button"
                  onClick={handleRequestHint}
                  disabled={showHint}
                  className={`px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition ${
                    showHint
                      ? 'bg-amber-200 text-amber-900 opacity-70 cursor-default'
                      : 'btn-game-amber bg-amber-400 hover:bg-amber-500 text-slate-950 font-black cursor-pointer shadow-sm'
                  } self-start sm:self-center`}
                  title={showHint ? 'Pista solicitada' : 'Pedir una pista a Byte'}
                >
                  <Lightbulb className="w-4 h-4 text-amber-900" />
                  <span>{showHint ? 'Pista activa 💡' : 'Pedir Pista 💡'}</span>
                </button>
              )}
            </div>

            {/* Tracker header */}
            <div className="flex items-center justify-between text-xs font-black">
              <span className="text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Desafío {currentQuestionIndex + 1} de {totalChallenges}
              </span>
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
                Aciertos: {correctAnswersCount}/{totalChallenges}
              </span>
            </div>

            {/* Situation Banner */}
            {currentChallenge.situation && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 p-2.5 rounded-xl text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <span>💡</span>
                <span>Situación: {currentChallenge.situation}</span>
              </div>
            )}

            {/* Question Text */}
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentChallenge.question}
            </h3>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentChallenge.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500';

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
                    className={`w-full text-left p-3 sm:p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${optStyle}`}
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

            {/* Answer Feedback Card */}
            {isAnswered && (
              <div
                className={`p-4 rounded-2xl border-2 animate-pop-in space-y-2 ${
                  currentChallenge.options.find((o) => o.id === selectedOptionId)?.isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-950 dark:text-emerald-100'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-100'
                }`}
              >
                <div className="flex items-center gap-2 font-display font-bold text-sm uppercase">
                  {currentChallenge.options.find((o) => o.id === selectedOptionId)?.isCorrect ? (
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
                  {currentChallenge.options.find((o) => o.id === selectedOptionId)?.explanation}
                </p>

                <div className="pt-2 flex justify-end gap-2">
                  {!currentChallenge.options.find((o) => o.id === selectedOptionId)?.isCorrect && (
                    <button
                      type="button"
                      onClick={handleRetryChallenge}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Intentar de nuevo</span>
                    </button>
                  )}

                  {currentChallenge.options.find((o) => o.id === selectedOptionId)?.isCorrect && (
                    <button
                      type="button"
                      onClick={handleNextChallenge}
                      className="btn-game-green bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow"
                    >
                      <span>
                        {currentQuestionIndex < totalChallenges - 1
                          ? 'Siguiente Desafío'
                          : '¡Conquistar Mundo! 🏆'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STAGE 3: CONQUISTADO (Celebración y Desbloqueo)               */}
        {/* ------------------------------------------------------------- */}
        {stage === 'conquered' && (
          <div className="text-center py-4 space-y-5 animate-pop-in">
            <div className="flex justify-center">
              <Byte
                mood="baile"
                size="lg"
                worldId={world.id}
                interactive={true}
                showSpeaker={true}
                speechText={`¡Excelente trabajo, ${studentName}! ¡El próximo territorio acaba de desbloquearse!`}
              />
            </div>

            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>¡TERRITORIO PROTEGIDO!</span>
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase">
              ¡Desbloqueaste una Nueva Insignia!
            </h3>

            {/* Unlocked Badge Card */}
            <div className="max-w-md mx-auto bg-gradient-to-tr from-amber-100 via-yellow-50 to-orange-100 border-4 border-amber-400 p-5 rounded-3xl shadow-xl space-y-2 text-slate-900">
              <div className="text-5xl animate-bounce-gentle select-none">
                {world.badge.icon}
              </div>
              <h4 className="text-lg font-black uppercase text-amber-950">
                {world.badge.title}
              </h4>
              <p className="text-xs font-bold text-amber-900">
                {world.badge.description}
              </p>
            </div>

            <p className="text-xs sm:text-sm font-extrabold text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Completaste todos los desafíos de {world.name}. ¡Byte y vos protegieron este territorio y abrieron el siguiente paso en el mapa!
            </p>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="btn-game-primary bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-3.5 rounded-2xl text-sm sm:text-base inline-flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition"
            >
              <span>CONTINUAR EN EL MAPA 🗺️</span>
            </button>
          </div>
        )}

      </div>

      {/* Byte Aura Farming Celebration Modal */}
      <ByteAuraCelebration
        isOpen={showAuraCelebration}
        mode="world"
        worldName={world.name}
        badge={world.badge}
        studentName={studentName}
        onContinue={() => {
          setShowAuraCelebration(false);
          setStage('conquered');
          setByteMood('baile');
          setByteSpeech(`¡Excelente trabajo, ${studentName}! ¡El próximo territorio acaba de desbloquearse!`);
          onCompleteWorld(world.id);
        }}
      />
    </div>
  );
};
