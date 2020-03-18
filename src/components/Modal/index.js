import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Modal({ children, onClose }) {
  const onModalClose = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <S.Container onClick={onModalClose}>
      <S.Wrapper>{children}</S.Wrapper>
    </S.Container>
  );
}

Modal.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  onClose: PropTypes.func.isRequired,
};
