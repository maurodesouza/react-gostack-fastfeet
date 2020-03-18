import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

export default function HeaderView({ title, isToForm, children }) {
  return (
    <S.Container isToForm={isToForm} existChildren={!!children}>
      <h1>{title}</h1>
      {children && <div>{children}</div>}
    </S.Container>
  );
}

HeaderView.propTypes = {
  title: PropTypes.string.isRequired,
  isToForm: PropTypes.bool,
  children: PropTypes.instanceOf(Array),
};

HeaderView.defaultProps = {
  isToForm: false,
  children: null,
};
