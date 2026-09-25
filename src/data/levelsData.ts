import type { LevelConfig, Grade, QuizQuestion, StepItem, ShareItem } from '../types';

export const LEVELS_CONFIG: LevelConfig[] = [
  {
    id: 1,
    title: 'Nivel 1: Conociendo Classroom',
    shortTitle: 'Conociendo Classroom',
    badgeId: 'primer-paso',
    icon: '🏫',
    color: {
      bg: 'bg-blue-500',
      border: 'border-blue-600',
      text: 'text-blue-600',
      light: 'bg-blue-50',
      badgeBg: 'bg-blue-100 text-blue-700',
    },
  },
  {
    id: 2,
    title: 'Nivel 2: Cuidamos nuestra cuenta',
    shortTitle: 'Cuidamos nuestra cuenta',
    badgeId: 'guardian-seguridad',
    icon: '🔐',
    color: {
      bg: 'bg-amber-500',
      border: 'border-amber-600',
      text: 'text-amber-600',
      light: 'bg-amber-50',
      badgeBg: 'bg-amber-100 text-amber-700',
    },
  },
  {
    id: 3,
    title: 'Nivel 3: Conociendo nuestra clase',
    shortTitle: 'Conociendo nuestra clase',
    badgeId: 'explorador-aula',
    icon: '🗺️',
    color: {
      bg: 'bg-emerald-500',
      border: 'border-emerald-600',
      text: 'text-emerald-600',
      light: 'bg-emerald-50',
      badgeBg: 'bg-emerald-100 text-emerald-700',
    },
  },
  {
    id: 4,
    title: 'Nivel 4: Leemos las consignas',
    shortTitle: 'Leemos las consignas',
    badgeId: 'lector-atento',
    icon: '📖',
    color: {
      bg: 'bg-purple-500',
      border: 'border-purple-600',
      text: 'text-purple-600',
      light: 'bg-purple-50',
      badgeBg: 'bg-purple-100 text-purple-700',
    },
  },
  {
    id: 5,
    title: 'Nivel 5: Entregamos nuestras tareas',
    shortTitle: 'Entregamos tareas',
    badgeId: 'experto-tareas',
    icon: '📤',
    color: {
      bg: 'bg-rose-500',
      border: 'border-rose-600',
      text: 'text-rose-600',
      light: 'bg-rose-50',
      badgeBg: 'bg-rose-100 text-rose-700',
    },
  },
  {
    id: 6,
    title: 'Nivel 6: Somos responsables',
    shortTitle: 'Somos responsables',
    badgeId: 'super-organizado',
    icon: '⏰',
    color: {
      bg: 'bg-cyan-500',
      border: 'border-cyan-600',
      text: 'text-cyan-600',
      light: 'bg-cyan-50',
      badgeBg: 'bg-cyan-100 text-cyan-700',
    },
  },
  {
    id: 7,
    title: 'Nivel 7: Hablamos con respeto',
    shortTitle: 'Hablamos con respeto',
    badgeId: 'campeon-respeto',
    icon: '💬',
    color: {
      bg: 'bg-teal-500',
      border: 'border-teal-600',
      text: 'text-teal-600',
      light: 'bg-teal-50',
      badgeBg: 'bg-teal-100 text-teal-700',
    },
  },
  {
    id: 8,
    title: 'Nivel 8: Aprendemos juntos',
    shortTitle: 'Aprendemos juntos',
    badgeId: 'buen-companero',
    icon: '🤝',
    color: {
      bg: 'bg-orange-500',
      border: 'border-orange-600',
      text: 'text-orange-600',
      light: 'bg-orange-50',
      badgeBg: 'bg-orange-100 text-orange-700',
    },
  },
  {
    id: 9,
    title: 'Nivel 9: Nos cuidamos en Internet',
    shortTitle: 'Nos cuidamos online',
    badgeId: 'ciber-escudo',
    icon: '🛡️',
    color: {
      bg: 'bg-indigo-500',
      border: 'border-indigo-600',
      text: 'text-indigo-600',
      light: 'bg-indigo-50',
      badgeBg: 'bg-indigo-100 text-indigo-700',
    },
  },
  {
    id: 10,
    title: 'Nivel 10: Gran Desafío Final',
    shortTitle: 'Gran Desafío Final',
    badgeId: 'experto-classroom',
    icon: '🏆',
    color: {
      bg: 'bg-yellow-500',
      border: 'border-yellow-600',
      text: 'text-yellow-600',
      light: 'bg-yellow-50',
      badgeBg: 'bg-yellow-100 text-yellow-800',
    },
  },
];

// LEVEL 1: ¿Qué es Classroom? Interactive Card options
export const LEVEL_1_PURPOSES = [
  { id: 'p1', text: 'Para aprender con la escuela', icon: '📚', isCorrect: true },
  { id: 'p2', text: 'Para recibir tareas y actividades', icon: '📋', isCorrect: true },
  { id: 'p3', text: 'Para jugar videojuegos todo el día', icon: '🎮', isCorrect: false },
  { id: 'p4', text: 'Para comunicarnos sobre las clases', icon: '💬', isCorrect: true },
  { id: 'p5', text: 'Para ver videos de baile sin parar', icon: '🍿', isCorrect: false },
  { id: 'p6', text: 'Para encontrar lecturas y libros', icon: '📖', isCorrect: true },
];

// LEVEL 4: Steps to order
export const LEVEL_4_STEPS: StepItem[] = [
  { id: 's1', text: '1. Leer la consigna completa', icon: '📚', correctOrder: 1 },
  { id: 's2', text: '2. Mirar los ejemplos y materiales', icon: '👀', correctOrder: 2 },
  { id: 's3', text: '3. Hacer la actividad con atención', icon: '✏️', correctOrder: 3 },
  { id: 's4', text: '4. Revisar que esté todo completo', icon: '🔍', correctOrder: 4 },
  { id: 's5', text: '5. Subir y entregar la tarea', icon: '📤', correctOrder: 5 },
];

