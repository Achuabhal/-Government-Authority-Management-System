import React, { createContext, useContext, useEffect } from 'react';
import { useDataStore } from '../store/store';

type Theme = 'normal' | 'independence-day';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Subscribe to theme in Zustand store (reactive)
  const theme = useDataStore((state) => state.theme);

  // Functions to update Zustand store directly
  const setTheme = (newTheme: Theme) => {
    useDataStore.setState({ theme: newTheme });
  };

  const toggleTheme = () => {
    setTheme(theme === 'normal' ? 'independence-day' : 'normal');
  };

  // Keep <html> attribute in sync with theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
