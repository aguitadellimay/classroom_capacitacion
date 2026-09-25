import React from 'react';

interface IllustrationProps {
  className?: string;
}

// LEVEL 1: Alumno frente a computadora/tablet y CLASITO mostrando el espacio digital de aprendizaje
export const IllustrationLevel1: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background soft glow */}
    <rect width="400" height="220" rx="24" fill="#EFF6FF" />
    <circle cx="200" cy="110" r="90" fill="#DBEAFE" opacity="0.6" />

    {/* School Banner Desk */}
    <rect x="30" y="170" width="340" height="18" rx="9" fill="#93C5FD" />
    <rect x="40" y="188" width="320" height="12" rx="6" fill="#60A5FA" opacity="0.5" />

    {/* Laptop screen */}
    <rect x="70" y="70" width="150" height="100" rx="10" fill="#1E293B" stroke="#0284C7" strokeWidth="4" />
    <rect x="78" y="78" width="134" height="78" rx="6" fill="#F8FAFC" />
    {/* Classroom header on laptop */}
    <rect x="84" y="84" width="122" height="20" rx="4" fill="#0284C7" />
    <text x="92" y="98" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif">🏫 GOOGLE CLASSROOM</text>
    {/* Laptop cards */}
    <rect x="84" y="110" width="56" height="38" rx="4" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
    <rect x="88" y="116" width="30" height="5" rx="2" fill="#0284C7" />
    <text x="88" y="134" fill="#0369A1" fontSize="8" fontWeight="bold">📚 Tareas</text>

    <rect x="146" y="110" width="60" height="38" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
    <rect x="150" y="116" width="36" height="5" rx="2" fill="#D97706" />
    <text x="150" y="134" fill="#B45309" fontSize="8" fontWeight="bold">👩‍🏫 Avisos</text>

    {/* Laptop base */}
    <path d="M50 170 L240 170 L220 182 L70 182 Z" fill="#94A3B8" />
    <rect x="120" y="171" width="50" height="4" rx="2" fill="#CBD5E1" />

    {/* Floating Educational Badges */}
    <g className="animate-float">
      <rect x="35" y="32" width="76" height="26" rx="13" fill="#3B82F6" />
      <text x="44" y="49" fill="#FFFFFF" fontSize="10" fontWeight="bold">📚 Aprender</text>
    </g>

    <g className="animate-bounce-gentle">
      <rect x="145" y="24" width="94" height="26" rx="13" fill="#10B981" />
      <text x="154" y="41" fill="#FFFFFF" fontSize="10" fontWeight="bold">💻 Escuela Digital</text>
    </g>

    {/* Robot CLASITO welcoming */}
    <g transform="translate(250, 45)">
      {/* Body */}
      <rect x="30" y="65" width="48" height="32" rx="12" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="54" cy="80" r="7" fill="#FBBF24" />
      {/* Head */}
      <rect x="20" y="15" width="68" height="52" rx="18" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="4" />
      <rect x="27" y="22" width="54" height="38" rx="12" fill="#E0F2FE" />
      {/* Antenna */}
      <rect x="52" y="3" width="4" height="14" fill="#0284C7" />
      <circle cx="54" cy="3" r="6" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="42" cy="38" r="6" fill="#1E293B" />
      <circle cx="44" cy="36" r="2" fill="#FFFFFF" />
      <circle cx="66" cy="38" r="6" fill="#1E293B" />
      <circle cx="68" cy="36" r="2" fill="#FFFFFF" />
      {/* Smile */}
      <path d="M 46 48 Q 54 56 62 48" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="34" cy="46" r="4" fill="#F472B6" opacity="0.8" />
      <circle cx="74" cy="46" r="4" fill="#F472B6" opacity="0.8" />
      {/* Pointing Arm */}
      <path d="M 22 75 Q -5 65 -15 80" fill="none" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
      <circle cx="-15" cy="80" r="5" fill="#FBBF24" />
    </g>
  </svg>
);