// LEVEL 9: Share items
export const LEVEL_9_ITEMS: ShareItem[] = [
  {
    id: 'sh1',
    text: 'Tu contraseña secreta',
    icon: '🔑',
    canShare: false,
    reason: '¡Tu contraseña es como la llave de tu casa! Jamás se comparte.',
  },
  {
    id: 'sh2',
    text: 'Tu tarea o dibujo escolar',
    icon: '🎨',
    canShare: true,
    reason: '¡Muy bien! Las tareas escolares están hechas para compartir con tu profe.',
  },
  {
    id: 'sh3',
    text: 'La dirección exacta de tu casa',
    icon: '🏠',
    canShare: false,
    reason: 'La dirección de tu casa es información privada para proteger a tu familia.',
  },
  {
    id: 'sh4',
    text: 'Una pregunta sobre un ejercicio',
    icon: '❓',
    canShare: true,
    reason: '¡Excelente! Preguntar dudas en clase ayuda a aprender a todos.',
  },
  {
    id: 'sh5',
    text: 'El número de teléfono de tu familia',
    icon: '📱',
    canShare: false,
    reason: 'Los números de teléfono familiares son privados.',
  },
  {
    id: 'sh6',
    text: 'Un mensaje amable a un compañero',
    icon: '🤝',
    canShare: true,
    reason: '¡Genial! Los saludos amables y palabras de aliento hacen un aula hermosa.',
  },
  {
    id: 'sh7',
    text: 'Fotos privadas o familiares',
    icon: '📸',
    canShare: false,
    reason: 'Las fotos de tu hogar o familiares son privadas y personales.',
  },
  {
    id: 'sh8',
    text: 'Un libro o lectura que pidió el profe',
    icon: '📖',
    canShare: true,
    reason: '¡Correcto! El material de estudio es para compartir en el aula virtual.',
  },
];

