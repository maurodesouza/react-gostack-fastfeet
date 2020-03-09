import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import MenuActions from '~/components/MenuActions';
import HeaderView from '~/components/HeaderView';
import HeaderViewInput from '~/components/HeaderView/HeaderViewInput';
import HeaderViewRegisterButton from '~/components/HeaderView/HeaderViewRegisterButton';
import TableList from '~/components/TableList';

import api from '~/services/api';
import { Container, Status } from './styles';

export default function List({ match }) {
  const [deliveries, setDeliveries] = useState([]);

  const loadDeliveries = async () => {
    const response = await api.get('/deliveries', {
      params: {
        q: '',
      },
    });
    const data = response.data.map(delivery => ({
      ...delivery,
      idFormatted: `#${`00${delivery.id}`.slice(-2)}`,
    }));

    setDeliveries(data);
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  return (
    <Container teste={deliveries}>
      <HeaderView title="Gerenciando encomendas">
        <HeaderViewInput placeholder="Buscar por encomendas" />
        <HeaderViewRegisterButton />
      </HeaderView>

      <TableList
        thead={[
          'ID',
          'Destinatário',
          'Entregador',
          'Cidade',
          'Estado',
          'Status',
          'Ações',
        ]}
      >
        {deliveries.map(delivery => (
          <tr key={delivery.id}>
            <td>{delivery.idFormatted}</td>
            <td>{delivery.recipient.name}</td>
            <td>{delivery.deliveryman.name}</td>
            <td>{delivery.recipient.city}</td>
            <td>{delivery.recipient.state}</td>
            <td>
              <Status status={delivery.status}>
                <span />
                {delivery.status}
              </Status>
            </td>
            <td>
              <MenuActions
                path={match.path}
                id={delivery.id}
                load={loadDeliveries}
              />
            </td>
          </tr>
        ))}
      </TableList>
    </Container>
  );
}

List.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
