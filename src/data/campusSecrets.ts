export interface CampusSecretConfig {
  id: string;
  name: string;
  icon: string;
  pos: { x: number; y: number };
  hint: string;
  lore: string;
  bonusStars: number;
}

export const CAMPUS_SECRETS: CampusSecretConfig[] = [
  {
    id: 'secret_campus_bell',
    name: 'La Campana Histórica',
    icon: '🔔',
    pos: { x: 38, y: 92 },
    hint: '¡Oculta en la entrada principal del campus, junto a los árboles de bienvenida!',
    lore: '¡Tocaste la campana escolar! Recuerda llegar siempre puntual y con ganas de aprender.',
    bonusStars: 1,
  },
  {
    id: 'secret_digital_key',
    name: 'La Llave Maestra de Seguridad',
    icon: '🔑',
    pos: { x: 88, y: 81 },
    hint: '¡Brillando detrás de la garita de seguridad digital!',
    lore: '¡Encontraste la Llave Maestra! Tu contraseña es tu llave más valiosa: cuidala siempre.',
    bonusStars: 1,
  },
  {
    id: 'secret_lost_book',
    name: 'El Gran Libro de Classroom',
    icon: '📚',
    pos: { x: 85, y: 64 },
    hint: '¡Descansando sobre un banco de lectura en los jardines de la biblioteca!',
    lore: '¡Descubriste el libro de las consignas! Leer con calma y atención te asegura hacer un trabajo genial.',
    bonusStars: 1,
  },
  {
    id: 'secret_golden_pencil',
    name: 'El Lápiz de Oro del Creador',
    icon: '✏️',
    pos: { x: 18, y: 56 },
    hint: '¡Escondido entre los arbustos de la Zona de Tareas!',
    lore: '¡Un lápiz dorado para tus mejores dibujos y entregas! La prolijidad y el esfuerzo se notan.',
    bonusStars: 1,
  },
  {
    id: 'secret_fountain_star',
    name: 'La Estrella de los Deseos',
    icon: '⭐',
    pos: { x: 50, y: 44 },
    hint: '¡Reflejada en el agua brillante de la fuente de la Plaza del Reloj!',
    lore: '¡Un destello de motivación! En equipo y con paciencia, todos los desafíos escolares se superan.',
    bonusStars: 1,
  },
];