// Mini-Challenges and Quizzes adapted by grade
export function getLevelQuestions(levelId: number, grade: Grade): QuizQuestion[] {
  switch (levelId) {
    case 1:
      if (grade === 1 || grade === 2) {
        return [
          {
            id: 'l1_q1',
            question: '¿QUÉ ES GOOGLE CLASSROOM?',
            options: [
              { id: 'a', text: 'NUESTRA AULA VIRTUAL PARA APRENDER', icon: '🏫', isCorrect: true, explanation: '¡SÍ! CLASSROOM ES NUESTRA ESCUELA DIGITAL.' },
              { id: 'b', text: 'UN JUEGO DE AUTOS DE CARRERAS', icon: '🏎️', isCorrect: false, explanation: '¡NO! CLASSROOM ES PARA APRENDER CON NUESTROS PROFES.' },
            ],
          },
          {
            id: 'l1_q2',
            question: '¿QUIÉN PUBLICA LAS TAREAS?',
            options: [
              { id: 'a', text: 'TU MAESTRA O MAESTRO', icon: '👩‍🏫', isCorrect: true, explanation: '¡EXCELENTE! TU SEÑO PREPARA ACTIVIDADES LINDAS.' },
              { id: 'b', text: 'UN ROBOT DESCONOCIDO', icon: '👾', isCorrect: false, explanation: '¡NO! LAS TAREAS LAS ENVÍA TU PROFE.' },
            ],
          },
          {
            id: 'l1_q3',
            question: '¿QUÉ HACEMOS EN CLASSROOM?',
            options: [
              { id: 'a', text: 'LEER, HACER TAREAS Y APRENDER', icon: '📚', isCorrect: true, explanation: '¡MUY BIEN! AQUÍ APRENDEMOS JUNTOS CADA DÍA.' },
              { id: 'b', text: 'PELEAR CON LOS COMPAÑEROS', icon: '😠', isCorrect: false, explanation: '¡NUNCA! EN CLASSROOM NOS TRATAMOS CON AMOR.' },
            ],
          },
        ];
      } else {
        return [
          {
            id: 'l1_q1',
            question: '¿Cuál es el propósito principal de Google Classroom en nuestra escuela?',
            options: [
              { id: 'a', text: 'Organizar nuestras clases, recibir tareas y comunicarnos con los docentes', icon: '🏫', isCorrect: true, explanation: '¡Exacto! Classroom es una plataforma educativa para centralizar el aprendizaje escolar.' },
              { id: 'b', text: 'Una red social para publicar fotos personales y chismes', icon: '📱', isCorrect: false, explanation: 'Classroom no es una red social de ocio, es un entorno educativo.' },
              { id: 'c', text: 'Una tienda de videojuegos en línea', icon: '🎮', isCorrect: false, explanation: 'Classroom es un espacio de trabajo escolar.' },
            ],
          },
          {
            id: 'l1_q2',
            question: '¿Por qué es importante tener una cuenta institucional escolar para ingresar?',
            options: [
              { id: 'a', text: 'Porque nos da acceso seguro a nuestras clases y protege nuestra identidad escolar', icon: '🛡️', isCorrect: true, explanation: '¡Correcto! La cuenta del colegio garantiza un espacio seguro supervisado por la institución.' },
              { id: 'b', text: 'Porque es obligatorio para ganar seguidores', icon: '👥', isCorrect: false, explanation: 'En la escuela no buscamos seguidores, buscamos aprender.' },
            ],
          },
          {
            id: 'l1_q3',
            question: 'Si no entendés para qué sirve una tarea en Classroom, ¿qué debés hacer?',
            options: [
              { id: 'a', text: 'Preguntarle a tu maestra o maestro con un comentario respetuoso', icon: '🙋‍♂️', isCorrect: true, explanation: '¡Muy bien! Los docentes están siempre listos para ayudarte.' },
              { id: 'b', text: 'No hacer nada y esperar a que pase el año', icon: '😴', isCorrect: false, explanation: 'Siempre es bueno comunicarse a tiempo.' },
            ],
          },
        ];
      }

    case 2:
      // Cuidamos nuestra cuenta
      if (grade === 1 || grade === 2) {
        return [
          {
            id: 'l2_q1',
            question: 'UN COMPAÑERO TE PIDE TU CONTRASEÑA. ¿QUÉ HACÉS?',
            options: [
              { id: 'a', text: 'NO LA COMPARTO, ES SECRETA', icon: '🔐', isCorrect: true, explanation: '¡PERFECTO! LA CONTRASEÑA NO SE DICE A NADIE.' },
              { id: 'b', text: 'SE LA DIGO EN VOZ ALTA', icon: '📢', isCorrect: false, explanation: '¡CUIDADO! SI OTRO TIENE TU CLAVE, PUEDE BORRAR TUS TRABAJOS.' },
            ],
          },
          {
            id: 'l2_q2',
            question: '¿A QUIÉN LE PODÉS PEDIR AYUDA SI ALGO EXTRAÑO PASA?',
            options: [
              { id: 'a', text: 'A MI FAMILIA O A MI MAESTRA', icon: '👨‍👩‍👧', isCorrect: true, explanation: '¡SÍ! LOS ADULTOS DE CONFIANZA SIEMPRE TE PROTEGEN.' },
              { id: 'b', text: 'A UN EXTRAÑO EN INTERNET', icon: '👤', isCorrect: false, explanation: '¡NO! NUNCA HABLES CON DESCONOCIDOS.' },
            ],
          },
        ];
      } else {
        return [
          {
            id: 'l2_q1',
            question: 'Tu amigo te pide la contraseña diciendo que se olvidó la suya y quiere ver la tarea. ¿Qué deberías hacer?',
            options: [
              { id: 'a', text: 'Explicarle con amabilidad que no podés compartirla y sugerirle que le pida ayuda al docente', icon: '🤝', isCorrect: true, explanation: '¡Excelente decisión! Cuidás la seguridad de ambos y le das una solución correcta.' },
              { id: 'b', text: 'Dársela porque es tu mejor amigo', icon: '🔓', isCorrect: false, explanation: 'Incluso entre amigos, las contraseñas son estrictamente personales e intransferibles.' },
              { id: 'c', text: 'Escribirla en el tablón público de Classroom', icon: '📢', isCorrect: false, explanation: '¡Peligro! Toda la clase vería tu contraseña.' },
            ],
          },
          {
            id: 'l2_q2',
            question: 'Al terminar de usar Classroom en una computadora de la escuela o biblioteca:',
            options: [
              { id: 'a', text: 'Cerrar la sesión de tu cuenta para que nadie más pueda usarla', icon: '🚪', isCorrect: true, explanation: '¡Exacto! Cerrar sesión evita que otra persona use tu cuenta por error o malicia.' },
              { id: 'b', text: 'Dejarla abierta para no tener que escribir la contraseña mañana', icon: '⚡', isCorrect: false, explanation: 'Cualquier persona que use esa computadora podría enviar mensajes en tu nombre.' },
            ],
          },
        ];
      }

    case 3:
      // Conociendo nuestra clase
      return [
        {
          id: 'l3_q1',
          question: grade === 1 ? '¿DÓNDE ESTÁN TUS TAREAS?' : '¿En qué sección encontrás organizadas las tareas y temas de cada materia?',
          options: [
            { id: 'a', text: grade === 1 ? 'EN TRABAJO DE CLASE' : 'En la pestaña "Trabajo de clase"', icon: '📚', isCorrect: true, explanation: '¡Excelente! En "Trabajo de clase" están todos los temas y actividades ordenaditos.' },
            { id: 'b', text: grade === 1 ? 'EN LA PAPELERA' : 'En los juegos de la computadora', icon: '🗑️', isCorrect: false, explanation: 'En "Trabajo de clase" es donde tu maestro publica cada consigna.' },
          ],
        },
        {
          id: 'l3_q2',
          question: grade === 1 ? '¿PARA QUÉ SIRVE EL TABLÓN O NOVEDADES?' : '¿Qué encontramos en la pestaña "Novedades" o "Tablón"?',
          options: [
            { id: 'a', text: grade === 1 ? 'PARA VER AVISOS DE LA MAESTRA' : 'Anuncios, recordatorios y publicaciones generales del docente', icon: '📢', isCorrect: true, explanation: '¡Muy bien! Es la cartelera de noticias de tu aula.' },
            { id: 'b', text: grade === 1 ? 'PARA VER DIBUJOS ANIMADOS' : 'Una galería de memes', icon: '📺', isCorrect: false, explanation: 'Es el espacio donde el docente publica los avisos importantes.' },
          ],
        },
      ];

    case 4:
      // Leemos las consignas
      if (grade === 1 || grade === 2) {
        return [
          {
            id: 'l4_q1',
            question: '¿QUÉ ES UNA CONSIGNA ESCOLAR?',
            options: [
              { id: 'a', text: 'LO QUE LA MAESTRA NOS PIDE QUE HAGAMOS', icon: '📖', isCorrect: true, explanation: '¡SÍ! LA CONSIGNA TE EXPLICA CÓMO TRABAJAR.' },
              { id: 'b', text: 'UN DIBUJO ANIMADO DE LA TELE', icon: '📺', isCorrect: false, explanation: '¡NO! LA CONSIGNA ES LA GUÍA DE TU TAREA.' },
            ],
          },
          {
            id: 'l4_q2',
            question: 'ANTES DE EMPEZAR A DIBUJAR O ESCRIBIR, ¿QUÉ HACEMOS?',
            options: [
              { id: 'a', text: 'LEER TODA LA CONSIGNA COMPLETA', icon: '👀', isCorrect: true, explanation: '¡EXCELENTE! LEER PRIMERO EVITA ERRORES.' },
              { id: 'b', text: 'HACER CUALQUIER COSA SIN LEER', icon: '🙈', isCorrect: false, explanation: '¡CUIDADO! SIEMPRE HAY QUE LEER LO QUE PIDE LA SEÑO.' },
            ],
          },
          {
            id: 'l4_q3',
            question: '¿CUÁL ES EL PRIMER PASO DE TODOS?',
            options: [
              { id: 'a', text: 'LEER CON ATENCIÓN 📚', icon: '📚', isCorrect: true, explanation: '¡MUY BIEN! EL PASO 1 ES SIEMPRE LEER.' },
              { id: 'b', text: 'APRETAR EL BOTÓN ENTREGAR 📤', icon: '📤', isCorrect: false, explanation: '¡NO! ENTREGAR ES EL ÚLTIMO PASO, NO EL PRIMERO.' },
            ],
          },
        ];
      } else {
        return [
          {
            id: 'l4_q1',
            question: '¿Por qué es fundamental leer la consigna completa antes de comenzar una tarea?',
            options: [
              { id: 'a', text: 'Para identificar todos los requerimientos, pasos y materiales que solicita el docente', icon: '📖', isCorrect: true, explanation: '¡Exacto! Leer con atención evita rehacer tareas por olvidos o malas interpretaciones.' },
              { id: 'b', text: 'Para terminar más rápido aunque quede incompleta', icon: '⚡', isCorrect: false, explanation: 'Apurarse sin leer genera errores y calificaciones bajas.' },
            ],
          },
          {
            id: 'l4_q2',
            question: 'Una consigna dice: "Realizá un dibujo de tu animal favorito, escribí su nombre debajo y adjuntalo". ¿Qué debés hacer?',
            options: [
              { id: 'a', text: 'Dibujar el animal, escribir su nombre y adjuntar el archivo (cumplir las 3 pautas)', icon: '✅', isCorrect: true, explanation: '¡Excelente! Cotejar que cumpliste cada parte de la consigna garantiza una entrega completa.' },
              { id: 'b', text: 'Hacer solo el dibujo sin poner el nombre ni adjuntarlo', icon: '❌', isCorrect: false, explanation: 'Faltarían partes fundamentales de lo solicitado por el docente.' },
            ],
          },
          {
            id: 'l4_q3',
            question: 'Si una consigna contiene múltiples pasos o condiciones, ¿cuál es la mejor estrategia?',
            options: [
              { id: 'a', text: 'Desglosarla paso a paso y hacer una verificación final antes de enviar', icon: '🔍', isCorrect: true, explanation: '¡Brillante! Descomponer la consigna en metas pequeñas asegura un trabajo ordenado.' },
              { id: 'b', text: 'Hacer solo lo que nos gusta y obviar el resto', icon: '😴', isCorrect: false, explanation: 'Todas las pautas de la consigna forman parte de la evaluación.' },
            ],
          },
        ];
      }

    case 5:
      // Entregamos nuestras tareas
      if (grade === 1 || grade === 2) {
        return [
          {
            id: 'l5_q1',
            question: 'SI SUBÍS TU DIBUJO, ¿YA ESTÁ ENTREGADA LA TAREA?',
            options: [
              { id: 'a', text: '¡NO! HAY QUE TOCAR EL BOTÓN "ENTREGAR"', icon: '📤', isCorrect: true, explanation: '¡EXACTO! ADJUNTAR NO ES ENTREGAR. ¡HAY QUE APRETAR ENTREGAR!' },
              { id: 'b', text: 'SÍ, LA COMPUTADORA LO ENVÍA SOLA', icon: '🤖', isCorrect: false, explanation: '¡NO! SI NO TOCÁS ENTREGAR, LA SEÑO NO LO RECIBE.' },
            ],
          },
          {
            id: 'l5_q2',
            question: '¿QUÉ DIFERENCIA HAY ENTRE ADJUNTAR Y ENTREGAR?',
            options: [
              { id: 'a', text: 'ADJUNTAR ES PONER EL DIBUJO, ENTREGAR ES ENVIARLO A LA MAESTRA', icon: '✉️', isCorrect: true, explanation: '¡PERFECTO! ADJUNTAR CARGA EL ARCHIVO Y ENTREGAR LO ENVÍA.' },
              { id: 'b', text: 'SON EXACTAMENTE LO MISMO', icon: '🤷‍♂️', isCorrect: false, explanation: '¡NO! SON DOS PASOS DIFERENTES Y AMBOS SON NECESARIOS.' },
            ],
          },
          {
            id: 'l5_q3',
            question: '¿CÓMO SABÉS QUE TU TAREA QUEDÓ ENTREGADA?',
            options: [
              { id: 'a', text: 'DICE "TAREA ENTREGADA" CON COLOR VERDE O TIC', icon: '✅', isCorrect: true, explanation: '¡BRAVO! EL CARTEL DE ENTREGADA TE DA TRANQUILIDAD.' },
              { id: 'b', text: 'SE APAGA LA PANTALLA', icon: '💻', isCorrect: false, explanation: 'CLASSROOM TE MUESTRA EL CARTEL DE TAREA ENTREGADA.' },
            ],
          },
        ];
      } else {
        return [
          {
            id: 'l5_q1',
            question: '¿Cuál es la diferencia fundamental entre "Adjuntar un archivo" y "Entregar la tarea"?',
            options: [
              { id: 'a', text: 'Adjuntar solo sube el archivo a borrador; presionar "Entregar" transfiere el trabajo al docente', icon: '📤', isCorrect: true, explanation: '¡Correcto! Si no presionás "Entregar", la tarea figura como pendiente y el docente no puede calificarla.' },
              { id: 'b', text: 'No existe ninguna diferencia; con subir el archivo ya alcanza', icon: '❌', isCorrect: false, explanation: 'Cargar el archivo es el paso previo; la entrega formal requiere confirmar el botón Entregar.' },
            ],
          },
          {
            id: 'l5_q2',
            question: 'Antes de hacer clic en el botón "Entregar", ¿qué paso de control de calidad debés realizar?',
            options: [
              { id: 'a', text: 'Hacer clic sobre el archivo adjunto para verificar que sea el correcto, completo y legible', icon: '🔍', isCorrect: true, explanation: '¡Excelente hábito! Previene enviar archivos en blanco, fotos borrosas o tareas de otra materia.' },
              { id: 'b', text: 'Cerrar la sesión de inmediato sin mirar', icon: '🚪', isCorrect: false, explanation: 'Siempre verificamos que el archivo subido sea el correcto.' },
            ],
          },
          {
            id: 'l5_q3',
            question: 'Si entregaste una tarea y te das cuenta de un error antes de la fecha de vencimiento, ¿qué podés hacer?',
            options: [
              { id: 'a', text: 'Presionar "Anular entrega", corregir el archivo y volver a presionar "Entregar"', icon: '🔄', isCorrect: true, explanation: '¡Muy bien! Classroom permite anular la entrega para realizar ajustes siempre que estés dentro del plazo.' },
              { id: 'b', text: 'Dejarlo así porque el sistema se bloquea para siempre', icon: '🔒', isCorrect: false, explanation: 'La opción "Anular entrega" te devuelve los permisos de edición para corregir.' },
            ],
          },
        ];
      }

    case 6:
      // Somos responsables
      return [
        {
          id: 'l6_q1',
          question: grade === 1 ? 'TENÉS UNA TAREA PARA EL VIERNES. HOY ES MARTES. ¿QUÉ HACÉS?' : 'Tenés una tarea para el viernes y hoy es martes. ¿Cuál es la mejor estrategia?',
          options: [
            { id: 'a', text: grade === 1 ? 'LA HAGO CON TIEMPO Y TRANQUILO' : 'Organizar mi tiempo, leer la consigna con anticipación y realizarla con calma', icon: '📅', isCorrect: true, explanation: '¡Eso es ser responsable! Evitás nervios y hacés un trabajo de calidad.' },
            { id: 'b', text: grade === 1 ? 'ESPERO HASTA EL VIERNES A LA NOCHE' : 'Dejarla para 5 minutos antes de la medianoche del viernes', icon: '⏳', isCorrect: false, explanation: 'Dejar todo a último momento trae errores, problemas de internet y apuros.' },
          ],
        },
        {
          id: 'l6_q2',
          question: grade === 1 ? 'ANTES DE ENTREGAR, ¿QUÉ DEBEMOS HACER?' : 'Antes de pulsar el botón "Entregar", ¿qué paso fundamental debemos dar?',
          options: [
            { id: 'a', text: grade === 1 ? 'MIRAR QUE EL ARCHIVO SEA EL CORRECTO' : 'Revisar que hayamos adjuntado el archivo correcto y que la tarea esté completa', icon: '🔍', isCorrect: true, explanation: '¡Genial! Así nunca entregarás una hoja en blanco por equivocación.' },
            { id: 'b', text: grade === 1 ? 'CERRAR LOS OJOS Y APRETAR CUALQUIER BOTÓN' : 'Entregar sin mirar nada', icon: '🙈', isCorrect: false, explanation: 'Siempre revisamos nuestro trabajo antes de darlo por terminado.' },
          ],
        },
      ];

    case 7:
      // Hablamos con respeto
      return [
        {
          id: 'l7_q1',
          question: grade === 1 ? 'UN COMPAÑERO HIZO UNA PREGUNTA. ¿QUÉ LE DECÍS?' : 'Un compañero hace una pregunta en Classroom que te parece muy sencilla. ¿Cómo respondés?',
          options: [
            { id: 'a', text: grade === 1 ? '¡YO TE PUEDO AYUDAR CON CARIÑO!' : '"¡Hola! Si querés te explico cómo lo resolví yo."', icon: '💖', isCorrect: true, explanation: '¡Hermosa actitud! La amabilidad y la empatía enriquecen a todo el grupo.' },
            { id: 'b', text: grade === 1 ? '¡QUÉ PREGUNTA TONTA!' : '"¡Qué fácil, eso lo sabe cualquiera!"', icon: '😡', isCorrect: false, explanation: 'Burlarse o desanimar a un compañero lastima sus sentimientos y rompe la confianza.' },
          ],
        },
        {
          id: 'l7_q2',
          question: grade === 1 ? '¿QUÉ HACÉS ANTES DE ESCRIBIR UN COMENTARIO?' : '¿Cuáles son las 3 preguntas clave del filtro "Pensá antes de publicar"?',
          options: [
            { id: 'a', text: grade === 1 ? 'PENSAR SI ES LINDO Y RESPETUOSO' : '¿Es respetuoso? ¿Es necesario? ¿Ayuda a aprender?', icon: '💭', isCorrect: true, explanation: '¡Exacto! Si cumple las tres condiciones, es un comentario valioso para el aula.' },
            { id: 'b', text: grade === 1 ? 'ESCRIBIR CUALQUIER COSA RÁPIDO' : '¿Es gracioso aunque moleste a otros?', icon: '⚡', isCorrect: false, explanation: 'Antes de publicar, siempre reflexionamos sobre el impacto de nuestras palabras.' },
          ],
        },
      ];

    case 8:
      // Aprendemos juntos
      return [
        {
          id: 'l8_q1',
          question: grade === 1 ? '¿CÓMO AYUDAMOS A UN AMIGO?' : 'Un compañero te pide tu archivo terminado para copiarlo porque no tuvo tiempo. ¿Qué hacés?',
          options: [
            { id: 'a', text: grade === 1 ? 'LE EXPLICO CON PACIENCIA SIN COPIAR' : 'Le ofrezco explicarle el tema para que pueda hacer su propio trabajo', icon: '💡', isCorrect: true, explanation: '¡Brillante! Ayudar es enseñar a pensar, no hacer el trabajo por el otro.' },
            { id: 'b', text: grade === 1 ? 'LE DOY MI TAREA PARA QUE LA COPIE' : 'Le paso mi archivo para que le cambie el nombre', icon: '📋', isCorrect: false, explanation: 'Copiar impide que tu compañero aprenda y va en contra de la honestidad académica.' },
          ],
        },
        {
          id: 'l8_q2',
          question: grade === 1 ? 'EN UN TRABAJO EN EQUIPO:' : 'Cuando trabajamos en grupo dentro de Classroom o Google Docs:',
          options: [
            { id: 'a', text: grade === 1 ? 'ESCUCHAMOS LAS IDEAS DE TODOS' : 'Escuchamos con respeto las ideas de todos y nos repartimos las tareas justamente', icon: '🤝', isCorrect: true, explanation: '¡El trabajo en equipo suma talentos y produce resultados increíbles!' },
            { id: 'b', text: grade === 1 ? 'UNO SOLO HACE TODO EL TRABAJO' : 'Que uno solo trabaje y los demás descansen', icon: '🥱', isCorrect: false, explanation: 'Todos deben participar activamente para aprender juntos.' },
          ],
        },
      ];

    case 9:
      // Nos cuidamos en Internet
      if (grade === 1 || grade === 2) {
        return [
          {
            id: 'l9_q1',
            question: '¿SE PUEDE COMPARTIR TU CONTRASEÑA O LA DIRECCIÓN DE TU CASA?',
            options: [
              { id: 'a', text: '¡NO! SON SECRETOS PRIVADOS DE LA FAMILIA', icon: '🔒', isCorrect: true, explanation: '¡MUY BIEN! LOS DATOS PRIVADOS NUNCA SE PUBLICAN EN INTERNET.' },
              { id: 'b', text: 'SÍ, SE LO DECIMOS A CUALQUIERA EN EL CHAT', icon: '🗣️', isCorrect: false, explanation: '¡CUIDADO! TU DIRECCIÓN Y CLAVES SON PRIVADAS.' },
            ],
          },
          {
            id: 'l9_q2',
            question: '¿QUÉ SÍ PODEMOS COMPARTIR EN CLASSROOM?',
            options: [
              { id: 'a', text: 'NUESTRAS TAREAS ESCOLARES, DIBUJOS Y DUDAS', icon: '🎨', isCorrect: true, explanation: '¡SÍ! EL AULA VIRTUAL ES PARA COMPARTIR EL APRENDIZAJE.' },
              { id: 'b', text: 'LA TARJETA DE CRÉDITO DE NUESTROS PADRES', icon: '💳', isCorrect: false, explanation: '¡NUNCA! LOS DATOS BANCARIOS O DE DINERO SON SECRETOS.' },
            ],
          },
          {
            id: 'l9_q3',
            question: 'SI ALGO EN LA PANTALLA TE ASUSTA O TE HACE DUDAR:',
            options: [
              { id: 'a', text: 'LE AVISO DE INMEDIATO A MI FAMILIA O MAESTRA', icon: '👨‍👩‍👧', isCorrect: true, explanation: '¡HERMOSO! LOS ADULTOS DE CONFIANZA SIEMPRE TE PROTEGEN.' },
              { id: 'b', text: 'ME QUEDO CALLADO Y CON MIEDO', icon: '😢', isCorrect: false, explanation: '¡SIEMPRE PEDÍ AYUDA! HABLAR TE MANTIENE SEGURO.' },
            ],
          },
        ];
      } else {
        return [
          {
            id: 'l9_q1',
            question: '¿Qué información personal se considera confidencial y NUNCA debe publicarse en Classroom ni en la web?',
            options: [
              { id: 'a', text: 'Contraseñas, dirección del hogar, teléfonos particulares, datos bancarios y fotos privadas', icon: '🛡️', isCorrect: true, explanation: '¡Exacto! Proteger tus datos sensibles resguarda la seguridad física y digital de tu familia.' },
              { id: 'b', text: 'El título del libro que estás leyendo para la clase de Lengua', icon: '📖', isCorrect: false, explanation: 'Las lecturas escolares son parte de los contenidos educativos del aula.' },
            ],
          },
          {
            id: 'l9_q2',
            question: 'Un mensaje en el aula virtual o correo promete monedas de juegos o regalos si hacés clic en un enlace. ¿Qué debés hacer?',
            options: [
              { id: 'a', text: 'No hacer clic, no ingresar credenciales y avisar de inmediato al docente (es un intento de phishing)', icon: '⚠️', isCorrect: true, explanation: '¡Impecable criterio de ciberseguridad! Esos enlaces buscan vulnerar cuentas o infectar equipos.' },
              { id: 'b', text: 'Hacer clic rápido y poner tu contraseña para reclamar el premio', icon: '🎁', isCorrect: false, explanation: '¡Peligro! Es una trampa clásica de ingeniería social.' },
            ],
          },
          {
            id: 'l9_q3',
            question: '¿Qué es la "huella digital" y por qué los estudiantes debemos ser conscientes de ella?',
            options: [
              { id: 'a', text: 'El rastro imborrable de datos, publicaciones y comentarios que dejamos al interactuar en internet', icon: '👣', isCorrect: true, explanation: '¡Brillante! Construir una huella digital positiva y respetuosa es parte de tu identidad futura.' },
              { id: 'b', text: 'Una mancha de tinta en el teclado de la computadora', icon: '💻', isCorrect: false, explanation: 'La huella digital es el registro permanente de tu actividad en la red.' },
            ],
          },
        ];
      }

    default:
      return [];
  }
}

