import React, { useState, useEffect } from 'react';
import type { ByteMood } from '../../types/lab';
import { soundManager } from '../../utils/sound';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface ByteProps {
  mood?: ByteMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  worldId?: number; // 1 to 6 to apply world-specific costume/accessory
  speechText?: string;
  interactive?: boolean;
  className?: string;
  showClickPrompt?: boolean;
  showSpeaker?: boolean;
  onInteract?: () => void;
}

const BYTE_RANDOM_QUOTES = [
  '¡Hola! Soy Byte, tu compañero guardián. ¿Listo para la misión?',
  'Recordá: una computadora también necesita que la cuidemos con cariño.',
  '¡Psst! ¿Sabías que podés hacer clic sobre mí para charlar?',
  '¿Viste ese camino? ¡Parece que lleva al próximo desafío!',
  '¡Juntos vamos a proteger toda la sala de informática!',
  'Un verdadero guardián siempre deja su lugar ordenado y la silla en su sitio.',
  'Los cables y enchufes se miran y se cuidan, ¡nunca se tiran!',
  '¡Qué lindo aprender tecnología con respeto y compañerismo!',
];

export const Byte: React.FC<ByteProps> = ({
  mood = 'idle',
  size = 'md',
  worldId = 1,
  speechText,
  interactive = true,
  className = '',
  showClickPrompt = false,
  showSpeaker = true,
  onInteract,
}) => {
  const [currentMood, setCurrentMood] = useState<ByteMood>(mood);
  const [activeSpeech, setActiveSpeech] = useState<string | undefined>(speechText);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasClickedOnce, setHasClickedOnce] = useState(false);
  const [clickAnim, setClickAnim] = useState<string>('');

  // Keep mood and speech in sync with props
  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  useEffect(() => {
    setActiveSpeech(speechText);
  }, [speechText]);

  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  // Click interaction on Byte
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!interactive) return;

    setHasClickedOnce(true);

    // Pick random reactive mood and animation
    const reactiveMoods: ByteMood[] = ['saludo', 'alegria', 'baile', 'sorpresa'];
    const nextMood = reactiveMoods[Math.floor(Math.random() * reactiveMoods.length)];
    setCurrentMood(nextMood);

    // Pick sound
    if (nextMood === 'baile') {
      soundManager.playByteDance();
      setClickAnim('animate-wiggle');
    } else if (nextMood === 'alegria') {
      soundManager.playByteCheer();
      setClickAnim('animate-bounce-gentle');
    } else if (nextMood === 'saludo') {
      soundManager.playByteHello();
      setClickAnim('animate-pulse');
    } else {
      soundManager.playByteClick();
      setClickAnim('animate-pop-in');
    }

    // Pick speech quote if not explicitly set
    if (!speechText) {
      const quote = BYTE_RANDOM_QUOTES[Math.floor(Math.random() * BYTE_RANDOM_QUOTES.length)];
      setActiveSpeech(quote);
    }

    if (onInteract) {
      onInteract();
    }

    // Revert animation after 1.8s
    setTimeout(() => {
      setClickAnim('');
      if (!speechText) {
        setCurrentMood(mood);
      }
    }, 2200);
  };

  const handleSpeech = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeSpeech) return;
    if (isSpeaking) {
      soundManager.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      soundManager.speak(activeSpeech);
      setTimeout(() => setIsSpeaking(false), Math.max(2500, activeSpeech.length * 75));
    }
  };

  // Expression rendering on Byte's digital visor
  const renderFace = () => {
    switch (currentMood) {
      case 'pensamiento':
        return (
          <>
            {/* Thoughtful digital eyes looking up-right */}
            <rect x="36" y="34" width="10" height="6" rx="3" fill="#10B981" />
            <rect x="56" y="32" width="10" height="7" rx="3" fill="#10B981" />
            {/* Curved pondering mouth */}
            <path d="M 44 48 Q 50 45 56 47" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
            {/* Floating thought bubble / question */}
            <text x="76" y="24" fontSize="18" fill="#FBBF24" fontWeight="900" className="animate-bounce">?</text>
          </>
        );

      case 'sorpresa':
        return (
          <>
            {/* Wide surprised circular eyes */}
            <circle cx="40" cy="38" r="6" fill="#38BDF8" />
            <circle cx="60" cy="38" r="6" fill="#38BDF8" />
            <circle cx="41" cy="37" r="2" fill="#FFFFFF" />
            <circle cx="61" cy="37" r="2" fill="#FFFFFF" />
            {/* Open "O" mouth */}
            <circle cx="50" cy="48" r="4.5" fill="#38BDF8" />
          </>
        );

      case 'alegria':
      case 'baile':
        return (
          <>
            {/* Joyful happy curved arc eyes (^_^) */}
            <path d="M 34 39 Q 40 32 46 39" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 54 39 Q 60 32 66 39" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
            {/* Cheerful wide smile */}
            <path d="M 40 46 Q 50 54 60 46" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
            {/* Musical notes if dancing */}
            {currentMood === 'baile' && (
              <>
                <text x="74" y="24" fontSize="15" fill="#EC4899" className="animate-bounce">🎵</text>
                <text x="14" y="26" fontSize="13" fill="#8B5CF6" className="animate-bounce">🎶</text>
              </>
            )}
          </>
        );

      case 'celebracion':
      case 'victoria':
        return (
          <>
            {/* Star glowing digital eyes */}
            <polygon points="40,32 42,36 46,36 43,39 44,43 40,40 36,43 37,39 34,36 38,36" fill="#FBBF24" />
            <polygon points="60,32 62,36 66,36 63,39 64,43 60,40 56,43 57,39 54,36 58,36" fill="#FBBF24" />
            {/* Big celebratory grin */}
            <path d="M 38 46 Q 50 56 62 46" fill="none" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
            {/* Sparks */}
            <circle cx="22" cy="22" r="2.5" fill="#38BDF8" className="animate-ping" />
            <circle cx="78" cy="20" r="2.5" fill="#F59E0B" className="animate-ping" />
          </>
        );

      case 'saludo':
        return (
          <>
            {/* Friendly wink left, bright right eye */}
            <path d="M 34 38 Q 40 33 46 38" fill="none" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="60" cy="38" r="5.5" fill="#10B981" />
            <circle cx="62" cy="36" r="2" fill="#FFFFFF" />
            {/* Gentle smile */}
            <path d="M 42 47 Q 50 53 58 47" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          </>
        );

      case 'idle':
      default:
        return (
          <>
            {/* Friendly digital pill eyes with soft blinking glints */}
            <rect x="36" y="34" width="9" height="9" rx="4" fill="#10B981" />
            <circle cx="41" cy="36" r="1.8" fill="#FFFFFF" />
            <rect x="55" y="34" width="9" height="9" rx="4" fill="#10B981" />
            <circle cx="60" cy="36" r="1.8" fill="#FFFFFF" />
            {/* Friendly subtle smile */}
            <path d="M 43 47 Q 50 52 57 47" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          </>
        );
    }
  };

  // World-specific theme accessory
  const renderAccessory = () => {
    switch (worldId) {
      case 1:
        // Mundo 1: El Bosque de los Equipos -> Explorer Backpack with antenna
        return (
          <g id="byte-accessory-world-1">
            {/* Backpack behind body */}
            <rect x="18" y="56" width="14" height="22" rx="4" fill="#15803D" stroke="#052E16" strokeWidth="1.5" />
            <rect x="20" y="60" width="10" height="14" rx="2" fill="#22C55E" />
            <line x1="25" y1="56" x2="25" y2="51" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
            <circle cx="25" cy="50" r="2.5" fill="#FBBF24" />
          </g>
        );

      case 2:
        // Mundo 2: El Reino del Orden -> Guardian Crest / Star Badge
        return (
          <g id="byte-accessory-world-2">
            {/* Guardian Chest Star Badge */}
            <circle cx="50" cy="72" r="7" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
            <polygon points="50,67 52,70 56,70 53,72 54,76 50,74 46,76 47,72 44,70 48,70" fill="#FEF08A" />
            {/* Neat crown on head */}
            <polygon points="40,16 45,21 50,15 55,21 60,16 58,24 42,24" fill="#F59E0B" stroke="#78350F" strokeWidth="1.2" />
          </g>
        );

      case 3:
        // Mundo 3: La Fortaleza Digital -> Holographic Energy Shield
        return (
          <g id="byte-accessory-world-3" className="animate-pulse">
            {/* Floating Energy Shield on left arm */}
            <path
              d="M 12 56 Q 22 53 26 62 Q 22 76 12 80 Q 8 68 12 56 Z"
              fill="#06B6D4"
              fillOpacity="0.85"
              stroke="#E0F2FE"
              strokeWidth="2"
            />
            <path d="M 15 62 L 21 66 L 15 74" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 4:
        // Mundo 4: El Valle de la Seguridad -> Safety Helmet with Caution Stripes
        return (
          <g id="byte-accessory-world-4">
            {/* Yellow / Amber Safety Helmet cap */}
            <path d="M 28 22 Q 50 10 72 22 L 72 25 L 28 25 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
            {/* Caution stripes */}
            <line x1="42" y1="16" x2="46" y2="24" stroke="#1E293B" strokeWidth="2" />
            <line x1="52" y1="16" x2="56" y2="24" stroke="#1E293B" strokeWidth="2" />
            {/* Small flashing beacon light */}
            <circle cx="50" cy="11" r="3.5" fill="#EF4444" className="animate-ping" />
            <circle cx="50" cy="11" r="3" fill="#F87171" />
          </g>
        );

      case 5:
        // Mundo 5: El Reino de los Compañeros -> Teamwork / Friendship Glowing Badge
        return (
          <g id="byte-accessory-world-5" className="animate-pulse">
            {/* Glowing Teamwork Heart / Friendship Badge on chest */}
            <circle cx="50" cy="71" r="9" fill="#14B8A6" stroke="#0F766E" strokeWidth="1.5" />
            <path
              d="M 50 67 Q 47 64 44 67 Q 41 70 50 76 Q 59 70 56 67 Q 53 64 50 67 Z"
              fill="#F43F5E"
            />
            {/* Friendship Sparkle Aura */}
            <circle cx="28" cy="48" r="2" fill="#F43F5E" className="animate-ping" />
            <circle cx="72" cy="48" r="2" fill="#14B8A6" className="animate-ping" />
          </g>
        );

      case 6:
        // Mundo 6: El Portal Responsable -> Cyber Visor & Tech Aura
        return (
          <g id="byte-accessory-world-6">
            {/* Digital Hologram Aura */}
            <ellipse cx="50" cy="22" rx="34" ry="12" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 3" className="animate-spin-slow" />
            {/* Cyber Visor Bridge */}
            <rect x="27" y="32" width="46" height="5" rx="2" fill="#C084FC" fillOpacity="0.7" />
          </g>
        );

      case 7:
      default:
        // Mundo 7 / Final: La Gran Sala -> Royal Master Guardian Golden Cape & Crown
        return (
          <g id="byte-accessory-world-7">
            {/* Flowing Golden Hero Cape behind body */}
            <path
              d="M 28 62 Q 10 75 14 92 Q 50 86 86 92 Q 90 75 72 62 Z"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="2"
            />
            {/* Golden Guardian Crown */}
            <polygon
              points="38,15 44,21 50,13 56,21 62,15 60,24 40,24"
              fill="#FBBF24"
              stroke="#92400E"
              strokeWidth="1.5"
            />
            <circle cx="50" cy="19" r="2" fill="#EF4444" />
          </g>
        );
    }
  };

  return (
    <div className={`inline-flex items-center gap-3 relative ${className}`}>
      
      {/* Click prompt hint badge on first visit */}
      {showClickPrompt && !hasClickedOnce && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-md whitespace-nowrap animate-bounce-gentle select-none flex items-center gap-1 z-30">
          <Sparkles className="w-3 h-3" />
          <span>¡Hacé clic en Byte!</span>
        </div>
      )}

      {/* Byte SVG Character Container */}
      <div
        onClick={handleClick}
        title={interactive ? '¡Hacé clic para interactuar con Byte!' : 'Byte, Guardián de la Sala'}
        className={`relative flex-shrink-0 ${sizeClasses[size]} ${
          interactive ? 'cursor-pointer hover:scale-105 transition-transform duration-200' : ''
        } ${clickAnim || (currentMood === 'baile' ? 'animate-wiggle' : currentMood === 'alegria' ? 'animate-bounce-gentle' : 'animate-float')}`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
          {/* Soft Shadow underneath */}
          <ellipse cx="50" cy="95" rx="26" ry="5" fill="#000000" opacity="0.2" />

          {/* World-Themed Accessory (Back elements like cape / backpack) */}
          {(worldId === 1 || worldId === 7) && renderAccessory()}

          {/* Magnetic Hover Thrust / Floating Base */}
          <ellipse cx="50" cy="88" rx="16" ry="4" fill="#06B6D4" opacity="0.75" className="animate-pulse" />
          <ellipse cx="50" cy="88" rx="10" ry="2.5" fill="#67E8F9" />

          {/* Body Chassis (Futuristic Rounded Guardian Robot) */}
          <path
            d="M 32 58 Q 50 54 68 58 L 66 84 Q 50 88 34 84 Z"
            fill="#0F172A"
            stroke="#10B981"
            strokeWidth="2.5"
          />

          {/* Chest Energy Core / Emblem */}
          <circle cx="50" cy="71" r="8" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
          <circle cx="50" cy="71" r="5" fill="#10B981" className="animate-pulse" />
          <circle cx="49" cy="70" r="2" fill="#A7F3D0" />

          {/* Arms */}
          {/* Left Arm */}
          {currentMood === 'victoria' ? (
            <path d="M 32 64 Q 20 54 18 44" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
          ) : currentMood === 'pensamiento' ? (
            <path d="M 32 64 Q 26 74 34 80" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
          ) : (
            <path d="M 32 64 Q 22 72 20 80" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
          )}

          {/* Right Arm */}
          {currentMood === 'saludo' ? (
            <g className="animate-wiggle" style={{ transformOrigin: '68px 64px' }}>
              <path d="M 68 64 Q 82 52 86 40" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
              <circle cx="86" cy="38" r="4" fill="#34D399" />
            </g>
          ) : currentMood === 'victoria' || currentMood === 'celebracion' ? (
            <path d="M 68 64 Q 80 54 82 44" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
          ) : (
            <path d="M 68 64 Q 78 72 80 80" fill="none" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
          )}

          {/* Hands */}
          <circle cx="20" cy="80" r="3.5" fill="#34D399" />
          {currentMood !== 'saludo' && <circle cx="80" cy="80" r="3.5" fill="#34D399" />}

          {/* Robot Head / Monitor */}
          <rect x="22" y="20" width="56" height="40" rx="14" fill="#0F172A" stroke="#10B981" strokeWidth="3" />

          {/* Holographic Visor Screen */}
          <rect x="26" y="24" width="48" height="32" rx="10" fill="#022C22" stroke="#047857" strokeWidth="1.5" />
          {/* Inner Scanline Glow */}
          <line x1="28" y1="30" x2="72" y2="30" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="28" y1="40" x2="72" y2="40" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.4" />
          <line x1="28" y1="50" x2="72" y2="50" stroke="#10B981" strokeWidth="0.5" strokeOpacity="0.4" />

          {/* Digital Face based on current mood */}
          {renderFace()}

          {/* Head Antenna */}
          <line x1="50" y1="20" x2="50" y2="10" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="50" cy="9" r="4.5" fill="#059669" stroke="#34D399" strokeWidth="1.5" />
          <circle cx="50" cy="9" r="2.5" fill="#6EE7B7" className="animate-ping" />

          {/* World-Themed Accessory (Front elements like helmet / shield / crest / badge) */}
          {worldId !== 1 && worldId !== 7 && renderAccessory()}
        </svg>
      </div>

      {/* Speech Bubble */}
      {activeSpeech && (
        <div className="relative bg-white dark:bg-slate-900 border-2 sm:border-3 border-emerald-400 dark:border-emerald-500 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-xl max-w-xs sm:max-w-md animate-pop-in">
          {/* Arrow pointing to Byte */}
          <div className="absolute top-1/2 -left-2 sm:-left-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 sm:border-r-12 border-r-white dark:border-r-slate-900" />
          <div className="absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 w-0 h-0 border-t-9 border-t-transparent border-b-9 border-b-transparent border-r-9 sm:border-r-13 border-r-emerald-400 dark:border-r-emerald-500 -z-10" />

          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-display">
                  🤖 BYTE (Guardián):
                </span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold px-1.5 py-0.5 rounded-md">
                  Guía
                </span>
              </div>
              <p className="font-body font-semibold text-slate-800 dark:text-slate-100 text-xs sm:text-sm leading-relaxed">
                {activeSpeech}
              </p>
            </div>

            {showSpeaker && (
              <button
                type="button"
                onClick={handleSpeech}
                title="Escuchar a Byte"
                className={`flex-shrink-0 p-1.5 sm:p-2 rounded-xl transition-all ${
                  isSpeaking
                    ? 'bg-amber-400 text-slate-900 animate-pulse'
                    : 'bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                }`}
                aria-label="Escuchar voz de Byte"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
