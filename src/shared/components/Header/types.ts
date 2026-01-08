import type { ColorScheme, ThemeLanguage } from '@constants';

export type TLang = (typeof ThemeLanguage)[keyof typeof ThemeLanguage];
export type TTheme = (typeof ColorScheme)[keyof typeof ColorScheme];
