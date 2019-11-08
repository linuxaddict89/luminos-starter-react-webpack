import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { defaultTranslationMessages as messages } from '../../i18n';
import NormalImg from '../Img';

const NavBar = styled.div`
  text-align: center;
  height: var(--navbar-height);
`;

const A = styled.a`
  color: var(--primary-color);
  &:hover {
    color: #6cc0e5;
  }
`;


const HeaderLink = styled(Link)`
  display: inline-flex;
  padding: 0.25em 2em;
  margin: 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid var(--primary-color);
  color: #41addd;
  &:active {
    background: var(--primary-color);
    color: #fff;
  }
`;

function Header() {
  return (
    <div>
      <NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/features">
          <FormattedMessage {...messages.features} />
        </HeaderLink>
      </NavBar>
    </div>
  );
}

export default Header;
