import React from 'react';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import '~/config/reactotronConfig';

import Routes from '~/routes';
import history from '~/services/history';
import GlobalStyles from '~/styles/global';

import { store, persistor } from '~/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyles />
        </Router>
      </PersistGate>
    </Provider>
  );
}