// LEVEL 2: CLASITO protegiendo una cuenta con un candado y escudo
export const IllustrationLevel2: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="24" fill="#FEF3C7" />
    <circle cx="200" cy="110" r="95" fill="#FDE68A" opacity="0.6" />

    {/* Big Shield Center */}
    <path d="M 200 25 Q 260 25 280 60 Q 280 135 200 185 Q 120 135 120 60 Q 140 25 200 25 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="6" />
    <path d="M 200 35 Q 250 35 265 65 Q 265 125 200 170 Q 135 125 135 65 Q 150 35 200 35 Z" fill="#FDE68A" />

    {/* Golden Padlock inside shield */}
    <g transform="translate(165, 60)">
      {/* Shackle */}
      <path d="M 18 35 L 18 18 Q 18 0 35 0 Q 52 0 52 18 L 52 35" fill="none" stroke="#475569" strokeWidth="9" strokeLinecap="round" />
      {/* Lock body */}
      <rect x="5" y="30" width="60" height="50" rx="12" fill="#D97706" stroke="#92400E" strokeWidth="4" />
      <circle cx="35" cy="50" r="7" fill="#78350F" />
      <path d="M 35 55 L 35 67" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* Key tag */}
    <g transform="translate(45, 100)" className="animate-float">
      <rect x="0" y="0" width="90" height="34" rx="17" fill="#EF4444" />
      <text x="12" y="21" fill="#FFFFFF" fontSize="11" fontWeight="bold">🔑 Secreto</text>
    </g>

    {/* User tag */}
    <g transform="translate(45, 45)" className="animate-bounce-gentle">
      <rect x="0" y="0" width="105" height="34" rx="17" fill="#3B82F6" />
      <text x="14" y="21" fill="#FFFFFF" fontSize="11" fontWeight="bold">👤 Mi Cuenta</text>
    </g>

    {/* Guard Robot CLASITO */}
    <g transform="translate(265, 55)">
      {/* Body */}
      <rect x="25" y="65" width="46" height="30" rx="10" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
      {/* Head */}
      <rect x="15" y="15" width="66" height="52" rx="16" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="4" />
      <rect x="22" y="22" width="52" height="38" rx="10" fill="#E0F2FE" />
      {/* Antenna */}
      <rect x="46" y="3" width="4" height="14" fill="#0284C7" />
      <circle cx="48" cy="3" r="6" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="2" />
      {/* Confident Eyes */}
      <path d="M 30 38 Q 36 33 42 38" fill="none" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="58" cy="37" r="6" fill="#1E293B" />
      <circle cx="60" cy="35" r="2" fill="#FFFFFF" />
      <path d="M 36 49 Q 48 56 56 47" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Hand holding key */}
      <path d="M 25 75 Q -5 70 5 95" fill="none" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
      <circle cx="5" cy="95" r="6" fill="#FBBF24" />
    </g>
  </svg>
);

