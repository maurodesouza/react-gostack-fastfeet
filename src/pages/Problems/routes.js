import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router-dom';

import List from './views/List';

export default function Routes({ path }) {
  return (
    <Switch>
      <Route path={path} exact component={List} />
      <Route path={`${path}/:id`} component={List} />
    </Switch>
  );
}

Routes.propTypes = {
  path: PropTypes.string.isRequired,
};
