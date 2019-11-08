import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const ToggleOption = ({ value, message, intl }) => (
  <option value={value}>{message ? intl.formatMessage(message) : value}</option>
);

ToggleOption.propTypes = {
  value: PropTypes.string,
  message: PropTypes.object,
  intl: PropTypes.any,
};

export default injectIntl(ToggleOption);