// LEVEL 3: Simulación educativa de una clase digital
export const IllustrationLevel3: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="24" fill="#ECFDF5" />
    <circle cx="200" cy="110" r="95" fill="#D1FAE5" opacity="0.6" />

    {/* Classroom Virtual Screen */}
    <rect x="35" y="25" width="330" height="170" rx="16" fill="#FFFFFF" stroke="#10B981" strokeWidth="4" />
    
    {/* Classroom Header Bar */}
    <rect x="35" y="25" width="330" height="34" rx="12" fill="#047857" />
    <text x="50" y="46" fill="#FFFFFF" fontSize="11" fontWeight="bold">🏫 Aula de Primaria</text>
    {/* Tabs simulated */}
    <rect x="175" y="32" width="70" height="20" rx="6" fill="#065F46" />
    <text x="183" y="46" fill="#A7F3D0" fontSize="9" fontWeight="bold">📢 Novedades</text>
    <rect x="252" y="32" width="95" height="20" rx="6" fill="#FFFFFF" />
    <text x="260" y="46" fill="#065F46" fontSize="9" fontWeight="bold">📚 Trabajo de clase</text>

    {/* Cards inside Classwork */}
    {/* Task Card */}
    <rect x="50" y="70" width="180" height="42" rx="10" fill="#F0FDF4" stroke="#34D399" strokeWidth="2" />
    <rect x="58" y="78" width="26" height="26" rx="6" fill="#10B981" />
    <text x="63" y="96" fill="#FFFFFF" fontSize="14">📋</text>
    <text x="92" y="88" fill="#065F46" fontSize="10" fontWeight="bold">Tarea con entrega</text>
    <text x="92" y="102" fill="#047857" fontSize="8">Mi animal favorito • Viernes</text>

    {/* Material Card */}
    <rect x="50" y="120" width="180" height="40" rx="10" fill="#EFF6FF" stroke="#60A5FA" strokeWidth="2" />
    <rect x="58" y="127" width="26" height="26" rx="6" fill="#3B82F6" />
    <text x="63" y="145" fill="#FFFFFF" fontSize="14">📖</text>
    <text x="92" y="137" fill="#1E40AF" fontSize="10" fontWeight="bold">Material de lectura</text>
    <text x="92" y="151" fill="#2563EB" fontSize="8">Ficha informativa (sin entrega)</text>

    {/* Comments preview */}
    <rect x="50" y="168" width="180" height="20" rx="6" fill="#F1F5F9" />
    <text x="58" y="182" fill="#475569" fontSize="8" fontWeight="bold">💬 Comentarios: preguntas con respeto</text>

    {/* Clasito floating beside */}
    <g transform="translate(255, 65)">
      <rect x="25" y="60" width="46" height="28" rx="10" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
      <rect x="15" y="12" width="66" height="50" rx="16" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="4" />
      <rect x="22" y="19" width="52" height="36" rx="10" fill="#E0F2FE" />
      <rect x="46" y="2" width="4" height="12" fill="#0284C7" />
      <circle cx="48" cy="2" r="5" fill="#FBBF24" />
      {/* Wonder eyes */}
      <circle cx="36" cy="34" r="5" fill="#1E293B" />
      <circle cx="60" cy="34" r="5" fill="#1E293B" />
      <path d="M 40 45 Q 48 51 56 45" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      {/* Pointer */}
      <path d="M 20 65 Q -8 50 -14 55" fill="none" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
      <circle cx="-14" cy="55" r="4" fill="#FBBF24" />
    </g>
  </svg>
);

// LEVEL 4: Tarea ficticia en pantalla y CLASITO con lupa señalando LEER, PENSAR, HACER, REVISAR
export const IllustrationLevel4: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="24" fill="#F5F3FF" />
    <circle cx="200" cy="110" r="95" fill="#EDE9FE" opacity="0.6" />

    {/* Task Sheet Document */}
    <rect x="40" y="25" width="220" height="170" rx="16" fill="#FFFFFF" stroke="#8B5CF6" strokeWidth="4" />
    <rect x="52" y="38" width="40" height="8" rx="4" fill="#C4B5FD" />
    <text x="52" y="65" fill="#5B21B6" fontSize="13" fontWeight="900">📄 TAREA ESCOLAR</text>
    <text x="52" y="82" fill="#6D28D9" fontSize="10" fontWeight="bold">"Mi animal favorito"</text>

    {/* Consigna text box */}
    <rect x="52" y="92" width="196" height="52" rx="8" fill="#FDF4FF" stroke="#E879F9" strokeWidth="2" />
    <text x="60" y="108" fill="#86198F" fontSize="9" fontWeight="bold">CONSIGNA:</text>
    <text x="60" y="122" fill="#701A75" fontSize="8">1. Realizá un dibujo de tu mascota.</text>
    <text x="60" y="134" fill="#701A75" fontSize="8">2. Escribí su nombre debajo.</text>

    {/* Steps Pills below */}
    <g transform="translate(52, 155)">
      <rect x="0" y="0" width="44" height="22" rx="6" fill="#7C3AED" />
      <text x="6" y="15" fill="#FFFFFF" fontSize="8" fontWeight="bold">👀 LEER</text>
      <rect x="48" y="0" width="46" height="22" rx="6" fill="#A855F7" />
      <text x="52" y="15" fill="#FFFFFF" fontSize="8" fontWeight="bold">🧠 PENSAR</text>
      <rect x="98" y="0" width="46" height="22" rx="6" fill="#3B82F6" />
      <text x="103" y="15" fill="#FFFFFF" fontSize="8" fontWeight="bold">✏️ HACER</text>
      <rect x="148" y="0" width="48" height="22" rx="6" fill="#10B981" />
      <text x="151" y="15" fill="#FFFFFF" fontSize="8" fontWeight="bold">🔍 REVISAR</text>
    </g>

    {/* Giant Magnifying Glass pointing at consigna */}
    <g transform="translate(210, 80)" className="animate-bounce-gentle">
      <circle cx="25" cy="25" r="22" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="6" opacity="0.9" />
      <circle cx="25" cy="25" r="16" fill="#FEF3C7" opacity="0.5" />
      <path d="M 40 40 L 65 65" stroke="#B45309" strokeWidth="8" strokeLinecap="round" />
      <text x="14" y="31" fill="#D97706" fontSize="16">👀</text>
    </g>

    {/* Clasito Inspector */}
    <g transform="translate(285, 40)">
      <rect x="25" y="65" width="46" height="30" rx="10" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
      <rect x="15" y="15" width="66" height="52" rx="16" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="4" />
      <rect x="22" y="22" width="52" height="38" rx="10" fill="#E0F2FE" />
      <rect x="46" y="3" width="4" height="14" fill="#0284C7" />
      <circle cx="48" cy="3" r="6" fill="#FBBF24" />
      {/* Big attentive eyes */}
      <circle cx="36" cy="38" r="7" fill="#1E293B" />
      <circle cx="38" cy="36" r="3" fill="#FFFFFF" />
      <circle cx="60" cy="38" r="7" fill="#1E293B" />
      <circle cx="62" cy="36" r="3" fill="#FFFFFF" />
      <path d="M 42 49 Q 48 54 54 49" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  </svg>
);

