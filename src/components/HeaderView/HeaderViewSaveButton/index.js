import React from 'react';

import { Button, Icon } from './styles';

export default function SaveButton({ ...rest }) {
  return (
    <Button type="button" {...rest}>
      <Icon /> Salvar
    </Button>
  );
}
