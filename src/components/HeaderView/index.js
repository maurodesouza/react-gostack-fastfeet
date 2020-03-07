import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function HeaderView({ title, children }) {
  return (
    <Container>
      <h1>{title}</h1>
      <div>{children}</div>
    </Container>
  );
}

HeaderView.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
};