// LEVEL 5: Claridad visual entre "AGREGAR ARCHIVO" y "ENTREGAR", Clasito arrastrando archivo
export const IllustrationLevel5: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="24" fill="#FFF1F2" />
    <circle cx="200" cy="110" r="95" fill="#FFE4E6" opacity="0.6" />

    {/* Step 1: Adjuntar Archivo */}
    <g transform="translate(30, 45)">
      <rect x="0" y="0" width="135" height="130" rx="16" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="3" />
      <rect x="12" y="12" width="111" height="24" rx="8" fill="#DBEAFE" />
      <text x="22" y="28" fill="#1E40AF" fontSize="10" fontWeight="bold">PASO 1: ADJUNTAR</text>
      
      {/* File Drawing Preview */}
      <rect x="25" y="46" width="85" height="42" rx="8" fill="#F8FAFC" stroke="#94A3B8" strokeDasharray="3 3" />
      <text x="35" y="64" fill="#0F172A" fontSize="16">🐶</text>
      <text x="56" y="64" fill="#475569" fontSize="8" fontWeight="bold">dibujo.png</text>
      <rect x="35" y="73" width="65" height="6" rx="3" fill="#10B981" />

      {/* Button simulator */}
      <rect x="15" y="96" width="105" height="24" rx="8" fill="#3B82F6" />
      <text x="24" y="112" fill="#FFFFFF" fontSize="9" fontWeight="black">📎 + AGREGAR</text>
    </g>

    {/* Animated Arrow Connector */}
    <g transform="translate(172, 95)" className="animate-pulse">
      <circle cx="16" cy="16" r="16" fill="#F43F5E" />
      <path d="M 10 16 L 22 16 M 17 11 L 22 16 L 17 21" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </g>

    {/* Step 2: Entregar Tarea */}
    <g transform="translate(210, 45)">
      <rect x="0" y="0" width="155" height="130" rx="16" fill="#FFFFFF" stroke="#10B981" strokeWidth="4" />
      <rect x="12" y="12" width="131" height="24" rx="8" fill="#D1FAE5" />
      <text x="22" y="28" fill="#065F46" fontSize="10" fontWeight="bold">PASO 2: ¡ENTREGAR!</text>

      {/* Big Green Deliver Button */}
      <g className="animate-bounce-gentle">
        <rect x="15" y="48" width="125" height="38" rx="12" fill="#10B981" stroke="#059669" strokeWidth="2" />
        <text x="28" y="72" fill="#FFFFFF" fontSize="13" fontWeight="900">📤 ENTREGAR</text>
      </g>

      {/* Success seal */}
      <rect x="15" y="96" width="125" height="22" rx="6" fill="#ECFDF5" />
      <text x="28" y="111" fill="#047857" fontSize="8" fontWeight="bold">✅ ¡LLEGA A LA MAESTRA!</text>
    </g>
  </svg>
);

