import React from 'react';

import { Switch, Route, useRouteMatch } from 'react-router-dom';

import List from '~/pages/Problems';

export default function Routes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact component={List} />
      <Route path={`${path}/:id`} component={List} />
    </Switch>
  );
}
