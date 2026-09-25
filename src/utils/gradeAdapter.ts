import type { Grade } from '../types';

export interface GradeInfo {
  grade: Grade;
  name: string;
  badgeName: string;
  avatar: string;
  color: string;
  borderColor: string;
  description: string;
}

export const GRADES_INFO: Record<Grade, GradeInfo> = {
  1: {
    grade: 1,
    name: '1.º grado',
    badgeName: 'Exploradores Iniciales',
    avatar: '🐣',
    color: 'from-amber-400 to-orange-500',
    borderColor: 'border-amber-400',
    description: 'Pictogramas, botones gigantes, frases cortas y lectura guiada.',
  },
  2: {
    grade: 2,
    name: '2.º grado',
    badgeName: 'Pequeños Aventureros',
    avatar: '🦊',
    color: 'from-emerald-400 to-teal-500',
    borderColor: 'border-emerald-400',
    description: 'Frases claras, ejemplos visuales y actividades guiadas.',
  },
  3: {
    grade: 3,
    name: '3.º grado',
    badgeName: 'Navegantes Digitales',
    avatar: '🚀',
    color: 'from-sky-400 to-blue-500',
    borderColor: 'border-sky-400',
    description: 'Situaciones de clase cotidianas y pasos para organizar tus tareas.',
  },
  4: {
    grade: 4,
    name: '4.º grado',
    badgeName: 'Detectives de Classroom',
    avatar: '🦁',
    color: 'from-indigo-400 to-violet-500',
    borderColor: 'border-indigo-400',
    description: 'Gestión de archivos, respeto digital y trabajo en equipo.',
  },
  5: {
    grade: 5,
    name: '5.º grado',
    badgeName: 'Líderes de Ciudadanía Digital',
    avatar: '🦉',
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-400',
    description: 'Ciberseguridad, privacidad, pensamiento crítico y ética digital.',
  },
};

/**
 * Formats any text according to the grade rules:
 * In 1st grade: ALL TEXT MUST BE UPPERCASE.
 */
export function formatGradeText(text: string, grade: Grade): string {
  if (grade === 1) {
    return text.toUpperCase();
  }
  return text;
}

/**
 * Returns a grade-specific text variation if provided, otherwise the base text.
 */
export function getGradeAdaptedText(
  texts: {
    g1?: string;
    g2?: string;
    g3?: string;
    g4?: string;
    g5?: string;
    default: string;
  },
  grade: Grade
): string {
  let selected = texts.default;
  if (grade === 1 && texts.g1) selected = texts.g1;
  else if (grade === 2 && (texts.g2 || texts.g1)) selected = texts.g2 || texts.g1!;
  else if (grade === 3 && (texts.g3 || texts.g2)) selected = texts.g3 || texts.g2!;
  else if (grade === 4 && (texts.g4 || texts.g3)) selected = texts.g4 || texts.g3!;
  else if (grade === 5 && (texts.g5 || texts.g4)) selected = texts.g5 || texts.g4!;

  return formatGradeText(selected, grade);
}