// LEVEL 6: CLASITO organizando tareas en calendario escolar
export const IllustrationLevel6: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="24" fill="#ECFEFF" />
    <circle cx="200" cy="110" r="95" fill="#CFFAFE" opacity="0.6" />

    {/* Big Weekly Calendar */}
    <rect x="35" y="30" width="240" height="160" rx="16" fill="#FFFFFF" stroke="#06B6D4" strokeWidth="4" />
    <rect x="35" y="30" width="240" height="34" rx="12" fill="#0891B2" />
    <text x="50" y="52" fill="#FFFFFF" fontSize="11" fontWeight="bold">📅 CALENDARIO SEMANAL</text>

    {/* Days Grid */}
    {/* Martes (Hoy) */}
    <g transform="translate(48, 74)">
      <rect x="0" y="0" width="50" height="75" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <rect x="0" y="0" width="50" height="18" rx="6" fill="#F59E0B" />
      <text x="6" y="13" fill="#FFFFFF" fontSize="8" fontWeight="bold">MARTES</text>
      <text x="8" y="34" fill="#B45309" fontSize="7" fontWeight="bold">📍 HOY</text>
      <text x="6" y="52" fill="#92400E" fontSize="7">Planificar</text>
    </g>

    {/* Miércoles */}
    <g transform="translate(104, 74)">
      <rect x="0" y="0" width="50" height="75" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5" />
      <rect x="0" y="0" width="50" height="18" rx="6" fill="#0D9488" />
      <text x="6" y="13" fill="#FFFFFF" fontSize="8" fontWeight="bold">MIÉRCOLES</text>
      <text x="6" y="42" fill="#115E59" fontSize="7">Hacer</text>
    </g>

    {/* Jueves */}
    <g transform="translate(160, 74)">
      <rect x="0" y="0" width="50" height="75" rx="8" fill="#F0FDFA" stroke="#5EEAD4" strokeWidth="1.5" />
      <rect x="0" y="0" width="50" height="18" rx="6" fill="#0D9488" />
      <text x="8" y="13" fill="#FFFFFF" fontSize="8" fontWeight="bold">JUEVES</text>
      <text x="6" y="42" fill="#115E59" fontSize="7">Revisar</text>
    </g>

    {/* Viernes (Vencimiento) */}
    <g transform="translate(216, 74)" className="animate-pulse">
      <rect x="0" y="0" width="50" height="75" rx="8" fill="#FFE4E6" stroke="#F43F5E" strokeWidth="2.5" />
      <rect x="0" y="0" width="50" height="18" rx="6" fill="#E11D48" />
      <text x="6" y="13" fill="#FFFFFF" fontSize="8" fontWeight="bold">VIERNES</text>
      <text x="6" y="35" fill="#BE123C" fontSize="7" fontWeight="black">⏰ FECHA</text>
      <text x="6" y="46" fill="#BE123C" fontSize="7" fontWeight="black">LÍMITE</text>
      <text x="6" y="65" fill="#10B981" fontSize="9">✅ LISTO</text>
    </g>

    {/* Clock and Clasito */}
    <g transform="translate(290, 50)">
      {/* Alarm Clock */}
      <circle cx="45" cy="30" r="22" fill="#FFFFFF" stroke="#0891B2" strokeWidth="4" />
      <path d="M 45 16 L 45 30 L 56 30" stroke="#0891B2" strokeWidth="3" strokeLinecap="round" />
      {/* Clasito Robot */}
      <g transform="translate(15, 60)">
        <rect x="15" y="45" width="36" height="24" rx="8" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2.5" />
        <rect x="8" y="5" width="50" height="42" rx="14" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3" />
        <rect x="14" y="12" width="38" height="28" rx="8" fill="#E0F2FE" />
        <circle cx="26" cy="24" r="4.5" fill="#1E293B" />
        <circle cx="42" cy="24" r="4.5" fill="#1E293B" />
        <path d="M 28 32 Q 34 37 40 32" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      </g>
    </g>
  </svg>
);

