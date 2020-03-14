import React from 'react';

import history from '~/services/history';
import { Button, Icon } from './styles';

export default function BackButton() {
  return (
    <Button onClick={() => history.goBack()} type="button">
      <Icon /> Voltar
    </Button>
  );
}
