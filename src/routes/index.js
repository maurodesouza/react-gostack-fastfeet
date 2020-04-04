import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import Deliveries from './Deliveries';
import Deliverymans from './Deliverymans';
import Recipients from './Recipients';
import Problems from './Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/deliverymans" component={Deliverymans} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
