import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function Animation({ children }) {
  return <S.FadeIn>{children}</S.FadeIn>;
}

Animation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.element,
  ]).isRequired,
};
