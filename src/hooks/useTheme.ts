import { useEffect, useState } from 'react';

import { ColorScheme } from '@constants';

const localStorageKey = 'theme';
const localStorageTheme = localStorage.getItem(localStorageKey);
const currentTheme = localStorageTheme || ColorScheme.Light;

export const useTheme = () => {
  const [theme, setTheme] = useState(currentTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === ColorScheme.Light ? ColorScheme.Dark : ColorScheme.Light
    );
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, theme);

    document.documentElement.classList.toggle(ColorScheme.Dark, theme === ColorScheme.Dark);

    return () => {
      document.documentElement.classList.remove(ColorScheme.Dark);
    };
  }, [theme]);

  return { theme, toggleTheme };
};
