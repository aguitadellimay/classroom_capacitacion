import confetti from 'canvas-confetti';
import { soundManager } from './sound';

/**
 * Triggers an immediate, vibrant star burst reward on each correct answer.
 * Includes pleasant melodic sparkle audio and jumping golden stars.
 * The animation only lasts a moment and automatically disappears.
 */
export function triggerCorrectAnswerReward(originY: number = 0.65) {
  // 1. Play pleasant melodic star sparkle audio
  soundManager.playStarSparkle();

  // 2. Burst jumping stars into the screen with canvas-confetti
  try {
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x: 0.5, y: originY },
      shapes: ['star'],
      colors: ['#FBBF24', '#F59E0B', '#34D399', '#38BDF8', '#EC4899', '#FFFFFF'],
      scalar: 1.4,
      ticks: 80,
      gravity: 1.15,
      zIndex: 99999,
    });
  } catch {
    // Ignore if canvas is unavailable
  }
}
