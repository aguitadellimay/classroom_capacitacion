import React, { useState, useEffect } from 'react';
import type { UserProgress, Grade } from './types';
import type { LabProgress } from './types/lab';
import { BADGES } from './data/badges';
import { LAB_WORLDS_CONFIG } from './data/labData';
import { AdventureHub } from './components/AdventureHub';
import { AdventureMap } from './components/AdventureMap';
import { LevelModal } from './components/LevelModal';
import { ProfileModal } from './components/ProfileModal';
import { CertificateModal } from './components/CertificateModal';
import { PrintableDiploma } from './components/PrintableDiploma';
import { LabAdventureMap } from './components/lab/LabAdventureMap';
import { LabWorldModal } from './components/lab/LabWorldModal';
import { LabFinalExamModal } from './components/lab/LabFinalExamModal';
import { LabCertificateModal } from './components/lab/LabCertificateModal';
import { PrintableLabDiploma } from './components/lab/PrintableLabDiploma';
import { LabIntroModal } from './components/lab/LabIntroModal';
import { LabGuardianCardModal } from './components/lab/LabGuardianCardModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { soundManager } from './utils/sound';
import { getInitialTheme, saveTheme, applyTheme, type Theme } from './utils/theme';

const STORAGE_KEY = 'classroom_adventure_user_progress_v1';
const LAB_STORAGE_KEY = 'lab_adventure_user_progress_v1';
const ACTIVE_ADVENTURE_KEY = 'active_adventure_v1';

