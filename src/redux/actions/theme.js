export const CHANGE_THEME = 'app/ThemeToggle/CHANGE_LOCALE';

export function changeTheme(themeName) {
  return {
    type: CHANGE_THEME,
    name: themeName,
  };
}
