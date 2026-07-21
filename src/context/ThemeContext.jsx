import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  dark: false,
  toggle: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  /* Sync <html> data-theme + body background whenever theme changes */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    document.body.style.transition = 'background 0.5s ease';
    document.body.style.background = dark ? '#0d0d0d' : '#F4F3EF';
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
