import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/images/logo.svg';
import { Container } from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();

  return (
    <Container>
      <div>
        <img src={logo} alt="Fastfeet logo" />
        <nav>
          <NavLink to="/deliveries">Encomendas</NavLink>
          <NavLink to="/deliverymans">Entregadores</NavLink>
          <NavLink to="/recipients">Destinatários</NavLink>
          <NavLink to="/problems">Problemas</NavLink>
        </nav>
      </div>
      <aside>
        <strong>Admin Fastfeet</strong>
        <button type="button" onClick={() => dispatch(signOut())}>
          sair do sistema
        </button>
      </aside>
    </Container>
  );
}
