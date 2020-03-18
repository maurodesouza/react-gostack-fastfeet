import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@unform/web';

import { Input } from '~/components/Form/Inputs';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/images/logo.svg';

import * as S from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const loading = useSelector(({ auth }) => auth.loading);

  const onSubmit = ({ email, password }) => {
    dispatch(signInRequest(email, password));
  };

  return (
    <S.Container>
      <Form onSubmit={onSubmit}>
        <img src={logo} alt="Fastfeet logo" />
        <Input
          name="email"
          placeholder="exemplo@email.com"
          label="Seu e-mail"
        />
        <Input
          name="password"
          type="password"
          placeholder="*************"
          label="Sua senha"
        />
        <button type="submit">
          {loading ? 'Caregando ...' : 'Entrar no sistema'}
        </button>
      </Form>
    </S.Container>
  );
}
