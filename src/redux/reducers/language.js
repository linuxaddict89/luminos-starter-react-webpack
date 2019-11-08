import produce from 'immer';
import config from '../../i18n';

const CHANGE_LOCALE = 'app/LanguageToggle/CHANGE_LOCALE';
export const initialState = {
  locale: 'en',
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
