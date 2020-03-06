import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import { Container } from './styles';

export default function Default({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

Default.propTypes = {
  children: PropTypes.element.isRequired,
};
