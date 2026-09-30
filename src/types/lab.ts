import type { ClasitoMood } from './index';

export type LabWorldId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ByteMood =
  | 'idle'
  | 'saludo'
  | 'alegria'
  | 'baile'
  | 'pensamiento'
  | 'sorpresa'
  | 'celebracion'
  | 'victoria';

export interface LabBadge {
  id: string;
  worldId: LabWorldId;
  title: string;
  description: string;
  icon: string;
}

export interface LabProgress {
  completedWorlds: number[]; // 1 to 7
  currentWorld: number; // next available world
  stars: number;
  unlockedBadges: string[];
  finalExamScore?: number;
  openedChests?: string[]; // IDs of opened optional chests
  foundSecrets?: string[]; // IDs of discovered optional secrets
  chestStars?: number;     // Extra stars gained from exploration
}

export interface LabTreasureChestConfig {
  id: string;
  worldIdRequired: number; // requires completing this world to unlock
  title: string;
  bonusStars: number;
  message: string;
  icon: string;
  pos: { x: number; y: number }; // Percentage coords on island map (0-100)
}

export interface LabMapSecretConfig {
  id: string;
  title: string;
  hint: string;
  discoveryMessage: string;
  bonusStars: number;
  icon: string;
  pos: { x: number; y: number }; // Percentage coords on island map (0-100)
}

export type MicrosceneVisualType =
  | 'drink_spill'
  | 'keyboard_slam'
  | 'screen_touch'
  | 'move_equipment'
  | 'running'
  | 'chair_swing'
  | 'messy_desk'
  | 'clean_desk'
  | 'shutdown_proper'
  | 'no_install'
  | 'private_files'
  | 'save_work'
  | 'cable_pull'
  | 'touch_socket'
  | 'report_teacher'
  | 'feet_cables'
  | 'grab_mouse'
  | 'grab_keyboard'
  | 'bother_peer'
  | 'help_not_replace'
  | 'take_turns'
  | 'unrelated_web'
  | 'inappropriate_site'
  | 'download_risk'
  | 'personal_data';

export interface MicrosceneStep {
  label: string;
  badge: string;
  badgeType: 'neutral' | 'danger' | 'warning' | 'byte' | 'success';
  narrative: string;
  characterAction: string;
  visualDetail: string;
  byteBubble?: {
    mood: ByteMood;
    speech: string;
  };
}

export interface ByteMicroscene {
  id: string;
  title: string;
  visualType: MicrosceneVisualType;
  durationSeconds?: number;
  initialQuestion?: string;
  byteExplanation: string;
  steps: MicrosceneStep[];
  goodEndingMessage?: string;
}

export interface LabRuleScene {
  formulaBefore: string;
  symbol: string;
  formulaAfter: string;
  headline: string;
}

export interface LabRuleItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  goodPractice: string;
  badPractice: string;
  scene?: LabRuleScene;
  microscene?: ByteMicroscene;
}

export interface LabQuestionOption {
  id: string;
  text: string;
  icon?: string;
  isCorrect: boolean;
  explanation: string;
}

export interface LabChallengeQuestion {
  id: string;
  question: string;
  situation?: string;
  hint?: string;
  options: LabQuestionOption[];
  microscene?: ByteMicroscene;
}

export interface LabWorldConfig {
  id: LabWorldId;
  name: string;
  shortName: string;
  subtitle: string;
  themeDescription: string;
  icon: string;
  ambientSoundTheme: 'forest' | 'care' | 'fortress' | 'cables' | 'team' | 'portal' | 'final';
  color: {
    bg: string;
    border: string;
    text: string;
    cardBg: string;
    badgeBg: string;
    gradient: string;
  };
  badge: LabBadge;
  rules: LabRuleItem[];
  challenges: LabChallengeQuestion[];
  byteIntro: {
    mood: ByteMood;
    speech: string;
    accessory: string;
  };
  clasitoIntro?: {
    mood: ClasitoMood;
    speech: string;
  };
}
