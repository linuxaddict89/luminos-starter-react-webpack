import { createSelector } from 'reselect';
import { initialState } from '../reducers/language';

/**
 * Direct selector to the theme domain
 */

const selectTheme = state => state.theme || initialState;

/**
 * Select the theme name
 */

const makeSelectTheme = () =>
  createSelector(
    selectTheme,
    themeState => themeState.name,
  );

export { selectTheme, makeSelectTheme };
