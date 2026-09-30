import React, { useState } from 'react';
import type { Grade, UserProgress } from '../types';
import type { Theme } from '../utils/theme';
import { SCHOOL_NAME, SCHOOL_LOGO } from '../constants/school';
import { GRADES_INFO, formatGradeText } from '../utils/gradeAdapter';
import { Clasito } from './Clasito';
import { ThemeToggle } from './ThemeToggle';
import { soundManager } from '../utils/sound';
import { Sparkles, UserCheck, RefreshCw } from 'lucide-react';

interface WelcomeScreenProps {
  initialProgress: UserProgress | null;
  theme: Theme;
  onToggleTheme: () => void;
  onStart: (name: string, grade: Grade, chosenAdventure?: 'classroom' | 'lab') => void;
  onContinue: (chosenAdventure?: 'classroom' | 'lab') => void;
  onReset: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  initialProgress,
  theme,
  onToggleTheme,
  onStart,
  onContinue,
  onReset,
}) => {
  const [name, setName] = useState(initialProgress?.name || '');
  const [selectedGrade, setSelectedGrade] = useState<Grade>(initialProgress?.grade || 1);
  const [chosenAdventure, setChosenAdventure] = useState<'classroom' | 'lab'>('classroom');
  const [error, setError] = useState('');

  const hasExistingSession = Boolean(initialProgress?.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      soundManager.playError();
      setError('¡Por favor escribe tu nombre para comenzar la aventura!');
      return;
    }
    soundManager.playSuccess();
    onStart(name.trim(), selectedGrade, chosenAdventure);
  };

  const currentGradeInfo = GRADES_INFO[selectedGrade];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-600 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
      {/* Top Bar with Theme Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} showText={true} />
      </div>

      {/* Background Decorative Cloud & Sparkle Elements */}
      <div className="absolute top-10 left-8 text-white/20 dark:text-white/10 text-6xl select-none animate-float pointer-events-none">☁️</div>
      <div className="absolute top-24 right-20 text-white/25 dark:text-white/10 text-7xl select-none animate-bounce-gentle pointer-events-none">⭐</div>
      <div className="absolute bottom-12 left-16 text-white/20 dark:text-white/10 text-8xl select-none animate-float pointer-events-none">🚀</div>
      <div className="absolute bottom-20 right-10 text-white/20 dark:text-white/10 text-6xl select-none animate-wiggle pointer-events-none">🎮</div>

      <div className="w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-2xl border-4 sm:border-6 border-white/80 dark:border-slate-800 relative z-10 animate-pop-in my-6">
        
        {/* School Logo & Institutional Presentation */}
        <div className="flex flex-col items-center mb-4">
          <div className="bg-white/90 dark:bg-slate-800/90 p-2.5 sm:p-3 rounded-3xl shadow-sm border-2 border-indigo-100 dark:border-slate-700 mb-2 transition-transform hover:scale-102">
            <img
              src={SCHOOL_LOGO}
              alt={SCHOOL_NAME}
              className="h-20 sm:h-24 md:h-28 w-auto object-contain select-none filter drop-shadow-sm"
            />
          </div>
          <span className="text-[11px] sm:text-xs font-black uppercase text-indigo-700 dark:text-indigo-300 tracking-wider bg-indigo-50 dark:bg-slate-800 px-3.5 py-1 rounded-full border border-indigo-200 dark:border-slate-700">
            {SCHOOL_NAME}
          </span>
        </div>

        {/* Header with Title and Clasito */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Clasito
              mood={hasExistingSession ? 'celebrating' : 'waving'}
              size="lg"
              speechText={
                hasExistingSession
                  ? `¡Hola de nuevo, ${initialProgress?.name}! ¿Listo para seguir explorando?`
                  : '¡Hola! Soy Clasito. ¡Acompáñame a explorar Classroom jugando!'
              }
              grade={selectedGrade}
            />
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-sky-400 dark:via-indigo-300 dark:to-purple-400 drop-shadow-sm uppercase">
            {formatGradeText('Mi Aventura en Classroom', selectedGrade)}
          </h1>
          <p className="text-base sm:text-lg font-bold text-slate-600 dark:text-slate-300 mt-2">
            {formatGradeText('Aprendé, jugá y convertite en un experto de Classroom.', selectedGrade)}
          </p>
        </div>

        {/* Existing Session Resume Banner */}
        {hasExistingSession && (
          <div className="mb-6 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/90 border-3 border-amber-300 dark:border-amber-500/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-white flex items-center justify-center text-2xl shadow">
                <UserCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-amber-900 dark:text-amber-300">
                  ¡HOLA, {initialProgress?.name?.toUpperCase()}!
                </h3>
                <p className="text-sm font-semibold text-amber-800 dark:text-slate-300">
                  ESTÁS EN LA AVENTURA DE {GRADES_INFO[initialProgress!.grade].name.toUpperCase()}.
                </p>
                <div className="text-xs font-bold text-amber-700 dark:text-amber-400 mt-0.5">
                  ⭐ {initialProgress?.stars || 0} estrellas ganadas • {initialProgress?.completedLevels?.length || 0}/10 niveles
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  soundManager.playSuccess();
                  onContinue('classroom');
                }}
                className="btn-game-primary bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 py-2.5 rounded-2xl flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md cursor-pointer"
              >
                <span>🚀 Classroom</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSuccess();
                  onContinue('lab');
                }}
                className="btn-game-green bg-emerald-600 hover:bg-emerald-700 text-white font-black px-4 py-2.5 rounded-2xl flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md cursor-pointer"
              >
                <span>🖥️ Guardianes de la Sala</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onReset();
                }}
                title="Cambiar de aventurero o empezar de cero"
                className="p-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-2xl transition cursor-pointer self-center sm:self-auto"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* New or Edit Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm sm:text-base font-extrabold text-slate-700 dark:text-slate-200 mb-2">
              👤 {formatGradeText('Escribí tu nombre:', selectedGrade)}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder={selectedGrade === 1 ? 'ESCRIBÍ TU NOMBRE AQUÍ' : 'Ej: Mateo, Sofía, Lucas...'}
              maxLength={25}
              className={`w-full px-4 sm:px-5 py-3 sm:py-4 text-lg sm:text-xl font-bold bg-slate-100 dark:bg-slate-800 border-3 ${
                error ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40' : 'border-slate-300 dark:border-slate-700 focus:border-indigo-500 text-slate-900 dark:text-white'
              } rounded-2xl outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:font-normal`}
            />
            {error && (
              <p className="mt-2 text-sm font-bold text-rose-600 animate-wiggle">
                ⚠️ {error}
              </p>
            )}
          </div>

          {/* Grade Selector */}
          <div>
            <label className="block text-sm sm:text-base font-extrabold text-slate-700 dark:text-slate-200 mb-3">
              🎒 {formatGradeText('Elegí tu grado de primaria:', selectedGrade)}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {([1, 2, 3, 4, 5] as Grade[]).map((g) => {
                const info = GRADES_INFO[g];
                const isSelected = selectedGrade === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedGrade(g);
                    }}
                    className={`flex flex-col items-center p-3 rounded-2xl border-3 transition-all cursor-pointer ${
                      isSelected
                        ? `bg-indigo-600 text-white border-indigo-700 scale-105 shadow-lg ring-4 ring-indigo-200 dark:ring-indigo-800`
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl mb-1">{info.avatar}</span>
                    <span className="font-extrabold text-sm sm:text-base">{info.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Grade Description & Adaptation Hint */}
            <div className="mt-3 p-3 bg-sky-50 dark:bg-slate-800/80 border-2 border-sky-200 dark:border-slate-700 rounded-2xl flex items-center gap-3">
              <span className="text-2xl">{currentGradeInfo.avatar}</span>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-sky-900 dark:text-sky-300 block">
                  {currentGradeInfo.name} — {currentGradeInfo.badgeName}
                </span>
                <span className="text-sky-700 dark:text-slate-300 font-medium">
                  {currentGradeInfo.description}
                </span>
              </div>
            </div>
          </div>

          {/* Starting Adventure Choice */}
          <div>
            <label className="block text-sm sm:text-base font-extrabold text-slate-700 dark:text-slate-200 mb-2">
              🗺️ Elegí por dónde querés empezar:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setChosenAdventure('classroom')}
                className={`p-3.5 rounded-2xl border-3 text-left transition flex items-center gap-3 cursor-pointer ${
                  chosenAdventure === 'classroom'
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-600 dark:border-indigo-400 shadow-md ring-2 ring-indigo-400/30'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-3xl">🚀</span>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                    Mi Aventura en Classroom
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    10 Niveles • Tareas y entregas
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setChosenAdventure('lab')}
                className={`p-3.5 rounded-2xl border-3 text-left transition flex items-center gap-3 cursor-pointer ${
                  chosenAdventure === 'lab'
                    ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-600 dark:border-teal-400 shadow-md ring-2 ring-teal-400/30'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="text-3xl">🖥️</span>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                    Guardianes de la Sala
                  </h4>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                    6 Territorios • Con Byte el Guardián
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full btn-game-primary bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-lg sm:text-2xl py-4 sm:py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl cursor-pointer"
          >
            <Sparkles className="w-6 h-6 animate-spin" />
            <span>
              {hasExistingSession
                ? formatGradeText('GUARDAR Y COMENZAR 🚀', selectedGrade)
                : formatGradeText('COMENZAR AVENTURA 🚀', selectedGrade)}
            </span>
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold">
          <span>🎮 Web Educativa Gamificada</span>
          <span>🏫 {SCHOOL_NAME}</span>
        </div>
      </div>
    </div>
  );
};
