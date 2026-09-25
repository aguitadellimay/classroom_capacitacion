export type Theme = 'light' | 'dark';

export const THEME_KEY = 'classroom_adventure_theme';

/**
 * Returns the active theme, checking localStorage first (user manual choice),
 * and falling back to OS system preference (prefers-color-scheme: dark).
 */
export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
    // LocalStorage might be restricted
  }

  // Fallback to system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'light';
};

/**
 * Applies the given theme to document.documentElement (.dark class)
 */
export const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

/**
 * Persists theme in localStorage and applies it to the DOM
 */
export const saveTheme = (theme: Theme) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // LocalStorage might be restricted
    }
  }
  applyTheme(theme);
};
