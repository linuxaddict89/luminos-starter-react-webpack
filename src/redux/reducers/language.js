import produce from 'immer';
import { CHANGE_LOCALE } from '../actions/language';

export const initialState = {
  locale: localStorage.getItem('language') || 'en',
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;
