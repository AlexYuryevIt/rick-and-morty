import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import { HeaderLogo, Moon, Sun } from '@assets';
import { ColorScheme, ThemeLanguage } from '@constants';
import { useTheme } from '@hooks';

import { IconButton } from '../IconButton/IconButton';

import styles from './Header.module.scss';

export const AppHeader = () => {
  const { t, i18n } = useTranslation(['common']);
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = () => {
    i18next.changeLanguage(
      i18n.language === ThemeLanguage.Ru ? ThemeLanguage.En : ThemeLanguage.Ru
    );
  };

  const logoColor =
    theme === ColorScheme.Light
      ? 'var(--color-primary)'
      : 'var(--color-secondary)';

  const currentLanguage =
    i18n.language === ThemeLanguage.Ru ? t('ruLang') : t('enLang');
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
            onClick={changeLanguage}
            size='big'
          >
            <p className={styles.header__language_btn}>{currentLanguage}</p>
          </IconButton>
        </div>
      </div>
    </header>
  );
};