// LEVEL 7: Conversación ficticia amable y CLASITO con las 3 preguntas
export const IllustrationLevel7: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="24" fill="#F0FDFA" />
    <circle cx="200" cy="110" r="95" fill="#CCFBF1" opacity="0.6" />

    {/* Chat comments board */}
    <g transform="translate(30, 25)">
      {/* Comment 1: Question */}
      <rect x="0" y="0" width="180" height="44" rx="14" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="2" />
      <text x="14" y="18" fill="#0D9488" fontSize="8" fontWeight="bold">👦 Lucas preguntó:</text>
      <text x="14" y="32" fill="#134E4A" fontSize="9" fontWeight="bold">"¿Alguien me ayuda con el punto 2?"</text>

      {/* Comment 2: Kind response */}
      <g transform="translate(20, 52)">
        <rect x="0" y="0" width="170" height="44" rx="14" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" />
        <text x="14" y="18" fill="#047857" fontSize="8" fontWeight="bold">👧 Mía respondió con cariño:</text>
        <text x="14" y="32" fill="#065F46" fontSize="9" fontWeight="bold">"¡Hola Lucas! Si querés te explico."</text>
      </g>
    </g>

    {/* The 3 Golden Questions Banner */}
    <g transform="translate(30, 135)">
      <rect x="0" y="0" width="230" height="60" rx="14" fill="#0F766E" />
      <text x="14" y="18" fill="#5EEAD4" fontSize="8" fontWeight="black">💭 ANTES DE PUBLICAR, PENSÁ:</text>
      <text x="14" y="32" fill="#FFFFFF" fontSize="8" fontWeight="bold">❤️ 1. ¿Es respetuoso?</text>
      <text x="14" y="44" fill="#FFFFFF" fontSize="8" fontWeight="bold">🎯 2. ¿Es necesario?</text>
      <text x="14" y="56" fill="#FFFFFF" fontSize="8" fontWeight="bold">💡 3. ¿Ayuda a aprender?</text>
    </g>

    {/* Clasito thinking */}
    <g transform="translate(280, 55)">
      <rect x="25" y="65" width="46" height="30" rx="10" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
      <rect x="15" y="15" width="66" height="52" rx="16" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="4" />
      <rect x="22" y="22" width="52" height="38" rx="10" fill="#E0F2FE" />
      <rect x="46" y="3" width="4" height="14" fill="#0284C7" />
      <circle cx="48" cy="3" r="6" fill="#FBBF24" />
      {/* Eyes looking up thinking */}
      <circle cx="36" cy="34" r="5" fill="#1E293B" />
      <circle cx="37" cy="32" r="2" fill="#FFFFFF" />
      <circle cx="60" cy="34" r="5" fill="#1E293B" />
      <circle cx="61" cy="32" r="2" fill="#FFFFFF" />
      <path d="M 40 48 Q 48 44 56 48" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      {/* Floating question mark */}
      <text x="75" y="25" fontSize="20" fill="#F59E0B" fontWeight="black" className="animate-bounce">💭</text>
    </g>
  </svg>
);

// LEVEL 8: Dos personajes trabajando juntos, colaborando sin copiar
export const IllustrationLevel8: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="24" fill="#FFF7ED" />
    <circle cx="200" cy="110" r="95" fill="#FFEDD5" opacity="0.6" />

    {/* Shared Desk / Shared Document */}
    <rect x="80" y="145" width="240" height="30" rx="12" fill="#FDBA74" />
    <rect x="130" y="85" width="140" height="80" rx="10" fill="#FFFFFF" stroke="#EA580C" strokeWidth="3" />
    <rect x="145" y="98" width="110" height="8" rx="4" fill="#FED7AA" />
    <text x="145" y="120" fill="#C2410C" fontSize="10" fontWeight="bold">🤝 TRABAJO EN EQUIPO</text>
    <text x="145" y="136" fill="#9A3412" fontSize="8">"Ayudamos a pensar,</text>
    <text x="145" y="148" fill="#9A3412" fontSize="8">no pasamos la copia"</text>

    {/* Lightbulb Idea in Center */}
    <g transform="translate(185, 25)" className="animate-bounce-gentle">
      <circle cx="15" cy="15" r="15" fill="#FDE047" stroke="#EAB308" strokeWidth="2.5" />
      <text x="7" y="21" fill="#713F12" fontSize="14">💡</text>
    </g>

    {/* Student Robot 1 (Clasito) */}
    <g transform="translate(45, 65)">
      <rect x="15" y="45" width="40" height="30" rx="10" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2.5" />
      <rect x="8" y="10" width="54" height="42" rx="14" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3" />
      <rect x="14" y="16" width="42" height="30" rx="8" fill="#E0F2FE" />
      <circle cx="24" cy="28" r="4.5" fill="#1E293B" />
      <circle cx="44" cy="28" r="4.5" fill="#1E293B" />
      <path d="M 28 38 Q 34 44 40 38" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Student Robot 2 (Soli) */}
    <g transform="translate(295, 65)">
      <rect x="15" y="45" width="40" height="30" rx="10" fill="#D946EF" stroke="#FFFFFF" strokeWidth="2.5" />
      <rect x="8" y="10" width="54" height="42" rx="14" fill="#F472B6" stroke="#FFFFFF" strokeWidth="3" />
      <rect x="14" y="16" width="42" height="30" rx="8" fill="#FDF2F8" />
      <circle cx="24" cy="28" r="4.5" fill="#1E293B" />
      <circle cx="44" cy="28" r="4.5" fill="#1E293B" />
      <path d="M 28 38 Q 34 44 40 38" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      {/* Flower Antenna */}
      <circle cx="35" cy="5" r="5" fill="#FBBF24" />
    </g>
  </svg>
);

