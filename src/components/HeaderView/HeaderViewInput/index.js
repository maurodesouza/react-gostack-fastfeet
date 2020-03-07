import React from 'react';
import { MdSearch } from 'react-icons/md';

import { Label } from './styles';

export default function Input(props) {
  return (
    <Label htmlFor="input">
      <MdSearch size={20} color="#999" />
      <input id="input" {...props} />
    </Label>
  );
}
