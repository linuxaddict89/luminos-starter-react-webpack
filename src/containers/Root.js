import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';
import LanguageProvider from './LanguageProvider';
import ThemeProvider from './ThemeProvider';
import { translationMessages } from '../i18n';

class Root extends Component {
  static get propTypes() {
    return {
      store: PropTypes.any,
      history: PropTypes.any,
    };
  }

  state = {
    locale: 'en',
    messages: translationMessages,
  };

  render() {
    const { history, store } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider theme="default">
          <LanguageProvider
            locale={this.state.locale}
            messages={this.state.messages}>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </LanguageProvider>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default hot(Root);
