import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectTheme } from '../redux/selectors/theme';

class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.string,
    children: PropTypes.element.isRequired,
  };

  changeTheme(themeName) {
    fetch(`/themes/${themeName}.css`).then(async res => {
      const response = await res.text();

      const styles = document.head.querySelectorAll('.myapp-theme');
      styles.forEach(s => s.remove());

      const style = document.createElement('style');
      style.classList.add('myapp-theme');
      style.textContent = response;
      document.head.appendChild(style);
    });
  }

  componentWillReceiveProps(props) {
    if (props.theme) {
      this.changeTheme(props.theme);
    }
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

const mapStateToProps = createSelector(
  makeSelectTheme(),
  name => ({
    theme: name,
  }),
);

export default connect(mapStateToProps)(ThemeProvider);
