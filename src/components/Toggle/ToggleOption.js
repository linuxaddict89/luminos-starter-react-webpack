import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

const Option = styled.option`
  background: transparent;
  color: #000;
`;

const ToggleOption = ({ value, message, intl }) => (
  <Option value={value}>{message ? intl.formatMessage(message) : value}</Option>
);

ToggleOption.propTypes = {
  value: PropTypes.string,
  message: PropTypes.object,
  intl: PropTypes.any,
};

export default injectIntl(ToggleOption);
