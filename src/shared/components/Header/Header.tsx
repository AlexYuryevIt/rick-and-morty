import i18next from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { HeaderLogo, Moon, Star, Sun } from '@assets';
import { ColorScheme, ROUTES, ThemeLanguage } from '@constants';
import { useTheme } from '@hooks';
import { useCharactersStore } from '@stores';

import { Badge } from '../Badge/Badge';
import { IconButton } from '../IconButton/IconButton';

import styles from './Header.module.scss';
import { FavouritesList } from './ui/FavouritesList/FavouritesList';

export const AppHeader = () => {
  const { t, i18n } = useTranslation(['common']);
  const { theme, toggleTheme } = useTheme();
  const { favourites, setFavourites } = useCharactersStore();
  const [showFavourites, setShowFavourites] = useState(false);
  const location = useLocation();

  const isHomePath = location.pathname === ROUTES.MAIN;

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

  const handleShowFavourites = () => {
    setShowFavourites((prev) => !prev);
  };

  const handleRemoveFavourite = (id: string | number) => {
    setFavourites(favourites.filter((item) => item.id !== id));
  };

  return (
    <header className={styles.header__wrapper}>
      <div className={styles.header__inner}>
        <HeaderLogo color={logoColor} />
        <div className={styles.header__btns}>
          {isHomePath && (
            <div className={styles.favourites}>
              <div className={styles.favoutires__btn}>
                <IconButton
                  onClick={handleShowFavourites}
                  size='big'
                >
                  <span className={styles.favourites__button}>
                    <Star color={'var(--color-accent)'} />
                    {favourites.length > 0 && (
                      <Badge count={favourites.length} />
                    )}
                  </span>
                </IconButton>
              </div>
              {showFavourites && (
                <FavouritesList
                  favourites={favourites}
                  onDelete={handleRemoveFavourite}
                />
              )}
            </div>
          )}

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
