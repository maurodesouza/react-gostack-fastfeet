import React, { useEffect, useState } from 'react';

import HeaderView from '~/components/HeaderView';
import HeaderViewInput from '~/components/HeaderView/HeaderViewInput';
import HeaderViewRegisterButton from '~/components/HeaderView/HeaderViewRegisterButton';
import TableList from '~/components/TableList';

import api from '~/services/api';
import { Container } from './styles';

export default function List() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
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
            <td>Status</td>
            <td>Ações</td>
          </tr>
        ))}
      </TableList>
    </Container>
  );
}
