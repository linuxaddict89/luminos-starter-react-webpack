import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import languageReducer from './language';
import themeReducer from './theme';

const rootReducer = (history, injectedReducers) =>
  combineReducers({
    router: connectRouter(history),
    language: languageReducer,
    theme: themeReducer,
    ...injectedReducers,
  });

export default rootReducer;
