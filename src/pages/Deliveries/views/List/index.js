import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import MenuActions from '~/components/MenuActions';
import Pagination from '~/components/Pagination';
import HeaderView from '~/components/HeaderView';
import HeaderViewForm from '~/components/HeaderView/HeaderViewForm';
import HeaderViewRegisterButton from '~/components/HeaderView/HeaderViewRegisterButton';
import TableList from '~/components/TableList';

import api from '~/services/api';
import { Container, Status } from './styles';

export default function List({ match }) {
  const [deliveries, setDeliveries] = useState([]);
  const [q, setQ] = useState('');
  const [state, setState] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const onSearch = (search, status) => {
    setQ(search);
    setState(status);
    setPage(1);
  };

  const backPage = () => setPage(page - 1);

  const nextPage = () => setPage(page + 1);

  const loadDeliveries = useCallback(async () => {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });

    const response = await api.get('/deliveries', {
      params: {
        q,
        page,
        state,
      },
    });

    const data = response.data.map(delivery => ({
      ...delivery,
      idFormatted: `#${`00${delivery.id}`.slice(-2)}`,
    }));

    const pageTotal = Math.round(response.headers['x-total-count'] / 10);

    setDeliveries(data);
    setTotalPages(pageTotal);
  }, [page, q, state]);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  return (
    <Container teste={deliveries}>
      <HeaderView title="Gerenciando encomendas">
        <HeaderViewForm
          placeholder="Buscar por encomendas"
          onSearch={onSearch}
        />
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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        backPage={backPage}
        nextPage={nextPage}
      />
    </Container>
  );
}

List.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