// LEVEL 9: CLASITO detrás del escudo protegiendo datos personales
export const IllustrationLevel9: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="24" fill="#EEF2FF" />
    <circle cx="200" cy="110" r="95" fill="#E0E7FF" opacity="0.6" />

    {/* Cyber Shield in Center */}
    <g transform="translate(140, 20)">
      <path d="M 60 10 Q 110 10 120 40 Q 120 120 60 160 Q 0 120 0 40 Q 10 10 60 10 Z" fill="#4F46E5" stroke="#312E81" strokeWidth="5" />
      <path d="M 60 20 Q 100 20 110 45 Q 110 110 60 148 Q 10 110 10 45 Q 20 20 60 20 Z" fill="#6366F1" />
      
      {/* Clasito face peeking behind shield */}
      <circle cx="60" cy="70" r="28" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="50" cy="68" r="4" fill="#1E293B" />
      <circle cx="70" cy="68" r="4" fill="#1E293B" />
      <path d="M 54 78 Q 60 84 66 78" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <text x="47" y="115" fill="#FFFFFF" fontSize="22">🛡️</text>
    </g>

    {/* Protected Sensitive Data Elements around Shield */}
    <g transform="translate(25, 40)" className="animate-float">
      <rect x="0" y="0" width="95" height="32" rx="16" fill="#DC2626" />
      <text x="12" y="20" fill="#FFFFFF" fontSize="9" fontWeight="bold">🔐 Contraseña</text>
    </g>

    <g transform="translate(25, 95)" className="animate-bounce-gentle">
      <rect x="0" y="0" width="95" height="32" rx="16" fill="#DC2626" />
      <text x="14" y="20" fill="#FFFFFF" fontSize="9" fontWeight="bold">🏠 Dirección</text>
    </g>

    <g transform="translate(280, 40)" className="animate-float">
      <rect x="0" y="0" width="95" height="32" rx="16" fill="#DC2626" />
      <text x="14" y="20" fill="#FFFFFF" fontSize="9" fontWeight="bold">📱 Teléfono</text>
    </g>

    <g transform="translate(280, 95)" className="animate-bounce-gentle">
      <rect x="0" y="0" width="95" height="32" rx="16" fill="#DC2626" />
      <text x="14" y="20" fill="#FFFFFF" fontSize="9" fontWeight="bold">📷 Foto Privada</text>
    </g>

    {/* Bottom Safety Reminder */}
    <rect x="65" y="178" width="270" height="28" rx="14" fill="#312E81" />
    <text x="80" y="196" fill="#E0E7FF" fontSize="10" fontWeight="black">🔒 NO TODA LA INFORMACIÓN SE COMPARTE</text>
  </svg>
);

