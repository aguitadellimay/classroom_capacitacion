import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { UserProgress } from '../types';
import { LEVELS_CONFIG } from '../data/levelsData';
import { CAMPUS_SECRETS } from '../data/campusSecrets';
import { soundManager } from '../utils/sound';
import { Clasito } from './Clasito';
import { Byte } from './lab/Byte';
import { ClassroomCampusSecret } from './ClassroomCampusSecret';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  Play,
  Backpack,
} from 'lucide-react';

interface ClassroomCampusMapProps {
  progress: UserProgress;
  onSelectLevel: (levelId: number) => void;
  onOpenBackpack: () => void;
  onDiscoverSecret: (secretId: string, bonusStars: number) => void;
  onOpenCertificate: () => void;
}

// 10 Station coordinates on 1000x1600 canvas (Percentages for responsive HTML overlay)
const CAMPUS_STATIONS_COORDINATES: Record<
  number,
  {
    x: number;
    y: number;
    title: string;
    zoneName: string;
    labelPos: 'left' | 'right' | 'top' | 'bottom';
  }
> = {
  1: { x: 50, y: 92, title: 'Entrada del Campus', zoneName: 'Portal de Bienvenida', labelPos: 'top' },
  2: { x: 78, y: 83, title: 'Seguridad Digital', zoneName: 'Pabellón de Contraseñas', labelPos: 'left' },
  3: { x: 23, y: 73, title: 'Aula Virtual', zoneName: 'Tablón de Novedades', labelPos: 'right' },
  4: { x: 77, y: 64, title: 'Biblioteca de Consignas', zoneName: 'Lectura Atenta', labelPos: 'left' },
  5: { x: 22, y: 54, title: 'Depósito de Tareas', zoneName: 'Zona de Envíos', labelPos: 'right' },
  6: { x: 50, y: 44, title: 'Plaza del Gran Reloj', zoneName: 'Organización & Puntualidad', labelPos: 'bottom' },
  7: { x: 78, y: 34, title: 'Pabellón del Respeto', zoneName: 'Diálogo & Convivencia', labelPos: 'left' },
  8: { x: 23, y: 25, title: 'Jardín del Compañerismo', zoneName: 'Trabajo en Equipo', labelPos: 'right' },
  9: { x: 77, y: 16, title: 'Torre Ciber-Escudo', zoneName: 'Privacidad Digital', labelPos: 'left' },
  10: { x: 50, y: 7,  title: 'Aula Magna del Saber', zoneName: 'Gran Desafío Final', labelPos: 'bottom' },
};

// Base path for public assets (compatible with Vite subpath deployment)
const ASSET_BASE = `${import.meta.env.BASE_URL}assets/map`;