export const App: React.FC = () => {
  // Shared user progress (Classroom adventure + user profile info)
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

  // Independent Lab adventure progress
  const [labProgress, setLabProgress] = useState<LabProgress>(() => {
    try {
      const saved = localStorage.getItem(LAB_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return {
      completedWorlds: [],
      currentWorld: 1,
      stars: 0,
      unlockedBadges: [],
    };
  });

  // Active adventure selector: 'classroom' | 'lab'
  const [activeAdventure, setActiveAdventure] = useState<'classroom' | 'lab'>(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_ADVENTURE_KEY);
      if (saved === 'classroom' || saved === 'lab') {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'classroom';
  });

  // Screen controller: 'hub' | 'map'
  const [currentScreen, setCurrentScreen] = useState<'hub' | 'map'>('hub');

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Classroom Modals
  const [activeLevelId, setActiveLevelId] = useState<number | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Lab Modals
  const [activeLabWorldId, setActiveLabWorldId] = useState<number | null>(null);
  const [isLabFinalExamOpen, setIsLabFinalExamOpen] = useState(false);
  const [isLabCertificateOpen, setIsLabCertificateOpen] = useState(false);
  const [isLabIntroOpen, setIsLabIntroOpen] = useState(false);
  const [isLabGuardianCardOpen, setIsLabGuardianCardOpen] = useState(false);

  // Shared Modals
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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

  // Save Classroom progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch {
      // Ignore
    }
  };

  // Save Lab progress to localStorage
  const saveLabProgress = (newLabProgress: LabProgress) => {
    setLabProgress(newLabProgress);
    try {
      localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(newLabProgress));
    } catch {
      // Ignore
    }
  };

  // Switch between 'classroom' and 'lab' adventures
  const handleSwitchAdventure = (adventure: 'classroom' | 'lab') => {
    if (adventure === 'lab') {
      // If student hasn't conquered any lab worlds, show the intro mission screen!
      if (labProgress.completedWorlds.length === 0) {
        setIsLabIntroOpen(true);
      }
    } else {
      soundManager.stopLabAmbient();
    }

    if (adventure !== activeAdventure) {
      setActiveAdventure(adventure);
      try {
        localStorage.setItem(ACTIVE_ADVENTURE_KEY, adventure);
      } catch {
        // Ignore
      }
    }
  };

  // Reset adventure
  const handleResetAdventure = () => {
    const emptyProgress: UserProgress = {
      name: '',
      grade: 1,
      completedLevels: [],
      currentLevel: 1,
      stars: 0,
      unlockedBadges: [],
      soundEnabled: true,
    };
    const emptyLab: LabProgress = {
      completedWorlds: [],
      currentWorld: 1,
      stars: 0,
      unlockedBadges: [],
    };
    saveProgress(emptyProgress);
    saveLabProgress(emptyLab);
    soundManager.stopLabAmbient();
    setCurrentScreen('hub');
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

  // Classroom Level completed handler
  const handleLevelComplete = (levelId: number, _score: number) => {
    const isNewCompletion = !progress.completedLevels.includes(levelId);
    const nextCompleted = isNewCompletion
      ? [...progress.completedLevels, levelId]
      : progress.completedLevels;

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

    // If level 10 was completed, open certificate automatically after 600ms
    if (levelId === 10) {
      setTimeout(() => {
        setIsCertificateOpen(true);
      }, 600);
    }
  };

  // Lab World select handler
  const handleSelectLabWorld = (worldId: number) => {
    if (worldId === 7) {
      setIsLabFinalExamOpen(true);
    } else {
      setActiveLabWorldId(worldId);
    }
  };

  // Lab World completed handler (Worlds 1 to 6)
  const handleLabWorldComplete = (worldId: number) => {
    const isNew = !labProgress.completedWorlds.includes(worldId);
    const nextCompleted = isNew
      ? [...labProgress.completedWorlds, worldId]
      : labProgress.completedWorlds;

    const badgeId = `lab_badge_${worldId}`;
    let nextBadges = [...labProgress.unlockedBadges];
    if (!nextBadges.includes(badgeId)) {
      nextBadges.push(badgeId);
    }

    const nextStars = isNew ? labProgress.stars + 1 : labProgress.stars;
    const nextWorld = Math.min(7, Math.max(labProgress.currentWorld, worldId + 1));

    const updated: LabProgress = {
      ...labProgress,
      completedWorlds: nextCompleted,
      unlockedBadges: nextBadges,
      stars: nextStars,
      currentWorld: nextWorld,
    };

    saveLabProgress(updated);
  };

  // Lab Grand Final Exam success handler (World 7)
  const handleLabFinalExamSuccess = (score: number) => {
    const nextCompleted = labProgress.completedWorlds.includes(7)
      ? labProgress.completedWorlds
      : [...labProgress.completedWorlds, 7];

    let nextBadges = [...labProgress.unlockedBadges];
    if (!nextBadges.includes('lab_badge_7')) {
      nextBadges.push('lab_badge_7');
    }

    const updated: LabProgress = {
      ...labProgress,
      completedWorlds: nextCompleted,
      unlockedBadges: nextBadges,
      stars: labProgress.stars + 1,
      finalExamScore: score,
    };

    saveLabProgress(updated);
  };

  // Lab Chest open handler
  const handleOpenChest = (chestId: string, bonusStars: number) => {
    const currentChests = labProgress.openedChests || [];
    if (currentChests.includes(chestId)) return;

    const updated: LabProgress = {
      ...labProgress,
      openedChests: [...currentChests, chestId],
      stars: labProgress.stars + bonusStars,
      chestStars: (labProgress.chestStars || 0) + bonusStars,
    };
    saveLabProgress(updated);
  };

  // Lab Secret discovery handler
  const handleDiscoverSecret = (secretId: string, bonusStars: number) => {
    const currentSecrets = labProgress.foundSecrets || [];
    if (currentSecrets.includes(secretId)) return;

    const updated: LabProgress = {
      ...labProgress,
      foundSecrets: [...currentSecrets, secretId],
      stars: labProgress.stars + bonusStars,
    };
    saveLabProgress(updated);
  };

  // Classroom Campus Secret discovery handler
  const handleDiscoverCampusSecret = (secretId: string, bonusStars: number) => {
    const currentSecrets = progress.foundCampusSecrets || [];
    if (currentSecrets.includes(secretId)) return;

    const updated: UserProgress = {
      ...progress,
      foundCampusSecrets: [...currentSecrets, secretId],
      stars: progress.stars + bonusStars,
      campusBonusStars: (progress.campusBonusStars || 0) + bonusStars,
    };
    saveProgress(updated);
  };

  const activeLabWorldConfig = activeLabWorldId
    ? LAB_WORLDS_CONFIG.find((w) => w.id === activeLabWorldId)
    : null;

  return (
    <ErrorBoundary fallbackMessage="Ocurrió un error inesperado. Podés recargar la aplicación para continuar tu aventura.">
      {/* 1. INTERACTIVE SCREEN APP (Hidden completely with display:none in @media print) */}
      <div
        id="app-screen-content"
        className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200"
      >
        {currentScreen === 'hub' ? (
          <AdventureHub
            progress={progress}
            labProgress={labProgress}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onSelectAdventure={(chosen) => {
              handleSwitchAdventure(chosen);
              setCurrentScreen('map');
            }}
            onUpdateProfile={(name, grade) => {
              const updated: UserProgress = {
                ...progress,
                name,
                grade,
              };
              saveProgress(updated);
            }}
            onReset={handleResetAdventure}
          />
        ) : activeAdventure === 'lab' ? (
          <LabAdventureMap
            progress={progress}
            labProgress={labProgress}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onSwitchAdventure={handleSwitchAdventure}
            onGoToHub={() => setCurrentScreen('hub')}
            onSelectWorld={handleSelectLabWorld}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenCertificate={() => setIsLabCertificateOpen(true)}
            onOpenGuardianCard={() => setIsLabGuardianCardOpen(true)}
            onToggleSound={handleToggleSound}
            onOpenChest={handleOpenChest}
            onDiscoverSecret={handleDiscoverSecret}
          />
        ) : (
          <AdventureMap
            progress={progress}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onSwitchAdventure={handleSwitchAdventure}
            onGoToHub={() => setCurrentScreen('hub')}
            onSelectLevel={(lvlId) => setActiveLevelId(lvlId)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onToggleSound={handleToggleSound}
            onDiscoverSecret={handleDiscoverCampusSecret}
          />
        )}

        {/* --------------------------------------------------------- */}
        {/* CLASSROOM ADVENTURE MODALS                                */}
        {/* --------------------------------------------------------- */}
        {activeLevelId !== null && (
          <LevelModal
            levelId={activeLevelId}
            grade={progress.grade}
            progress={progress}
            onClose={() => setActiveLevelId(null)}
            onLevelComplete={handleLevelComplete}
          />
        )}

        {isCertificateOpen && (
          <CertificateModal
            progress={progress}
            onClose={() => setIsCertificateOpen(false)}
          />
        )}

        {/* --------------------------------------------------------- */}
        {/* LAB ADVENTURE MODALS                                      */}
        {/* --------------------------------------------------------- */}
        {activeLabWorldConfig && (
          <LabWorldModal
            world={activeLabWorldConfig}
            studentName={progress.name}
            onClose={() => setActiveLabWorldId(null)}
            onCompleteWorld={handleLabWorldComplete}
          />
        )}

        {isLabFinalExamOpen && (
          <LabFinalExamModal
            studentName={progress.name}
            onClose={() => setIsLabFinalExamOpen(false)}
            onSuccess={handleLabFinalExamSuccess}
            onOpenCertificate={() => {
              setIsLabFinalExamOpen(false);
              setIsLabCertificateOpen(true);
            }}
            onOpenGuardianCard={() => {
              setIsLabFinalExamOpen(false);
              setIsLabGuardianCardOpen(true);
            }}
          />
        )}

        {isLabCertificateOpen && (
          <LabCertificateModal
            studentName={progress.name}
            grade={progress.grade}
            onClose={() => setIsLabCertificateOpen(false)}
          />
        )}

        {isLabGuardianCardOpen && (
          <LabGuardianCardModal
            studentName={progress.name}
            grade={progress.grade}
            labProgress={labProgress}
            onClose={() => setIsLabGuardianCardOpen(false)}
          />
        )}

        {isLabIntroOpen && (
          <LabIntroModal
            studentName={progress.name}
            onStart={() => setIsLabIntroOpen(false)}
            onClose={() => setIsLabIntroOpen(false)}
          />
        )}

        {/* --------------------------------------------------------- */}
        {/* SHARED PROFILE MODAL                                      */}
        {/* --------------------------------------------------------- */}
        {isProfileOpen && (
          <ProfileModal
            progress={progress}
            onClose={() => setIsProfileOpen(false)}
            onUpdateGrade={handleUpdateGrade}
            onResetProgress={handleResetAdventure}
          />
        )}
      </div>

      {/* 2. DEDICATED OFFICIAL SINGLE-PAGE A4 DIPLOMA (Print only) */}
      {(isCertificateOpen || isLabCertificateOpen || progress.completedLevels.length >= 10 || labProgress.completedWorlds.includes(7)) && (
        <div id="certificate-print-portal" aria-hidden="true">
          {isLabCertificateOpen || (activeAdventure === 'lab' && !isCertificateOpen) ? (
            <PrintableLabDiploma
              studentName={progress.name}
              grade={progress.grade}
            />
          ) : (
            <PrintableDiploma progress={progress} />
          )}
        </div>
      )}
    </ErrorBoundary>
  );
};

export default App;
