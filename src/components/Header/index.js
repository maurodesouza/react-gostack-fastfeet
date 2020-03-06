import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/images/logo.svg';
import { Container } from './styles';

export default function Header() {
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
        <button type="button">sair do sistema</button>
      </aside>
    </Container>
  );
}
