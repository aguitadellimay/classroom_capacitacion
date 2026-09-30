import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { LabProgress, LabWorldConfig } from '../../types/lab';
import { LAB_WORLDS_CONFIG, LAB_TREASURE_CHESTS, LAB_MAP_SECRETS } from '../../data/labData';
import { soundManager } from '../../utils/sound';
import { Byte } from './Byte';
import { LabTreasureChest } from './LabTreasureChest';
import { LabMapSecret } from './LabMapSecret';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  Play,
} from 'lucide-react';

interface LabIslandMapProps {
  studentName: string;
  labProgress: LabProgress;
  onSelectWorld: (worldId: number) => void;
  onOpenChest: (chestId: string, bonusStars: number) => void;
  onDiscoverSecret: (secretId: string, bonusStars: number) => void;
}

// Coordinate layout for the 7 worlds on the island (Percentage X, Y on 1000x1350 canvas)
const BIOME_COORDINATES: Record<number, { x: number; y: number; labelPos: 'left' | 'right' | 'top' | 'bottom' }> = {
  1: { x: 26, y: 88, labelPos: 'right' }, // Bosque de los Equipos (Start - Bottom Left)
  2: { x: 74, y: 76, labelPos: 'left' },  // Reino del Orden (Bottom Right)
  3: { x: 28, y: 62, labelPos: 'right' }, // Fortaleza Digital (Mid Left)
  4: { x: 72, y: 48, labelPos: 'left' },  // Valle de la Seguridad (Mid Right)
  5: { x: 26, y: 34, labelPos: 'right' }, // Reino de los Compañeros (Upper Left)
  6: { x: 74, y: 22, labelPos: 'left' },  // Portal Responsable (Upper Right)
  7: { x: 50, y: 8,  labelPos: 'bottom' },// La Gran Sala (Summit - Top Center)
};

// Base path for public assets (compatible with Vite subpath deployment)
const ASSET_BASE = `${import.meta.env.BASE_URL}assets/map`;

