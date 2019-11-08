export const CHANGE_LOCALE = 'app/LanguageToggle/CHANGE_LOCALE';

export function changeLocale(languageLocale) {
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
