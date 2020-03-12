import React from 'react';
import PropTypes from 'prop-types';

import { Container, Wrapper } from './styles';

export default function Modal({ children, onClose }) {
  const onModalClose = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Container onClick={onModalClose}>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

Modal.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  onClose: PropTypes.func.isRequired,
};