export const LabIslandMap: React.FC<LabIslandMapProps> = ({
  studentName,
  labProgress,
  onSelectWorld,
  onOpenChest,
  onDiscoverSecret,
}) => {
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);
  const [byteClickCount, setByteClickCount] = useState(0);

  // Identify next available world
  const nextWorldId = useMemo(() => {
    for (let id = 1; id <= 7; id++) {
      if (!labProgress.completedWorlds.includes(id)) {
        return id;
      }
    }
    return 7; // All completed
  }, [labProgress.completedWorlds]);

  const nextWorldConfig = LAB_WORLDS_CONFIG.find((w) => w.id === nextWorldId) || LAB_WORLDS_CONFIG[0];
  const isAllConquered = labProgress.completedWorlds.includes(7);

  // Handle clicking a world biome
  const handleBiomeClick = (world: LabWorldConfig, isUnlocked: boolean) => {
    if (!isUnlocked) {
      soundManager.playClick();
      setLockedNotice(`¡Ese territorio todavía está bloqueado! Primero completá la misión anterior para habilitar el camino.`);
      return;
    }
    setLockedNotice(null);
    soundManager.playClick();
    onSelectWorld(world.id);
  };

  // Easter Egg on Byte: Click Byte 4 times in a row!
  const handleByteIslandClick = () => {
    const nextCount = byteClickCount + 1;
    setByteClickCount(nextCount);

    if (nextCount >= 4) {
      soundManager.playSecretFound();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
      onDiscoverSecret('secret_byte_tickle', 1);
      setLockedNotice(`🤖 ¡Jajaja! ¡Encontraste las cosquillas secretas de Byte! Byte ejecuta su baile especial y te regala +1 estrella. ⭐`);
      setByteClickCount(0);
    } else {
      soundManager.playByteClick();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl sm:rounded-4xl p-2 sm:p-5 overflow-hidden shadow-2xl border-4 border-teal-500/40 dark:border-teal-700/50 bg-gradient-to-b from-sky-400 via-teal-500 to-indigo-900 dark:from-slate-900 dark:via-cyan-950 dark:to-slate-950 transition-colors select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP QUICK ACTION BANNER: "CONTINUAR AVENTURA"               */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-30 mb-3 sm:mb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-emerald-400 dark:border-emerald-600 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-pop-in">
        
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0 animate-bounce-gentle">
            {nextWorldConfig.icon}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAllConquered ? `¡Misión Completa, ${studentName}! 🏆` : `Misión de ${studentName} en la Isla`}</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              {isAllConquered ? 'La Gran Sala de los Guardianes 🏆' : `Mundo ${nextWorldId}: ${nextWorldConfig.name}`}
            </h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:block">
              {isAllConquered
                ? '¡Completaste toda la isla! Podés repasar o ver tu diploma.'
                : nextWorldConfig.subtitle}
            </p>
          </div>
        </div>

        {/* Big Action Button */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onSelectWorld(nextWorldId);
          }}
          className="btn-game-primary bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black px-6 sm:px-8 py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition w-full sm:w-auto"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{isAllConquered ? 'REPASAR GRAN SALA 🏆' : 'CONTINUAR AVENTURA ▶️'}</span>
        </button>
      </div>

      {/* Locked or Easter Egg Notice Toast (Floating overlay via portal) */}
      {lockedNotice && createPortal(
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] bg-slate-950/95 text-white border-2 border-amber-400 p-4 rounded-3xl shadow-2xl flex items-center justify-between gap-3 animate-pop-in no-print">
          <div className="flex items-center gap-3">
            <span className="text-3xl flex-shrink-0 animate-bounce-gentle">🤖</span>
            <div>
              <p className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Aviso de Byte</p>
              <p className="text-xs sm:text-sm font-bold text-slate-100 leading-snug">{lockedNotice}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLockedNotice(null)}
            className="text-xs bg-amber-400 text-slate-950 font-black px-3 py-1.5 rounded-xl hover:bg-amber-300 transition cursor-pointer flex-shrink-0 shadow"
          >
            Entendido
          </button>
        </div>,
        document.body
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. THE ISLAND MAP CANVAS (Layered 2D Illustrated Game World)   */}
      {/* ------------------------------------------------------------- */}
      <div className="relative w-full aspect-[1/1.35] sm:aspect-[1/1.25] rounded-2xl sm:rounded-3xl overflow-hidden shadow-inner border border-white/20">
        
        {/* Ocean Waves Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-teal-500 to-sky-600 dark:from-slate-950 dark:via-teal-950 dark:to-slate-900">
          {/* Animated decorative water ripples */}
          <div className="absolute inset-0 opacity-25 dark:opacity-15 pointer-events-none">
            <div className="absolute top-10 left-12 text-3xl animate-float">🌊</div>
            <div className="absolute top-36 right-8 text-2xl animate-float" style={{ animationDelay: '1.2s' }}>⛵</div>
            <div className="absolute bottom-40 left-8 text-2xl animate-float" style={{ animationDelay: '0.8s' }}>🐬</div>
            <div className="absolute bottom-16 right-16 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>🌊</div>
          </div>
        </div>

        {/* The Island Landmass (Layered Rich SVG World Map) */}
        <svg
          viewBox="0 0 1000 1350"
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-2xl"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Shallow Coastal Reef */}
            <linearGradient id="shallowReef" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.45" />
            </linearGradient>

            {/* Sand beach gradient */}
            <linearGradient id="sandGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="35%" stopColor="#fde047" />
              <stop offset="80%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Lowland coastal grass */}
            <linearGradient id="grassLowland" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="85%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Elevated Plateau grass */}
            <linearGradient id="grassPlateau" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="80%" stopColor="#059669" />
              <stop offset="100%" stopColor="#065f46" />
            </linearGradient>

            {/* River & lake water */}
            <linearGradient id="riverWater" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Lake deep basin gradient */}
            <radialGradient id="lakeDepth" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="60%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#67e8f9" />
            </radialGradient>

            {/* Mountain 3D sunny facet gradient */}
            <linearGradient id="mountainSunny" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            {/* Mountain 3D shadow facet gradient */}
            <linearGradient id="mountainShadow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            {/* Mountain foothill contour */}
            <linearGradient id="mountainFoothill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Bridge wood */}
            <linearGradient id="bridgeWood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="50%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>

            {/* Portal Gradient */}
            <linearGradient id="portalEnergy" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>

            {/* Citadel Gold */}
            <linearGradient id="citadelGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="80%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            {/* Ground shadow filter for sprite elements */}
            <filter id="spriteShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
            </filter>

            {/* Path Glow filter */}
            <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Soft drop shadow */}
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* ========================================================= */}
          {/* 1. LAYER 1: OCEAN SHALLOWS & REEF RIM                    */}
          {/* ========================================================= */}
          <path
            d="M 500 20
               C 890 35, 980 230, 955 450
               C 935 620, 975 780, 935 990
               C 895 1200, 760 1345, 500 1350
               C 240 1345, 105 1200, 65 990
               C 25 780, 65 620, 45 450
               C 20 230, 110 35, 500 20 Z"
            fill="url(#shallowReef)"
          />

          {/* Animated Water Ripples at Sea */}
          <g opacity="0.45" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M 80 180 q 20 -8 40 0" className="animate-water-ripple" />
            <path d="M 120 340 q 25 -10 50 0" className="animate-water-ripple" style={{ animationDelay: '1.2s' }} />
            <path d="M 860 380 q 22 -8 45 0" className="animate-water-ripple" style={{ animationDelay: '0.7s' }} />
            <path d="M 880 770 q 25 -10 50 0" className="animate-water-ripple" style={{ animationDelay: '1.8s' }} />
            <path d="M 110 930 q 20 -8 40 0" className="animate-water-ripple" style={{ animationDelay: '1.4s' }} />
          </g>

          {/* SATELLITE ISLETS IN SEA */}
          {/* Southwest Islet: Palm paradise with Kenney Palm & Parrot */}
          <g transform="translate(60, 1180)">
            <ellipse cx="60" cy="50" rx="58" ry="34" fill="#fde047" stroke="#ca8a04" strokeWidth="2" filter="url(#softShadow)" />
            <ellipse cx="58" cy="48" rx="44" ry="24" fill="#10b981" />
            {/* Ground shadow for palm */}
            <ellipse cx="45" cy="52" rx="14" ry="5" fill="#064e3b" opacity="0.3" />
            {/* Kenney Palm Tree */}
            <image
              href={`${ASSET_BASE}/vegetation/treePalm.png`}
              x="12"
              y="-10"
              width="68"
              height="81"
            />
            {/* Kenney Parrot */}
            <g transform="translate(58, 22)">
              <g className="animate-gentle-sway">
                <image
                  href={`${ASSET_BASE}/animals/parrot.png`}
                  x="0"
                  y="0"
                  width="28"
                  height="28"
                />
              </g>
            </g>
            <text x="68" y="62" fontSize="14" className="select-none">🦀</text>
          </g>

          {/* Southeast Islet: Sea Shell Haven with Kenney Palm */}
          <g transform="translate(860, 1140)">
            <ellipse cx="40" cy="40" rx="46" ry="28" fill="#fde047" stroke="#ca8a04" strokeWidth="2" filter="url(#softShadow)" />
            <ellipse cx="38" cy="38" rx="32" ry="18" fill="#34d399" />
            <image
              href={`${ASSET_BASE}/vegetation/treePalm.png`}
              x="16"
              y="-2"
              width="50"
              height="60"
            />
            <text x="24" y="48" fontSize="16" className="select-none">🐚</text>
          </g>

          {/* Sea turtle swimming in the west bay */}
          <g transform="translate(45, 680)">
            <g className="animate-duck-swim">
              <text x="0" y="0" fontSize="24" className="select-none opacity-85">🐢</text>
            </g>
          </g>

          {/* Sailboat gliding peacefully */}
          <g transform="translate(885, 520)">
            <g className="animate-gentle-sway">
              <text x="0" y="0" fontSize="26" className="select-none opacity-90">⛵</text>
            </g>
          </g>

          {/* ========================================================= */}
          {/* 2. LAYER 2: MAIN ISLAND SHORELINE & LOWLAND TERRAIN      */}
          {/* ========================================================= */}
          {/* The Main Island: Golden Sand Beach Coastline */}
          <path
            d="M 500 50
               C 850 70, 930 250, 910 450
               C 890 600, 930 750, 890 950
               C 850 1150, 720 1300, 500 1310
               C 280 1300, 150 1150, 110 950
               C 70 750, 110 600, 90 450
               C 70 250, 150 70, 500 50 Z"
            fill="url(#sandGradient)"
            filter="url(#softShadow)"
          />

          {/* Coastline foam fringe */}
          <path
            d="M 500 56
               C 840 76, 920 250, 902 448
               C 882 596, 922 744, 882 942
               C 842 1140, 714 1290, 500 1300
               C 286 1290, 158 1140, 118 942
               C 78 744, 118 596, 98 448
               C 78 250, 158 76, 500 56 Z"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.5"
            opacity="0.45"
          />

          {/* Main Lush Grass Plate (Lowlands & Meadows) */}
          <path
            d="M 500 76
               C 815 96, 885 260, 865 440
               C 845 580, 885 730, 845 920
               C 805 1100, 685 1250, 500 1260
               C 315 1250, 195 1100, 155 920
               C 115 730, 155 580, 135 440
               C 115 260, 185 96, 500 76 Z"
            fill="url(#grassLowland)"
          />

          {/* Tier 2: Elevated Central Highland Plateau */}
          {/* Shaded Cliff edge beneath Plateau */}
          <path
            d="M 500 202
               C 760 222, 810 342, 800 492
               C 790 632, 810 752, 760 892
               C 710 972, 600 1032, 500 1032
               C 400 1032, 290 972, 240 892
               C 190 752, 210 632, 200 492
               C 190 342, 240 222, 500 202 Z"
            fill="#064e3b"
            opacity="0.38"
          />
          {/* Plateau Green Surface */}
          <path
            d="M 500 190
               C 760 210, 810 330, 800 480
               C 790 620, 810 740, 760 880
               C 710 960, 600 1020, 500 1020
               C 400 1020, 290 960, 240 880
               C 190 740, 210 620, 200 480
               C 190 330, 240 210, 500 190 Z"
            fill="url(#grassPlateau)"
          />

          {/* ========================================================= */}
          {/* 3. LAYER 3: GROUND-ANCHORED 3D ILLUSTRATED MOUNTAINS      */}
          {/* ========================================================= */}

          {/* --- SUMMIT MOUNTAIN BLUFF (Highlands behind Mundo 7) --- */}
          <g>
            {/* Shaded base contour for summit peaks */}
            <path
              d="M 280 120 Q 500 150 720 120 Q 500 80 280 120 Z"
              fill="#064e3b"
              opacity="0.3"
            />
            {/* Left Summit Mountain Peak */}
            <polygon points="310,135 385,45 460,135" fill="url(#mountainSunny)" stroke="#1e293b" strokeWidth="3" />
            <polygon points="385,45 460,135 385,135" fill="url(#mountainShadow)" stroke="#1e293b" strokeWidth="2" />
            <polygon points="385,45 365,75 385,70 405,75" fill="#f8fafc" />

            {/* Right Summit Mountain Peak */}
            <polygon points="540,135 615,45 690,135" fill="url(#mountainSunny)" stroke="#1e293b" strokeWidth="3" />
            <polygon points="615,45 690,135 615,135" fill="url(#mountainShadow)" stroke="#1e293b" strokeWidth="2" />
            <polygon points="615,45 595,75 615,70 635,75" fill="#f8fafc" />
          </g>

          {/* --- EAST CANYON MOUNTAINS (Mundo 4 - Valle de la Seguridad) --- */}
          {/* A majestic 2-peak rocky mountain that organically emerges from the terrain */}
          <g>
            {/* 1. Shaded foothill ground base that binds the mountain into the grass */}
            <ellipse cx="730" cy="565" rx="140" ry="25" fill="#064e3b" opacity="0.35" />
            
            {/* 2. Secondary Peak (Left, Behind) */}
            <g>
              <polygon points="590,560 665,420 740,560" fill="url(#mountainSunny)" stroke="#1e293b" strokeWidth="3.5" strokeLinejoin="round" />
              <polygon points="665,420 740,560 665,560" fill="url(#mountainShadow)" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Snowcap on secondary peak */}
              <polygon points="665,420 645,465 658,458 665,468 678,455 688,465" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              {/* Internal rock crags */}
              <line x1="665" y1="468" x2="665" y2="540" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="665" y1="490" x2="690" y2="520" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* 3. Primary Grand Peak (Right, Foreground) */}
            <g>
              <polygon points="660,570 755,365 850,570" fill="url(#mountainSunny)" stroke="#1e293b" strokeWidth="4" strokeLinejoin="round" />
              <polygon points="755,365 850,570 755,570" fill="url(#mountainShadow)" stroke="#1e293b" strokeWidth="3" strokeLinejoin="round" />
              {/* Snowcap on grand peak */}
              <polygon points="755,365 725,425 742,415 755,430 772,412 790,428" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
              {/* Rocky ridges and cracks */}
              <line x1="755" y1="430" x2="755" y2="555" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
              <line x1="755" y1="460" x2="800" y2="510" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="755" y1="500" x2="720" y2="535" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
              <line x1="755" y1="515" x2="790" y2="550" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* 4. Grassy foothill terrace overlapping base to ground the mountain into the meadow */}
            <path
              d="M 585 565
                 C 640 550, 730 555, 780 550
                 C 820 545, 855 558, 865 572
                 C 840 585, 760 588, 690 585
                 C 630 582, 595 575, 585 565 Z"
              fill="url(#grassPlateau)"
              stroke="#047857"
              strokeWidth="2.5"
            />
          </g>

          {/* ========================================================= */}
          {/* 4. LAYER 4: WATER SYSTEM (Waterfall, River, Lake & Bridge)*/}
          {/* ========================================================= */}

          {/* Waterfall Cliff Cleft (Emerging from the mountain base at 655, 500) */}
          <rect x="636" y="505" width="28" height="65" rx="6" fill="#0284c7" opacity="0.6" />
          
          {/* Animated Falling Waterfall Streams */}
          <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" className="animate-waterfall">
            <line x1="643" y1="505" x2="643" y2="570" />
            <line x1="650" y1="505" x2="650" y2="570" />
            <line x1="657" y1="505" x2="657" y2="570" />
          </g>
          {/* Waterfall Pool Splash Foam & Mist */}
          <ellipse cx="650" cy="572" rx="24" ry="10" fill="#bae6fd" opacity="0.9" className="animate-pulse" />
          <text x="660" y="568" fontSize="16" className="select-none">💦</text>

          {/* Winding River: From Waterfall Pool to El Lago de los Guardianes */}
          <path
            d="M 650 572
               C 625 610, 585 640, 545 695"
            fill="none"
            stroke="url(#riverWater)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          {/* River bank contour shading */}
          <path
            d="M 664 576 C 638 616, 598 646, 558 702"
            fill="none"
            stroke="#047857"
            strokeWidth="3"
            opacity="0.5"
          />

          {/* EL LAGO DE LOS GUARDIANES (Central Organic Lake) */}
          <g>
            {/* Lake Shore Pebble & Sand Border (Irregular organic outline) */}
            <path
              d="M 390 760
                 C 400 700, 480 690, 550 710
                 C 610 730, 620 780, 590 830
                 C 560 880, 470 885, 410 850
                 C 375 825, 380 785, 390 760 Z"
              fill="#cbd5e1"
              stroke="#94a3b8"
              strokeWidth="3.5"
              filter="url(#softShadow)"
            />
            {/* Lake Water Surface Basin */}
            <path
              d="M 396 760
                 C 405 706, 478 696, 544 716
                 C 600 734, 612 778, 584 824
                 C 555 872, 472 876, 416 844
                 C 382 822, 386 784, 396 760 Z"
              fill="url(#lakeDepth)"
              stroke="#67e8f9"
              strokeWidth="2.5"
            />

            {/* Subtle Water Ripples on Lake */}
            <g opacity="0.65" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d="M 450 740 q 16 -6 32 0" className="animate-water-ripple" />
              <path d="M 500 805 q 16 -6 32 0" className="animate-water-ripple" style={{ animationDelay: '1.5s' }} />
              <path d="M 430 790 q 14 -5 28 0" className="animate-water-ripple" style={{ animationDelay: '0.8s' }} />
            </g>

            {/* Water Lilies & Lotus Blossom */}
            <g transform="translate(425, 745)">
              <ellipse cx="0" cy="0" rx="14" ry="8" fill="#15803d" />
              <path d="M 0 0 L 10 -4" stroke="#047857" strokeWidth="1.5" />
              <circle cx="8" cy="-2" r="4.5" fill="#f472b6" /> {/* Pink water lotus */}
            </g>
            <g transform="translate(535, 795)">
              <ellipse cx="0" cy="0" rx="13" ry="7" fill="#15803d" />
            </g>

            {/* Real Illustrated Kenney Duck Swimming with Realistic Wake */}
            <g transform="translate(460, 765)">
              <g className="animate-duck-swim">
                {/* Wake ripples behind duck */}
                <path d="M -14 18 L -32 24 M -14 18 L -32 12" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" strokeLinecap="round" />
                <image
                  href={`${ASSET_BASE}/animals/duck.png`}
                  x="-12"
                  y="-10"
                  width="42"
                  height="42"
                />
              </g>
            </g>

            {/* Real Illustrated Kenney Frog perched on lakeside stone */}
            <g transform="translate(545, 735)">
              <g className="animate-bounce-gentle">
                {/* River stone */}
                <ellipse cx="15" cy="22" rx="16" ry="8" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
                <image
                  href={`${ASSET_BASE}/animals/frog.png`}
                  x="0"
                  y="0"
                  width="30"
                  height="33"
                />
              </g>
            </g>
          </g>

          {/* River Delta: From Lake to Southern Sea */}
          <path
            d="M 490 842
               C 490 920, 520 980, 500 1080
               C 490 1140, 510 1200, 500 1260"
            fill="none"
            stroke="url(#riverWater)"
            strokeWidth="34"
            strokeLinecap="round"
          />
          {/* River Water Ripple Highlights */}
          <path
            d="M 505 920 Q 515 950 500 980 M 500 1150 Q 510 1180 495 1210"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            opacity="0.6"
            strokeLinecap="round"
            className="animate-pulse"
          />

          {/* ========================================================= */}
          {/* 5. LAYER 5: THE ADVENTURE ROAD                           */}
          {/* ========================================================= */}
          {/* Base Earth Trail */}
          <path
            d="M 260 1188
               C 380 1160, 430 1080, 500 1080
               C 580 1080, 660 1070, 740 1026
               C 850 960, 560 910, 480 870
               C 380 820, 220 860, 280 837
               C 360 810, 520 730, 600 680
               C 680 640, 780 670, 720 648
               C 640 620, 400 520, 260 459
               C 160 410, 480 340, 620 320
               C 700 310, 780 330, 740 297
               C 680 250, 580 190, 500 118"
            fill="none"
            stroke="#92400e"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
          />
          {/* Sun-baked Gravel Trail Surface */}
          <path
            d="M 260 1188
               C 380 1160, 430 1080, 500 1080
               C 580 1080, 660 1070, 740 1026
               C 850 960, 560 910, 480 870
               C 380 820, 220 860, 280 837
               C 360 810, 520 730, 600 680
               C 680 640, 780 670, 720 648
               C 640 620, 400 520, 260 459
               C 160 410, 480 340, 620 320
               C 700 310, 780 330, 740 297
               C 680 250, 580 190, 500 118"
            fill="none"
            stroke="#fde68a"
            strokeWidth="22"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* Stepping Stones / Cobblestones along road */}
          <g fill="#d97706" opacity="0.6">
            <ellipse cx="330" cy="1155" rx="5" ry="3" />
            <ellipse cx="400" cy="1115" rx="4" ry="3" />
            <ellipse cx="610" cy="1065" rx="5" ry="3" />
            <ellipse cx="680" cy="1045" rx="4" ry="3" />
            <ellipse cx="430" cy="855" rx="5" ry="4" />
            <ellipse cx="460" cy="710" rx="4" ry="3" />
            <ellipse cx="540" cy="660" rx="5" ry="3" />
            <ellipse cx="380" cy="485" rx="4" ry="3" />
            <ellipse cx="660" cy="315" rx="5" ry="3" />
          </g>

          {/* ========================================================= */}
          {/* 6. LAYER 6: THE GREAT TIMBER BRIDGE                      */}
          {/* ========================================================= */}
          {/* Rendered directly over the river crossing */}
          <g transform="translate(458, 1058)">
            {/* Bridge Stone Piers in water */}
            <rect x="2" y="2" width="84" height="44" rx="6" fill="#1e293b" opacity="0.75" />
            {/* Wooden Deck Planks */}
            <rect x="0" y="0" width="88" height="44" rx="4" fill="url(#bridgeWood)" stroke="#451a03" strokeWidth="3" />
            {/* Plank separator lines */}
            <line x1="18" y1="0" x2="18" y2="44" stroke="#451a03" strokeWidth="2.5" />
            <line x1="36" y1="0" x2="36" y2="44" stroke="#451a03" strokeWidth="2.5" />
            <line x1="54" y1="0" x2="54" y2="44" stroke="#451a03" strokeWidth="2.5" />
            <line x1="72" y1="0" x2="72" y2="44" stroke="#451a03" strokeWidth="2.5" />
            {/* Wooden Railing Posts */}
            <rect x="-2" y="-5" width="7" height="54" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <rect x="83" y="-5" width="7" height="54" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            {/* Railing Ropes / Fence */}
            <line x1="0" y1="-2" x2="88" y2="-2" stroke="#facc15" strokeWidth="3" />
            <line x1="0" y1="46" x2="88" y2="46" stroke="#facc15" strokeWidth="3" />
          </g>

          {/* Active Progress Glowing Trail Overlay */}
          <path
            d="M 260 1188
               C 380 1160, 430 1080, 500 1080
               C 580 1080, 660 1070, 740 1026
               C 850 960, 560 910, 480 870
               C 380 820, 220 860, 280 837
               C 360 810, 520 730, 600 680
               C 680 640, 780 670, 720 648
               C 640 620, 400 520, 260 459
               C 160 410, 480 340, 620 320
               C 700 310, 780 330, 740 297
               C 680 250, 580 190, 500 118"
            fill="none"
            stroke="#ffffff"
            strokeWidth="7"
            strokeDasharray="16 12"
            strokeLinecap="round"
            className="animate-pulse"
            opacity="0.95"
            filter="url(#pathGlow)"
          />

          {/* ========================================================= */}
          {/* 7. LAYER 7: KENNEY FOLIAGE, BUILDINGS & BIOME LANDMARKS   */}
          {/* ========================================================= */}

          {/* --------------------------------------------------------- */}
          {/* MUNDO 1: EL BOSQUE DE LOS EQUIPOS (Southwest Woodland)    */}
          {/* --------------------------------------------------------- */}
          <g>
            {/* Ground tree shadows */}
            <ellipse cx="120" cy="1180" rx="22" ry="7" fill="#064e3b" opacity="0.3" />
            <ellipse cx="160" cy="1135" rx="20" ry="6" fill="#064e3b" opacity="0.3" />
            <ellipse cx="375" cy="1185" rx="22" ry="7" fill="#064e3b" opacity="0.3" />
            <ellipse cx="260" cy="1075" rx="22" ry="7" fill="#064e3b" opacity="0.3" />

            {/* Left Forest Border (Kenney Trees) */}
            <image
              href={`${ASSET_BASE}/vegetation/tree.png`}
              x="95"
              y="1100"
              width="50"
              height="108"
            />
            <image
              href={`${ASSET_BASE}/vegetation/treeSmall_green1.png`}
              x="145"
              y="1085"
              width="30"
              height="64"
            />
            <image
              href={`${ASSET_BASE}/vegetation/treeSmall_green2.png`}
              x="85"
              y="1180"
              width="34"
              height="100"
            />

            {/* Upper Forest Canopy (Above card) */}
            <image
              href={`${ASSET_BASE}/vegetation/tree.png`}
              x="235"
              y="1010"
              width="48"
              height="104"
            />
            <image
              href={`${ASSET_BASE}/vegetation/treePine.png`}
              x="295"
              y="1005"
              width="45"
              height="108"
            />

            {/* Right Forest Flank */}
            <image
              href={`${ASSET_BASE}/vegetation/tree.png`}
              x="350"
              y="1110"
              width="48"
              height="104"
            />
            <image
              href={`${ASSET_BASE}/vegetation/bush1.png`}
              x="345"
              y="1200"
              width="52"
              height="26"
            />

            {/* Real Illustrated Kenney Rabbit in forest clearing */}
            <g transform="translate(130, 1195)">
              <g className="animate-bounce-gentle">
                {/* Little ground shadow */}
                <ellipse cx="18" cy="40" rx="14" ry="5" fill="#064e3b" opacity="0.25" />
                <image
                  href={`${ASSET_BASE}/animals/rabbit.png`}
                  x="0"
                  y="0"
                  width="34"
                  height="46"
                />
              </g>
            </g>

            {/* Forest Floor Details: Mossy Log, Mushrooms & Flowers */}
            <ellipse cx="370" cy="1225" rx="18" ry="6" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
            <text x="360" y="1220" fontSize="14" className="select-none">🍄</text>
            <text x="175" y="1255" fontSize="16" className="select-none">🍄</text>
            <text x="210" y="1120" fontSize="14" className="select-none">🌼</text>

            {/* Fluttering Blue Butterfly */}
            <g transform="translate(290, 1100)">
              <g className="animate-butterfly-glide">
                <text x="0" y="0" fontSize="20" className="select-none">🦋</text>
              </g>
            </g>
          </g>

          {/* --------------------------------------------------------- */}
          {/* MUNDO 2: EL REINO DEL ORDEN (Southeast Manicured Gardens) */}
          {/* --------------------------------------------------------- */}
          <g>
            {/* Kenney Garden Fences framing the area */}
            <image
              href={`${ASSET_BASE}/buildings/fence.png`}
              x="635"
              y="930"
              width="55"
              height="41"
            />
            <image
              href={`${ASSET_BASE}/buildings/fence.png`}
              x="810"
              y="930"
              width="55"
              height="41"
            />

            {/* Symmetrical Topiary Shrubs & Trees */}
            <image
              href={`${ASSET_BASE}/vegetation/treeSmall_green3.png`}
              x="715"
              y="915"
              width="36"
              height="58"
            />
            <image
              href={`${ASSET_BASE}/vegetation/treeSmall_green3.png`}
              x="770"
              y="915"
              width="36"
              height="58"
            />
            <image
              href={`${ASSET_BASE}/vegetation/bush2.png`}
              x="655"
              y="1100"
              width="38"
              height="32"
            />
            <image
              href={`${ASSET_BASE}/vegetation/bush2.png`}
              x="785"
              y="1100"
              width="38"
              height="32"
            />

            {/* Upper Flower Bed */}
            <g transform="translate(685, 960)">
              <text x="0" y="0" fontSize="16" className="select-none">🌷</text>
              <text x="22" y="0" fontSize="16" className="select-none">🌼</text>
              <text x="44" y="0" fontSize="16" className="select-none">🌷</text>
              <text x="66" y="0" fontSize="16" className="select-none">🌼</text>
              <text x="88" y="0" fontSize="16" className="select-none">🌷</text>
            </g>

            {/* Lower Flower Borders */}
            <g transform="translate(695, 1110)">
              <text x="0" y="0" fontSize="16" className="select-none">🌷</text>
              <text x="24" y="0" fontSize="16" className="select-none">🌼</text>
              <text x="48" y="0" fontSize="16" className="select-none">🌷</text>
            </g>

            {/* Park Bench & Decorative Lantern */}
            <text x="840" y="1035" fontSize="22" className="select-none">🪑</text>
            <text x="635" y="1035" fontSize="20" className="select-none">🏮</text>
            {/* Yellow Butterfly */}
            <g transform="translate(760, 970)">
              <g className="animate-butterfly-glide">
                <text x="0" y="0" fontSize="18" className="select-none">🦋</text>
              </g>
            </g>
          </g>

          {/* --------------------------------------------------------- */}
          {/* MUNDO 3: LA FORTALEZA DIGITAL (Mid-West Cyber Citadel)     */}
          {/* --------------------------------------------------------- */}
          <g>
            {/* Elevated Stone Fortress Terrace */}
            <rect x="200" y="775" width="160" height="24" fill="#334155" stroke="#1e293b" strokeWidth="2.5" rx="4" />
            
            {/* Kenney Castle Wall Sections */}
            <image
              href={`${ASSET_BASE}/buildings/castleWall.png`}
              x="200"
              y="745"
              width="45"
              height="45"
            />
            <image
              href={`${ASSET_BASE}/buildings/castleWall.png`}
              x="245"
              y="745"
              width="45"
              height="45"
            />

            {/* High Watchtower (Kenney Tower) */}
            <image
              href={`${ASSET_BASE}/buildings/tower.png`}
              x="330"
              y="715"
              width="45"
              height="151"
              filter="url(#spriteShadow)"
            />

            {/* Glowing Cyber Circuit Lines */}
            <path
              d="M 205 787 L 255 787 L 275 810 L 325 810 M 235 787 L 235 830 L 255 845"
              stroke="#22d3ee"
              strokeWidth="2.5"
              fill="none"
              opacity="0.8"
              className="animate-pulse"
            />
            <polygon points="345,710 355,685 365,710 355,735" fill="#22d3ee" className="animate-pulse" />
            <circle cx="355" cy="710" r="16" fill="#38bdf8" opacity="0.35" className="animate-pulse" />
            <text x="195" y="855" fontSize="20" className="select-none">🛡️</text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* MUNDO 4: EL VALLE DE LA SEGURIDAD (East Canyon Foliage)   */}
          {/* --------------------------------------------------------- */}
          <g>
            {/* Canyon Road Guardrails */}
            <line x1="680" y1="670" x2="790" y2="670" stroke="#ca8a04" strokeWidth="3" strokeDasharray="8 6" />
            <line x1="680" y1="676" x2="790" y2="676" stroke="#ca8a04" strokeWidth="2" strokeDasharray="8 6" />

            {/* Alpine Pines (Kenney) anchoring the mountain base */}
            <image
              href={`${ASSET_BASE}/vegetation/treePine.png`}
              x="780"
              y="515"
              width="48"
              height="115"
            />
            <image
              href={`${ASSET_BASE}/vegetation/treePine.png`}
              x="660"
              y="525"
              width="42"
              height="100"
            />
            <image
              href={`${ASSET_BASE}/vegetation/bush1.png`}
              x="710"
              y="565"
              width="45"
              height="22"
            />

            {/* Real Illustrated Kenney Bear resting peacefully in glade */}
            <g transform="translate(805, 625)">
              <g className="animate-gentle-sway">
                {/* Shadow */}
                <ellipse cx="20" cy="30" rx="18" ry="6" fill="#064e3b" opacity="0.3" />
                <image
                  href={`${ASSET_BASE}/animals/bear.png`}
                  x="0"
                  y="0"
                  width="40"
                  height="34"
                />
              </g>
            </g>

            {/* Safety Signs & Warning Marker */}
            <text x="645" y="660" fontSize="18" className="select-none">⚡</text>
            <text x="800" y="615" fontSize="18" className="select-none">⛰️</text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* MUNDO 5: EL REINO DE LOS COMPAÑEROS (Upper-West Village)  */}
          {/* --------------------------------------------------------- */}
          <g>
            {/* Village Cottages (Kenney House 1 & 2) */}
            <g filter="url(#spriteShadow)">
              <image
                href={`${ASSET_BASE}/buildings/house1.png`}
                x="150"
                y="360"
                width="65"
                height="70"
              />
              <image
                href={`${ASSET_BASE}/buildings/house2.png`}
                x="330"
                y="370"
                width="80"
                height="62"
              />
            </g>

            {/* Friendship Bunting Flags String */}
            <path d="M 215 390 Q 275 405 330 390" fill="none" stroke="#ca8a04" strokeWidth="2" />
            <polygon points="230,394 240,395 235,408" fill="#ef4444" />
            <polygon points="250,397 260,398 255,412" fill="#3b82f6" />
            <polygon points="270,399 280,399 275,414" fill="#eab308" />
            <polygon points="290,397 300,396 295,410" fill="#10b981" />
            <polygon points="310,394 320,392 315,406" fill="#ec4899" />

            {/* Village Picnic Area & Campfire */}
            <text x="210" y="475" fontSize="20" className="select-none">🏕️</text>
            <text x="320" y="475" fontSize="20" className="select-none">🪑</text>

            {/* Real Illustrated Kenney Owl perched high */}
            <g transform="translate(195, 345)">
              <g className="animate-bounce-gentle">
                <image
                  href={`${ASSET_BASE}/animals/owl.png`}
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                />
              </g>
            </g>
          </g>

          {/* --------------------------------------------------------- */}
          {/* MUNDO 6: EL PORTAL RESPONSABLE (Upper-East Celestial Ring)*/}
          {/* --------------------------------------------------------- */}
          <g>
            {/* Mystical Dais Base */}
            <ellipse cx="740" cy="265" rx="64" ry="36" fill="#312e81" stroke="#818cf8" strokeWidth="3" opacity="0.65" />
            {/* Swirling Portal Energy Ring */}
            <circle cx="740" cy="255" r="34" fill="url(#portalEnergy)" opacity="0.85" className="animate-aura-pulse" />
            <ellipse cx="740" cy="255" rx="30" ry="15" fill="#ffffff" opacity="0.8" className="animate-pulse" />
            {/* Floating Energy Crystals */}
            <g transform="translate(675, 235)">
              <g className="animate-bounce-gentle">
                <text x="0" y="0" fontSize="22" className="select-none">💎</text>
              </g>
            </g>
            <g transform="translate(795, 240)">
              <g className="animate-bounce-gentle" style={{ animationDelay: '1s' }}>
                <text x="0" y="0" fontSize="20" className="select-none">✨</text>
              </g>
            </g>
            <text x="730" y="262" fontSize="20" className="select-none">🌀</text>
          </g>

          {/* --------------------------------------------------------- */}
          {/* MUNDO 7: LA GRAN SALA (SUMMIT CITADEL ACADEMY)            */}
          {/* --------------------------------------------------------- */}
          {/* The Crowning Visual Goal: Elevated Grand Castle           */}
          <g transform="translate(500, 105)">
            {/* Radiant Sunburst Halo behind the Citadel */}
            <circle cx="0" cy="-20" r="100" fill="#fef08a" opacity="0.32" className="animate-pulse" />
            <circle cx="0" cy="-20" r="75" fill="#fef9c3" opacity="0.48" />

            {/* Floating Celestial Achievement Stars */}
            <g className="animate-gentle-sway">
              <text x="-95" y="-55" fontSize="24" className="select-none">⭐</text>
              <text x="75" y="-55" fontSize="24" className="select-none">⭐</text>
              <text x="-60" y="-85" fontSize="22" className="select-none">✨</text>
              <text x="40" y="-85" fontSize="22" className="select-none">✨</text>
              <text x="-12" y="-105" fontSize="26" className="select-none">👑</text>
            </g>

            {/* Citadel Base Foundation Terrace */}
            <polygon points="-110,40 -85,20 85,20 110,40 95,60 -95,60" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2.5" />

            {/* Imperial Marble Grand Staircase */}
            <polygon points="-45,60 -35,25 35,25 45,60" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
            {/* Royal Gold Carpet cascading down stairs */}
            <polygon points="-16,60 -12,25 12,25 16,60" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />

            {/* Kenney Castle Structure */}
            <image
              href={`${ASSET_BASE}/buildings/castleSmall.png`}
              x="-65"
              y="-45"
              width="130"
              height="102"
              filter="url(#spriteShadow)"
            />

            {/* Flanking Spire Watchtowers (Kenney towerSmall) */}
            <image
              href={`${ASSET_BASE}/buildings/towerSmall.png`}
              x="-98"
              y="-55"
              width="36"
              height="85"
            />
            <image
              href={`${ASSET_BASE}/buildings/towerSmall.png`}
              x="62"
              y="-55"
              width="36"
              height="85"
            />

            {/* Golden Pennant Flags atop spires */}
            <path d="M -80 -55 L -80 -68 L -96 -61 Z" fill="#2563eb" />
            <path d="M 80 -55 L 80 -68 L 96 -61 Z" fill="#2563eb" />

            {/* Golden Guardian Lions at stairs */}
            <text x="-62" y="55" fontSize="20" className="select-none">🦁</text>
            <text x="44" y="55" fontSize="20" className="select-none">🦁</text>
          </g>

          {/* ========================================================= */}
          {/* 8. LAYER 8: SKY LIFE & SOFT DRIFTING CLOUDS              */}
          {/* ========================================================= */}
          {/* Kenney Clouds Drifting gracefully across the sky */}
          <g opacity="0.38" className="animate-cloud-drift">
            <image
              href={`${ASSET_BASE}/sky/cloud1.png`}
              x="220"
              y="140"
              width="120"
              height="72"
            />
          </g>
          <g opacity="0.32" className="animate-cloud-drift" style={{ animationDelay: '14s' }}>
            <image
              href={`${ASSET_BASE}/sky/cloud2.png`}
              x="680"
              y="70"
              width="110"
              height="88"
            />
          </g>
          <g opacity="0.28" className="animate-cloud-drift" style={{ animationDelay: '7s' }}>
            <image
              href={`${ASSET_BASE}/sky/cloud3.png`}
              x="800"
              y="420"
              width="100"
              height="64"
            />
          </g>

          {/* Seagulls gliding peacefully */}
          <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" className="animate-float">
            <path d="M 190 280 q 10 -8 20 0 q 10 -8 20 0" />
            <path d="M 760 160 q 8 -6 16 0 q 8 -6 16 0" style={{ animationDelay: '1.5s' }} />
          </g>
        </svg>

        {/* ----------------------------------------------------------- */}
        {/* 3. OPTIONAL TREASURE CHESTS PLACED ON MAP                   */}
        {/* ----------------------------------------------------------- */}
        {LAB_TREASURE_CHESTS.map((chest) => {
          const isUnlocked = labProgress.completedWorlds.includes(chest.worldIdRequired);
          const isOpened = (labProgress.openedChests || []).includes(chest.id);

          return (
            <div
              key={chest.id}
              className="absolute z-20"
              style={{ left: `${chest.pos.x}%`, top: `${chest.pos.y}%` }}
            >
              <LabTreasureChest
                config={chest}
                isUnlocked={isUnlocked}
                isOpened={isOpened}
                onOpen={onOpenChest}
              />
            </div>
          );
        })}

        {/* ----------------------------------------------------------- */}
        {/* 4. OPTIONAL MAP SECRETS & EASTER EGGS                       */}
        {/* ----------------------------------------------------------- */}
        {LAB_MAP_SECRETS.map((secret) => {
          const isDiscovered = (labProgress.foundSecrets || []).includes(secret.id);

          return (
            <div
              key={secret.id}
              className="absolute z-20"
              style={{ left: `${secret.pos.x}%`, top: `${secret.pos.y}%` }}
            >
              <LabMapSecret
                config={secret}
                isDiscovered={isDiscovered}
                onDiscover={onDiscoverSecret}
              />
            </div>
          );
        })}

        {/* ----------------------------------------------------------- */}
        {/* 5. SEVEN WORLD BIOME LANDMARK STATIONS                      */}
        {/* ----------------------------------------------------------- */}
        {LAB_WORLDS_CONFIG.map((world) => {
          const coords = BIOME_COORDINATES[world.id] || { x: 50, y: 50, labelPos: 'right' };
          const isCompleted = labProgress.completedWorlds.includes(world.id);
          const isUnlocked = world.id === 1 || labProgress.completedWorlds.includes(world.id - 1);
          const isCurrent = isUnlocked && !isCompleted;
          const isSummit = world.id === 7;

          return (
            <div
              key={world.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 select-none group"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              {/* Byte Avatar Pin stationed beside the current active world */}
              {isCurrent && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleByteIslandClick();
                  }}
                  className="absolute -top-12 -right-10 z-30 cursor-pointer animate-dance-hop transition-transform hover:scale-125"
                  title="¡Soy Byte! Hacé clic en mí para una sorpresa."
                >
                  <Byte
                    mood={isAllConquered ? 'baile' : 'saludo'}
                    size="sm"
                    worldId={world.id}
                    interactive={true}
                    showSpeaker={false}
                  />
                  <span className="absolute -bottom-2 -left-2 bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 rounded-full shadow">
                    ¡Acá! 👇
                  </span>
                </div>
              )}

              {/* Station Landmark Button Card */}
              <div
                id={`lab-world-station-${world.id}`}
                onClick={() => handleBiomeClick(world, isUnlocked)}
                className={`relative rounded-3xl p-2.5 sm:p-4 border-4 transition-all duration-300 cursor-pointer flex items-center gap-2 sm:gap-3 shadow-xl ${
                  isSummit ? 'w-52 sm:w-64' : 'w-40 sm:w-56'
                } ${
                  isCompleted
                    ? 'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-400 dark:border-emerald-500 shadow-emerald-500/20 hover:scale-105'
                    : isCurrent
                    ? 'bg-white/95 dark:bg-slate-900/95 border-teal-400 ring-4 ring-teal-300/50 animate-pulse-glow hover:scale-105'
                    : 'bg-slate-200/85 dark:bg-slate-900/80 border-slate-300 dark:border-slate-800 opacity-65 hover:opacity-85'
                }`}
              >
                {/* Visual Icon Portal */}
                <div
                  className={`w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-3xl shadow-md flex-shrink-0 transition-transform ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : isCurrent
                      ? 'bg-teal-100 text-teal-800 animate-bounce-gentle'
                      : 'bg-slate-300 text-slate-500'
                  }`}
                >
                  {isUnlocked ? world.icon : '🔒'}
                </div>

                {/* World Title & Status */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 truncate">
                      {isSummit ? 'Mundo Final' : `Mundo ${world.id}`}
                    </span>
                    {isCompleted && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    )}
                  </div>

                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight truncate">
                    {world.name}
                  </h4>

                  {/* Status Indicator */}
                  <span
                    className={`inline-block mt-0.5 text-[9px] sm:text-[10px] font-extrabold px-2 py-0.2 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-200/80 text-emerald-900 dark:bg-emerald-900/80 dark:text-emerald-200'
                        : isCurrent
                        ? 'bg-teal-200 text-teal-950 font-black animate-pulse'
                        : 'bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {isCompleted ? '✓ Conquistado' : isCurrent ? '¡Explorar!' : '🔒 Bloqueado'}
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
