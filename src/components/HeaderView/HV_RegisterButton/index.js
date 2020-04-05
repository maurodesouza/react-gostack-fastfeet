import React from 'react';
import PropTypes from 'prop-types';

import { MdAdd } from 'react-icons/md';

import history from '~/services/history';

import * as S from './styles';

export default function RegisterButton({ path }) {
  return (
    <S.Button onClick={() => history.push(`${path}/add`)} type="button">
      <MdAdd size={20} color="#ffffff" /> Cadastrar
    </S.Button>
  );
}

RegisterButton.propTypes = {
  path: PropTypes.string.isRequired,
};
