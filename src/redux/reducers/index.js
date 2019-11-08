import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import languageReducer from './language';

const rootReducer = (history, injectedReducers) =>
  combineReducers({
    router: connectRouter(history),
    language: languageReducer,
    ...injectedReducers,
  });

export default rootReducer;
