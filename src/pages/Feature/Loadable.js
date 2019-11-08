import React from 'react';
import loadable from '../../utils/loadable';
import LoadingIndicator from '../../components/Preloader';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
