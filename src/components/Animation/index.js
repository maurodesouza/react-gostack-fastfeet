import React from 'react';
import PropTypes from 'prop-types';

import { FadeIn } from './styles';

export default function Animation({ children }) {
  return <FadeIn>{children}</FadeIn>;
}

Animation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(Array),
    PropTypes.element,
  ]).isRequired,
};
