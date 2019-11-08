import produce from 'immer';
import { CHANGE_THEME } from '../actions/theme';

export const initialState = {
  name: localStorage.getItem('theme') || 'default',
};

/* eslint-disable default-case, no-param-reassign */
const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_THEME:
        draft.name = action.name;
        break;
    }
  });

export default languageProviderReducer;
