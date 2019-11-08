import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { defaultTranslationMessages as messages } from '../../i18n';

const H1 = styled.h1`
  font-size: 2em;
  margin-bottom: 0.25em;
`;
const List = styled.ul`
  font-family: Georgia, Times, 'Times New Roman', serif;
  padding-left: 1.75em;
`;
const ListItem = styled.li`
  margin: 1em 0;
`;
const ListItemTitle = styled.p`
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  top: 0;
  height: var(--content-height);
  color: var(--accent-color);
`;

export default function FeaturePage() {
  return (
    <Container>
      <Helmet>
        <title>Feature Page</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <H1>
        <FormattedMessage {...messages['features-header']} />
      </H1>
      <List>
        <ListItem>
          <ListItemTitle>
            <FormattedMessage {...messages.scaffoldingHeader} />
          </ListItemTitle>
          <p>
            <FormattedMessage {...messages.scaffoldingMessage} />
          </p>
        </ListItem>

        <ListItem>
          <ListItemTitle>
            <FormattedMessage {...messages.feedbackHeader} />
          </ListItemTitle>
          <p>
            <FormattedMessage {...messages.feedbackMessage} />
          </p>
        </ListItem>

        <ListItem>
          <ListItemTitle>
            <FormattedMessage {...messages.intlHeader} />
          </ListItemTitle>
          <p>
            <FormattedMessage {...messages.intlMessage} />
          </p>
        </ListItem>
      </List>
    </Container>
  );
}
