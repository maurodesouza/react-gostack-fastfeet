import React from 'react';

import * as S from './styles';

export default function SaveButton({ ...rest }) {
  return (
    <S.Button type="button" {...rest}>
      <S.Icon /> Salvar
    </S.Button>
  );
}
