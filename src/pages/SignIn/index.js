import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/images/logo.svg';
import { Container } from './styles';

export default function SignIn() {
  return (
    <Container>
      <Form>
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
        <button type="submit">Entrar no sistema</button>
      </Form>
    </Container>
  );
}
