import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';
import LanguageProvider from './LanguageProvider';
import { defaultTranslationMessages, translationMessages } from '../i18n';
import Preloader from '../components/Preloader';

class Root extends Component {
  static get propTypes() {
    return {
      store: PropTypes.any,
      history: PropTypes.any,
      theme: PropTypes.string,
      messages: PropTypes.object,
    };
  }

  state = {
    themeLoaded: false,
    locale: 'en',
    messages: translationMessages,
  };

  componentDidMount() {
    this.mounted = true;
    this.setupLanguage();
    const themeName = localStorage.getItem('theme') || 'default';
    this.changeTheme(themeName);
    document.addEventListener('theme-changed', this.onThemeChanged);
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('theme-changed', this.onThemeChanged);
  }

  onThemeChanged = e => {
    // TODO
    this.changeTheme(e.detail);
  };

  changeTheme(themeName) {
    fetch(`/themes/${themeName}.css`).then(async res => {
      const response = await res.text();

      const styles = document.head.querySelectorAll('.runcy-theme');
      styles.forEach(s => s.remove());

      const style = document.createElement('style');
      style.classList.add('runcy-theme');
      style.textContent = response;
      document.head.appendChild(style);
      this.setState({ themeLoaded: true });
    });
  }

  setupLanguage() {
    const { messages } = this.props;
    // Define user's language. Different browsers have the user locale defined
    const language = localStorage.getItem('language') || 'en';
    // Split locales with a region code
    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0] || 'en';

    // Try full locale, try locale without region code, fallback to 'en'
    if (messages[language]) {
      this.setState({ locale: language });
    } else if (messages[languageWithoutRegionCode]) {
      this.setState({
        locale: languageWithoutRegionCode,
      });
    } else this.setState({ locale: 'en' });
  }

  render() {
    const { history, store } = this.props;
    const { themeLoaded } = this.state;
    if (!themeLoaded) {
      return <Preloader />;
    }

    return (
      <Provider store={store}>
        <LanguageProvider locale={this.state.locale} messages={this.state.messages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>
    );
  }
}

export default hot(Root);
