import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function HeaderView({ title, isToForm, children }) {
  return (
    <Container isToForm={isToForm}>
      <h1>{title}</h1>
      <div>{children}</div>
    </Container>
  );
}

HeaderView.propTypes = {
  title: PropTypes.string.isRequired,
  isToForm: PropTypes.bool,
  children: PropTypes.instanceOf(Array).isRequired,
};

HeaderView.defaultProps = {
  isToForm: false,
};
