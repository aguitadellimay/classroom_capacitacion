import type { LevelLearningData } from '../types';

export const LEARNING_CONTENT: Record<number, LevelLearningData> = {
  // ==========================================
  // NIVEL 1: CONOCIENDO CLASSROOM
  // ==========================================
  1: {
    levelId: 1,
    clasitoIntro: {
      mood: 'waving',
      text: '¡Antes del desafío, vamos a aprender qué es Google Classroom y para qué lo usamos en la escuela!',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l1_g1_1',
          title: '¿QUÉ ES CLASSROOM?',
          explanation: 'CLASSROOM ES NUESTRA ESCUELA DIGITAL PARA APRENDER.',
          example: 'ES COMO UN AULA EN LA COMPUTADORA O TABLET.',
          icon: '🏫',
          tag: 'NUESTRA AULA',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA VER QUÉ HACEMOS',
            revealText: '¡AQUÍ APRENDEMOS, LEEMOS Y ENTREGAMOS TRABAJOS!',
          },
        },
        {
          id: 'l1_g1_2',
          title: 'LA MAESTRA Y LAS TAREAS',
          explanation: 'LA SEÑO PUBLICA DIBUJOS, LECTURAS Y ACTIVIDADES.',
          example: 'PODEMOS VERLAS Y HACERLAS CON AYUDA.',
          icon: '👩‍🏫',
          tag: 'ACTIVIDADES',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'LA SEÑO PREPARA TAREAS HERMOSAS PARA VOS.',
          },
        },
        {
          id: 'l1_g1_3',
          title: 'NO ES UN JUEGO DE OCIO',
          explanation: 'CLASSROOM NO ES PARA JUGAR VIDEOJUEGOS TODO EL DÍA.',
          example: 'ES PARA CRECER Y ESTUDIAR JUNTOS.',
          icon: '📚',
          tag: 'APRENDIZAJE',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿PARA QUÉ USAMOS CLASSROOM?',
            choiceOptions: [
              { text: 'PARA APRENDER CON LA ESCUELA 📚', isCorrect: true, feedback: '¡SÍ! ES NUESTRA AULA VIRTUAL.' },
              { text: 'PARA VER VIDEOS DE BAILE 💃', isCorrect: false, feedback: '¡NO! CLASSROOM ES PARA TRABAJOS ESCOLARES.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l1_g2_1',
          title: '¿Qué es Google Classroom?',
          explanation: 'Es la plataforma digital que utiliza nuestra escuela para que podamos estudiar y comunicarnos.',
          example: 'Funciona como un cuaderno digital donde están todas las materias.',
          icon: '🏫',
          tag: 'Aula Digital',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Descubrir qué encontramos dentro',
            revealText: 'Encontrarás avisos de la seño, consignas, lecturas y videos para repasar.',
          },
        },
        {
          id: 'l1_g2_2',
          title: '¿Para qué sirve?',
          explanation: 'Sirve para recibir las actividades escolares, hacer preguntas sobre las tareas y enviar tus trabajos terminados.',
          example: 'Cuando hacés un dibujo, podés subir la foto para que la maestra lo vea.',
          icon: '📋',
          tag: 'Tareas y Trabajos',
          interactiveType: 'tip',
          interactiveData: {
            revealText: '¡Así tu maestra puede corregirte y mandarte una linda felicitación!',
          },
        },
        {
          id: 'l1_g2_3',
          title: 'Classroom vs Juegos de entretenimiento',
          explanation: 'Classroom no es una red social de juegos ni de videos de baile. Es un espacio de trabajo escolar.',
          example: 'Los juegos son para el tiempo libre; Classroom es para crecer aprendiendo.',
          icon: '🎮',
          tag: 'Uso Escolar',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'Si tu maestra publica una tarea, ¿dónde la buscás?',
            choiceOptions: [
              { text: 'En Google Classroom 🏫', isCorrect: true, feedback: '¡Exacto! Allí se organiza todo el aprendizaje escolar.' },
              { text: 'En una tienda de juguetes 🧸', isCorrect: false, feedback: '¡No! Las tareas escolares están en Classroom.' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l1_g3_1',
          title: 'Google Classroom: Nuestro espacio de aprendizaje',
          explanation: 'Google Classroom es un entorno virtual donde tu escuela organiza clases, tareas, fechas importantes y materiales pedagógicos.',
          example: 'Reúne en un solo lugar las materias como Lengua, Ciencias y Matemáticas.',
          icon: '🏫',
          tag: 'Concepto Clave',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver por qué la escuela lo usa',
            revealText: 'Porque permite que todos los alumnos y docentes tengan los materiales seguros, accesibles y ordenados en cualquier momento.',
          },
        },
        {
          id: 'l1_g3_2',
          title: '¿Qué encontramos dentro de cada clase?',
          explanation: 'En cada clase encontrás anuncios del profesor, guías de estudio, consignas con fechas de entrega y espacios para hacer consultas.',
          example: 'Podés consultar la bibliografía o descargar un archivo PDF para leer.',
          icon: '📖',
          tag: 'Contenidos',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Consejo de Clasito: Revisá tu clase todos los días para no acumular pendientes.',
          },
        },
        {
          id: 'l1_g3_3',
          title: 'Un entorno seguro y educativo',
          explanation: 'Classroom se diferencia de redes sociales como TikTok o Instagram: es un espacio protegido exclusivamente para la comunidad educativa escolar.',
          example: 'No hay anuncios comerciales ni seguidores; hay compañeros y profesores aprendiendo juntos.',
          icon: '🛡️',
          tag: 'Seguridad',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Cuál es el objetivo principal de Classroom?',
            choiceOptions: [
              { text: 'Aprender y organizar el trabajo escolar 📚', isCorrect: true, feedback: '¡Brillante! Ese es el propósito pedagógico central.' },
              { text: 'Chatear sobre videojuegos todo el día 👾', isCorrect: false, feedback: 'Para ocio están tus momentos libres fuera del colegio.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l1_g4_1',
          title: 'Plataforma Educativa Institucional',
          explanation: 'Google Classroom es un Sistema de Gestión del Aprendizaje (LMS) escolar que centraliza la interacción entre docentes y estudiantes.',
          example: 'Permite entregar trabajos digitales, recibir devoluciones personalizadas y seguir tu progreso académico.',
          icon: '💻',
          tag: 'Entorno Escolar',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver beneficios para el alumno',
            revealText: 'Te ayuda a desarrollar autonomía, saber qué deberes tenés pendientes y no perder nunca una fotocopia o guía.',
          },
        },
        {
          id: 'l1_g4_2',
          title: 'Diferencia con redes sociales y ocio',
          explanation: 'A diferencia de plataformas de entretenimiento, Classroom es un espacio académico oficial sujeto a normas de convivencia escolar.',
          example: 'Cada acción y comentario queda registrado bajo tu perfil institucional.',
          icon: '🎯',
          tag: 'Responsabilidad',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Tu cuenta escolar es tu credencial estudiantil digital: usala con compromiso.',
          },
        },
        {
          id: 'l1_g4_3',
          title: 'Estructura modular de la plataforma',
          explanation: 'Classroom divide el curso en Tablón (avisos), Trabajo de clase (consignas organizadas por temas) y Personas (docentes y compañeros).',
          example: 'En Trabajo de clase visualizás qué tareas están asignadas, cuáles entregaste y cuáles tienen fecha próxima.',
          icon: '🗂️',
          tag: 'Organización',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Por qué la escuela utiliza cuentas institucionales en Classroom?',
            choiceOptions: [
              { text: 'Para brindar un entorno seguro y supervisado pedagógicamente 🔒', isCorrect: true, feedback: '¡Exacto! Protege tu privacidad y garantiza una interacción escolar segura.' },
              { text: 'Para competir por quién tiene más likes 👍', isCorrect: false, feedback: 'En la escuela el valor está en el aprendizaje, no en los likes.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l1_g5_1',
          title: 'Entorno Virtual de Aprendizaje (EVA)',
          explanation: 'Google Classroom es un entorno virtual diseñado para mediar los procesos de enseñanza y aprendizaje, fomentando la autonomía y la ciudadanía digital responsable.',
          example: 'Actúa como puente sincrónico y asincrónico entre el aula física y el trabajo en el hogar.',
          icon: '🌐',
          tag: 'Ciudadanía Digital',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver impacto en tus hábitos de estudio',
            revealText: 'Fomenta la autogestión del tiempo, la responsabilidad de entrega y la alfabetización digital necesaria para la secundaria y la vida.',
          },
        },
        {
          id: 'l1_g5_2',
          title: 'Identidad académica y trazabilidad',
          explanation: 'Tu usuario en Classroom representa tu identidad académica formal. Todo trabajo, edición de documento y comentario queda registrado en el historial de la clase.',
          example: 'Los docentes pueden seguir el proceso de elaboración de tus trabajos y acompañarte en tus dudas.',
          icon: '👤',
          tag: 'Identidad Escolar',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Cuidar tu imagen y lenguaje en Classroom es parte fundamental de tu huella digital positiva.',
          },
        },
        {
          id: 'l1_g5_3',
          title: 'Ecosistema de colaboración educativa',
          explanation: 'Classroom se integra con herramientas como Google Docs, Presentaciones, Drive y Meet, permitiendo investigar, crear y colaborar en equipo.',
          example: 'Podés trabajar con otros compañeros simultáneamente en un informe de ciencias sin importar la distancia.',
          icon: '🤝',
          tag: 'Colaboración',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué diferencia a Classroom de una aplicación de mensajería o red social abierta?',
            choiceOptions: [
              { text: 'Es un espacio pedagógico institucional enfocado en el crecimiento formativo y con privacidad protegida 🎓', isCorrect: true, feedback: '¡Impecable! Conocer el propósito del espacio es el primer paso de un estudiante responsable.' },
              { text: 'No tiene ninguna diferencia con una red de juegos online 👾', isCorrect: false, feedback: 'El propósito, las normas y la seguridad institucional marcan una gran diferencia.' },
            ],
          },
        },
      ],
    },
  },

  // ==========================================
  // NIVEL 2: CUIDAMOS NUESTRA CUENTA
  // ==========================================
  2: {
    levelId: 2,
    clasitoIntro: {
      mood: 'motivating',
      text: '¡Atención aventureros! Antes de resolver situaciones, aprendamos por qué tu cuenta y tu contraseña son un tesoro secreto.',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l2_g1_1',
          title: 'TU CUENTA ES TUYA',
          explanation: 'LA CUENTA TIENE TU NOMBRE Y TUS TRABAJOS DE LA ESCUELA.',
          example: 'ES COMO TU MOCHILA ESCOLAR PERSONAL.',
          icon: '🎒',
          tag: 'PERSONAL',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA VER QUÉ CUIDAR',
            revealText: '¡CUIDAMOS NUESTROS DIBUJOS Y TAREAS!',
          },
        },
        {
          id: 'l2_g1_2',
          title: 'LA CONTRASEÑA ES SECRETA',
          explanation: 'LA CONTRASEÑA ES COMO LA LLAVE DE TU CASA.',
          example: '¡NUNCA SE COMPARTE CON OTROS NIÑOS!',
          icon: '🔑',
          tag: 'SECRETO',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'SOLO TU FAMILIA Y VOS PUEDEN SABERLA.',
          },
        },
        {
          id: 'l2_g1_3',
          title: 'PEDIR AYUDA A UN ADULTO',
          explanation: 'SI ALGO RARO PASA O APARECE UN MENSAJE EXTRAÑO, AVISAMOS.',
          example: 'LE DECIMOS A LA MAESTRA O A NUESTRA FAMILIA.',
          icon: '👨‍👩‍👧',
          tag: 'SEGURIDAD',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'UN AMIGO TE PIDE TU CONTRASEÑA. ¿QUÉ HACÉS?',
            choiceOptions: [
              { text: 'NO LA DIGO, ES SECRETA 🔐', isCorrect: true, feedback: '¡MUY BIEN! TU CLAVE ES PRIVADA.' },
              { text: 'SE LA DIGO EN EL RECREO 🗣️', isCorrect: false, feedback: '¡CUIDADO! SI OTRO ENTRA, PUEDE BORRAR TUS TAREAS.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l2_g2_1',
          title: '¿Qué es una cuenta institucional?',
          explanation: 'Es tu dirección de correo del colegio. Te identifica como alumno y te da acceso a tus tareas.',
          example: 'Con ella entrás a Classroom desde cualquier dispositivo.',
          icon: '📧',
          tag: 'Tu Identidad',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver por qué cuidarla',
            revealText: 'Si otra persona usa tu cuenta, podría enviar mensajes con tu nombre o modificar tus tareas sin permiso.',
          },
        },
        {
          id: 'l2_g2_2',
          title: 'La contraseña: Una llave secreta',
          explanation: 'Tu contraseña protege todo lo que hacés. Por más que sea tu mejor amigo, nunca debes decírsela.',
          example: 'Si un amigo no puede entrar a su cuenta, decile que le pida ayuda al maestro, no le des la tuya.',
          icon: '🔐',
          tag: 'Clave Secreta',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Consejo: No uses contraseñas fáciles como "1234" o tu propio nombre.',
          },
        },
        {
          id: 'l2_g2_3',
          title: 'Cerrar sesión en equipos compartidos',
          explanation: 'Si usás una computadora en la escuela o biblioteca, cerrá sesión al terminar.',
          example: 'Hacé clic en tu foto o inicial y tocá "Cerrar sesión".',
          icon: '🚪',
          tag: 'Cierre Seguro',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Por qué cerramos sesión al terminar?',
            choiceOptions: [
              { text: 'Para que nadie más entre a nuestra cuenta 👍', isCorrect: true, feedback: '¡Excelente! Así tus trabajos quedan protegidos.' },
              { text: 'Para apagar el monitor 💻', isCorrect: false, feedback: 'Cerrar sesión protege tu usuario escolar.' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l2_g3_1',
          title: 'La cuenta escolar y tus datos personales',
          explanation: 'Tu cuenta institucional contiene datos personales: tu nombre, tu curso, tus notas y las devoluciones del profesor.',
          example: 'Cuidar tu cuenta es cuidar tu privacidad como estudiante.',
          icon: '👤',
          tag: 'Datos Personales',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver qué es información privada',
            revealText: 'Tus contraseñas, tu dirección, tu número telefónico y tus fotos personales son datos que no se comparten en internet.',
          },
        },
        {
          id: 'l2_g3_2',
          title: '¿Por qué no prestar la contraseña?',
          explanation: 'Incluso con buenas intenciones, prestar tu clave hace que pierdas el control de lo que se hace en la plataforma.',
          example: 'Cualquier trabajo entregado tarde o comentario hecho desde tu usuario parecerá que lo hiciste vos.',
          icon: '🛡️',
          tag: 'Responsabilidad',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Si un compañero olvidó su clave, ayudalo guiándolo para que el docente o administrador escolar la restablezca.',
          },
        },
        {
          id: 'l2_g3_3',
          title: 'Cuándo pedir ayuda a un adulto',
          explanation: 'Si recibís un mensaje sospechoso, si ves que alguien entró a tu cuenta o si no podés ingresar, no te quedes callado.',
          example: 'Avisá de inmediato a tu docente o a tu familia para resolverlo con tranquilidad.',
          icon: '🙋‍♂️',
          tag: 'Comunicación',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'Si ves una notificación rara en tu Classroom, ¿qué conviene hacer?',
            choiceOptions: [
              { text: 'Contarle a tu maestra o a un familiar de confianza 🤝', isCorrect: true, feedback: '¡Correcto! Los adultos te ayudarán a verificar la seguridad.' },
              { text: 'Ignorarlo y esperar que desaparezca solo 🙈', isCorrect: false, feedback: 'Siempre es mejor consultar a tiempo.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l2_g4_1',
          title: 'Seguridad en entornos de Google Workspace',
          explanation: 'Tu cuenta escolar forma parte de una red educativa protegida. Mantenerla segura previene accesos indebidos y resguarda tus producciones.',
          example: 'Tus trabajos en Google Drive y tus tareas son documentos académicos valiosos.',
          icon: '🔐',
          tag: 'Seguridad Digital',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver riesgos de seguridad',
            revealText: 'Compartir credenciales puede derivar en pérdida de archivos, suplantación de identidad o envío de mensajes inadecuados a tu nombre.',
          },
        },
        {
          id: 'l2_g4_2',
          title: 'Higiene digital en computadoras compartidas',
          explanation: 'En laboratorios escolares o dispositivos públicos, nunca selecciones la opción "Recordar contraseña" en el navegador.',
          example: 'Al finalizar la clase: 1. Cerrá sesión en Google. 2. Cerrá la ventana del navegador.',
          icon: '💻',
          tag: 'Buenas Prácticas',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Verificá siempre que en la esquina superior derecha no figure tu foto al retirarte del equipo.',
          },
        },
        {
          id: 'l2_g4_3',
          title: 'Detección de enlaces o mensajes extraños',
          explanation: 'Si en un comentario o correo institucional aparece un enlace prometiendo premios o pidiendo tu clave, se trata de una trampa o phishing.',
          example: 'Ningún docente o administrador del colegio te pedirá jamás tu contraseña por mensaje.',
          icon: '⚠️',
          tag: 'Prevención',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'Un mensaje en Classroom dice "Hacé clic acá para ganar un juego". ¿Qué hacés?',
            choiceOptions: [
              { text: 'No hacer clic y avisar inmediatamente al docente 🛡️', isCorrect: true, feedback: '¡Excelente criterio digital! Desconfiar de enlaces sospechosos protege a toda la clase.' },
              { text: 'Hacer clic rápido para ver qué regalan 🎁', isCorrect: false, feedback: '¡Peligro! Esos enlaces suelen contener virus o robar datos.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l2_g5_1',
          title: 'Gestión ética y legal de credenciales institucionales',
          explanation: 'La cuenta provista por la escuela es personal e intransferible. Todo lo realizado bajo esa sesión tiene validez legal y disciplinaria dentro de los reglamentos del colegio.',
          example: 'Tus accesos, modificaciones y mensajes forman un registro auditable institucional.',
          icon: '⚖️',
          tag: 'Responsabilidad Ética',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver implicancias de la identidad digital',
            revealText: 'Cuidar tus credenciales evita la suplantación de identidad (cuando alguien se hace pasar por vos) y protege tu reputación como estudiante.',
          },
        },
        {
          id: 'l2_g5_2',
          title: 'Principios de ciberseguridad para estudiantes',
          explanation: 'Crea contraseñas robustas (combinando letras, números y símbolos) que no incluyan datos obvios como fechas de nacimiento o nombres de mascotas.',
          example: 'Nunca guardes tus contraseñas en papeles a la vista ni en notas compartidas.',
          icon: '🛡️',
          tag: 'Ciberseguridad',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Si sospechás que alguien conoció tu clave, cambiala de inmediato desde la configuración de tu cuenta de Google.',
          },
        },
        {
          id: 'l2_g5_3',
          title: 'Protocolo de reporte y ciudadanía responsable',
          explanation: 'La seguridad digital escolar es colectiva: si detectás una vulnerabilidad o un comportamiento riesgoso de un par, actuar con madurez es avisar a las autoridades.',
          example: 'Informar al docente o referente TIC no es acusar, es cuidar la integridad de la comunidad educativa.',
          icon: '🤝',
          tag: 'Convivencia Segura',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Cuál es la regla fundamental de la seguridad de contraseñas?',
            choiceOptions: [
              { text: 'Son estrictamente personales y secretas; jamás se comparten ni con amigos íntimos 🔐', isCorrect: true, feedback: '¡Totalmente correcto! Es la base de la seguridad digital.' },
              { text: 'Se pueden compartir si la otra persona promete no tocar nada 🤷‍♂️', isCorrect: false, feedback: 'Compartir contraseñas elimina toda garantía de seguridad y autoría.' },
            ],
          },
        },
      ],
    },
  },

  // ==========================================
  // NIVEL 3: CONOCIENDO NUESTRA CLASE
  // ==========================================
  3: {
    levelId: 3,
    clasitoIntro: {
      mood: 'thinking',
      text: '¡Vamos a explorar las partes de Classroom! Mirá cómo se organizan las pestañas para no perderte nada.',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l3_g1_1',
          title: 'NOVEDADES / TABLÓN',
          explanation: 'ES EL MURO CON LOS AVISOS Y SALUDOS DE LA SEÑO.',
          example: 'COMO LA CARTELERA DEL AULA.',
          icon: '📢',
          tag: 'CARTELERA',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA VER QUÉ HAY ACÁ',
            revealText: '¡AQUÍ LA MAESTRA DICE "BUEN DÍA" Y DA AVISOS IMPORTANTES!',
          },
        },
        {
          id: 'l3_g1_2',
          title: 'TRABAJO DE CLASE',
          explanation: '¡LA ZONA MÁS IMPORTANTE! AQUÍ ESTÁN LAS MATERIAS.',
          example: 'ENCONTRÁS TUS TAREAS Y VIDEOS LINDOS.',
          icon: '📚',
          tag: 'TAREAS',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'HACÉ CLIC EN UNA TAREA PARA ABRIRLA Y TRABAJAR.',
          },
        },
        {
          id: 'l3_g1_3',
          title: 'LOS COMENTARIOS',
          explanation: 'SIRVEN PARA PREGUNTAR DUDAS CON PALABRAS CARIÑOSAS.',
          example: 'SI NO ENTENDÉS ALGO, LE PREGUNTÁS A LA SEÑO.',
          icon: '💬',
          tag: 'DUDAS',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿DÓNDE ESTÁN TUS TAREAS ORGANIZADAS?',
            choiceOptions: [
              { text: 'EN TRABAJO DE CLASE 📚', isCorrect: true, feedback: '¡SÍ! AHÍ ESTÁN TODAS TUS MATERIAS.' },
              { text: 'EN LA PAPELERA 🗑️', isCorrect: false, feedback: '¡NO! ESTÁN EN TRABAJO DE CLASE.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l3_g2_1',
          title: 'La pestaña "Novedades" o Tablón',
          explanation: 'Es la primera pantalla que ves al entrar. Es como la cartelera que está en el pasillo de la escuela.',
          example: 'Tu maestra publica recordatorios como: "Mañana traigan la regla".',
          icon: '📢',
          tag: 'Avisos',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver qué podemos hacer acá',
            revealText: 'Podemos leer las noticias del día y responder a los saludos del profesor.',
          },
        },
        {
          id: 'l3_g2_2',
          title: 'La pestaña "Trabajo de clase"',
          explanation: 'Aquí están divididas las tareas por materias o temas (por ejemplo: Matemáticas, Ciencias, Lengua).',
          example: 'Cada tarea tiene un dibujo de portapapeles o cuadernillo.',
          icon: '📚',
          tag: 'Organización',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Consejo: Hacé clic sobre el título de una tarea para ver la consigna completa.',
          },
        },
        {
          id: 'l3_g2_3',
          title: 'Tareas vs Materiales de lectura',
          explanation: 'Las "Tareas" llevan una entrega de trabajo. Los "Materiales" son solo para leer o mirar videos sin entregar nada.',
          example: 'Un cuento para leer es un material; responder preguntas del cuento es una tarea.',
          icon: '📖',
          tag: 'Diferencias',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'Si querés saber qué deberes tenés pendientes, ¿dónde vas?',
            choiceOptions: [
              { text: 'A "Trabajo de clase" 📋', isCorrect: true, feedback: '¡Muy bien! Allí están todas tus actividades ordenadas.' },
              { text: 'A buscar un juego en internet 🎮', isCorrect: false, feedback: 'En "Trabajo de clase" encontrás tus deberes.' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l3_g3_1',
          title: 'Las tres secciones principales del aula virtual',
          explanation: 'Google Classroom organiza cada curso en pestañas clave: Novedades (anuncios), Trabajo de clase (actividades) y Personas (docentes y alumnos).',
          example: 'Reconocer cada pestaña te ayuda a navegar con rapidez y autonomía.',
          icon: '🗺️',
          tag: 'Estructura',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver función de Trabajo de Clase',
            revealText: 'Es el centro pedagógico: ahí el docente publica consignas con fecha límite, puntajes y materiales anexos.',
          },
        },
        {
          id: 'l3_g3_2',
          title: 'Identificar tareas, materiales y cuestionarios',
          explanation: 'Cada tipo de publicación tiene su propio ícono: las tareas tienen un portapapeles, los materiales un libro o marcador, y las preguntas un signo de interrogación.',
          example: 'Al hacer clic en "Ver tarea" se abre la pantalla completa para realizar la entrega.',
          icon: '🔍',
          tag: 'Íconos Clave',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Fijate siempre si dice "Asignada" (pendiente), "Entregada" o "Calificada".',
          },
        },
        {
          id: 'l3_g3_3',
          title: 'Comentarios de clase y comentarios privados',
          explanation: 'Los comentarios de clase los leen todos tus compañeros y el docente; los privados solo los recibe tu profesor.',
          example: 'Si tu duda ayuda a otros, comentalo en clase; si es algo personal sobre tu nota, hacelo en privado.',
          icon: '💬',
          tag: 'Comunicación',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Dónde hacés una consulta privada sobre una nota a tu docente?',
            choiceOptions: [
              { text: 'En la sección "Comentarios privados" de la tarea 🔒', isCorrect: true, feedback: '¡Exacto! Es un canal directo y confidencial con tu profesor.' },
              { text: 'En el tablón público para que todos lo lean 📢', isCorrect: false, feedback: 'Las notas y asuntos personales van en comentarios privados.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l3_g4_1',
          title: 'Navegación eficiente en Trabajo de clase',
          explanation: 'La pestaña Trabajo de clase organiza los contenidos mediante "Temas" (unidades didácticas, proyectos o materias). Podés filtrar por tema en el menú lateral.',
          example: 'Si querés repasar "Fracciones", hacés clic en el tema Fracciones y ves solo ese material.',
          icon: '🗂️',
          tag: 'Filtros y Temas',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver botón "Ver tu trabajo"',
            revealText: 'Arriba de Trabajo de clase hay un botón llamado "Ver tu trabajo": te muestra una lista con todas tus tareas asignadas, entregadas y calificaciones.',
          },
        },
        {
          id: 'l3_g4_2',
          title: 'Distinción de estados de una tarea',
          explanation: 'Una tarea pasa por tres estados principales: Asignada (lista para hacer), Entregada (enviada al docente) y Calificada o Devuelta (con nota y comentarios de devolución).',
          example: 'Si la fecha límite pasó y no entregaste, el estado cambia a "Sin entregar" o "Entrega tardía".',
          icon: '📊',
          tag: 'Estados de Tarea',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Revisar las tareas devueltas te permite leer las correcciones de tu profesor para aprender de tus errores.',
          },
        },
        {
          id: 'l3_g4_3',
          title: 'El Tablón: Normas de uso responsable',
          explanation: 'El Tablón o Novedades es un espacio de comunicación general. No debe utilizarse como sala de chat informal para bromas o mensajes repetidos.',
          example: 'Usalo para leer novedades docentes y aportar información relevante para el grupo.',
          icon: '📢',
          tag: 'Netiqueta',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué botón te permite ver todas tus tareas pendientes y entregadas en una sola lista?',
            choiceOptions: [
              { text: '"Ver tu trabajo" en Trabajo de clase 📋', isCorrect: true, feedback: '¡Perfecto! Es la mejor herramienta para mantenerte al día.' },
              { text: 'El botón de cerrar pestaña ❌', isCorrect: false, feedback: 'El botón "Ver tu trabajo" resume todo tu historial.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l3_g5_1',
          title: 'Arquitectura pedagógica del curso en Classroom',
          explanation: 'Comprender la arquitectura de la plataforma te permite gestionar tu tiempo como un estudiante autónomo: Novedades actúa como canal unidireccional y bidireccional de anuncios, mientras Trabajo de clase estructura la secuencia didáctica.',
          example: 'La vista por Temas refleja la planificación pedagógica del docente durante el ciclo lectivo.',
          icon: '🏛️',
          tag: 'Arquitectura LMS',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver integración con Google Calendar',
            revealText: 'Classroom sincroniza automáticamente las fechas de entrega con tu Google Calendar institucional y genera una carpeta en Google Drive para cada materia.',
          },
        },
        {
          id: 'l3_g5_2',
          title: 'Diferenciación de tipos de materiales didácticos',
          explanation: 'Las actividades pueden ser Tareas tradicionales (adjuntar archivos), Preguntas (foros de debate), Cuestionarios autocalificables (Google Forms) o Materiales de consulta (documentos y enlaces sin entrega).',
          example: 'Saber qué tipo de publicación tenés delante te indica qué acción se espera de vos.',
          icon: '📑',
          tag: 'Tipologías',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'En los foros de preguntas, tu respuesta suele ser visible para tus compañeros después de que enviás la tuya.',
          },
        },
        {
          id: 'l3_g5_3',
          title: 'Gestión de la retroalimentación y meta-aprendizaje',
          explanation: 'Cuando un docente devuelve un trabajo, puede incluir comentarios en el cuerpo del archivo o en la sección privada. Leer y procesar este feedback es donde ocurre el verdadero aprendizaje.',
          example: 'Si el docente habilita reenviar la tarea con correcciones, podés mejorar tu producción.',
          icon: '📈',
          tag: 'Retroalimentación',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Dónde se almacenan automáticamente todos los archivos que subís a tus tareas?',
            choiceOptions: [
              { text: 'En una carpeta organizada en tu Google Drive institucional 📂', isCorrect: true, feedback: '¡Exacto! Classroom crea una carpeta "Classroom" en Drive con subcarpetas por materia.' },
              { text: 'En la memoria temporal que se borra al apagar la PC 🗑️', isCorrect: false, feedback: 'Tus archivos quedan respaldados en la nube institucional.' },
            ],
          },
        },
      ],
    },
  },

  // ==========================================
  // NIVEL 4: LEEMOS LAS CONSIGNAS
  // ==========================================
  4: {
    levelId: 4,
    clasitoIntro: {
      mood: 'motivating',
      text: '¡Regla de oro de los mejores estudiantes! Antes de empezar cualquier trabajo, aprendamos a leer y desglosar la consigna.',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l4_g1_1',
          title: '¿QUÉ ES UNA CONSIGNA?',
          explanation: 'UNA CONSIGNA NOS DICE QUÉ TENEMOS QUE HACER.',
          example: 'EJEMPLO: "DIBUJÁ UN SOL Y PINTALO DE AMARILLO".',
          icon: '📖',
          tag: 'INSTRUCCIÓN',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA VER QUÉ HACER',
            revealText: '¡LEER DESPACIO CADA PALABRA DE LA SEÑO!',
          },
        },
        {
          id: 'l4_g1_2',
          title: 'LOS 5 PASOS DEL ESTUDIANTE',
          explanation: '1. LEER 📚  2. MIRAR 👀  3. HACER ✏️  4. REVISAR 🔍  5. ENTREGAR 📤',
          example: '¡NUNCA HACEMOS LA TAREA SIN LEER PRIMERO!',
          icon: '⭐',
          tag: 'PASO A PASO',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'SI LEÉS TODO PRIMERO, LA TAREA SALE HERMOSA.',
          },
        },
        {
          id: 'l4_g1_3',
          title: 'LEER HASTA EL FINAL',
          explanation: 'A VECES LA SEÑO PIDE ALGO ESPECIAL AL FINAL DE LA HOJA.',
          example: '"ESCRIBÍ TU NOMBRE EN LA ESQUINA".',
          icon: '👀',
          tag: 'ATENCIÓN',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿QUÉ HACEMOS ANTES DE EMPEZAR A DIBUJAR O ESCRIBIR?',
            choiceOptions: [
              { text: 'LEER TODA LA CONSIGNA COMPLETA 📖', isCorrect: true, feedback: '¡EXCELENTE! LEER COMPLETO EVITA ERRORES.' },
              { text: 'CERRAR LA PANTALLA Y NO HACER NADA 🙈', isCorrect: false, feedback: '¡NO! PRIMERO LEEMOS CON ATENCIÓN.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l4_g2_1',
          title: '¿Qué es una consigna escolar?',
          explanation: 'Una consigna es el conjunto de instrucciones que tu maestro escribe para guiarte en una tarea.',
          example: 'Nos explica qué materiales usar, qué pasos seguir y cómo presentar el trabajo.',
          icon: '📖',
          tag: 'Guía Escolar',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver un ejemplo real',
            revealText: 'Ejemplo: "Leé el poema de la página 5, elegí tu estrofa favorita y dibujala en tu cuaderno".',
          },
        },
        {
          id: 'l4_g2_2',
          title: 'El error de apurarse a empezar',
          explanation: 'Muchos niños ven una imagen y empiezan a hacer algo sin leer la consigna. Luego se dan cuenta de que hicieron otra cosa.',
          example: 'Si la consigna pedía "Pintar con azul" y pintaste con rojo por no leer, tendrás que corregirlo.',
          icon: '⚠️',
          tag: 'Sin Apuros',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Tomate 2 minutos para leer con calma. ¡Te ahorrará mucho tiempo y trabajo!',
          },
        },
        {
          id: 'l4_g2_3',
          title: 'Revisar antes de enviar',
          explanation: 'Cuando termines, volvé a leer la consigna y preguntate: "¿Hice todo lo que pidió la maestra?".',
          example: 'Revisá si pedía nombre y apellido, fecha o si faltó alguna pregunta por contestar.',
          icon: '🔍',
          tag: 'Verificación',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'Si la consigna dice "Dibuja un gato y escribe su nombre", ¿qué debés hacer?',
            choiceOptions: [
              { text: 'Hacer el dibujo del gato Y escribir su nombre 🐱✍️', isCorrect: true, feedback: '¡Muy bien! Cumplís con las dos cosas que pidió la consigna.' },
              { text: 'Solo dibujar el gato sin escribir nada 🐱', isCorrect: false, feedback: '¡Faltaría escribir el nombre como indicaba la consigna!' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l4_g3_1',
          title: 'Desglosar las partes de una consigna',
          explanation: 'Una consigna clara tiene tres elementos: 1. El objetivo (qué aprender), 2. La acción (verbos como "explicá", "compará", "resolvé") y 3. El formato (dibujo, audio, texto).',
          example: 'Identificar los verbos de acción es la clave para no olvidar ningún requerimiento.',
          icon: '🧠',
          tag: 'Estrategia',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver técnica de los verbos',
            revealText: 'Subrayá mentalmente las palabras de acción: "Leé", "Subrayá", "Escribí", "Adjuntá". Cada verbo es un paso que debés cumplir.',
          },
        },
        {
          id: 'l4_g3_2',
          title: 'Consignas con múltiples pasos',
          explanation: 'A medida que crecemos, las consignas tienen pasos encadenados. No te quedes solo con el primer renglón.',
          example: '"1. Mirá el video adjunto. 2. Respondé en tu carpeta las 3 preguntas. 3. Subí una foto clara".',
          icon: '🪜',
          tag: 'Paso a Paso',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Consejo: Hacé una marca en una hoja cada vez que completes uno de los pasos de la consigna.',
          },
        },
        {
          id: 'l4_g3_3',
          title: '¿Qué hacer si no entendés la consigna?',
          explanation: 'No entender una consigna no es malo: lo importante es saber pedir ayuda a tiempo antes de que venza el plazo.',
          example: 'Podés escribir un comentario respetuoso a tu docente diciendo exactamente qué parte te resulta confusa.',
          icon: '🙋‍♂️',
          tag: 'Consulta',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'Una consigna dice "Investigá sobre los planetas y grabá un audio de 1 minuto". ¿Qué entregás?',
            choiceOptions: [
              { text: 'Un archivo de audio con tu explicación grabada 🎙️', isCorrect: true, feedback: '¡Exacto! El formato solicitado era audio, no texto ni foto.' },
              { text: 'Un dibujo de una nave espacial 🚀', isCorrect: false, feedback: 'La consigna solicitaba específicamente un audio con tu investigación.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l4_g4_1',
          title: 'Lectura comprensiva y analítica de consignas',
          explanation: 'En 4.º grado las tareas evalúan tu capacidad de interpretar consignas complejas con criterios específicos de presentación, extensión y plazos.',
          example: 'Leer a las apuradas suele ser la causa principal de bajas calificaciones en tareas sencillas.',
          icon: '🧐',
          tag: 'Comprensión Crítica',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver criterios de evaluación comunes',
            revealText: 'Los profesores evalúan: corrección del contenido, prolijidad, ortografía, cumplimiento de las pautas y entrega en término.',
          },
        },
        {
          id: 'l4_g4_2',
          title: 'Identificación de restricciones y requisitos',
          explanation: 'Prestá atención a requisitos como: "Mínimo 5 renglones", "Formato PDF", "En parejas" o "Adjuntar foto vertical y nítida".',
          example: 'Si la consigna pide un documento de texto y subís una imagen borrosa de tu cuaderno, dificultás la corrección.',
          icon: '📋',
          tag: 'Requisitos',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Antes de entregar, hacé un "checklist" mental verificando cada restricción indicada en la consigna.',
          },
        },
        {
          id: 'l4_g4_3',
          title: 'Autonomía y resolución de dudas',
          explanation: 'Si la consigna adjunta una rúbrica o criterios de evaluación, leela antes de comenzar. Te muestra exactamente qué espera el docente.',
          example: 'Una rúbrica te dice cuántos puntos vale la claridad, la creatividad y la puntualidad.',
          icon: '🏆',
          tag: 'Rúbricas',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Cuál es la estrategia recomendada antes de presionar "Entregar"?',
            choiceOptions: [
              { text: 'Hacer una relectura final de la consigna y cotejar que todo lo pedido esté incluido en el archivo 🔍', isCorrect: true, feedback: '¡Brillante hábito de estudio! Te asegura trabajos completos y de máxima calidad.' },
              { text: 'Enviar rápido sin revisar para terminar antes ⚡', isCorrect: false, feedback: 'Apurarse suele generar entregas incompletas o erróneas.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l4_g5_1',
          title: 'Decodificación metodológica de consignas académicas',
          explanation: 'En 5.º grado y preparándote para la secundaria, las consignas exigen habilidades cognitivas superiores: fundamentar, contrastar, sintetizar o elaborar hipótesis.',
          example: 'No es lo mismo "describir" un hecho histórico que "analizar sus causas".',
          icon: '🎓',
          tag: 'Pensamiento Crítico',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver taxonomía de verbos académicos',
            revealText: '"Mencionar" = hacer una lista. "Explicar" = decir el porqué con tus palabras. "Argumentar" = defender tu punto de vista con datos y fuentes.',
          },
        },
        {
          id: 'l4_g5_2',
          title: 'Criterios de entrega y formalidad digital',
          explanation: 'La presentación digital requiere estándares: nombrar los archivos de forma clara (ej: "Ciencias_TP1_LucasGomez.pdf"), cuidar el interlineado y citar las fuentes bibliográficas.',
          example: 'Evitá nombres como "archivo123.docx" o fotos torcidas con sombras.',
          icon: '📑',
          tag: 'Estándares Digitales',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'La prolijidad digital refleja tu compromiso y facilita enormemente la lectura del docente.',
          },
        },
        {
          id: 'l4_g5_3',
          title: 'Autoevaluación guiada por rúbricas',
          explanation: 'Aprovechá la rúbrica de Classroom. Es el mapa con el que el profesor evaluará tu producción en cada dimensión.',
          example: 'Si la rúbrica pide "3 argumentos sólidos", asegurate de tenerlos antes de hacer clic en entregar.',
          icon: '🎯',
          tag: 'Metacognición',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué diferencia a un estudiante con alta autonomía al abordar una consigna compleja?',
            choiceOptions: [
              { text: 'Planifica las etapas, desglosa los requisitos de la rúbrica y realiza una revisión crítica previa al envío 🚀', isCorrect: true, feedback: '¡Excelencia académica! Así se construyen aprendizajes sólidos para la vida.' },
              { text: 'Empieza a escribir sin leer y pregunta lo que ya estaba explicado en el texto 😴', isCorrect: false, feedback: 'La autonomía comienza leyendo con atención y paciencia.' },
            ],
          },
        },
      ],
    },
  },

  // ==========================================
  // NIVEL 5: ENTREGAMOS NUESTRAS TAREAS
  // ==========================================
  5: {
    levelId: 5,
    clasitoIntro: {
      mood: 'surprised',
      text: '¡Cuidado con esta trampa común! Muchos alumnos suben un archivo pero se olvidan de presionar "Entregar". ¡Aprendamos la diferencia!',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l5_g1_1',
          title: 'LOS PASOS PARA SUBIR',
          explanation: '1. ABRIR TAREA. 2. PONER EL DIBUJO O FOTO. 3. REVISAR. 4. ENTREGAR.',
          example: 'SEGUIMOS LOS PASOS EN ORDEN.',
          icon: '👣',
          tag: 'PASO A PASO',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA VER EL GRAN SECRETO',
            revealText: '¡HAY QUE APRETAR EL BOTÓN VERDE O AZUL QUE DICE "ENTREGAR"!',
          },
        },
        {
          id: 'l5_g1_2',
          title: 'ADJUNTAR NO ES ENTREGAR',
          explanation: '📎 ADJUNTAR ES PONER EL DIBUJO. 📤 ENTREGAR ES ENVIÁRSELO A LA SEÑO.',
          example: 'SI NO APRETÁS "ENTREGAR", LA MAESTRA NO LO RECIBE.',
          icon: '⚠️',
          tag: 'IMPORTANTE',
          interactiveType: 'tip',
          interactiveData: {
            revealText: '¡SIEMPRE APRETÁ EL BOTÓN "ENTREGAR"!',
          },
        },
        {
          id: 'l5_g1_3',
          title: 'MIRAR QUE DIGA "ENTREGADA"',
          explanation: 'CUANDO TERMINÁS, TIENE QUE APARECER LA PALABRA "ENTREGADA".',
          example: '¡LISTO! TU TAREA YA LLEGÓ A LA MAESTRA.',
          icon: '✅',
          tag: 'ÉXITO',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'SI YA PUSISTE TU DIBUJO, ¿QUÉ BOTÓN DEBÉS APRETAR?',
            choiceOptions: [
              { text: 'EL BOTÓN "ENTREGAR" 📤', isCorrect: true, feedback: '¡BRAVO! ASÍ LA MAESTRA LO PUEDE CORREGIR.' },
              { text: 'EL BOTÓN DE APAGAR LA PANTALLA 💻', isCorrect: false, feedback: '¡NO! SI NO ENTREGÁS, QUEDA PENDIENTE.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l5_g2_1',
          title: 'El proceso completo de entrega',
          explanation: 'Para entregar una tarea seguimos estos pasos: Abrir la tarea ➡️ Leer la consigna ➡️ Hacer la actividad ➡️ Guardar el archivo ➡️ Adjuntar ➡️ Revisar ➡️ Entregar.',
          example: 'Podés adjuntar fotos sacadas con el celular o dibujos hechos en la computadora.',
          icon: '📋',
          tag: 'Circuito de Entrega',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver botón "+ Agregar o crear"',
            revealText: 'En el recuadro "Tu trabajo", hacé clic en "+ Agregar o crear" y elegí "Archivo" para seleccionar tu dibujo.',
          },
        },
        {
          id: 'l5_g2_2',
          title: 'La diferencia entre ADJUNTAR y ENTREGAR',
          explanation: 'Este es el error más frecuente: adjuntar es cargar el archivo en la página, pero la maestra no lo recibe hasta que hacés clic en "Entregar".',
          example: 'Es como poner una carta en el sobre (adjuntar) pero no mandarla por correo (entregar).',
          icon: '✉️',
          tag: 'Concepto Clave',
          interactiveType: 'tip',
          interactiveData: {
            revealText: '¡Siempre asegurate de hacer clic en el botón "ENTREGAR" y confirmar!',
          },
        },
        {
          id: 'l5_g2_3',
          title: 'Comprobar el cartel de confirmación',
          explanation: 'Al tocar "Entregar", Classroom te muestra una ventana que pregunta: "¿Deseas entregar la tarea?". Tenés que confirmar tocando de nuevo.',
          example: 'Cuando termine, el estado gris cambiará a un cartel verde que dice "Tarea entregada".',
          icon: '🟢',
          tag: 'Verificación',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'Si cargaste el archivo pero no tocaste "Entregar", ¿cómo figura tu tarea?',
            choiceOptions: [
              { text: 'Sigue figurando como "Asignada" o "Sin entregar" ⏰', isCorrect: true, feedback: '¡Exacto! Para que figure entregada hay que presionar el botón Entregar.' },
              { text: 'Ya le llegó con diploma a la maestra 🎓', isCorrect: false, feedback: 'La maestra no la verá entregada hasta que confirmes la entrega.' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l5_g3_1',
          title: 'Paso a paso en la sección "Tu trabajo"',
          explanation: 'En el lateral derecho de cada tarea está el bloque "Tu trabajo". Desde allí gestionás los archivos adjuntos y visualizás el estado de tu entrega.',
          example: 'Podés adjuntar múltiples archivos (por ejemplo, dos fotos del cuaderno de distintas páginas).',
          icon: '🗂️',
          tag: 'Interfaz de Entrega',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver opciones de "+ Agregar o crear"',
            revealText: 'Podés subir un "Archivo" de tu equipo, enlazar desde "Google Drive" o crear directamente un Documento o Presentación nueva.',
          },
        },
        {
          id: 'l5_g3_2',
          title: 'Revisión del archivo antes de enviar',
          explanation: 'Antes de tocar "Entregar", hacé clic sobre el archivo adjunto para abrirlo y verificar que sea el correcto, que no esté en blanco y que la foto se vea nítida.',
          example: 'Evitá enviar fotos borrosas, torcidas o archivos de otra materia por equivocación.',
          icon: '🔍',
          tag: 'Control de Calidad',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Si te equivocaste de archivo, tocas la "X" al lado del archivo para quitarlo y volvés a subir el correcto.',
          },
        },
        {
          id: 'l5_g3_3',
          title: 'Anular entrega si necesitás corregir',
          explanation: 'Si ya presionaste "Entregar" pero te diste cuenta de un error antes de la fecha límite, podés hacer clic en "Anular entrega", corregir el archivo y volver a entregarlo.',
          example: 'Al anular entrega, el archivo vuelve a estar en modo borrador para que puedas editarlo.',
          icon: '🔄',
          tag: 'Edición',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Por qué es importante hacer clic en el archivo adjunto antes de entregar?',
            choiceOptions: [
              { text: 'Para comprobar que sea la tarea correcta y no una hoja en blanco 📄', isCorrect: true, feedback: '¡Brillante! Te asegura que tu maestro reciba exactamente lo que hiciste.' },
              { text: 'Para borrar la tarea del sistema 🗑️', isCorrect: false, feedback: 'Es para verificar que el contenido esté correcto y legible.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l5_g4_1',
          title: 'Protocolo técnico de entrega digital',
          explanation: 'La entrega digital formal consta de 7 etapas: 1. Apertura, 2. Lectura y cotejo de consigna, 3. Realización, 4. Nomenclatura del archivo, 5. Adjuntado, 6. Verificación visual, 7. Confirmación de entrega.',
          example: 'Cada etapa previene errores que pueden perjudicar tu calificación o demorar la corrección.',
          icon: '⚙️',
          tag: 'Protocolo',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver formatos compatibles',
            revealText: 'Formatos estándar: PDF para documentos de lectura fija, JPG/PNG para fotografías con buena luz, y Docs/Sheets/Slides para trabajos editables.',
          },
        },
        {
          id: 'l5_g4_2',
          title: 'Permisos de archivos en Google Drive',
          explanation: 'Si adjuntás un enlace de Google Drive o un documento compartido, asegurate de que los permisos permitan al docente leer y comentar tu archivo.',
          example: 'Al adjuntar directamente desde Classroom, el sistema le otorga los permisos necesarios al docente automáticamente.',
          icon: '🔗',
          tag: 'Permisos',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Si trabajás en equipo, uno solo entrega el archivo adjuntando los nombres de los integrantes si el docente lo indicó.',
          },
        },
        {
          id: 'l5_g4_3',
          title: 'Entrega en término vs Entrega tardía',
          explanation: 'Classroom registra el minuto exacto de entrega. Si entregás un segundo después de la fecha y hora límite, figurará en rojo: "Completada con retraso".',
          example: 'Los docentes pueden restar puntos por entregas tardías no justificadas.',
          icon: '⏰',
          tag: 'Puntualidad',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué sucede si adjuntás tu archivo pero no presionás "Entregar" antes del vencimiento?',
            choiceOptions: [
              { text: 'El sistema considerará que la tarea no fue entregada a tiempo ⏰', isCorrect: true, feedback: '¡Correcto! Por eso nunca debemos dejar un archivo adjunto sin confirmar la entrega.' },
              { text: 'El sistema adivina que terminaste y la entrega solo 🤖', isCorrect: false, feedback: 'La confirmación de entrega requiere siempre tu acción deliberada.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l5_g5_1',
          title: 'Flujo de trabajo y versionado de entregas',
          explanation: 'Cuando presionás "Entregar", la propiedad del archivo en Google Drive pasa temporalmente al docente en modo "Solo lectura". Si necesitás hacer cambios, debés "Anular entrega", lo que devuelve los permisos de edición.',
          example: 'Classroom registra en el historial cada vez que entregás o anulás una entrega.',
          icon: '🔄',
          tag: 'Versionado y Permisos',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver implicancias del historial',
            revealText: 'El docente puede ver cuántas veces anulaste la entrega y las fechas de cada acción, lo que promueve la transparencia y la honestidad en los plazos.',
          },
        },
        {
          id: 'l5_g5_2',
          title: 'Estándares profesionales de entrega escolar',
          explanation: 'Cuidar la resolución de fotos (sin sombras de manos ni fondos desprolijos), convertir documentos a PDF para evitar desconfiguración tipográfica y verificar la carga al 100% de la barra de progreso.',
          example: 'No cierres la pestaña mientras el archivo se está subiendo al servidor.',
          icon: '📁',
          tag: 'Calidad Digital',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Esperá siempre a ver la miniatura del archivo adjuntado antes de presionar Entregar.',
          },
        },
        {
          id: 'l5_g5_3',
          title: 'La entrega como acto de responsabilidad académica',
          explanation: 'Entregar una tarea vacía para engañar al sistema haciéndole creer que entregaste a tiempo es una falta a la ética escolar que el docente detecta inmediatamente.',
          example: 'La entrega es el testimonio de tu aprendizaje y de tu respeto hacia el trabajo de evaluación del docente.',
          icon: '🎓',
          tag: 'Ética Estudiantil',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Por qué la entrega de un trabajo en Classroom es un acto de compromiso formal?',
            choiceOptions: [
              { text: 'Porque refleja tu honestidad, esfuerzo y el cumplimiento de los acuerdos de convivencia escolar 🏆', isCorrect: true, feedback: '¡Impecable reflexión! La excelencia digital va de la mano de los valores.' },
              { text: 'Porque es un juego para tener botones verdes en la pantalla 🟢', isCorrect: false, feedback: 'El valor está en el aprendizaje y la responsabilidad que demostrás.' },
            ],
          },
        },
      ],
    },
  },

  // ==========================================
  // NIVEL 6: SOMOS RESPONSABLES
  // ==========================================
  6: {
    levelId: 6,
    clasitoIntro: {
      mood: 'thinking',
      text: '¡El tiempo vuela si no nos organizamos! Aprendamos a planificar la semana escolar para entregar siempre tranquilos y sin apuros.',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l6_g1_1',
          title: 'MIRAR LAS FECHAS',
          explanation: 'CADA TAREA TIENE UN DÍA LÍMITE PARA ENTREGAR.',
          example: 'EJEMPLO: "ENTREGAR EL VIERNES".',
          icon: '📅',
          tag: 'CALENDARIO',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA VER EL CONSEJO',
            revealText: '¡HACER LA TAREA CON TIEMPO PARA JUGAR DESPUÉS!',
          },
        },
        {
          id: 'l6_g1_2',
          title: 'NO DEJAR TODO PARA EL FINAL',
          explanation: 'SI DEJÁS TODO PARA EL ÚLTIMO MINUTO, TE APURÁS Y TE CANSÁS.',
          example: 'HACER UN POQUITO CADA DÍA ES MEJOR.',
          icon: '⏰',
          tag: 'ORGANIZACIÓN',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'TRABAJAR TRANQUILO HACE QUE TODO SALGA MÁS LINDO.',
          },
        },
        {
          id: 'l6_g1_3',
          title: 'REVISAR ANTES DE IR A DORMIR',
          explanation: 'MIRAR CON LA FAMILIA QUE TODO ESTÉ ENTREGADO.',
          example: 'ASÍ MAÑANA VAS FELIZ A LA ESCUELA.',
          icon: '⭐',
          tag: 'TRANQUILIDAD',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'TENÉS TAREA PARA EL VIERNES Y HOY ES MARTES. ¿QUÉ HACÉS?',
            choiceOptions: [
              { text: 'LA HAGO CON TIEMPO ESTOS DÍAS 📅', isCorrect: true, feedback: '¡MUY BIEN! SOS UN ESTUDIANTE MUY RESPONSABLE.' },
              { text: 'ESPERO HASTA EL VIERNES A LA NOCHE 🥱', isCorrect: false, feedback: '¡CUIDADO! TE PUEDE AGARRAR SUEÑO O APURO.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l6_g2_1',
          title: 'El reloj de Classroom: Fechas de vencimiento',
          explanation: 'Cada tarea muestra arriba su fecha y hora límite. Es el momento máximo en el que el docente espera tu trabajo.',
          example: 'Si dice "Viernes, 18:00 hs", esa es la hora límite.',
          icon: '⏰',
          tag: 'Fechas Límite',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver qué pasa si entregás después',
            revealText: 'Classroom avisa a la maestra que la tarea fue entregada tarde. Es mejor entregar antes.',
          },
        },
        {
          id: 'l6_g2_2',
          title: 'La regla del "Paso a Paso"',
          explanation: 'Si tenés una tarea larga, dividila: un día leés la consigna, al otro hacés el dibujo y al siguiente lo entregás.',
          example: 'Hacerlo en partes es divertido y no te cansa.',
          icon: '🧩',
          tag: 'Dividir Tareas',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Consejo: No esperes a que sea de noche para encender la computadora.',
          },
        },
        {
          id: 'l6_g2_3',
          title: 'Prevenir problemas técnicos',
          explanation: 'A veces internet se corta o la computadora se actualiza. Si hacés la tarea con anticipación, ningún corte te tomará por sorpresa.',
          example: 'Entregar un día antes te da paz y seguridad.',
          icon: '📶',
          tag: 'Prevención',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Por qué conviene entregar las tareas con anticipación?',
            choiceOptions: [
              { text: 'Para evitar apuros, nervios y fallas de internet 👍', isCorrect: true, feedback: '¡Excelente! La anticipación te da tranquilidad a vos y a tu familia.' },
              { text: 'Para no tener que estudiar nunca más 😴', isCorrect: false, feedback: 'Es para trabajar de forma ordenada y sin estrés.' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l6_g3_1',
          title: 'La situación del martes: ¿Cómo planificar?',
          explanation: 'Imaginá esta situación: Hoy es martes y tenés una tarea que vence el viernes. ¿Qué conviene hacer?',
          example: 'No conviene postergarla hasta el viernes a las 17:50 hs.',
          icon: '📅',
          tag: 'Planificación',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver plan ideal de 3 días',
            revealText: 'Martes: leer consigna y reunir materiales. Miércoles: realizar la actividad. Jueves: revisar y entregar. ¡El viernes estás libre!',
          },
        },
        {
          id: 'l6_g3_2',
          title: 'Evitar la acumulación de pendientes',
          explanation: 'Si dejás todo para el final de la semana, se te juntarán las tareas de varias materias y tendrás que hacer todo apurado.',
          example: 'El apuro genera errores ortográficos, dibujos incompletos y olvidos.',
          icon: '⏳',
          tag: 'Hábito de Estudio',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Una tarea hecha con calma refleja tu verdadero talento y capacidad.',
          },
        },
        {
          id: 'l6_g3_3',
          title: 'Revisar antes y verificar después',
          explanation: 'Ser responsable no termina al entregar: consiste también en revisar que el archivo adjuntado sea el correcto y comprobar que el estado figure "Entregada".',
          example: 'Un buen alumno verifica su entrega como un piloto antes de despegar.',
          icon: '🔍',
          tag: 'Autocontrol',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'Si tenés dudas con una tarea que vence el viernes, ¿cuándo conviene preguntar al docente?',
            choiceOptions: [
              { text: 'Entre martes y miércoles, para darle tiempo a responder y poder corregir 💬', isCorrect: true, feedback: '¡Perfecto criterio! Preguntar con anticipación demuestra madurez y respeto por los tiempos del docente.' },
              { text: 'El viernes a las 23:59 hs 🌙', isCorrect: false, feedback: 'Los profesores no están disponibles de madrugada ni a último segundo.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l6_g4_1',
          title: 'Gestión del tiempo y matriz de prioridades',
          explanation: 'En 4.º grado tenés múltiples materias y profesores. Aprender a clasificar tus tareas entre urgentes (vencen mañana) e importantes (requieren investigación previa) es vital.',
          example: 'Hacé una lista en tu cuaderno o consultá la pestaña "Pendientes" de Classroom todos los días.',
          icon: '📊',
          tag: 'Prioridades',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver pestaña "Pendientes"',
            revealText: 'En el menú principal de Classroom hay una sección llamada "Pendientes": te lista por fecha de entrega todas las tareas asignadas y las que están sin entregar.',
          },
        },
        {
          id: 'l6_g4_2',
          title: 'El costo de la procrastinación',
          explanation: '"Procrastinar" significa postergar lo que debés hacer hoy para mañana o para último momento. Provoca ansiedad, cansancio mental y trabajos de menor calidad.',
          example: 'Entregar a tiempo te permite disfrutar de tu tiempo libre y recreativo sin culpa ni presiones.',
          icon: '🧘‍♂️',
          tag: 'Bienestar',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Terminar tus tareas temprano es el mejor regalo que podés hacerte para disfrutar el fin de semana.',
          },
        },
        {
          id: 'l6_g4_3',
          title: 'Responsabilidad con los archivos y dispositivos',
          explanation: 'Asegurate de que tu dispositivo tenga batería suficiente y que los archivos no se borren antes de ser subidos.',
          example: 'Guardá siempre tus trabajos con nombres identificables en una carpeta dedicada de tu computadora o tablet.',
          icon: '💾',
          tag: 'Cuidado de Archivos',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Cuál es el beneficio de revisar la pestaña "Pendientes" de Classroom al inicio de la semana?',
            choiceOptions: [
              { text: 'Visualizar el panorama completo de entregas y planificar qué días dedicar a cada materia 🗓️', isCorrect: true, feedback: '¡Exacto! Así te convertís en un estudiante metódico y autónomo.' },
              { text: 'Descubrir qué materias podés ignorar 🙈', isCorrect: false, feedback: 'Todas las materias aportan a tu formación integral.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l6_g5_1',
          title: 'Proactividad y planificación semanal autónoma',
          explanation: 'Como alumno de 5.º grado camino a la secundaria, la gestión del tiempo debe ser tu propia responsabilidad, sin necesidad de que tus padres tengan que recordarte cada fecha.',
          example: 'Utilizar Google Calendar o una agenda personal para fijar bloques de estudio de 30 a 45 minutos diarios.',
          icon: '🎯',
          tag: 'Autonomía Madura',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver técnica Pomodoro escolar',
            revealText: 'Estudiá 25 minutos sin celular ni distracciones, descansá 5 minutos y retomá. Maximiza tu concentración y terminás en la mitad del tiempo.',
          },
        },
        {
          id: 'l6_g5_2',
          title: 'Consecuencias de la falta de previsión',
          explanation: 'En el ámbito secundario y profesional, los plazos de entrega son estrictos. La costumbre de entregar a último momento genera vulnerabilidad ante cualquier imprevisto (corte de energía, fallas de software o emergencias).',
          example: 'Entregar 24 horas antes del vencimiento es el estándar de los estudiantes de alto rendimiento.',
          icon: '🛡️',
          tag: 'Criterio Académico',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Tener una tarea lista con anticipación te permite revisarla con ojos frescos y detectar mejoras.',
          },
        },
        {
          id: 'l6_g5_3',
          title: 'Ética del compromiso y respeto por el evaluador',
          explanation: 'Entregar a tiempo es también un acto de respeto hacia el docente, quien organiza su tiempo de corrección para toda el aula.',
          example: 'Las entregas fuera de término alteran los cronogramas docentes y retrasan la devolución para todo el grupo.',
          icon: '🤝',
          tag: 'Respeto Institucional',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué demuestra un estudiante que entrega sus trabajos de manera constante y dentro del plazo establecido?',
            choiceOptions: [
              { text: 'Compromiso, madurez, confiabilidad y respeto por su propio proceso de aprendizaje 🌟', isCorrect: true, feedback: '¡Magistral! La responsabilidad es uno de los valores más apreciados en la vida.' },
              { text: 'Que no tiene otra cosa que hacer 🥱', isCorrect: false, feedback: 'Los estudiantes organizados son los que tienen más tiempo libre para sus hobbies.' },
            ],
          },
        },
      ],
    },
  },

  // ==========================================
  // NIVEL 7: HABLAMOS CON RESPETO
  // ==========================================
  7: {
    levelId: 7,
    clasitoIntro: {
      mood: 'happy',
      text: '¡Este módulo es uno de los más importantes de toda la aventura! Detrás de cada pantalla hay una persona con sentimientos. ¡Aprendamos a comunicarnos con empatía!',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l7_g1_1',
          title: 'PALABRAS LINDAS Y CARIÑO',
          explanation: 'EN CLASSROOM SIEMPRE SALUDAMOS Y TRATAMOS CON AMOR.',
          example: '"HOLA SEÑO", "GRACIAS", "POR FAVOR".',
          icon: '💖',
          tag: 'AMABILIDAD',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA VER PALABRAS MÁGICAS',
            revealText: '¡"HOLA", "POR FAVOR", "GRACIAS" Y "TE AYUDO"!',
          },
        },
        {
          id: 'l7_g1_2',
          title: 'NUNCA NOS BURLAMOS',
          explanation: 'SI UN COMPAÑERO PREGUNTA ALGO FÁCIL, NO NOS REÍMOS.',
          example: 'LE DECIMOS: "¡YO TE EXPLICO CON PACIENCIA!".',
          icon: '🤝',
          tag: 'EMPATÍA',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'TODOS ESTAMOS APRENDIENDO. CUIDAMOS LOS SENTIMIENTOS.',
          },
        },
        {
          id: 'l7_g1_3',
          title: 'PENSAR ANTES DE ESCRIBIR',
          explanation: '¿ES LINDO? ¿ES NECESARIO? SI LA RESPUESTA ES SÍ, LO PUBLICAMOS.',
          example: 'NO ESCRIBIMOS LETRAS REPETIDAS "AAAAA" QUE MOLESTEN.',
          icon: '💭',
          tag: 'EL FILTRO MÁGICO',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'UN AMIGO HACE UNA PREGUNTA EN CLASE. ¿QUÉ LE DECÍS?',
            choiceOptions: [
              { text: '"YO TE PUEDO AYUDAR CON CARIÑO" 💖', isCorrect: true, feedback: '¡QUÉ HERMOSA ACTITUD! SOS UN GRAN COMPAÑERO.' },
              { text: '"¡QUÉ PREGUNTA TONTA!" 😠', isCorrect: false, feedback: '¡NUNCA! BURLARSE HACE PONER TRISTE AL OTRO.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l7_g2_1',
          title: 'Detrás de la pantalla hay una persona',
          explanation: 'Cuando escribimos un comentario en la computadora no vemos la cara de la otra persona, pero tus palabras tienen el mismo poder de alegrar o de lastimar.',
          example: 'Escribí siempre como te gustaría que te hablen a vos en el recreo.',
          icon: '❤️',
          tag: 'Empatía Digital',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver impacto de una palabra amable',
            revealText: 'Un mensaje de aliento puede alegrarle el día a un compañero que estaba preocupado por una tarea.',
          },
        },
        {
          id: 'l7_g2_2',
          title: 'El filtro de las 3 preguntas',
          explanation: 'Antes de pulsar "Enviar comentario", hacete tres preguntas en tu mente: 1. ¿Es respetuoso? 2. ¿Es necesario? 3. ¿Ayuda a aprender?',
          example: 'Si un mensaje no ayuda a nadie y puede molestar, es mejor no escribirlo.',
          icon: '💭',
          tag: 'Triple Filtro',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Evitá cadenas de letras como "holaaaaaaaaaa" o llenar de emojis que dificultan la lectura.',
          },
        },
        {
          id: 'l7_g2_3',
          title: 'Pedir ayuda ante situaciones incómodas',
          explanation: 'Si alguien escribe algo que te ofende o te hace sentir mal en Classroom, no le contestes con otro insulto.',
          example: 'Avisale de inmediato a tu maestro o a un adulto responsable para que intervenga.',
          icon: '🛡️',
          tag: 'Cuidado Mutuo',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Para qué se deben usar los comentarios de una tarea?',
            choiceOptions: [
              { text: 'Para hacer consultas y aportes respetuosos sobre la actividad 📚', isCorrect: true, feedback: '¡Exacto! Ese es el uso constructivo de los comentarios.' },
              { text: 'Para contar chistes que distraen a la clase 🤪', isCorrect: false, feedback: 'Los comentarios de clase son para aprender juntos.' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l7_g3_1',
          title: 'La regla fundamental del respeto virtual',
          explanation: 'En Classroom nos comunicamos con amabilidad, corrección y claridad. El aula virtual es una extensión de la escuela física y rigen las mismas normas de respeto.',
          example: 'Saludar ("Hola profe", "Buenas tardes") y agradecer ("Muchas gracias") son marcas de un estudiante educado.',
          icon: '💬',
          tag: 'Convivencia Digital',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver por qué no usar mayúsculas completas',
            revealText: 'EN INTERNET, ESCRIBIR TODO EN MAYÚSCULAS EQUIVALE A GRITAR. Escribí en minúsculas normales con signos de puntuación adecuados.',
          },
        },
        {
          id: 'l7_g3_2',
          title: 'Pensá antes de publicar: Los 3 filtros dorados',
          explanation: '💭 1. ¿Es respetuoso? (¿Cuida la dignidad del otro?) 💭 2. ¿Es necesario? (¿Aporta valor o es spam?) 💭 3. ¿Ayuda a aprender? (¿Contribuye a la clase?).',
          example: 'Si alguna de las tres respuestas es "No", reformulá el mensaje o descartalo.',
          icon: '🚦',
          tag: 'Semáforo del Respeto',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Los comentarios de broma en el tablón público desordenan el espacio de estudio de todos.',
          },
        },
        {
          id: 'l7_g3_3',
          title: 'Cómo responder ante dudas de compañeros',
          explanation: 'Cuando un par hace una pregunta que te parece simple, jamás respondas con soberbia ("¡Qué tonto, es re fácil!").',
          example: 'Brindá una pista constructiva: "Hola, en el minuto 3 del video lo explican muy claro".',
          icon: '🌟',
          tag: 'Solidaridad',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'Un compañero publica una duda y vos sabés la respuesta. ¿Cuál es la mejor actitud?',
            choiceOptions: [
              { text: 'Responderle con educación y orientarlo para que encuentre la solución 🤝', isCorrect: true, feedback: '¡Brillante! Fomentás un clima de confianza donde nadie tiene miedo de preguntar.' },
              { text: 'Reírte públicamente de su duda 😆', isCorrect: false, feedback: 'Burlarse genera inseguridad y rompe la convivencia del grupo.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l7_g4_1',
          title: 'Netiqueta: Código de conducta en plataformas educativas',
          explanation: 'La "Netiqueta" es el conjunto de normas de cortesía que regulan la interacción en la red: saludo cordial, redacción comprensible, ausencia de lenguaje soez y respeto por las opiniones ajenas.',
          example: 'En Classroom todo comentario lleva tu nombre real: cuidá la impresión que dejás.',
          icon: '📜',
          tag: 'Netiqueta Escolar',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver consecuencias del ciberacoso',
            revealText: 'Burlas repetidas, exclusión deliberada o comentarios denigrantes constituyen acoso escolar digital (ciberbullying) y tienen sanciones disciplinarias graves.',
          },
        },
        {
          id: 'l7_g4_2',
          title: 'Comunicación asertiva y resolución de desacuerdos',
          explanation: 'Es natural tener opiniones distintas en un debate de clase. La madurez digital consiste en argumentar con fundamentos sin agredir a la persona que piensa diferente.',
          example: 'En vez de decir "Tu idea es pésima", decí: "No coincido con ese punto porque la fuente histórica menciona otro dato".',
          icon: '🧠',
          tag: 'Debate Constructivo',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Criticar una idea con respeto enriquece el debate; atacar a la persona destruye el diálogo.',
          },
        },
        {
          id: 'l7_g4_3',
          title: 'El rol del observador activo',
          explanation: 'Si ves que alguien agrede o se burla de un compañero en Classroom, no seas cómplice guardando silencio o riéndote.',
          example: 'Podés escribir un comentario de apoyo a la víctima y avisarle discretamente al docente.',
          icon: '🛡️',
          tag: 'Ciudadanía Activa',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Cómo debés actuar si presenciás comentarios ofensivos dirigidos a un compañero?',
            choiceOptions: [
              { text: 'No sumarte a la agresión, brindar apoyo al compañero y notificar al docente 🛡️', isCorrect: true, feedback: '¡Excelente valentía y empatía! Los observadores activos frenan el acoso escolar.' },
              { text: 'Festejar el insulto para pertenecer al grupo 🤡', isCorrect: false, feedback: 'Alimentar la agresión te hace cómplice del daño hacia tu par.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l7_g5_1',
          title: 'Cultura de paz y ética en la comunicación digital',
          explanation: 'El aula virtual es una micro-sociedad. La calidad de la convivencia depende de la empatía comunicacional: entender que las palabras escritas permanecen, tienen peso psicológico y construyen o destruyen vínculos.',
          example: 'Tu huella comunicacional en Classroom refleja tu integridad ética como futuro ciudadano.',
          icon: '🕊️',
          tag: 'Ética y Derechos',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver la regla de la permanencia digital',
            revealText: 'Aunque borres un comentario ofensivo, el docente y los administradores tienen acceso a los registros (logs) del sistema. Pensar antes de pulsar enviar es tu mejor protección.',
          },
        },
        {
          id: 'l7_g5_2',
          title: 'Desactivar la toxicidad y el efecto desinhibición',
          explanation: 'En internet ocurre el "efecto de desinhibición tóxica": al no mirar a los ojos al interlocutor, algunas personas dicen cosas crueles que jamás dirían cara a cara.',
          example: 'Superá esa trampa psicológica practicando la empatía reflexiva en cada mensaje.',
          icon: '💡',
          tag: 'Psicología Digital',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Antes de publicar un mensaje cuando estés enojado, esperá 5 minutos, respirá y releelo con serenidad.',
          },
        },
        {
          id: 'l7_g5_3',
          title: 'La comunidad de indagación y el diálogo colaborativo',
          explanation: 'Los espacios de comentarios son comunidades de aprendizaje dialógico. Los aportes valiosos son aquellos que hacen preguntas profundas, sugieren fuentes y reconocen los aciertos de los pares.',
          example: '"Excelente análisis, me hizo reflexionar sobre este aspecto que no había contemplado".',
          icon: '🌟',
          tag: 'Liderazgo Positivo',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué principio sintetiza la comunicación responsable en entornos educativos?',
            choiceOptions: [
              { text: 'Tratar a cada integrante con dignidad, cuidar el impacto emocional del mensaje y aportar al saber colectivo 🏆', isCorrect: true, feedback: '¡Impecable! Sos un modelo de liderazgo y convivencia digital.' },
              { text: 'Escribir cualquier impulso sin filtro porque "es solo internet" 💥', isCorrect: false, feedback: 'En internet hay personas reales cuyos derechos y emociones debemos respetar siempre.' },
            ],
          },
        },
      ],
    },
  },

  // ==========================================
  // NIVEL 8: APRENDEMOS JUNTOS
  // ==========================================
  8: {
    levelId: 8,
    clasitoIntro: {
      mood: 'waving',
      text: '¡Aprender con amigos es lo más lindo de la escuela! Pero... ¿sabías que ayudar NO significa pasarle tu tarea para que se copie? ¡Descubramos por qué!',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l8_g1_1',
          title: 'APRENDER EN EQUIPO',
          explanation: 'EN LA ESCUELA NOS AYUDAMOS COMO BUENOS AMIGOS.',
          example: 'TRABAJAR JUNTOS ES MUCHO MÁS DIVERTIDO.',
          icon: '🤝',
          tag: 'COMPAÑERISMO',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA VER CÓMO AYUDAR',
            revealText: '¡LE EXPLICAMOS CON PACIENCIA HASTA QUE PUEDA SOLITO!',
          },
        },
        {
          id: 'l8_g1_2',
          title: 'AYUDAR NO ES COPIAR',
          explanation: 'SI LE PASÁS LA TAREA HECHA, TU AMIGO NO APRENDE.',
          example: 'AYUDAR ES ENSEÑARLE A PENSAR.',
          icon: '💡',
          tag: 'PENSAR',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'HACERLE LA TAREA AL OTRO NO LO HACE MÁS INTELIGENTE.',
          },
        },
        {
          id: 'l8_g1_3',
          title: 'CADA UNO HACE SU PARTE',
          explanation: 'EN UN TRABAJO GRUPAL, TODOS AYUDAMOS CON ALEGRÍA.',
          example: 'UNO DIBUJA, OTRO PINTA, TODOS PARTICIPAMOS.',
          icon: '🎨',
          tag: 'EQUIPO',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'UN AMIGO TE PIDE TU HOJA PARA COPIAR. ¿QUÉ HACÉS?',
            choiceOptions: [
              { text: 'LE DIGO "TE EXPLICO CÓMO SE HACE" 💡', isCorrect: true, feedback: '¡SOS UN VERDADERO AMIGO! LE ENSEÑÁS A PENSAR.' },
              { text: 'LE DOY MI TAREA PARA QUE LA COPIE 📋', isCorrect: false, feedback: '¡NO! SI COPIA, NO APRENDE NADA.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l8_g2_1',
          title: 'La verdadera solidaridad escolar',
          explanation: 'Un buen compañero comparte sus conocimientos, no sus respuestas hechas para calcar.',
          example: 'Si tu amigo no sabe sumar, explicále con tapitas o dibujos; no le des el número final.',
          icon: '🤝',
          tag: 'Solidaridad Real',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver qué pasa cuando alguien se copia',
            revealText: 'En el día de la prueba o examen no tendrá a quién copiar y no sabrá resolverlo por su cuenta.',
          },
        },
        {
          id: 'l8_g2_2',
          title: 'Trabajo en equipo en Google Docs o Dibujos',
          explanation: 'Cuando la maestra les pide un trabajo grupal en un archivo compartido, respetamos el trabajo del compañero.',
          example: 'Nunca borres el texto de otro niño sin preguntarle primero.',
          icon: '👥',
          tag: 'Respeto al Equipo',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Usen los comentarios del documento para conversar sobre los cambios.',
          },
        },
        {
          id: 'l8_g2_3',
          title: 'Aprender de las diferencias',
          explanation: 'No todos los compañeros piensan igual o hacen los dibujos del mismo color. Escuchar ideas distintas hace que el proyecto sea mucho más creativo.',
          example: 'Sumar ideas de todos crea resultados geniales.',
          icon: '🌈',
          tag: 'Diversidad',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué significa colaborar en la escuela?',
            choiceOptions: [
              { text: 'Unir talentos, ayudarse con paciencia y aprender juntos 🌟', isCorrect: true, feedback: '¡Exacto! El compañerismo nos hace mejores personas.' },
              { text: 'Que uno haga todo el trabajo y los demás miren tele 📺', isCorrect: false, feedback: 'Todos deben participar para que el trabajo sea de verdad grupal.' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l8_g3_1',
          title: 'Diferencia ética: Enseñar vs Hacer el trabajo ajeno',
          explanation: 'La frase central de este nivel: "Ayudar a aprender no significa hacer el trabajo por el otro". Cuando le pasás un archivo resuelto a un compañero, le quitás la oportunidad de ejercitar su cerebro.',
          example: 'Guiar con pistas ("Fijate qué dice el primer párrafo") es un acto pedagógico y amoroso.',
          icon: '💡',
          tag: 'Ética del Compañerismo',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver qué dice el docente',
            revealText: 'Los profesores detectan de inmediato las tareas copiadas y ambos estudiantes quedan sin calificación aprobatoria.',
          },
        },
        {
          id: 'l8_g3_2',
          title: 'Normas de convivencia en documentos colaborativos',
          explanation: 'Al trabajar en Google Docs o Presentaciones compartidas: 1. Cada alumno trabaja en su sección acordada. 2. No se edita texto ajeno sin consenso. 3. Se usa el chat o comentarios para coordinar.',
          example: 'El historial de versiones de Google Docs muestra con colores exactamente qué escribió cada integrante.',
          icon: '📝',
          tag: 'Herramientas Colaborativas',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Si alguien borra algo por error, se puede restaurar desde el historial de revisiones.',
          },
        },
        {
          id: 'l8_g3_3',
          title: 'Valorar la diversidad de opiniones',
          explanation: 'Un grupo exitoso no es el que todos dicen lo mismo, sino el que sabe debatir con cortesía para llegar al mejor trabajo.',
          example: 'Aceptá las correcciones de tus compañeros con humildad y hacé tus sugerencias con cariño.',
          icon: '🤝',
          tag: 'Consenso',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: 'En un trabajo en parejas en Google Docs, tu compañero comete un error ortográfico. ¿Qué hacés?',
            choiceOptions: [
              { text: 'Avisarle con amabilidad o ponerle un comentario constructivo para corregirlo juntos ✍️', isCorrect: true, feedback: '¡Muy bien! Cuidás el trabajo en equipo y ayudás a tu par a mejorar.' },
              { text: 'Enojarte y borrar todo el documento 😠', isCorrect: false, feedback: 'El diálogo respetuoso siempre soluciona cualquier detalle.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l8_g4_1',
          title: 'Colaboración efectiva en la nube',
          explanation: 'El trabajo colaborativo en entornos como Classroom y Google Workspace simula el trabajo profesional de los equipos científicos y laborales modernos: co-creación, sincronización y división equilibrada de responsabilidades.',
          example: 'Definir roles claros (investigador, redactor, revisor y diseñador) potencia los resultados.',
          icon: '☁️',
          tag: 'Habilidades del Siglo XXI',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver trazabilidad de aportes',
            revealText: 'Los docentes pueden ver el gráfico de contribuciones por usuario en cada archivo compartido para evaluar el compromiso real de cada estudiante.',
          },
        },
        {
          id: 'l8_g4_2',
          title: 'Honestidad académica y el plagio entre pares',
          explanation: 'Copiar la tarea de otro o permitir que copien la tuya atenta contra la honestidad académica. Ambas partes son responsables: quien copia comete plagio y quien cede la tarea facilita la trampa.',
          example: 'El valor de la escuela no es la nota numérica, sino la capacidad que desarrollás en tu mente.',
          icon: '⚖️',
          tag: 'Honestidad',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Animá a tu compañero diciéndole: "Sé que vos podés resolverlo; yo te acompaño mientras lo hacés".',
          },
        },
        {
          id: 'l8_g4_3',
          title: 'Feedback entre pares (co-evaluación)',
          explanation: 'Revisar el trabajo de un compañero para ayudarlo a detectar mejoras antes de la entrega final enriquece a ambos.',
          example: '"Me gustó mucho tu introducción, creo que si agregás un ejemplo al final quedaría impecable".',
          icon: '🔄',
          tag: 'Co-evaluación',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Cuál es la diferencia entre trabajo cooperativo y simple división mecánica?',
            choiceOptions: [
              { text: 'En la cooperación hay debate, integración de saberes y todos comprenden la totalidad del proyecto 🚀', isCorrect: true, feedback: '¡Exacto! No se trata de juntar pedazos aislados, sino de construir juntos.' },
              { text: 'Cada uno hace una línea sin leer lo de los demás 😴', isCorrect: false, feedback: 'Eso genera trabajos inconexos y sin aprendizaje compartido.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l8_g5_1',
          title: 'Inteligencia colectiva y construcción social del saber',
          explanation: 'La pedagogía contemporánea enseña que el conocimiento se construye en comunidad. Trabajar en equipo no es una exigencia molesta, sino el entrenamiento principal para la vida cívica y profesional.',
          example: 'Los grandes avances de la ciencia y la tecnología son producto de equipos colaborativos interdisciplinarios.',
          icon: '🧠',
          tag: 'Epistemología Social',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver resolución dialógica de conflictos',
            revealText: 'Cuando surgen diferencias metodológicas, los equipos maduros no se disuelven: debaten con evidencias, prueban alternativas y eligen democráticamente la solución más sólida.',
          },
        },
        {
          id: 'l8_g5_2',
          title: 'Ética de la autoría y propiedad intelectual',
          explanation: 'En trabajos de investigación colaborativos, se debe reconocer el aporte de cada integrante y citar debidamente las fuentes externas (libros, artículos, webs). Copiar contenido de internet sin citar es plagio.',
          example: 'La honestidad intelectual es la base de la credibilidad de todo estudiante e investigador.',
          icon: '📚',
          tag: 'Integridad Académica',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Citar a los autores consultados demuestra que investigaste seriamente tu tema.',
          },
        },
        {
          id: 'l8_g5_3',
          title: 'Liderazgo positivo y mentoría entre iguales',
          explanation: 'Si dominás un tema antes que otros, tu rol de liderazgo no es presumir ni resolverles el ejercicio, sino actuar como mentor: formular preguntas que despierten el razonamiento de tus pares.',
          example: 'Enseñar a otro es la forma más avanzada y efectiva de consolidar tu propio conocimiento.',
          icon: '🏆',
          tag: 'Mentoría',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué postura define a un líder positivo en un equipo de Classroom?',
            choiceOptions: [
              { text: 'Escuchar activamente, alentar la participación de todos y motivar para que cada uno alcance su máximo potencial 🌟', isCorrect: true, feedback: '¡Magistral! Sos un ejemplo de liderazgo constructivo y solidario.' },
              { text: 'Imponer su opinión y desmerecer las ideas de los demás 😤', isCorrect: false, feedback: 'El autoritarismo destruye la creatividad y el clima del equipo.' },
            ],
          },
        },
      ],
    },
  },

  // ==========================================
  // NIVEL 9: NOS CUIDAMOS EN INTERNET
  // ==========================================
  9: {
    levelId: 9,
    clasitoIntro: {
      mood: 'motivating',
      text: '¡Activá tu escudo de ciberseguridad! Antes del juego de clasificación, aprendamos qué información es privada y cómo navegar protegidos.',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l9_g1_1',
          title: 'NO COMPARTIR INFORMACIÓN PERSONAL',
          explanation: 'HAY DATOS QUE SON SECRETOS DE NUESTRA FAMILIA.',
          example: 'NUNCA DECIMOS EN INTERNET DÓNDE VIVIMOS NI EL TELÉFONO.',
          icon: '🛑',
          tag: 'DATOS SECRETOS',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA VER QUÉ NO DECIR',
            revealText: '¡CONTRASEÑA, DIRECCIÓN, TELÉFONO Y FOTOS PRIVADAS!',
          },
        },
        {
          id: 'l9_g1_2',
          title: 'LO QUE SÍ ES PARA CLASSROOM',
          explanation: 'LAS TAREAS, LOS DIBUJOS Y LAS PREGUNTAS A LA SEÑO SÍ SE COMPARTEN.',
          example: 'EL DIBUJO DE TU MASCOTA ES PARA LA CLASE.',
          icon: '🎨',
          tag: 'TAREAS ESCOLARES',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'TODO LO QUE ES PARA LA TAREA ES SEGURO COMPARTIR.',
          },
        },
        {
          id: 'l9_g1_3',
          title: 'SI ALGO TE ASUSTA: AVISAR',
          explanation: 'SI VES ALGO EXTRAÑO O DESCONOCIDO, LLAMÁS A UN ADULTO.',
          example: 'TU FAMILIA Y TU MAESTRA SIEMPRE TE PROTEGEN.',
          icon: '🛡️',
          tag: 'PROTECCIÓN',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿SE PUEDE ESCRIBIR LA DIRECCIÓN EXACTA DE TU CASA EN UN COMENTARIO?',
            choiceOptions: [
              { text: '¡NO! ES INFORMACIÓN PRIVADA Y SECRETA 🔒', isCorrect: true, feedback: '¡EXCELENTE! CUIDÁS LA SEGURIDAD DE TU FAMILIA.' },
              { text: 'SÍ, PARA QUE TODOS SEPAN DÓNDE VIVO 🏠', isCorrect: false, feedback: '¡NUNCA! LA DIRECCIÓN DE TU CASA NO SE PUBLICA EN INTERNET.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l9_g2_1',
          title: '¿Qué son los datos personales?',
          explanation: 'Los datos personales son las piezas de información que te identifican a vos y a tu familia: tu nombre completo, dirección, teléfono, colegio y fotos de tu casa.',
          example: 'En internet, estos datos deben mantenerse en privado.',
          icon: '👤',
          tag: 'Privacidad',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver ejemplos de datos confidenciales',
            revealText: 'Número de documento, contraseñas, fotos en tu dormitorio o lugares donde estás solo.',
          },
        },
        {
          id: 'l9_g2_2',
          title: 'Cuidado con enlaces y archivos extraños',
          explanation: 'Nunca hagas clic en enlaces que no hayan sido publicados por tu docente ni descargues archivos de personas que no conozcas.',
          example: 'Pueden contener virus que dañan tu computadora o roban tu sesión.',
          icon: '⚠️',
          tag: 'Prevención de Virus',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Consejo: Si una página te pide tu número de teléfono para continuar, cerrala de inmediato.',
          },
        },
        {
          id: 'l9_g2_3',
          title: 'El botón de alarma: Hablar con adultos',
          explanation: 'Si en algún momento sentís miedo, incomodidad o alguien desconocido te escribe en cualquier plataforma digital, avisale a un adulto.',
          example: 'Contar lo que te pasa no te meterá en problemas; te mantendrá seguro.',
          icon: '👨‍👩‍👧',
          tag: 'Confianza',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Cuál de estos elementos SÍ es seguro compartir en tu tarea de Classroom?',
            choiceOptions: [
              { text: 'Una foto de tu lámina escolar de Ciencias Naturales 🌿', isCorrect: true, feedback: '¡Muy bien! Las producciones escolares son el material de la clase.' },
              { text: 'Una foto de la tarjeta de crédito de tus papás 💳', isCorrect: false, feedback: '¡Peligro extremo! Los datos financieros son estrictamente confidenciales.' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l9_g3_1',
          title: 'Clasificación de información: Pública vs Privada',
          explanation: 'No toda la información puede publicarse en la web. Información pública escolar: dudas sobre un tema, respuestas de ejercicios. Información privada sensible: contraseñas, geolocalización, finanzas familiares.',
          example: 'Saber distinguir qué es seguro y qué es sensible es la base de la seguridad digital.',
          icon: '🛡️',
          tag: 'Filtro de Datos',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver qué es la geolocalización',
            revealText: 'Es la información que dice exactamente en qué calle o lugar estás en este momento. Nunca debés compartirla en internet.',
          },
        },
        {
          id: 'l9_g3_2',
          title: 'El engaño de los desconocidos y el phishing',
          explanation: 'En internet no siempre las personas son quienes dicen ser. Hay mensajes falsos que prometen monedas para juegos (Roblox, Minecraft, etc.) a cambio de tu cuenta o datos.',
          example: 'Esas páginas son trampas para robar cuentas escolares o familiares.',
          icon: '🎣',
          tag: 'Ciberengaños',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Recordá: Nadie regala cosas mágicas en internet a cambio de tus datos personales.',
          },
        },
        {
          id: 'l9_g3_3',
          title: 'Protocolo de seguridad: Parar, Cerrar y Avisar',
          explanation: 'Si te encontrás con un contenido perturbador, violento o inapropiado: 1. PARAR (no interactuar). 2. CERRAR la ventana. 3. AVISAR inmediatamente a un adulto responsable.',
          example: 'Los adultos tienen la experiencia para bloquear y denunciar el contenido.',
          icon: '🛑',
          tag: 'Protocolo de Acción',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Por qué no debés publicar el número de teléfono de tu familia en Classroom?',
            choiceOptions: [
              { text: 'Porque es información privada de contacto que solo deben tener las personas autorizadas 📱', isCorrect: true, feedback: '¡Correcto! Cuidás la privacidad y tranquilidad de tu hogar.' },
              { text: 'Porque a Classroom no le gustan los números 🔢', isCorrect: false, feedback: 'Es una medida estricta de protección de datos personales.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l9_g4_1',
          title: 'Tu huella digital y la privacidad en línea',
          explanation: 'Cada publicación, comentario o archivo que subís a internet forma tu "huella digital". Lo que se sube a la red puede ser descargado, copiado o permanecer por años.',
          example: 'Construir una huella digital positiva significa compartir contenidos constructivos y proteger tu intimidad.',
          icon: '👣',
          tag: 'Huella Digital',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver concepto de intimidad digital',
            revealText: 'Tu intimidad es tu derecho a resguardar tu vida personal, familiar y tus espacios íntimos fuera del alcance de extraños.',
          },
        },
        {
          id: 'l9_g4_2',
          title: 'Software malicioso y descargas no autorizadas',
          explanation: 'Descargar programas no autorizados por la escuela o hacer clic en archivos ejecutables (.exe, .bat, etc.) puede infectar la red escolar con malware (virus, spyware).',
          example: 'Utilizá únicamente las extensiones y aplicaciones aprobadas por tu institución.',
          icon: '💻',
          tag: 'Ciberseguridad',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Classroom analiza automáticamente los archivos en busca de virus antes de descargarlos.',
          },
        },
        {
          id: 'l9_g4_3',
          title: 'Grooming y contacto con desconocidos',
          explanation: 'El grooming es el intento de un adulto de ganarse la confianza de un menor a través de internet con fines perjudiciales. Nunca aceptes solicitudes de personas que no conozcas en persona.',
          example: 'Si alguien insiste en pedirte fotos o te pide que mantengas secretos ante tus padres, avisá de inmediato.',
          icon: '🚨',
          tag: 'Autoprotección',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Cuál es la primera señal de alerta ante un mensaje de un desconocido en la red?',
            choiceOptions: [
              { text: 'Pide datos privados, fotos íntimas o te exige que no le cuentes a tus padres 🚨', isCorrect: true, feedback: '¡Exacto! Esa es una señal inequívoca para cortar la comunicación y avisar a un adulto.' },
              { text: 'Te saluda con educación en el aula virtual 🏫', isCorrect: false, feedback: 'La alerta está en el pedido de datos personales y en la exigencia de secreto.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l9_g5_1',
          title: 'Marco de derechos y protección de datos en la era digital',
          explanation: 'Como ciudadano digital, tenés derecho a la privacidad, a la protección de tus datos personales (habeas data) y a navegar en entornos escolares libres de violencia y ciberdelitos.',
          example: 'La legislación internacional protege a niños y adolescentes contra la recopilación indebida de datos.',
          icon: '⚖️',
          tag: 'Derechos Digitales',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver rol de los datos biométricos y personales',
            revealText: 'Tus fotos faciales, huellas, firmas y datos familiares son datos sensibles. Cuidar qué plataformas los almacenan es fundamental.',
          },
        },
        {
          id: 'l9_g5_2',
          title: 'Ingeniería social y vectores de ataque modernos',
          explanation: 'La ingeniería social manipula la curiosidad o el miedo de las personas para que entreguen sus credenciales voluntariamente (sitios clonados, alarmas falsas de virus).',
          example: 'Verificá siempre la URL oficial (classroom.google.com) y desconfiá de páginas secundarias.',
          icon: '🔒',
          tag: 'Ingeniería Social',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'El pensamiento crítico es el mejor antivirus: dudar, verificar y no actuar por impulso.',
          },
        },
        {
          id: 'l9_g5_3',
          title: 'Autocuidado y acompañamiento intergeneracional',
          explanation: 'La seguridad en internet no se resuelve aislando al estudiante de la tecnología, sino construyendo canales de confianza con docentes y familias para dialogar sobre los riesgos sin miedo al castigo.',
          example: 'Recurrir a un adulto ante un error digital es señal de madurez, no de debilidad.',
          icon: '🛡️',
          tag: 'Cultura de Cuidado',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Por qué la privacidad es considerada un derecho humano fundamental en entornos digitales?',
            choiceOptions: [
              { text: 'Porque resguarda la libertad, la intimidad y la seguridad física y psicológica de las personas frente a abusos 🌟', isCorrect: true, feedback: '¡Extraordinario análisis! Comprender el valor de la privacidad te convierte en un ciudadano digital consciente y empoderado.' },
              { text: 'Porque a nadie le gusta que lo miren 🙈', isCorrect: false, feedback: 'La privacidad es un pilar jurídico y ético de la sociedad democrática.' },
            ],
          },
        },
      ],
    },
  },

  // ==========================================
  // NIVEL 10: GRAN DESAFÍO FINAL (REPASAMOS)
  // ==========================================
  10: {
    levelId: 10,
    clasitoIntro: {
      mood: 'celebrating',
      text: '¡LLEGASTE AL GRAN FINAL! Antes del examen de 10 preguntas, repasemos los 8 valores de oro de la aventura. ¡Estás a un paso del Certificado Oficial!',
    },
    cardsByGrade: {
      1: [
        {
          id: 'l10_g1_1',
          title: '📚 APRENDER Y 📖 LEER CONSIGNAS',
          explanation: 'CLASSROOM ES PARA APRENDER. ¡SIEMPRE LEEMOS LA CONSIGNA COMPLETA!',
          example: 'LEER BIEN NOS HACE HACER TAREAS PERFECTAS.',
          icon: '📚',
          tag: 'REGLAS 1 Y 2',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'TOCÁ PARA RECORDAR',
            revealText: '¡1. LEER 2. MIRAR 3. HACER 4. REVISAR 5. ENTREGAR!',
          },
        },
        {
          id: 'l10_g1_2',
          title: '📤 ENTREGAR Y ⏰ SER RESPONSABLE',
          explanation: 'SUBIMOS EL ARCHIVO Y TOCAMOS "ENTREGAR". ¡NO DEJAMOS PARA EL FINAL!',
          example: 'HACEMOS LA TAREA A TIEMPO CON CALMA.',
          icon: '⏰',
          tag: 'REGLAS 3 Y 4',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'MIRAMOS QUE EL ESTADO CAMBIE A "ENTREGADA".',
          },
        },
        {
          id: 'l10_g1_3',
          title: '💖 RESPETO, 🤝 COMPAÑERISMO Y 🔐 CUIDADO',
          explanation: 'PALABRAS AMABLES, AYUDAR SIN COPIAR Y CONTRASEÑA SECRETA.',
          example: '¡ASÍ SOMOS EXPERTOS EN CLASSROOM!',
          icon: '🏆',
          tag: 'REGLAS 5, 6 Y 7',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿ESTÁS LISTO PARA EL GRAN DESAFÍO FINAL?',
            choiceOptions: [
              { text: '¡SÍ, CLASITO! ¡VAMOS POR EL CERTIFICADO! 🚀', isCorrect: true, feedback: '¡VAMOS CAMPEÓN! ¡A DEMOSTRAR TODO LO APRENDIDO!' },
              { text: 'QUIERO REPASAR UN POCO MÁS 📚', isCorrect: true, feedback: '¡PERFECTO! PODÉS REPASAR Y CUANDO QUIERAS COMENZAR.' },
            ],
          },
        },
      ],
      2: [
        {
          id: 'l10_g2_1',
          title: 'Repaso 1: Classroom y las Consignas',
          explanation: 'Classroom es nuestra escuela digital. Recordá siempre leer la consigna completa antes de comenzar para no equivocarte.',
          example: 'La consigna te dice qué hacer, cómo hacerlo y qué entregar.',
          icon: '📖',
          tag: 'Fundamentos',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver recordatorio de Clasito',
            revealText: 'Si una consigna tiene varios pasos, resolvelos uno por uno con tranquilidad.',
          },
        },
        {
          id: 'l10_g2_2',
          title: 'Repaso 2: Entregar y Planificar',
          explanation: 'Adjuntar un archivo no es suficiente: tenés que tocar "Entregar" y verificar que el estado figure en verde. Planificá tus días para no dejar todo a última hora.',
          example: 'Entregar con anticipación te da tranquilidad.',
          icon: '📤',
          tag: 'Responsabilidad',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Revisá siempre que el archivo adjuntado no esté en blanco.',
          },
        },
        {
          id: 'l10_g2_3',
          title: 'Repaso 3: Convivencia y Seguridad',
          explanation: 'Pensá antes de publicar (¿Es respetuoso? ¿Es necesario? ¿Ayuda a aprender?), ayudá a tus compañeros enseñando a pensar sin copiar, y protegé tu contraseña.',
          example: '¡Esos son los valores de un verdadero experto en Classroom!',
          icon: '🏆',
          tag: 'Valores Digitales',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué hace un alumno experto antes de enviar su examen final?',
            choiceOptions: [
              { text: 'Lee cada pregunta con atención y reflexiona su respuesta con calma 🧠', isCorrect: true, feedback: '¡Exacto! La concentración y la paciencia te darán un puntaje excelente.' },
              { text: 'Toca cualquier opción rápido para ir a jugar ⚡', isCorrect: false, feedback: 'Tomate tu tiempo para demostrar todo lo que aprendiste.' },
            ],
          },
        },
      ],
      3: [
        {
          id: 'l10_g3_1',
          title: 'Repaso Conceptual 1: Navegación y Consignas',
          explanation: 'Recordá: Novedades para anuncios, Trabajo de clase para actividades organizadas por temas. Las consignas se leen completas identificando los verbos de acción.',
          example: 'Verificá siempre la fecha de vencimiento y los materiales adjuntos.',
          icon: '🗺️',
          tag: 'Navegación Escolar',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver síntesis de consignas',
            revealText: 'Leer ➡️ Pensar ➡️ Resolver ➡️ Revisar ➡️ Entregar.',
          },
        },
        {
          id: 'l10_g3_2',
          title: 'Repaso Conceptual 2: Entregas y Organización',
          explanation: 'Subir archivo no equivale a entregar: confirmar la entrega es fundamental. Planificá con la situación del martes: priorizá lo que vence antes para evitar acumulación.',
          example: 'Revisá que el archivo no esté corrupto ni pertenezca a otra materia.',
          icon: '⏰',
          tag: 'Gestión y Entrega',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Si cometiste un error antes del plazo, podés "Anular entrega", corregir y volver a enviar.',
          },
        },
        {
          id: 'l10_g3_3',
          title: 'Repaso Conceptual 3: Convivencia, Solidaridad y Ciberseguridad',
          explanation: 'Filtro triple antes de publicar comentarios; colaborar es guiar para que el otro aprenda, no regalarle el archivo; y los datos privados (claves, teléfonos, domicilios) nunca se comparten en la red.',
          example: '¡Con estos principios estás listo para graduarte con honores!',
          icon: '🌟',
          tag: 'Ciudadanía Integral',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Cuál es la síntesis de un estudiante ejemplar en Google Classroom?',
            choiceOptions: [
              { text: 'Aprender con curiosidad, comunicarse con empatía, entregar con responsabilidad y cuidar la seguridad digital 🎓', isCorrect: true, feedback: '¡Impecable! Estás 100% preparado para el Gran Desafío Final.' },
              { text: 'Solo saber apretar botones en la computadora 💻', isCorrect: false, feedback: 'Classroom es un espacio de convivencia, aprendizaje y valores humanos.' },
            ],
          },
        },
      ],
      4: [
        {
          id: 'l10_g4_1',
          title: 'Síntesis Maestra 1: Gestión de Tareas y Autonomía',
          explanation: 'Dominio de la sección "Trabajo de clase", seguimiento de la pestaña "Pendientes", interpretación de consignas complejas mediante rúbricas y ciclo formal de entrega (carga, verificación y confirmación).',
          example: 'La autonomía digital es saber gestionar tus tiempos y recursos escolares.',
          icon: '📊',
          tag: 'Autonomía y Gestión',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver clave de las entregas',
            revealText: 'Entregar a tiempo refleja compromiso; verificar el archivo adjuntado demuestra profesionalismo estudiantil.',
          },
        },
        {
          id: 'l10_g4_2',
          title: 'Síntesis Maestra 2: Ciudadanía Digital y Convivencia',
          explanation: 'Netiqueta en comentarios, respeto irrestricto por las opiniones ajenas, rechazo de las burlas y el acoso escolar virtual, y rol activo para promover un clima armónico en el aula.',
          example: 'Las palabras en internet permanecen y construyen tu reputación digital.',
          icon: '🤝',
          tag: 'Convivencia Digital',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Comentarios privados para notas; comentarios públicos para aportes a la clase.',
          },
        },
        {
          id: 'l10_g4_3',
          title: 'Síntesis Maestra 3: Seguridad, Privacidad y Colaboración',
          explanation: 'Credenciales institucionales intransferibles, higiene en dispositivos compartidos, detección de phishing y colaboración ética en documentos compartidos sin incurrir en plagio.',
          example: '¡Superá el examen final de 10 preguntas y obtené tu Certificado Oficial!',
          icon: '🏆',
          tag: 'Ciberseguridad y Ética',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Por qué las 10 estaciones de esta aventura forman una formación integral?',
            choiceOptions: [
              { text: 'Porque combinan destrezas técnicas, hábitos de estudio, seguridad informática y valores cívicos indispensables 🚀', isCorrect: true, feedback: '¡Extraordinario! ¡A por el Gran Desafío Final!' },
              { text: 'Porque eran 10 números redondos 🔟', isCorrect: false, feedback: 'Cada nivel aportó una dimensión esencial de tu aprendizaje digital.' },
            ],
          },
        },
      ],
      5: [
        {
          id: 'l10_g5_1',
          title: 'Cápsula Integradora 1: Gestión Académica y Aprendizaje Autónomo',
          explanation: 'El dominio de Google Classroom comprende la planificación semanal estratégica, la interpretación de rúbricas y criterios de evaluación, y la gestión responsable del flujo de entrega digital de extremo a extremo.',
          example: 'Habilidades directas transferibles a la escuela secundaria y la vida académica superior.',
          icon: '🎓',
          tag: 'Gestión Académica',
          interactiveType: 'reveal',
          interactiveData: {
            revealButtonText: 'Ver competencia clave',
            revealText: 'Ser un estudiante proactivo que revisa retroalimentaciones y utiliza el error como insumo de aprendizaje.',
          },
        },
        {
          id: 'l10_g5_2',
          title: 'Cápsula Integradora 2: Ética, Colaboración y Trabajo en Equipo',
          explanation: 'Liderazgo constructivo en documentos compartidos, división equitativa de roles, respeto por la propiedad intelectual (citar fuentes bibliográficas) y fomento de la inteligencia colectiva sin caer en plagio ni copias mecánicas.',
          example: 'La verdadera colaboración potencia a todos los integrantes del grupo.',
          icon: '🌐',
          tag: 'Ética Colaborativa',
          interactiveType: 'tip',
          interactiveData: {
            revealText: 'Ayudar es mediar para que el otro razone por sí mismo; nunca hacer el trabajo por él.',
          },
        },
        {
          id: 'l10_g5_3',
          title: 'Cápsula Integradora 3: Ciberseguridad, Privacidad y Ciudadanía Global',
          explanation: 'Conciencia de la huella digital personal, resguardo estricto de datos sensibles, prevención de ingeniería social y grooming, y ejercicio de una comunicación empática que desactive la violencia digital.',
          example: '¡Es momento de validar tus conocimientos y consagrarte como Experto/a en Classroom!',
          icon: '🏆',
          tag: 'Ciudadanía Plena',
          interactiveType: 'choice',
          interactiveData: {
            choiceQuestion: '¿Qué significa ser un verdadero Experto en Google Classroom en 5.º grado?',
            choiceOptions: [
              { text: 'Utilizar las herramientas digitales con competencia técnica, ética académica, empatía comunicacional y responsabilidad ciudadana 🌟', isCorrect: true, feedback: '¡Magistral! ¡Estás listo para conquistar el Gran Desafío Final y tu Diploma Oficial!' },
              { text: 'Conocer solo los atajos del teclado ⌨️', isCorrect: false, feedback: 'El verdadero experto integra valores humanos y destrezas tecnológicas.' },
            ],
          },
        },
      ],
    },
  },
};
