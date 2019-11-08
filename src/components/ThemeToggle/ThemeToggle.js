import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { defineMessages } from 'react-intl';

import Toggle from '../Toggle';
import { changeTheme } from '../../redux/actions/theme';
import { makeSelectTheme } from '../../redux/selectors/theme';

const messages = defineMessages({
  default: {
    id: `default`,
    defaultMessage: 'default',
  },
  dark: {
    id: `dark`,
    defaultMessage: 'dark',
  },
});

const Wrapper = styled.div`
  padding: 2px;
`;

export function ThemeToggle(props) {
  return (
    <Wrapper>
      <Toggle
        value={props.theme}
        values={['default', 'dark']}
        messages={messages}
        onToggle={props.onThemeToggle}
      />
    </Wrapper>
  );
}

ThemeToggle.propTypes = {
  onThemeToggle: PropTypes.func,
  theme: PropTypes.string,
};

const mapStateToProps = createSelector(
  makeSelectTheme(),
  name => ({
    theme: name,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    onThemeToggle: evt => dispatch(changeTheme(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemeToggle);
