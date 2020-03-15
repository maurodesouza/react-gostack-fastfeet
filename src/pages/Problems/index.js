import React from 'react';
import PropTypes from 'prop-types';

import Routes from './routes';

export default function Problems({ match }) {
  return <Routes path={match.path} />;
}

Problems.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
