import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { defineMessages } from 'react-intl';

import Toggle from '../Toggle';
import config from '../../i18n';
import { changeLocale } from '../../redux/actions/language';
import { makeSelectLocale } from '../../redux/selectors/language';

const scope = 'boilerplate.components.LocaleToggle';

const messages = defineMessages({
  en: {
    id: `${scope}.en`,
    defaultMessage: 'en',
  },
  de: {
    id: `${scope}.de`,
    defaultMessage: 'de',
  },
});

const Wrapper = styled.div`
  padding: 2px;
`;

export function LocaleToggle(props) {
  return (
    <Wrapper>
      <Toggle
        value={props.locale}
        values={config.locales}
        messages={messages}
        onToggle={props.onLocaleToggle}
      />
    </Wrapper>
  );
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(
  makeSelectLocale(),
  locale => ({
    locale,
  })
);

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocaleToggle);