// LEVEL 10: Gran Desafío Final (10 questions adapted by grade)
export function getFinalChallengeQuestions(grade: Grade): QuizQuestion[] {
  if (grade === 1 || grade === 2) {
    return [
      {
        id: 'f_1',
        question: '1. ¿PARA QUÉ SIRVE GOOGLE CLASSROOM?',
        options: [
          { id: 'a', text: 'PARA APRENDER, LEER Y ENTREGAR TAREAS', icon: '📚', isCorrect: true, explanation: '¡EXCELENTE! ES NUESTRA AULA VIRTUAL.' },
          { id: 'b', text: 'PARA COMPRAR JUGUETES', icon: '🧸', isCorrect: false, explanation: 'CLASSROOM ES PARA LA ESCUELA.' },
        ],
      },
      {
        id: 'f_2',
        question: '2. TU CONTRASEÑA ES:',
        options: [
          { id: 'a', text: 'SECRETA Y NO SE COMPARTE CON NADIE', icon: '🔐', isCorrect: true, explanation: '¡MUY BIEN! CUIDA TU CUENTA SIEMPRE.' },
          { id: 'b', text: 'PARA DECÍRSELA A TODOS EN EL RECREO', icon: '🗣️', isCorrect: false, explanation: 'LA CONTRASEÑA ES PRIVADA.' },
        ],
      },
      {
        id: 'f_3',
        question: '3. ANTES DE HACER UNA TAREA DEBEMOS:',
        options: [
          { id: 'a', text: 'LEER TODA LA CONSIGNA COMPLETA', icon: '📖', isCorrect: true, explanation: '¡SÍ! PRIMERO LEEMOS CON ATENCIÓN.' },
          { id: 'b', text: 'DIBUJAR CUALQUIER COSA SIN LEER', icon: '🙈', isCorrect: false, explanation: 'HAY QUE LEER LO QUE PIDE LA SEÑO.' },
        ],
      },
      {
        id: 'f_4',
        question: '4. CUANDO TERMINAMOS UNA TAREA:',
        options: [
          { id: 'a', text: 'SUBIMOS EL ARCHIVO Y TOCAMOS "ENTREGAR"', icon: '📤', isCorrect: true, explanation: '¡BRAVO! ASÍ LA MAESTRA PUEDE REVISARLA.' },
          { id: 'b', text: 'APAGAMOS LA PANTALLA SIN GUARDAR', icon: '❌', isCorrect: false, explanation: 'HAY QUE TOCAR EL BOTÓN ENTREGAR.' },
        ],
      },
      {
        id: 'f_5',
        question: '5. ¿CÓMO NOS HABLAMOS EN LOS COMENTARIOS?',
        options: [
          { id: 'a', text: 'CON PALABRAS LINDAS, AMABLES Y RESPETO', icon: '💖', isCorrect: true, explanation: '¡QUÉ LINDO! SIEMPRE TRATAMOS CON CARIÑO.' },
          { id: 'b', text: 'BURLÁNDONOS DE OTROS', icon: '😠', isCorrect: false, explanation: 'NUNCA NOS BURLAMOS.' },
        ],
      },
      {
        id: 'f_6',
        question: '6. SI NO ENTIENDO ALGO EN LA TAREA:',
        options: [
          { id: 'a', text: 'LE PIDO AYUDA A MI MAESTRA O FAMILIA', icon: '🙋‍♀️', isCorrect: true, explanation: '¡SÍ! PREGUNTAR ES DE NIÑOS INTELIGENTES.' },
          { id: 'b', text: 'LLORO Y ME ESCONDO', icon: '😢', isCorrect: false, explanation: 'PIDE AYUDA Y TE VAN A EXPLICAR CON AMOR.' },
        ],
      },
      {
        id: 'f_7',
        question: '7. AYUDAR A UN COMPAÑERO ES:',
        options: [
          { id: 'a', text: 'EXPLICARLE CON PACIENCIA PARA QUE APRENDA', icon: '🤝', isCorrect: true, explanation: '¡EXCELENTE COMPAÑERO!' },
          { id: 'b', text: 'PASARLE LA TAREA PARA QUE LA COPIE', icon: '📋', isCorrect: false, explanation: 'COPIAR NO AYUDA A APRENDER.' },
        ],
      },
      {
        id: 'f_8',
        question: '8. ¿SE PUEDE PUBLICAR LA DIRECCIÓN DE TU CASA?',
        options: [
          { id: 'a', text: '¡NO! ES INFORMACIÓN PRIVADA Y SECRETA', icon: '🛡️', isCorrect: true, explanation: '¡BIEN! LOS DATOS PRIVADOS SE PROTEGEN.' },
          { id: 'b', text: 'SÍ, PARA QUE TODOS SEPAN DÓNDE VIVO', icon: '🏠', isCorrect: false, explanation: 'NUNCA PONGAS TU DIRECCIÓN EN INTERNET.' },
        ],
      },
      {
        id: 'f_9',
        question: '9. LAS TAREAS DE LA ESCUELA:',
        options: [
          { id: 'a', text: 'SE HACEN A TIEMPO, SIN DEJAR PARA EL FINAL', icon: '⏰', isCorrect: true, explanation: '¡MUY BIEN ORGANIZADO!' },
          { id: 'b', text: 'SE HACEN CUANDO YA PASÓ UNA SEMANA', icon: '💤', isCorrect: false, explanation: 'ES MEJOR ENTREGAR EN LA FECHA CORRECTA.' },
        ],
      },
      {
        id: 'f_10',
        question: '10. ¡CLASITO TE PREGUNTA! ¿CLASSROOM ES PARA:',
        options: [
          { id: 'a', text: 'CRECER, APRENDER Y DIVERTIRSE JUNTOS!', icon: '🌟', isCorrect: true, explanation: '¡SÍ! ¡SOS UN CAMPEÓN DE CLASSROOM!' },
          { id: 'b', text: 'SOLO ABRIR Y CERRAR VENTANAS', icon: '💻', isCorrect: false, explanation: '¡ES UN ESPACIO HERMOSO DE APRENDIZAJE!' },
        ],
      },
    ];
  } else if (grade === 3) {
    return [
      {
        id: 'f_1',
        question: '1. ¿En qué pestaña de Classroom encontramos las tareas organizadas por materias o temas?',
        options: [
          { id: 'a', text: 'Trabajo de clase', icon: '📚', isCorrect: true, explanation: '¡Correcto! Allí están todos los temas, tareas y materiales.' },
          { id: 'b', text: 'Novedades', icon: '📢', isCorrect: false, explanation: 'En Novedades están los anuncios generales.' },
          { id: 'c', text: 'La papelera de reciclaje', icon: '🗑️', isCorrect: false, explanation: 'No es la papelera.' },
        ],
      },
      {
        id: 'f_2',
        question: '2. Tu contraseña institucional escolar:',
        options: [
          { id: 'a', text: 'Es totalmente privada y solo la deben conocer vos y tus padres/tutores', icon: '🔐', isCorrect: true, explanation: '¡Exacto! Protege tu seguridad y tus trabajos.' },
          { id: 'b', text: 'Podés compartirla con tus amigos para que te ayuden', icon: '👥', isCorrect: false, explanation: 'Nunca se comparte con amigos.' },
        ],
      },
      {
        id: 'f_3',
        question: '3. Una consigna dice: "Escribe 3 oraciones y dibuja un sol". ¿Qué pasos debés seguir?',
        options: [
          { id: 'a', text: 'Leer todo, escribir las 3 oraciones, hacer el dibujo del sol y revisar antes de entregar', icon: '✅', isCorrect: true, explanation: '¡Excelente! Cumpliste con todo lo que pedía la consigna.' },
          { id: 'b', text: 'Solo dibujar el sol porque es más rápido', icon: '☀️', isCorrect: false, explanation: 'Faltarían las 3 oraciones que pidió la maestra.' },
        ],
      },
      {
        id: 'f_4',
        question: '4. ¿Cómo confirmás que tu tarea fue entregada correctamente?',
        options: [
          { id: 'a', text: 'Verificando que aparezca el estado "Entregada" o "Tarea entregada"', icon: '🟢', isCorrect: true, explanation: '¡Muy bien! Classroom te muestra el estado en color verde o con el cartel de entregado.' },
          { id: 'b', text: 'Cerrando la pestaña sin tocar nada', icon: '🚪', isCorrect: false, explanation: 'Debés pulsar "Entregar" y verificar el cartel de confirmación.' },
        ],
      },
      {
        id: 'f_5',
        question: '5. Si tenés una duda sobre un ejercicio que no entendés en la consigna:',
        options: [
          { id: 'a', text: 'Escribís un comentario privado o en clase a tu docente preguntando con respeto', icon: '💬', isCorrect: true, explanation: '¡Correcto! Los comentarios están hechos para consultar y aprender.' },
          { id: 'b', text: 'Copiás la respuesta de internet sin entender nada', icon: '📋', isCorrect: false, explanation: 'Preguntar a tu docente es la mejor forma de aprender.' },
        ],
      },
      {
        id: 'f_6',
        question: '6. El filtro "Pensá antes de publicar" nos invita a preguntarnos:',
        options: [
          { id: 'a', text: '¿Es respetuoso? ¿Es necesario? ¿Ayuda a aprender?', icon: '💭', isCorrect: true, explanation: '¡Tal cual! Si una de las tres es "No", es mejor no publicarlo.' },
          { id: 'b', text: '¿Cuántos likes voy a tener?', icon: '👍', isCorrect: false, explanation: 'En la escuela no buscamos likes, construimos convivencia sana.' },
        ],
      },
      {
        id: 'f_7',
        question: '7. Si tenés una entrega para el viernes a las 18:00 hs:',
        options: [
          { id: 'a', text: 'Planificar hacerla entre martes y jueves para no correr riesgos de cortes de luz o internet', icon: '⏰', isCorrect: true, explanation: '¡Brillante previsión! Ser precavido evita disgustos.' },
          { id: 'b', text: 'Empezar el viernes a las 17:55 hs', icon: '⚡', isCorrect: false, explanation: 'Cualquier demora de internet te dejaría con la tarea entregada tarde.' },
        ],
      },
      {
        id: 'f_8',
        question: '8. Un compañero escribe en un comentario: "No entiendo el punto 2". ¿Qué respuesta fomenta el compañerismo?',
        options: [
          { id: 'a', text: '"¡Hola! En el video de la clase lo explican en el minuto 4. ¡Ánimo!"', icon: '🌟', isCorrect: true, explanation: '¡Excelente colaboración y empatía!' },
          { id: 'b', text: '"¡Qué flojo! Prestá atención la próxima."', icon: '😠', isCorrect: false, explanation: 'Ese comentario desanima y es irrespetuoso.' },
        ],
      },
      {
        id: 'f_9',
        question: '9. ¿Qué información JAMÁS debemos subir a Classroom en un comentario público?',
        options: [
          { id: 'a', text: 'Dirección de tu casa, teléfono personal o datos bancarios familiares', icon: '🛡️', isCorrect: true, explanation: '¡Muy bien! Esa información es privada de tu familia.' },
          { id: 'b', text: 'El título de la tarea que estamos haciendo', icon: '📝', isCorrect: false, explanation: 'El título de la tarea sí pertenece a la clase.' },
        ],
      },
      {
        id: 'f_10',
        question: '10. Para adjuntar un archivo desde tu computadora o tablet a una tarea hacés clic en:',
        options: [
          { id: 'a', text: 'El botón "+ Agregar o crear" y seleccionás "Archivo"', icon: '📎', isCorrect: true, explanation: '¡Perfecto! Así podés subir fotos de tu cuaderno, documentos o dibujos.' },
          { id: 'b', text: 'El botón de apagar la computadora', icon: '🔌', isCorrect: false, explanation: 'Usás "+ Agregar o crear".' },
        ],
      },
    ];
  } else {
    // Grade 4 and 5: More depth, digital citizenship, safety, collaboration
    return [
      {
        id: 'f_1',
        question: '1. ¿Cuál es el valor pedagógico fundamental de revisar la pestaña "Trabajo de clase" periódicamente?',
        options: [
          { id: 'a', text: 'Monitorear fechas de entrega, acceder a materiales organizados por materia y no acumular pendientes', icon: '📊', isCorrect: true, explanation: '¡Exacto! Permite gestionar tu tiempo con autonomía y responsabilidad.' },
          { id: 'b', text: 'Ver cuántas notificaciones rojas acumulás', icon: '🔴', isCorrect: false, explanation: 'La idea es mantener tus tareas al día.' },
        ],
      },
      {
        id: 'f_2',
        question: '2. En cuanto a la seguridad de tu cuenta institucional de Google Workspace for Education:',
        options: [
          { id: 'a', text: 'Es intransferible; compartirla expone tus datos y puede generar acciones indebidas registradas a tu nombre', icon: '🔐', isCorrect: true, explanation: '¡Totalmente cierto! En entornos escolares, cada acción queda registrada con el usuario logueado.' },
          { id: 'b', text: 'No importa compartirla si le pedís a tu amigo que no haga nada malo', icon: '🤷‍♂️', isCorrect: false, explanation: 'Cualquier acción que se haga desde tu cuenta será tu responsabilidad.' },
        ],
      },
      {
        id: 'f_3',
        question: '3. En un trabajo colaborativo en Google Docs vinculado a Classroom, ¿qué norma de convivencia es esencial?',
        options: [
          { id: 'a', text: 'Respetar el texto de los demás, no borrar aportes ajenos sin consensuar y usar comentarios para debatir ideas', icon: '🤝', isCorrect: true, explanation: '¡Excelente! La colaboración digital se basa en el respeto mutuo y la construcción colectiva.' },
          { id: 'b', text: 'Borrar todo lo de tus compañeros y escribir solo lo que vos querés', icon: '❌', isCorrect: false, explanation: 'Eso arruina el trabajo en equipo y genera conflictos.' },
        ],
      },
      {
        id: 'f_4',
        question: '4. ¿Por qué es una mala práctica entregar una tarea vacía o con un archivo incorrecto solo para que figure "entregada"?',
        options: [
          { id: 'a', text: 'Porque dificulta la evaluación del docente, no demuestra tu aprendizaje real y genera demoras innecesarias', icon: '📉', isCorrect: true, explanation: '¡Muy bien! La entrega no es solo un botón: es el reflejo de tu esfuerzo y aprendizaje.' },
          { id: 'b', text: 'Porque el sistema de Google te bloquea la computadora para siempre', icon: '💻', isCorrect: false, explanation: 'Es una cuestión ética y de compromiso escolar.' },
        ],
      },
      {
        id: 'f_5',
        question: '5. La regla de la "Triple Verificación" antes de publicar en los comentarios de la clase incluye:',
        options: [
          { id: 'a', text: 'Evaluar si el mensaje es respetuoso, si aporta valor al tema y si ayuda a la comunidad de aprendizaje', icon: '💭', isCorrect: true, explanation: '¡Perfecto! Construye una ciudadanía digital madura y positiva.' },
          { id: 'b', text: 'Revisar cuántos emojis entran en una sola línea', icon: '🤪', isCorrect: false, explanation: 'El foco está en el contenido y el respeto.' },
        ],
      },
      {
        id: 'f_6',
        question: '6. Si un compañero publica algo ofensivo o inadecuado en el tablón de Classroom, ¿cuál es tu rol responsable?',
        options: [
          { id: 'a', text: 'No sumarte a las burlas ni responder con agresiones, y avisar de inmediato al docente para que intervenga', icon: '🛡️', isCorrect: true, explanation: '¡Excelente conducta! No alimentar el ciberacoso y recurrir a los adultos a cargo protege a todos.' },
          { id: 'b', text: 'Contestarle con un insulto peor para defender a otros', icon: '💥', isCorrect: false, explanation: 'Responder con agresiones escala el conflicto.' },
        ],
      },
      {
        id: 'f_7',
        question: '7. Sobre los derechos de autor y la honestidad académica al realizar una investigación escolar:',
        options: [
          { id: 'a', text: 'Debemos leer, resumir con nuestras palabras y citar las fuentes o páginas consultadas', icon: '📚', isCorrect: true, explanation: '¡Impecable! El plagio ("copiar y pegar sin citar") no nos permite aprender ni ejercitar el pensamiento crítico.' },
          { id: 'b', text: 'Copiar y pegar textos enteros de Wikipedia diciendo que los inventaste vos', icon: '✂️', isCorrect: false, explanation: 'Copiar y pegar sin citar no es honesto ni pedagógico.' },
        ],
      },
      {
        id: 'f_8',
        question: '8. ¿Qué diferencia hay entre un "Comentario de clase" y un "Comentario privado"?',
        options: [
          { id: 'a', text: 'El de clase lo ven todos los compañeros y el docente; el privado solo lo lee tu maestro/a', icon: '👁️', isCorrect: true, explanation: '¡Muy claro! Si tu duda es muy personal o sobre tu nota, es mejor el comentario privado.' },
          { id: 'b', text: 'El privado cuesta dinero y el de clase es gratuito', icon: '💰', isCorrect: false, explanation: 'Ambos son herramientas gratuitas integradas en Classroom.' },
        ],
      },
      {
        id: 'f_9',
        question: '9. En relación a la huella digital y el uso de enlaces o archivos en la web escolar:',
        options: [
          { id: 'a', text: 'Nunca debemos hacer clic en enlaces sospechosos o desconocidos ni descargar archivos no solicitados por el docente', icon: '🔒', isCorrect: true, explanation: '¡Exacto! Protege la red escolar y tus dispositivos contra virus o phishing.' },
          { id: 'b', text: 'Hay que abrir todos los enlaces que prometan cosas gratis o premios', icon: '🎁', isCorrect: false, explanation: 'Esos enlaces suelen ser trampas o estafas digitales.' },
        ],
      },
      {
        id: 'f_10',
        question: '10. En conclusión, ¿qué significa ser un verdadero "Experto en Google Classroom"?',
        options: [
          { id: 'a', text: 'Saber usar la tecnología con empatía, responsabilidad, organización y respeto hacia toda la comunidad educativa', icon: '🏆', isCorrect: true, explanation: '¡FELICITACIONES! ¡Has demostrado la esencia de la ciudadanía digital responsable!' },
          { id: 'b', text: 'Solo saber hacer clics rápidos con el mouse', icon: '🖱️', isCorrect: false, explanation: 'El uso responsable implica valores, respeto y colaboración.' },
        ],
      },
    ];
  }
}
