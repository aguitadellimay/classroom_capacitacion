import React, { useState } from 'react';
import type { Grade, UserProgress } from '../types';
import type { LabProgress } from '../types/lab';
import type { Theme } from '../utils/theme';
import { SCHOOL_NAME, SCHOOL_LOGO } from '../constants/school';
import { GRADES_INFO } from '../utils/gradeAdapter';
import { Clasito } from './Clasito';
import { Byte } from './lab/Byte';
import { ThemeToggle } from './ThemeToggle';
import { soundManager } from '../utils/sound';
import {
  Sparkles,
  ArrowRight,
  Edit3,
  Award,
  Volume2,
  VolumeX,
  Compass,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  Monitor,
  Shield,
  Star,
} from 'lucide-react';

interface AdventureHubProps {
  progress: UserProgress;
  labProgress: LabProgress;
  theme: Theme;
  onToggleTheme: () => void;
  onSelectAdventure: (adventure: 'classroom' | 'lab') => void;
  onUpdateProfile: (name: string, grade: Grade) => void;
  onReset: () => void;
}

export const AdventureHub: React.FC<AdventureHubProps> = ({
  progress,
  labProgress,
  theme,
  onToggleTheme,
  onSelectAdventure,
  onUpdateProfile,
  onReset,
}) => {
  const hasExistingName = Boolean(progress.name && progress.name.trim().length > 0);

  // Local form state for new student or editing
  const [nameInput, setNameInput] = useState(progress.name || '');
  const [selectedGrade, setSelectedGrade] = useState<Grade>(progress.grade || 1);
  const [isEditingProfile, setIsEditingProfile] = useState(!hasExistingName);
  const [errorMessage, setErrorMessage] = useState('');
  const [soundActive, setSoundActive] = useState(progress.soundEnabled);

  const toggleSound = () => {
    const nextSound = !soundActive;
    setSoundActive(nextSound);
    soundManager.setSoundEnabled(nextSound);
    if (nextSound) soundManager.playClick();
  };

  const handleSaveProfile = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      soundManager.playError();
      setErrorMessage('¡Por favor escribí tu nombre para comenzar la aventura!');
      return false;
    }
    setErrorMessage('');
    onUpdateProfile(trimmed, selectedGrade);
    setIsEditingProfile(false);
    soundManager.playSuccess();
    return true;
  };

  const handleEnterAdventure = (adventure: 'classroom' | 'lab') => {
    if (isEditingProfile || !hasExistingName) {
      const ok = handleSaveProfile();
      if (!ok) return;
    }
    soundManager.playSuccess();
    onSelectAdventure(adventure);
  };

  const classroomCompletedCount = progress.completedLevels.length;
  const labCompletedCount = labProgress.completedWorlds.length;
  const currentGradeInfo = GRADES_INFO[hasExistingName ? progress.grade : selectedGrade];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-indigo-600 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 text-slate-800 dark:text-slate-100 flex flex-col items-center justify-between p-3 sm:p-6 relative overflow-x-hidden selection:bg-amber-300 selection:text-slate-900 transition-colors duration-300">
      
      {/* Decorative ambient elements */}
      <div className="absolute top-12 left-6 text-white/20 dark:text-white/10 text-6xl select-none animate-float pointer-events-none">☁️</div>
      <div className="absolute top-28 right-10 text-white/25 dark:text-white/10 text-7xl select-none animate-bounce-gentle pointer-events-none">⭐</div>
      <div className="absolute bottom-24 left-10 text-white/15 dark:text-white/10 text-8xl select-none animate-float pointer-events-none">🚀</div>
      <div className="absolute bottom-32 right-12 text-white/15 dark:text-white/10 text-7xl select-none animate-wiggle pointer-events-none">🎮</div>

      {/* TOP HEADER BAR */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3 z-20 py-2 sm:py-3">
        {/* School Logo & Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl border-2 border-white/60 dark:border-slate-800 shadow-md">
          <img
            src={SCHOOL_LOGO}
            alt={SCHOOL_NAME}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain select-none filter drop-shadow-xs"
          />
          <div className="leading-tight">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block font-display">
              {SCHOOL_NAME}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
              La Aventura Digital 🌟
            </span>
          </div>
        </div>

        {/* Controls: Sound & Theme */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer shadow-md ${
              soundActive
                ? 'bg-amber-400 border-amber-300 text-slate-900 hover:bg-amber-300'
                : 'bg-white/80 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
            title={soundActive ? 'Sonido activado' : 'Sonido silenciado'}
          >
            {soundActive ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} showText={false} />
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-6xl mx-auto flex flex-col items-center z-10 my-4 sm:my-6 space-y-6 sm:space-y-8">
        
        {/* HERO TITLE & BYTE CENTRAL GUIDE */}
        <div className="text-center flex flex-col items-center max-w-2xl px-2">
          
          {/* Platform Tag */}
          <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-900 shadow-sm text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            <span>Portal de Aprendizaje y Misiones</span>
          </div>

          {/* Grand Main Title */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-md leading-none mb-2">
            LA AVENTURA DIGITAL
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-xl md:text-2xl font-semibold text-amber-200 dark:text-sky-200 drop-shadow-sm mb-4">
            ¿Qué aventura querés comenzar hoy?
          </p>

          {/* BYTE CENTRAL HOST GREETING */}
          <div className="flex items-center justify-center gap-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-3 border-amber-300 dark:border-indigo-500/60 p-3 sm:p-4 rounded-3xl shadow-xl max-w-xl mx-auto transition-transform hover:scale-102">
            <Byte
              mood="saludo"
              size="sm"
              worldId={1}
              interactive={true}
              showSpeaker={true}
              speechText={
                hasExistingName
                  ? `¡Hola de nuevo, ${progress.name}! Elegí una aventura para continuar ganando medallas.`
                  : '¡Hola, Aventurero! Escribí tu nombre y elegí qué misión querés explorar hoy.'
              }
            />
          </div>
        </div>

        {/* STUDENT PROFILE STATUS / SETUP CARD */}
        {isEditingProfile ? (
          <div className="w-full max-w-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-3 border-indigo-300 dark:border-slate-700 shadow-2xl space-y-4 animate-pop-in">
            <div className="text-center">
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                🎒 Completá tu perfil de aventurero
              </h3>
              <p className="font-body text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                Tu nombre y grado se usarán para tus diplomas y medallas oficiales.
              </p>
            </div>

            <div>
              <label className="block font-body text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                👤 Escribí tu nombre:
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Ej: Sofía, Mateo, Lucas..."
                maxLength={25}
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 focus:border-indigo-500 font-body font-semibold text-slate-900 dark:text-white outline-none transition"
              />
              {errorMessage && (
                <p className="mt-1.5 text-xs font-bold text-rose-500">
                  ⚠️ {errorMessage}
                </p>
              )}
            </div>

            <div>
              <label className="block font-body text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                🎒 Elegí tu grado de primaria:
              </label>
              <div className="grid grid-cols-5 gap-2">
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
                      className={`flex flex-col items-center p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-700 scale-105 shadow-md ring-2 ring-indigo-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl">{info.avatar}</span>
                      <span className="font-display text-xs font-bold">{info.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              {hasExistingName && (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancelar
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveProfile}
                className="btn-game-primary bg-indigo-600 hover:bg-indigo-700 text-white font-display text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
              >
                Guardar Perfil ✓
              </button>
            </div>
          </div>
        ) : (
          /* Profile Summary Pill with Change button */
          <div className="flex flex-wrap items-center justify-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-2.5 rounded-3xl border-2 border-white/60 dark:border-slate-800 shadow-lg text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentGradeInfo.avatar}</span>
              <span className="font-body text-slate-600 dark:text-slate-400">Aventurero:</span>
              <strong className="font-display text-indigo-700 dark:text-indigo-400 font-bold uppercase tracking-wide">
                {progress.name}
              </strong>
              <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                {currentGradeInfo.name}
              </span>
            </div>

            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-3">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setNameInput(progress.name);
                  setSelectedGrade(progress.grade);
                  setIsEditingProfile(true);
                }}
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-semibold cursor-pointer"
                title="Cambiar nombre o grado"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Cambiar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onReset();
                  setNameInput('');
                  setIsEditingProfile(true);
                }}
                className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition cursor-pointer"
                title="Reiniciar perfil y progreso"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* THE TWO GRAND PORTALS (Side-by-Side Desktop, Stacked Mobile)  */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch pt-2">
          
          {/* ========================================================= */}
          {/* PORTAL 1: 🏫 AVENTURA CLASSROOM                           */}
          {/* ========================================================= */}
          <div
            id="portal-classroom"
            onClick={() => handleEnterAdventure('classroom')}
            className="group relative bg-gradient-to-b from-white via-indigo-50/60 to-blue-50/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/60 rounded-4xl p-6 sm:p-8 border-4 border-indigo-300/80 dark:border-indigo-700/60 shadow-xl hover:shadow-2xl hover:border-indigo-400 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Glow on hover */}
            <div className="absolute inset-0 bg-radial from-indigo-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Portal Header Scene */}
            <div className="relative w-full h-44 sm:h-48 rounded-3xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-blue-600 dark:from-sky-950 dark:via-indigo-900 dark:to-blue-950 p-4 overflow-hidden border-2 border-indigo-200 dark:border-indigo-800/80 flex items-center justify-between shadow-inner select-none mb-5">
              
              {/* Illustrated scholastic ambient backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:18px_18px] opacity-20 pointer-events-none" />
              
              {/* Sunbeam highlight */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />

              {/* Floating scholastic icons */}
              <div className="absolute top-3 left-4 text-3xl opacity-80 animate-float pointer-events-none">📚</div>
              <div className="absolute bottom-3 left-16 text-2xl opacity-75 animate-bounce-gentle pointer-events-none">✏️</div>
              <div className="absolute top-5 right-24 text-2xl opacity-80 animate-wiggle pointer-events-none">📁</div>

              {/* Mascot / Guide Clasito */}
              <div className="relative z-10 flex items-center gap-3">
                <div className="transform group-hover:scale-105 transition-transform duration-300">
                  <Clasito
                    mood="waving"
                    size="md"
                    grade={hasExistingName ? progress.grade : selectedGrade}
                  />
                </div>
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-sm">
                  <span className="font-display text-[11px] font-bold text-indigo-700 dark:text-indigo-300 uppercase block">
                    ¡Guía Oficial!
                  </span>
                  <span className="font-body text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Clasito
                  </span>
                </div>
              </div>

              {/* Badges / Medals Preview Cluster */}
              <div className="relative z-10 flex flex-col items-end gap-1.5">
                <div className="bg-amber-400 text-slate-950 font-display text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>10 Niveles</span>
                </div>
                <div className="bg-white/90 dark:bg-slate-900/90 text-indigo-700 dark:text-indigo-300 font-body text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                  Tareas y Novedades
                </div>
              </div>
            </div>

            {/* Portal Content */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block font-display">
                  🏫 MUNDO 1 • AULA DIGITAL
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight mt-1">
                  AVENTURA CLASSROOM
                </h2>
                <p className="font-body text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed mt-1.5">
                  Descubrí cómo funciona Google Classroom jugando: aprendé a entregar tareas, revisar novedades, adjuntar archivos y organizar tus materias.
                </p>
              </div>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="font-body text-xs font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>10 Niveles paso a paso</span>
                </span>
                <span className="font-body text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>10 Insignias</span>
                </span>
                <span className="font-body text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Diploma Oficial A4</span>
                </span>
              </div>

              {/* Progress Summary */}
              <div className="bg-slate-100/80 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-body font-medium text-slate-600 dark:text-slate-300">
                  Tu progreso:
                </span>
                <span className="font-display font-bold text-indigo-700 dark:text-indigo-400">
                  {classroomCompletedCount > 0
                    ? `⭐ ${progress.stars} estrellas • ${classroomCompletedCount}/10 Niveles`
                    : '¡Listo para comenzar! 🚀'}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              <button
                type="button"
                className="w-full btn-game-primary bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-display text-base sm:text-lg font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg group-hover:shadow-indigo-500/40 group-hover:scale-102 transition-all cursor-pointer"
              >
                <span>ENTRAR A LA AVENTURA</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PORTAL 2: 🖥️ GUARDIANES DE LA SALA                         */}
          {/* ========================================================= */}
          <div
            id="portal-lab"
            onClick={() => handleEnterAdventure('lab')}
            className="group relative bg-gradient-to-b from-white via-teal-50/60 to-emerald-50/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-teal-950/60 rounded-4xl p-6 sm:p-8 border-4 border-emerald-300/80 dark:border-emerald-700/60 shadow-xl hover:shadow-2xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-2 overflow-hidden"
          >
            {/* Background Glow on hover */}
            <div className="absolute inset-0 bg-radial from-emerald-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Portal Header Scene */}
            <div className="relative w-full h-44 sm:h-48 rounded-3xl bg-gradient-to-tr from-teal-700 via-emerald-600 to-cyan-600 dark:from-slate-950 dark:via-teal-950 dark:to-emerald-950 p-4 overflow-hidden border-2 border-emerald-300 dark:border-emerald-800/80 flex items-center justify-between shadow-inner select-none mb-5">
              
              {/* Illustrated cyber circuit & island ambient backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(#34d399_1.5px,transparent_1.5px)] [background-size:18px_18px] opacity-25 pointer-events-none" />
              
              {/* Cyan aura highlight */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-teal-300/30 rounded-full blur-2xl pointer-events-none" />

              {/* Floating tech & island icons */}
              <div className="absolute top-3 left-4 text-3xl opacity-80 animate-float pointer-events-none">🏝️</div>
              <div className="absolute bottom-3 left-16 text-2xl opacity-75 animate-bounce-gentle pointer-events-none">⚡</div>
              <div className="absolute top-5 right-24 text-2xl opacity-80 animate-wiggle pointer-events-none">🖥️</div>

              {/* Mascot / Guide Byte */}
              <div className="relative z-10 flex items-center gap-3">
                <div className="transform group-hover:scale-105 transition-transform duration-300">
                  <Byte
                    mood="alegria"
                    size="md"
                    worldId={1}
                    interactive={false}
                    showSpeaker={false}
                  />
                </div>
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm">
                  <span className="font-display text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase block">
                    ¡Guardián de la Sala!
                  </span>
                  <span className="font-body text-xs font-semibold text-slate-700 dark:text-slate-200">
                    Byte el Robot
                  </span>
                </div>
              </div>

              {/* Badges / World Count Preview */}
              <div className="relative z-10 flex flex-col items-end gap-1.5">
                <div className="bg-emerald-400 text-slate-950 font-display text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>7 Territorios</span>
                </div>
                <div className="bg-white/90 dark:bg-slate-900/90 text-emerald-700 dark:text-emerald-300 font-body text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Historias de Byte
                </div>
              </div>
            </div>

            {/* Portal Content */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block font-display">
                  🖥️ MUNDO 2 • SALA DE INFORMÁTICA
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight mt-1">
                  GUARDIANES DE LA SALA
                </h2>
                <p className="font-body text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed mt-1.5">
                  Una misión para aprender a cuidar nuestro espacio tecnológico: hardware, cables, normas de convivencia, historias animadas y desafíos interactivos con Byte.
                </p>
              </div>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="font-body text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mapa-Isla Interactivo</span>
                </span>
                <span className="font-body text-xs font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 px-3 py-1 rounded-xl border border-cyan-200 dark:border-cyan-800 flex items-center gap-1">
                  <Monitor className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Microescenas de Byte</span>
                </span>
                <span className="font-body text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Carnet de Guardián IT</span>
                </span>
              </div>

              {/* Progress Summary */}
              <div className="bg-slate-100/80 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs sm:text-sm">
                <span className="font-body font-medium text-slate-600 dark:text-slate-300">
                  Tu progreso:
                </span>
                <span className="font-display font-bold text-emerald-700 dark:text-emerald-400">
                  {labCompletedCount > 0
                    ? `⭐ ${labProgress.stars} estrellas • ${labCompletedCount}/7 Territorios`
                    : '¡Listo para explorar la isla! 🏝️'}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6">
              <button
                type="button"
                className="w-full btn-game-green bg-gradient-to-r from-emerald-600 via-teal-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-display text-base sm:text-lg font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg group-hover:shadow-emerald-500/40 group-hover:scale-102 transition-all cursor-pointer"
              >
                <span>ENTRAR A LA AVENTURA</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 py-4 border-t border-white/20 dark:border-slate-800 text-xs text-white/80 dark:text-slate-400 z-10 font-body font-medium">
        <span>🎮 Plataforma Educativa Gamificada • {SCHOOL_NAME}</span>
        <span>Hecho con dedicación para los estudiantes de primaria 🚀</span>
      </footer>

    </div>
  );
};
