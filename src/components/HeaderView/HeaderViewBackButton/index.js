import React from 'react';

import history from '~/services/history';
import * as S from './styles';

export default function BackButton() {
  return (
    <S.Button onClick={() => history.goBack()} type="button">
      <S.Icon /> Voltar
    </S.Button>
  );
}
