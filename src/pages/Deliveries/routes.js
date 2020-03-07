import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import List from './views/List';
import Form from './views/Form';
import Modal from './views/Modal';

export default function Routes({ path }) {
  return (
    <Switch>
      <Route path={path} exact component={List} />
      <Route path={`${path}/add`} component={Form} />
      <Route path={`${path}/edit/:id`} component={Form} />
      <Route path={`${path}/:id`} component={Modal} />
    </Switch>
  );
}

Routes.propTypes = {
  path: PropTypes.string.isRequired,
};