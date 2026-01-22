import { useState } from 'react';

import { HeaderLogo, Moon, Sun } from '@assets';
import { ColorScheme, LABELS, ThemeLanguage } from '@constants';
import { useTheme } from '@hooks';

import { IconButton } from '../IconButton/IconButton';

import styles from './Header.module.scss';

import type { TLang } from './types';

export const AppHeader = () => {
  const [lang, setLang] = useState<TLang>(ThemeLanguage.Ru);

  const { theme, toggleTheme } = useTheme();

  const logoColor =
    theme === ColorScheme.Light
      ? 'var(--color-primary)'
      : 'var(--color-secondary)';

  const handleChangeLanguage = () => {
    setLang((prev) =>
      prev === ThemeLanguage.Ru ? ThemeLanguage.En : ThemeLanguage.Ru
    );
  };

  const currentLanguage =
    lang === ThemeLanguage.Ru ? LABELS.RU_LANG : LABELS.EN_LANG;
  const currentTheme =
    theme === ColorScheme.Light ? (
      <Sun color={logoColor} />
    ) : (
      <Moon color={logoColor} />
    );

  return (
    <header className={styles.header__wrapper}>
      <div className={styles.header__inner}>
        <HeaderLogo color={logoColor} />
        <div className={styles.header__btns}>
          <IconButton
            onClick={toggleTheme}
            size='big'
          >
            {currentTheme}
          </IconButton>
          <IconButton
            onClick={handleChangeLanguage}
            size='big'
          >
            <p className={styles.header__language_btn}>{currentLanguage}</p>
          </IconButton>
        </div>
      </div>
    </header>
  );
};
