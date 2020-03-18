import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';

import List from './views/List';
import Form from './views/Form';

export default function Routes({ path }) {
  return (
    <Switch>
      <Route path={path} exact component={List} />
      <Route path={`${path}/add`} component={Form} />
      <Route path={`${path}/edit/:id`} component={Form} />
    </Switch>
  );
}

Routes.propTypes = {
  path: PropTypes.string.isRequired,
};
