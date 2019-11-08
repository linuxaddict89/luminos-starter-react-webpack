import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/Home/Loadable';
import FeaturePage from '../pages/Feature/Loadable';
import NotFoundPage from '../pages/NotFound/Loadable';
import Header from '../components/Header';
import Footer from '../components/Footer';

import GlobalStyle from '../global-styles';

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  background: var(--app-background);
`;
const MainContent = styled.div`
  position: relative;
  min-height: 100%;
  max-width: calc(768px + 16px * 2);
  width: 100%;
  padding: 0 16px;
  flex-flow: column;
`;

function App(props) {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Luminos React Starter"
        defaultTitle="Luminos React Starter">
        <meta name="description" content="Luminos React application" />
      </Helmet>
      <MainContent>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/features" component={FeaturePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <Footer />
      </MainContent>
      <GlobalStyle />
    </AppWrapper>
  );
}

export default App;
