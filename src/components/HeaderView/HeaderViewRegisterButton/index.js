import React from 'react';
import PropTypes from 'prop-types';
import { MdAdd } from 'react-icons/md';

import history from '~/services/history';
import { Button } from './styles';

export default function RegisterButton({ path }) {
  return (
    <Button onClick={() => history.push(`${path}/add`)} type="button">
      <MdAdd size={20} color="#ffffff" /> Cadastrar
    </Button>
  );
}

RegisterButton.propTypes = {
  path: PropTypes.string.isRequired,
};