// LEVEL 10: CLASITO graduado con trofeo y resumen de todos los valores
export const IllustrationLevel10: React.FC<IllustrationProps> = ({ className = 'w-full h-44 sm:h-52' }) => (
  <svg viewBox="0 0 400 220" className={`${className} mx-auto drop-shadow-md select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="220" rx="24" fill="#FEFCE8" />
    <circle cx="200" cy="110" r="95" fill="#FEF08A" opacity="0.6" />

    {/* Golden Trophy on the left */}
    <g transform="translate(50, 45)" className="animate-bounce-gentle">
      <path d="M 20 15 L 80 15 L 80 55 Q 80 85 50 85 Q 20 85 20 55 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
      <path d="M 12 25 Q -5 45 15 55 L 20 55" fill="none" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
      <path d="M 88 25 Q 105 45 85 55 L 80 55" fill="none" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
      <rect x="42" y="85" width="16" height="25" fill="#D97706" />
      <rect x="25" y="110" width="50" height="20" rx="6" fill="#78350F" />
      <text x="43" y="55" fill="#FFFFFF" fontSize="22">⭐</text>
    </g>

    {/* Robot CLASITO celebrating with diploma & stars */}
    <g transform="translate(170, 35)">
      {/* Body */}
      <rect x="30" y="65" width="50" height="34" rx="12" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" />
      <circle cx="55" cy="80" r="8" fill="#FBBF24" />
      {/* Head */}
      <rect x="20" y="15" width="70" height="54" rx="18" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="4" />
      <rect x="27" y="22" width="56" height="40" rx="12" fill="#E0F2FE" />
      {/* Graduation Cap */}
      <polygon points="55,0 95,12 55,24 15,12" fill="#1E293B" />
      <rect x="35" y="16" width="40" height="8" fill="#0F172A" />
      <path d="M 85 15 L 88 35" stroke="#FBBF24" strokeWidth="2.5" />
      <circle cx="88" cy="35" r="3" fill="#FBBF24" />
      {/* Star Eyes */}
      <polygon points="42,32 44,37 49,37 45,40 47,45 42,42 37,45 39,40 35,37 40,37" fill="#F59E0B" />
      <polygon points="68,32 70,37 75,37 71,40 73,45 68,42 63,45 65,40 61,37 66,37" fill="#F59E0B" />
      {/* Big smile */}
      <path d="M 44 48 Q 55 58 66 48" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Values Carousel / Badges on right */}
    <g transform="translate(280, 25)">
      <rect x="0" y="0" width="105" height="170" rx="14" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="3" />
      <text x="12" y="20" fill="#92400E" fontSize="9" fontWeight="900">REGLAS DE ORO:</text>
      <text x="12" y="38" fill="#1E293B" fontSize="8" fontWeight="bold">📚 1. Aprender</text>
      <text x="12" y="56" fill="#1E293B" fontSize="8" fontWeight="bold">📖 2. Leer consignas</text>
      <text x="12" y="74" fill="#1E293B" fontSize="8" fontWeight="bold">📤 3. Entregar</text>
      <text x="12" y="92" fill="#1E293B" fontSize="8" fontWeight="bold">⏰ 4. Responsable</text>
      <text x="12" y="110" fill="#1E293B" fontSize="8" fontWeight="bold">💬 5. Respetar</text>
      <text x="12" y="128" fill="#1E293B" fontSize="8" fontWeight="bold">🤝 6. Colaborar</text>
      <text x="12" y="146" fill="#1E293B" fontSize="8" fontWeight="bold">🔐 7. Cuidarnos</text>
      <text x="12" y="162" fill="#1E293B" fontSize="8" fontWeight="bold">🧠 8. Pensar</text>
    </g>
  </svg>
);

// Generic wrapper component that renders the right illustration based on levelId
export const LevelIllustration: React.FC<{ levelId: number; className?: string }> = ({
  levelId,
  className = 'w-full h-44 sm:h-52',
}) => {
  switch (levelId) {
    case 1:
      return <IllustrationLevel1 className={className} />;
    case 2:
      return <IllustrationLevel2 className={className} />;
    case 3:
      return <IllustrationLevel3 className={className} />;
    case 4:
      return <IllustrationLevel4 className={className} />;
    case 5:
      return <IllustrationLevel5 className={className} />;
    case 6:
      return <IllustrationLevel6 className={className} />;
    case 7:
      return <IllustrationLevel7 className={className} />;
    case 8:
      return <IllustrationLevel8 className={className} />;
    case 9:
      return <IllustrationLevel9 className={className} />;
    case 10:
    default:
      return <IllustrationLevel10 className={className} />;
  }
};
