import React from 'react';
import PropTypes from 'prop-types';

import Routes from './routes';

export default function Recipients({ match }) {
  return <Routes path={match.path} />;
}

Recipients.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
