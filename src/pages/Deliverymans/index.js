import React from 'react';
import PropTypes from 'prop-types';

import Routes from './routes';

export default function Deliverymans({ match }) {
  return <Routes path={match.path} />;
}

Deliverymans.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
