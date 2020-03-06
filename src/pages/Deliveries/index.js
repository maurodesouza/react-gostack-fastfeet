import React from 'react';
import PropTypes from 'prop-types';

import Routes from './routes';

export default function Deliveries({ match }) {
  return <Routes path={match.path} />;
}

Deliveries.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
