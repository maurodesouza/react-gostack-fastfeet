import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import '~/config/reactotronConfig';

import Routes from '~/routes';
import history from '~/services/history';
import GlobalStyles from '~/styles/global';

import store from '~/store';

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <GlobalStyles />
      </Router>
    </Provider>
  );
}
