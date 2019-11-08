import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '@formatjs/intl-relativetimeformat/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import reduxStore from './redux/store';
import { translationMessages } from './i18n';

const initialState = {};
const rootEl = document.querySelector('#app');
const store = reduxStore.configureStore(initialState);
const history = reduxStore.history;

const render = messages => {
  ReactDOM.render(<Root store={store} history={history} messages={messages} />, rootEl);
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', './containers/Root'], () => {
    ReactDOM.unmountComponentAtNode(rootEl);
    render(translationMessages);
  });
}

if (process.env.NODE_ENV !== 'development' && navigator.serviceWorker) {
  navigator.serviceWorker.register('sw.js');
}

render(translationMessages);
