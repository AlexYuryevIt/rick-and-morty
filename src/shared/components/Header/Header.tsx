import { HeaderLogo, Moon, Sun } from '@assets';
import { ColorScheme, LABELS, ThemeLanguage } from '@constants';
import { useState } from 'react';
import { IconButton } from '../IconButton/IconButton';

type TLang = (typeof ThemeLanguage)[keyof typeof ThemeLanguage];
type TTheme = (typeof ColorScheme)[keyof typeof ColorScheme];

export const AppHeader = () => {
  const [lang, setLang] = useState<TLang>(ThemeLanguage.Ru);
  const [theme, setTheme] = useState<TTheme>(ColorScheme.Light);

  const handleChangeLanguage = () => {
    setLang((prev) =>
      prev === ThemeLanguage.Ru ? ThemeLanguage.En : ThemeLanguage.Ru
    );
  };

  const handleChangeTheme = () => {
    setTheme((prev) =>
      prev === ColorScheme.Light ? ColorScheme.Dark : ColorScheme.Light
    );
  };

  const currentLanguage = lang === 'ru' ? LABELS.ruLang : LABELS.enLang;
  const currentTheme = theme === ColorScheme.Light ? <Sun /> : <Moon />;

  return (
    <header className='w-full h-15 bg-white shadow'>
      <div className='max-w-7xl mx-auto px-4 flex items-center justify-between h-full'>
        <HeaderLogo />
        <div className='flex gap-4'>
          <IconButton onClick={handleChangeTheme}>{currentTheme}</IconButton>
          <IconButton onClick={handleChangeLanguage}>
            <p className='text-2xl text-gray-500'>{currentLanguage}</p>
          </IconButton>
        </div>
      </div>
    </header>
  );
};
