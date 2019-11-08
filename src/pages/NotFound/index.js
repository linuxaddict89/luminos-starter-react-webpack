import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { defaultTranslationMessages as messages } from '../../i18n';

const H1 = styled.h1`
  font-size: 2em;
  margin-bottom: 0.25em;
`;

export default function NotFound() {
  return (
    <article>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </article>
  );
}
