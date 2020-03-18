import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';

import * as S from './styles';

export default function Default({ children }) {
  return (
    <S.Container>
      <Header />
      {children}
    </S.Container>
  );
}

Default.propTypes = {
  children: PropTypes.element.isRequired,
};
