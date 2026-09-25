export type Grade = 1 | 2 | 3 | 4 | 5;

export type ClasitoMood = 'happy' | 'thinking' | 'surprised' | 'motivating' | 'celebrating' | 'wrong' | 'waving';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  levelNumber: number;
}

export interface UserProgress {
  name: string;
  grade: Grade;
  completedLevels: number[];
  currentLevel: number;
  stars: number;
  unlockedBadges: string[];
  finalScore?: number;
  soundEnabled: boolean;
}

export interface QuestionOption {
  id: string;
  text: string;
  icon?: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  subtext?: string;
  image?: string;
  options: QuestionOption[];
}

export interface StepItem {
  id: string;
  text: string;
  icon: string;
  correctOrder: number;
}

export interface ShareItem {
  id: string;
  text: string;
  icon: string;
  canShare: boolean; // true = seguro para Classroom, false = datos privados/secreto
  reason: string;
}

export interface LevelConfig {
  id: number;
  title: string;
  shortTitle: string;
  badgeId: string;
  icon: string;
  color: {
    bg: string;
    border: string;
    text: string;
    light: string;
    badgeBg: string;
  };
}

export interface LearningCard {
  id: string;
  title: string;
  explanation: string;
  example?: string;
  icon: string;
  tag?: string;
  interactiveType?: 'reveal' | 'choice' | 'tip';
  interactiveData?: {
    revealText?: string;
    revealButtonText?: string;
    choiceQuestion?: string;
    choiceOptions?: { text: string; isCorrect: boolean; feedback: string }[];
  };
}

export interface LevelLearningData {
  levelId: number;
  clasitoIntro: {
    mood: ClasitoMood;
    text: string;
  };
  cardsByGrade: Record<Grade, LearningCard[]>;
  miniCheckByGrade?: Record<Grade, {
    question: string;
    options: { text: string; isCorrect: boolean; explanation: string }[];
  }>;
}

