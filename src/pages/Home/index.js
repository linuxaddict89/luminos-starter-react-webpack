import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import { defaultTranslationMessages as messages } from '../../i18n';

const HomeContainer = styled.div`
  text-align: center;
  min-height: var(--content-height);
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: #000;
  color: var(--accent-color);
  height: var(--content-height);
  & .App-logo {
    height: calc(var(--content-height) - 213px);
    padding: 40px;
  }
  .App-link {
    color: #61dafb;
  }
`;

function Home(props) {
  const { formatMessage } = props.intl;
  return (
    <HomeContainer>
      <HomeContent>
        <img src="/assets/icons/luminos.png" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Home/index.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          {formatMessage(messages['learn-react'])}
        </a>
      </HomeContent>
    </HomeContainer>
  );
}

Home.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(Home);