export const ClassroomCampusMap: React.FC<ClassroomCampusMapProps> = ({
  progress,
  onSelectLevel,
  onOpenBackpack,
  onDiscoverSecret,
  onOpenCertificate,
}) => {
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);
  const [byteEasterEggCount, setByteEasterEggCount] = useState(0);

  // Identify next level to conquer
  const nextLevelId = useMemo(() => {
    for (let id = 1; id <= 10; id++) {
      if (!progress.completedLevels.includes(id)) {
        return id;
      }
    }
    return 10;
  }, [progress.completedLevels]);

  const isAllCompleted = progress.completedLevels.length >= 10;
  const nextLevelConfig =
    LEVELS_CONFIG.find((lvl) => lvl.id === nextLevelId) || LEVELS_CONFIG[0];

  const handleLevelClick = (levelId: number, isUnlocked: boolean) => {
    if (!isUnlocked) {
      soundManager.playError();
      setLockedNotice(
        `¡Esta zona del campus todavía está cerrada! Completá primero el Nivel ${levelId - 1} para abrir este camino.`
      );
      return;
    }
    setLockedNotice(null);
    soundManager.playClick();
    onSelectLevel(levelId);
  };

  // Easter Egg: Clicking Byte at the Campus Information Kiosk
  const handleByteCampusClick = () => {
    const nextCount = byteEasterEggCount + 1;
    setByteEasterEggCount(nextCount);

    if (nextCount >= 4) {
      soundManager.playSecretFound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      onDiscoverSecret('secret_byte_classroom_cheer', 1);
      setLockedNotice(
        '🤖 ¡Hola! Soy Byte. ¡Te felicito por recorrer el Campus Digital de Classroom! Sumás +1 estrella por ser tan curioso. ⭐'
      );
      setByteEasterEggCount(0);
    } else {
      soundManager.playByteClick();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl sm:rounded-4xl p-2 sm:p-5 overflow-hidden shadow-2xl border-4 border-indigo-400/50 dark:border-indigo-700/60 bg-gradient-to-b from-sky-300 via-indigo-400 to-blue-700 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950 transition-colors select-none">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP QUICK ACTION BANNER: "CONTINUAR AVENTURA"               */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-30 mb-3 sm:mb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-indigo-300 dark:border-indigo-700 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-pop-in">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0 animate-bounce-gentle">
            {nextLevelConfig.icon}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider font-display">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isAllCompleted
                  ? `¡Felicitaciones, ${progress.name}! 🏆`
                  : `Misión de ${progress.name || 'Estudiante'} en el Campus`}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight font-display">
              {isAllCompleted
                ? '¡Campus Digital Completado! 🎓'
                : `Nivel ${nextLevelId}: ${nextLevelConfig.shortTitle}`}
            </h3>
            <p className="font-body text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              {isAllCompleted
                ? '¡Obtuviste todas las insignias de Classroom! Podés ver tu diploma oficial.'
                : CAMPUS_STATIONS_COORDINATES[nextLevelId]?.zoneName}
            </p>
          </div>
        </div>

        {/* Buttons group: Mochila & Action */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenBackpack();
            }}
            className="px-3.5 sm:px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-display font-bold text-xs border border-indigo-200 dark:border-indigo-800 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-95 flex-1 sm:flex-initial"
            title="Abrir Mochila del Estudiante"
          >
            <Backpack className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Mochila</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (isAllCompleted) {
                soundManager.playClick();
                onOpenCertificate();
              } else {
                handleLevelClick(nextLevelId, true);
              }
            }}
            className="btn-game-primary bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white font-display font-bold px-5 sm:px-7 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition flex-1 sm:flex-initial"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isAllCompleted ? 'VER DIPLOMA 📜' : 'JUGAR NIVEL ▶️'}</span>
          </button>
        </div>
      </div>

      {/* Locked Notice Overlay Toast */}
      {lockedNotice &&
        createPortal(
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] bg-slate-950/95 text-white border-2 border-indigo-400 p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-3 animate-pop-in no-print">
            <div className="flex items-center gap-3">
              <span className="text-3xl flex-shrink-0 animate-bounce-gentle">🤖</span>
              <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-display">
                  Guía del Campus
                </p>
                <p className="font-body text-xs sm:text-sm font-semibold text-slate-100 leading-snug">
                  {lockedNotice}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLockedNotice(null)}
              className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white font-display font-bold px-3 py-1.5 rounded-xl transition cursor-pointer flex-shrink-0 shadow"
            >
              Entendido
            </button>
          </div>,
          document.body
        )}

      {/* ------------------------------------------------------------- */}
      {/* 2. THE CAMPUS MAP CANVAS (Layered 2D Illustrated Game World)   */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full aspect-[1/1.6] sm:aspect-[1/1.5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-inner border border-white/30 bg-emerald-500">
        
        {/* Sky / Horizon backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-400 dark:from-slate-950 dark:via-indigo-950 dark:to-emerald-950" />

        {/* Floating sky clouds */}
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
          <image
            href={`${ASSET_BASE}/sky/cloud1.png`}
            className="absolute top-2 left-8 w-24 animate-float"
          />
          <image
            href={`${ASSET_BASE}/sky/cloud2.png`}
            className="absolute top-12 right-12 w-28 animate-float"
            style={{ animationDelay: '2s' }}
          />
          <image
            href={`${ASSET_BASE}/sky/cloud3.png`}
            className="absolute top-32 left-1/3 w-20 animate-float"
            style={{ animationDelay: '1.2s' }}
          />
        </div>

        {/* Layered Rich SVG Campus Canvas */}
        <svg
          viewBox="0 0 1000 1600"
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Campus lawn gradient */}
            <linearGradient id="campusLawn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="35%" stopColor="#22c55e" />
              <stop offset="70%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            {/* Courtyard stone paver gradient */}
            <linearGradient id="stonePlaza" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>

            {/* Cobblestone walkway gradient */}
            <linearGradient id="walkwayCobble" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#fde047" />
              <stop offset="85%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>

            {/* Active glowing path stroke */}
            <linearGradient id="activePathGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Fountain water depth radial */}
            <radialGradient id="fountainWater" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="55%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </radialGradient>

            {/* Soft drop shadow filter */}
            <filter id="campusShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* ========================================================= */}
          {/* LAYER 1: BASE CAMPUS LAWN & GROUNDS                       */}
          {/* ========================================================= */}
          {/* Main campus grounds polygon */}
          <path
            d="M 60 1560
               C 30 1480, 20 1350, 40 1200
               C 60 1050, 30 900, 50 750
               C 60 600, 40 450, 70 300
               C 100 150, 300 40, 500 30
               C 700 40, 900 150, 930 300
               C 960 450, 940 600, 950 750
               C 970 900, 940 1050, 960 1200
               C 980 1350, 970 1480, 940 1560
               Z"
            fill="url(#campusLawn)"
            stroke="#166534"
            strokeWidth="8"
          />

          {/* Sports track & field in lower-left campus corner */}
          <g transform="translate(130, 1370)">
            <ellipse cx="0" cy="0" rx="95" ry="50" fill="#f87171" stroke="#dc2626" strokeWidth="4" />
            <ellipse cx="0" cy="0" rx="80" ry="38" fill="#15803d" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="0" y1="-38" x2="0" y2="38" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
            <text x="-12" y="5" fontSize="16" className="select-none">⚽</text>
          </g>

          {/* Garden creek flowing organically across campus */}
          <path
            d="M 120 480
               C 220 520, 280 460, 350 510
               C 420 560, 380 650, 310 700
               C 240 750, 210 820, 160 880"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 120 480
               C 220 520, 280 460, 350 510
               C 420 560, 380 650, 310 700
               C 240 750, 210 820, 160 880"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="12 18"
            strokeLinecap="round"
            opacity="0.6"
            className="animate-pulse"
          />

          {/* ========================================================= */}
          {/* LAYER 2: PLAZAS & STONE COURTYARDS                        */}
          {/* ========================================================= */}
          {/* Zone 1: Entrance Welcome Plaza */}
          <ellipse
            cx="500"
            cy="1475"
            rx="160"
            ry="75"
            fill="url(#stonePlaza)"
            stroke="#94a3b8"
            strokeWidth="4"
            filter="url(#campusShadow)"
          />

          {/* Zone 6: Central Clock Tower & Fountain Plaza */}
          <circle
            cx="500"
            cy="704"
            r="120"
            fill="url(#stonePlaza)"
            stroke="#94a3b8"
            strokeWidth="4"
            filter="url(#campusShadow)"
          />
          {/* Decorative geometric plaza paving ring */}
          <circle
            cx="500"
            cy="704"
            r="105"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="8 6"
          />

          {/* Zone 10: Grand Summit Terrace / Aula Magna Esplanade */}
          <polygon
            points="320,170 680,170 740,90 260,90"
            fill="url(#stonePlaza)"
            stroke="#94a3b8"
            strokeWidth="4"
            filter="url(#campusShadow)"
          />

          {/* ========================================================= */}
          {/* LAYER 3: THE CONNECTED CAMPUS COBBLESTONE ROAD            */}
          {/* ========================================================= */}
          {/* Broad earth path base */}
          <path
            d="M 500 1472
               C 620 1460, 750 1410, 780 1312
               C 800 1240, 400 1260, 230 1168
               C 120 1100, 650 1100, 770 1008
               C 860 930, 420 930, 220 848
               C 100 790, 360 740, 500 704
               C 640 680, 860 620, 780 544
               C 700 480, 380 470, 230 400
               C 120 340, 640 330, 770 256
               C 840 200, 640 140, 500 112"
            fill="none"
            stroke="#92400e"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
          />

          {/* Cobblestone walkway surface */}
          <path
            d="M 500 1472
               C 620 1460, 750 1410, 780 1312
               C 800 1240, 400 1260, 230 1168
               C 120 1100, 650 1100, 770 1008
               C 860 930, 420 930, 220 848
               C 100 790, 360 740, 500 704
               C 640 680, 860 620, 780 544
               C 700 480, 380 470, 230 400
               C 120 340, 640 330, 770 256
               C 840 200, 640 140, 500 112"
            fill="none"
            stroke="url(#walkwayCobble)"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cobblestone paving dashes */}
          <path
            d="M 500 1472
               C 620 1460, 750 1410, 780 1312
               C 800 1240, 400 1260, 230 1168
               C 120 1100, 650 1100, 770 1008
               C 860 930, 420 930, 220 848
               C 100 790, 360 740, 500 704
               C 640 680, 860 620, 780 544
               C 700 480, 380 470, 230 400
               C 120 340, 640 330, 770 256
               C 840 200, 640 140, 500 112"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeDasharray="14 16"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Small stone bridge where path crosses the garden creek */}
          <g transform="translate(230, 750) rotate(-25)">
            <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
            <line x1="-18" y1="-12" x2="18" y2="-12" stroke="#fde047" strokeWidth="2" />
            <line x1="-18" y1="12" x2="18" y2="12" stroke="#fde047" strokeWidth="2" />
          </g>

          {/* ========================================================= */}
          {/* LAYER 4: ARCHITECTURAL LANDMARKS & ILLUSTRATED VIGNETTES  */}
          {/* ========================================================= */}

          {/* --------------------------------------------------------- */}
          {/* ZONE 1: ENTRADA DEL CAMPUS / PORTAL DE BIENVENIDA         */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(500, 1490)">
            {/* Neoclassical Gateway Pillars */}
            <rect x="-120" y="-35" width="24" height="60" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
            <rect x="96" y="-35" width="24" height="60" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Wrought Iron Overhead Arch */}
            <path d="M -120 -35 Q 0 -85 120 -35" fill="none" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
            <path d="M -115 -28 Q 0 -75 115 -28" fill="none" stroke="#475569" strokeWidth="2" />

            {/* School Crest / Welcome Plaque */}
            <rect x="-70" y="-85" width="140" height="26" rx="8" fill="#1e3a8a" stroke="#fbbf24" strokeWidth="2" />
            <text x="0" y="-68" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="Fredoka">
              ESCUELA AGÜITA DEL LIMAY
            </text>

            {/* Colorful Welcome Bunting Pennants */}
            <polygon points="-90,-35 -78,-35 -84,-18" fill="#ef4444" />
            <polygon points="-60,-42 -48,-42 -54,-25" fill="#3b82f6" />
            <polygon points="-30,-48 -18,-48 -24,-31" fill="#eab308" />
            <polygon points="0,-50 12,-50 6,-33" fill="#10b981" />
            <polygon points="30,-48 42,-48 36,-31" fill="#ec4899" />
            <polygon points="60,-42 72,-42 66,-25" fill="#8b5cf6" />
            <polygon points="90,-35 102,-35 96,-18" fill="#06b6d4" />

            {/* Streetlamps flanking entrance */}
            <text x="-145" y="-10" fontSize="18" className="select-none">🏮</text>
            <text x="125" y="-10" fontSize="18" className="select-none">🏮</text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* ZONE 2: PABELLÓN DE SEGURIDAD DIGITAL                     */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(780, 1312)">
            {/* Outpost Building (Kenney House 1) */}
            <image
              href={`${ASSET_BASE}/buildings/house1.png`}
              x="-35"
              y="-75"
              width="70"
              height="75"
            />
            {/* Digital Security Shield Barrier */}
            <ellipse cx="0" cy="5" rx="35" ry="15" fill="#38bdf8" opacity="0.3" className="animate-pulse" />
            <text x="-12" y="-85" fontSize="22" className="select-none animate-bounce-gentle">
              🔐
            </text>
            <text x="35" y="-20" fontSize="16" className="select-none">
              🛡️
            </text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* ZONE 3: AULA VIRTUAL & NOVEDADES                          */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(230, 1168)">
            {/* Modern Classroom Wing (Kenney House 2) */}
            <image
              href={`${ASSET_BASE}/buildings/house2.png`}
              x="-45"
              y="-70"
              width="90"
              height="70"
            />
            {/* Big Outdoor Smart Display Board */}
            <rect x="-85" y="-55" width="36" height="24" rx="3" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="-76" y="-38" fontSize="14" className="select-none">💻</text>
            {/* Notice Board with pushpins */}
            <rect x="45" y="-50" width="30" height="22" rx="3" fill="#ca8a04" stroke="#78350f" strokeWidth="2" />
            <circle cx="50" cy="-45" r="2" fill="#ef4444" />
            <circle cx="68" cy="-45" r="2" fill="#3b82f6" />
            <line x1="48" y1="-38" x2="72" y2="-38" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="48" y1="-34" x2="66" y2="-34" stroke="#ffffff" strokeWidth="1.5" />
          </g>

          {/* --------------------------------------------------------- */}
          {/* ZONE 4: BIBLIOTECA CENTRAL DE CONSIGNAS                   */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(770, 1008)">
            {/* Library building facade with tall windows */}
            <rect x="-45" y="-65" width="90" height="65" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
            {/* Library Classical Dome Roof */}
            <path d="M -45 -65 Q 0 -115 45 -65" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
            <circle cx="0" cy="-115" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            {/* Columns */}
            <line x1="-30" y1="-65" x2="-30" y2="0" stroke="#cbd5e1" strokeWidth="4" />
            <line x1="-10" y1="-65" x2="-10" y2="0" stroke="#cbd5e1" strokeWidth="4" />
            <line x1="10" y1="-65" x2="10" y2="0" stroke="#cbd5e1" strokeWidth="4" />
            <line x1="30" y1="-65" x2="30" y2="0" stroke="#cbd5e1" strokeWidth="4" />
            {/* Books & Reading Benches */}
            <text x="-75" y="-15" fontSize="18" className="select-none">📖</text>
            <text x="50" y="-15" fontSize="18" className="select-none">📚</text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* ZONE 5: DEPÓSITO DE TAREAS & ENVÍOS                       */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(220, 848)">
            {/* Dispatch Station Building */}
            <rect x="-35" y="-55" width="70" height="55" rx="6" fill="#fef2f2" stroke="#f43f5e" strokeWidth="3" />
            <polygon points="-40,-55 0,-85 40,-55" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
            {/* Mailbox chute & paper planes */}
            <text x="-16" y="-15" fontSize="24" className="select-none">📮</text>
            <text x="-48" y="-45" fontSize="18" className="select-none animate-float">✈️</text>
            <text x="35" y="-45" fontSize="18" className="select-none animate-bounce-gentle">📁</text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* ZONE 6: PLAZA DEL GRAN RELOJ & FUENTE DE LOS DESEOS       */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(500, 704)">
            {/* Clock Tower (Kenney Tower) */}
            <image
              href={`${ASSET_BASE}/buildings/tower.png`}
              x="-30"
              y="-140"
              width="60"
              height="110"
            />
            {/* Analog Clock Face on Tower */}
            <circle cx="0" cy="-105" r="14" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
            <line x1="0" y1="-105" x2="0" y2="-114" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="-105" x2="6" y2="-105" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />

            {/* Circular Marble Fountain Basin */}
            <circle cx="0" cy="5" r="46" fill="#cbd5e1" stroke="#64748b" strokeWidth="3" />
            <circle cx="0" cy="5" r="38" fill="url(#fountainWater)" stroke="#38bdf8" strokeWidth="2" />
            
            {/* Animated Fountain Water Spray & Ripples */}
            <g opacity="0.8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none">
              <ellipse cx="0" cy="5" rx="22" ry="12" className="animate-pulse" />
              <ellipse cx="0" cy="5" rx="12" ry="6" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
            </g>
            <ellipse cx="0" cy="5" rx="8" ry="4" fill="#ffffff" opacity="0.9" className="animate-pulse" />
            <text x="-6" y="2" fontSize="14" className="select-none">💦</text>

            {/* Decorative Plaza Park Benches */}
            <text x="-80" y="10" fontSize="18" className="select-none">🪑</text>
            <text x="65" y="10" fontSize="18" className="select-none">🪑</text>
            <text x="-80" y="-35" fontSize="16" className="select-none">🌸</text>
            <text x="65" y="-35" fontSize="16" className="select-none">🌷</text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* ZONE 7: PABELLÓN DEL DIÁLOGO Y RESPETO                   */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(780, 544)">
            {/* Garden Pergola / Gazebo */}
            <circle cx="0" cy="-25" r="42" fill="#fdf2f8" stroke="#ec4899" strokeWidth="3" />
            <polygon points="-46,-25 0,-65 46,-25" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
            {/* Speech bubbles with positive emotions */}
            <text x="-25" y="-70" fontSize="20" className="select-none animate-bounce-gentle">
              💬
            </text>
            <text x="15" y="-70" fontSize="20" className="select-none animate-float">
              💖
            </text>
            <text x="-55" y="-15" fontSize="18" className="select-none">
              🌺
            </text>
            <text x="40" y="-15" fontSize="18" className="select-none">
              🌼
            </text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* ZONE 8: JARDÍN DEL COMPAÑERISMO                           */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(230, 400)">
            {/* Outdoor Study Picnic Glade */}
            <ellipse cx="0" cy="-10" rx="55" ry="32" fill="#86efac" opacity="0.5" />
            {/* Picnic table with study papers */}
            <rect x="-24" y="-22" width="48" height="18" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="2" />
            <line x1="-30" y1="-12" x2="30" y2="-12" stroke="#d97706" strokeWidth="4" />
            <text x="-12" y="-14" fontSize="16" className="select-none">🤝</text>
            <text x="-55" y="-30" fontSize="18" className="select-none">🎨</text>
            <text x="40" y="-30" fontSize="18" className="select-none">📐</text>
            {/* Kenney Rabbit in garden */}
            <image
              href={`${ASSET_BASE}/animals/rabbit.png`}
              x="30"
              y="5"
              width="24"
              height="26"
            />
          </g>

          {/* --------------------------------------------------------- */}
          {/* ZONE 9: TORRE DEL CIBER-ESCUDO                            */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(770, 256)">
            {/* Tech Bastion (Kenney Castle Small Alt) */}
            <image
              href={`${ASSET_BASE}/buildings/castleSmallAlt.png`}
              x="-40"
              y="-75"
              width="80"
              height="75"
            />
            {/* Futuristic Holographic Shield Ring */}
            <circle cx="0" cy="-35" r="48" fill="none" stroke="#10b981" strokeWidth="3" opacity="0.75" className="animate-aura-pulse" />
            <ellipse cx="0" cy="-35" rx="38" ry="18" fill="#a7f3d0" opacity="0.4" className="animate-pulse" />
            <text x="-12" y="-25" fontSize="24" className="select-none">
              🛡️
            </text>
            <text x="32" y="-60" fontSize="16" className="select-none animate-bounce-gentle">
              ✨
            </text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* ZONE 10: AULA MAGNA DEL SABER (SUMMIT PALACE)             */}
          {/* --------------------------------------------------------- */}
          <g transform="translate(500, 112)">
            {/* Golden radiant halo behind summit */}
            <circle cx="0" cy="-25" r="95" fill="#fef08a" opacity="0.4" className="animate-pulse" />
            <circle cx="0" cy="-25" r="70" fill="#fef9c3" opacity="0.55" />

            {/* Grand Academy Building (Kenney Castle Small) */}
            <image
              href={`${ASSET_BASE}/buildings/castleSmall.png`}
              x="-65"
              y="-95"
              width="130"
              height="100"
            />

            {/* Grand Imperial Red Carpet */}
            <polygon points="-18,25 -14,-5 14,-5 18,25" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            <polygon points="-12,25 -8,-5 8,-5 12,25" fill="#fbbf24" opacity="0.5" />

            {/* Giant Golden Graduation Mortarboard */}
            <g transform="translate(0, -95)" className="animate-bounce-gentle">
              <text x="-20" y="0" fontSize="38" className="select-none">
                🎓
              </text>
            </g>

            {/* Floating Celestial Achievement Stars */}
            <text x="-85" y="-45" fontSize="22" className="select-none animate-float">
              ⭐
            </text>
            <text x="70" y="-45" fontSize="22" className="select-none animate-float" style={{ animationDelay: '1.2s' }}>
              ⭐
            </text>
            <text x="-55" y="-85" fontSize="18" className="select-none">
              ✨
            </text>
            <text x="45" y="-85" fontSize="18" className="select-none">
              ✨
            </text>
          </g>

          {/* ========================================================= */}
          {/* LAYER 5: NATURAL FOLIAGE (Kenney Trees & Bushes)          */}
          {/* ========================================================= */}
          {/* Entrance landscaping */}
          <image href={`${ASSET_BASE}/vegetation/treeSmall_green1.png`} x="330" y="1420" width="38" height="52" />
          <image href={`${ASSET_BASE}/vegetation/treeSmall_green2.png`} x="630" y="1420" width="38" height="52" />
          <image href={`${ASSET_BASE}/vegetation/bush1.png`} x="410" y="1520" width="36" height="18" />
          <image href={`${ASSET_BASE}/vegetation/bush2.png`} x="560" y="1520" width="36" height="18" />

          {/* Mid campus trees & foliage */}
          <image href={`${ASSET_BASE}/vegetation/tree.png`} x="860" y="1120" width="46" height="64" />
          <image href={`${ASSET_BASE}/vegetation/treeSmall_green3.png`} x="90" y="990" width="40" height="54" />
          <image href={`${ASSET_BASE}/vegetation/treePine.png`} x="640" y="820" width="38" height="90" />
          <image href={`${ASSET_BASE}/vegetation/bush3.png`} x="360" y="860" width="36" height="18" />
          <image href={`${ASSET_BASE}/vegetation/treeSmall_green2.png`} x="860" y="640" width="40" height="54" />
          <image href={`${ASSET_BASE}/vegetation/tree.png`} x="100" y="580" width="46" height="64" />

          {/* Upper campus alpine grove near Summit */}
          <image href={`${ASSET_BASE}/vegetation/treePine.png`} x="220" y="130" width="44" height="105" />
          <image href={`${ASSET_BASE}/vegetation/treePine.png`} x="740" y="130" width="44" height="105" />
          <image href={`${ASSET_BASE}/vegetation/treeSmall_green1.png`} x="320" y="60" width="36" height="50" />
          <image href={`${ASSET_BASE}/vegetation/treeSmall_green3.png`} x="640" y="60" width="36" height="50" />

          {/* Campus Wildlife (Kenney Duck on creek) */}
          <image href={`${ASSET_BASE}/animals/duck.png`} x="280" y="680" width="30" height="30" />
          <image href={`${ASSET_BASE}/animals/owl.png`} x="105" y="570" width="24" height="24" />
        </svg>

        {/* ----------------------------------------------------------- */}
        {/* 3. CAMPUS SECRETS & COLLECTIBLES                            */}
        {/* ----------------------------------------------------------- */}
        {CAMPUS_SECRETS.map((secret) => {
          const isDiscovered = (progress.foundCampusSecrets || []).includes(secret.id);

          return (
            <div
              key={secret.id}
              className="absolute z-20"
              style={{ left: `${secret.pos.x}%`, top: `${secret.pos.y}%` }}
            >
              <ClassroomCampusSecret
                config={secret}
                isDiscovered={isDiscovered}
                onDiscover={onDiscoverSecret}
              />
            </div>
          );
        })}

        {/* ----------------------------------------------------------- */}
        {/* 4. BYTE CAMPUS KIOSK EASTER EGG (Visitor Information Booth) */}
        {/* ----------------------------------------------------------- */}
        <div
          onClick={handleByteCampusClick}
          className="absolute z-30 cursor-pointer animate-float transition-transform hover:scale-125 select-none"
          style={{ left: '68%', top: '91%' }}
          title="¡Hola! Soy Byte en el Puesto de Información del Campus."
        >
          <div className="relative">
            <Byte
              mood={isAllCompleted ? 'baile' : 'saludo'}
              size="sm"
              worldId={nextLevelId}
              interactive={true}
              showSpeaker={false}
            />
            <span className="absolute -bottom-2 -left-2 bg-amber-400 text-slate-950 font-display font-bold text-[8px] px-1.5 py-0.5 rounded-full shadow">
              Info ℹ️
            </span>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* 5. TEN LEVEL CAMPUS ZONE STATIONS (Interactive Buttons)     */}
        {/* ----------------------------------------------------------- */}
        {LEVELS_CONFIG.map((level) => {
          const coords =
            CAMPUS_STATIONS_COORDINATES[level.id] || {
              x: 50,
              y: 50,
              title: level.shortTitle,
              zoneName: 'Zona',
              labelPos: 'right',
            };
          const isCompleted = progress.completedLevels.includes(level.id);
          const isUnlocked =
            level.id === 1 || progress.completedLevels.includes(level.id - 1);
          const isCurrent = isUnlocked && !isCompleted;
          const isSummit = level.id === 10;
          const isClasitoHere = isCurrent || (isAllCompleted && level.id === 10);

          return (
            <div
              key={level.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 select-none group"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              {/* Clasito Mascot Pin positioned over the active station */}
              {isClasitoHere && (
                <div
                  className="absolute -top-12 -right-8 sm:-top-14 sm:-right-10 z-30 animate-bounce-gentle"
                  title="¡Estás en este nivel!"
                >
                  <Clasito
                    mood={isCompleted ? 'celebrating' : 'motivating'}
                    size="sm"
                    grade={progress.grade}
                  />
                  <span className="absolute -bottom-2 -left-2 bg-amber-400 text-slate-950 font-display font-bold text-[9px] px-1.5 rounded-full shadow">
                    ¡Acá! 👇
                  </span>
                </div>
              )}

              {/* Station Landmark Button Card */}
              <div
                id={`classroom-station-${level.id}`}
                onClick={() => handleLevelClick(level.id, isUnlocked)}
                className={`relative rounded-3xl p-2 sm:p-3.5 border-4 transition-all duration-300 cursor-pointer flex items-center gap-2 sm:gap-2.5 shadow-xl ${
                  isSummit ? 'w-48 sm:w-60' : 'w-38 sm:w-52'
                } ${
                  isCompleted
                    ? 'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-400 dark:border-emerald-500 shadow-emerald-500/20 hover:scale-105'
                    : isCurrent
                    ? 'bg-white/95 dark:bg-slate-900/95 border-amber-400 ring-4 ring-amber-300/60 animate-pulse-glow hover:scale-105'
                    : 'bg-slate-200/85 dark:bg-slate-900/80 border-slate-300 dark:border-slate-800 opacity-65 hover:opacity-85'
                }`}
              >
                {/* Station Icon Portal */}
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-lg sm:text-2xl shadow-md flex-shrink-0 transition-transform ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-amber-400 text-slate-950 animate-bounce-gentle'
                      : 'bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                  }`}
                >
                  {isUnlocked ? level.icon : '🔒'}
                </div>

                {/* Level Title & Zone Tag */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 truncate font-display">
                      {isSummit ? 'Nivel Final 10' : `Nivel ${level.id}`}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    )}
                  </div>

                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight truncate font-display">
                    {coords.title}
                  </h4>

                  {/* Status Indicator */}
                  <span
                    className={`inline-block mt-0.5 text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.2 rounded-full font-body ${
                      isCompleted
                        ? 'bg-emerald-200/80 text-emerald-900 dark:bg-emerald-900/80 dark:text-emerald-200'
                        : isCurrent
                        ? 'bg-amber-400 text-slate-950 font-bold animate-pulse'
                        : 'bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {isCompleted
                      ? '✓ Superado'
                      : isCurrent
                      ? '⭐ ¡Entrar!'
                      : '🔒 Bloqueado'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
