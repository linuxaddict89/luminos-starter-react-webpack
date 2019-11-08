import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import LocaleToggle from '../LocaleToggle';
import ThemeToggle from '../ThemeToggle';
import { defaultTranslationMessages as messages } from '../../i18n';

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 3em 0;
  border-top: 1px solid #666;
  height: calc(var(--footer-height) - 6.1em);
  color: var(--accent-color);
`;

const A = styled.a`
  color: #41addd;
  &:hover {
    color: #6cc0e5;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <ThemeToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="https://twitter.com/msayuti94">M Sayuti</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
