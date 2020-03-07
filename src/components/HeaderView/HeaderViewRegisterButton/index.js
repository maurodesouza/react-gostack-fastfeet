import React from 'react';
import { MdAdd } from 'react-icons/md';

import { Button } from './styles';

export default function RegisterButton() {
  return (
    <Button type="button">
      <MdAdd size={20} color="#ffffff" /> Cadastrar
    </Button>
  );
}
