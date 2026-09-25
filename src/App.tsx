import React, { useState, useEffect } from 'react';
import type { UserProgress, Grade } from './types';
import { BADGES } from './data/badges';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AdventureMap } from './components/AdventureMap';
import { LevelModal } from './components/LevelModal';
import { ProfileModal } from './components/ProfileModal';
import { CertificateModal } from './components/CertificateModal';
import { PrintableDiploma } from './components/PrintableDiploma';
import { ErrorBoundary } from './components/ErrorBoundary';
import { soundManager } from './utils/sound';
import { getInitialTheme, saveTheme, applyTheme, type Theme } from './utils/theme';

const STORAGE_KEY = 'classroom_adventure_user_progress_v1';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      name: '',
      grade: 1,
      completedLevels: [],
      currentLevel: 1,
      stars: 0,
      unlockedBadges: [],
      soundEnabled: true,
    };
  });

  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'map'>(() => {
    // If name already saved, start at map or welcome
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) return 'map';
      }
    } catch {
      // Ignore
    }
    return 'welcome';
  });

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [activeLevelId, setActiveLevelId] = useState<number | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Synchronize theme with DOM
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Synchronize sound manager on start and progress changes
  useEffect(() => {
    soundManager.setSoundEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Theme toggle handler
  const handleToggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    saveTheme(nextTheme);
  };

  // Save to localStorage whenever progress updates
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch {
      // Ignore
    }
  };

  // Start adventure from welcome screen
  const handleStartAdventure = (name: string, grade: Grade) => {
    const updated: UserProgress = {
      ...progress,
      name,
      grade,
      soundEnabled: progress.soundEnabled,
    };
    saveProgress(updated);
    setCurrentScreen('map');
  };

  // Continue with existing user
  const handleContinueAdventure = () => {
    setCurrentScreen('map');
  };

  // Reset adventure
  const handleResetAdventure = () => {
    const empty: UserProgress = {
      name: '',
      grade: 1,
      completedLevels: [],
      currentLevel: 1,
      stars: 0,
      unlockedBadges: [],
      soundEnabled: true,
    };
    saveProgress(empty);
    setCurrentScreen('welcome');
  };

  // Sound toggle
  const handleToggleSound = () => {
    const nextSound = !progress.soundEnabled;
    soundManager.setSoundEnabled(nextSound);
    if (nextSound) {
      soundManager.playClick();
    }
    saveProgress({
      ...progress,
      soundEnabled: nextSound,
    });
  };

  // Grade update from profile
  const handleUpdateGrade = (grade: Grade) => {
    saveProgress({
      ...progress,
      grade,
    });
  };

  // Level completed handler
  const handleLevelComplete = (levelId: number, _score: number) => {
    const isNewCompletion = !progress.completedLevels.includes(levelId);
    const nextCompleted = isNewCompletion
      ? [...progress.completedLevels, levelId]
      : progress.completedLevels;

    // Award badge corresponding to level
    const badgeObj = BADGES.find((b) => b.levelNumber === levelId);
    let nextBadges = [...progress.unlockedBadges];
    if (badgeObj && !nextBadges.includes(badgeObj.id)) {
      nextBadges.push(badgeObj.id);
    }

    const nextStars = isNewCompletion ? progress.stars + 1 : progress.stars;
    const nextLevel = Math.min(10, Math.max(progress.currentLevel, levelId + 1));

    const updated: UserProgress = {
      ...progress,
      completedLevels: nextCompleted,
      unlockedBadges: nextBadges,
      stars: nextStars,
      currentLevel: nextLevel,
    };

    saveProgress(updated);
    setActiveLevelId(null);

    // If level 10 was completed, open certificate automatically after 600ms!
    if (levelId === 10) {
      setTimeout(() => {
        setIsCertificateOpen(true);
      }, 600);
    }
  };

  return (
    <ErrorBoundary fallbackMessage="Ocurrió un error inesperado. Podés recargar la aplicación para continuar tu aventura.">
      {/* 1. INTERACTIVE SCREEN APP (Hidden completely with display:none in @media print) */}
      <div
        id="app-screen-content"
        className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-['Fredoka',sans-serif] transition-colors duration-200"
      >
        {currentScreen === 'welcome' ? (
          <WelcomeScreen
            initialProgress={progress.name ? progress : null}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onStart={handleStartAdventure}
            onContinue={handleContinueAdventure}
            onReset={handleResetAdventure}
          />
        ) : (
          <AdventureMap
            progress={progress}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onSelectLevel={(lvlId) => setActiveLevelId(lvlId)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onToggleSound={handleToggleSound}
          />
        )}

        {/* Active Level Modal */}
        {activeLevelId !== null && (
          <LevelModal
            levelId={activeLevelId}
            grade={progress.grade}
            progress={progress}
            onClose={() => setActiveLevelId(null)}
            onLevelComplete={handleLevelComplete}
          />
        )}

        {/* Student Profile & Progress Modal */}
        {isProfileOpen && (
          <ProfileModal
            progress={progress}
            onClose={() => setIsProfileOpen(false)}
            onUpdateGrade={handleUpdateGrade}
            onResetProgress={handleResetAdventure}
          />
        )}

        {/* Final Certificate Modal (On-screen preview and actions) */}
        {isCertificateOpen && (
          <CertificateModal
            progress={progress}
            onClose={() => setIsCertificateOpen(false)}
          />
        )}
      </div>

      {/* 2. DEDICATED OFFICIAL SINGLE-PAGE A4 DIPLOMA (Print only) */}
      {(isCertificateOpen || progress.completedLevels.length >= 10) && (
        <div id="certificate-print-portal" aria-hidden="true">
          <PrintableDiploma progress={progress} />
        </div>
      )}
    </ErrorBoundary>
  );
};

export default App;
