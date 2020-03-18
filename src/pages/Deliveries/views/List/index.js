import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import Pagination from '~/components/Pagination';
import NoResult from '~/components/NoResult';
import HeaderView from '~/components/HeaderView';
import HeaderViewForm from '~/components/HeaderView/HeaderViewForm';
import HeaderViewRegisterButton from '~/components/HeaderView/HeaderViewRegisterButton';

import Modal from './modalContent';
import TableList from './tableListContent';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function List({ match }) {
  const [deliveries, setDeliveries] = useState([]);
  const [modalDelivery, setModalDelivery] = useState(null);

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

    const pageTotal = Math.ceil(response.headers['x-total-count'] / 10);

    setDeliveries(data);
    setTotalPages(pageTotal);
  }, [page, q, state]);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  useEffect(() => {
    const { url, params, path } = match;

    if (path === '/deliveries') return;

    const loadDelivery = async () => {
      try {
        const { data } = await api.get(url);

        setModalDelivery(data);
      } catch (err) {
        const { error } = err.response.data;

        history.push('/deliveries');
        toast.error(error);
      }
    };

    if (Number.isInteger(Number(params.id))) {
      loadDelivery();
      return;
    }

    history.push('/deliveries');
    toast.error('Passe um ID valido para visualizar a encomenda !', {
      autoClose: 3500,
    });
  }, [match]);

  return (
    <Container teste={deliveries}>
      <HeaderView title="Gerenciando encomendas">
        <HeaderViewForm
          placeholder="Buscar por encomendas"
          onSearch={onSearch}
        />
        <HeaderViewRegisterButton path={match.path} />
      </HeaderView>

      {(deliveries.length && (
        <>
          {' '}
          <TableList
            path={match.path}
            load={loadDeliveries}
            deliveries={deliveries}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            backPage={backPage}
            nextPage={nextPage}
          />{' '}
        </>
      )) || <NoResult />}

      {modalDelivery && (
        <Modal
          onClose={() => [history.push('/deliveries'), setModalDelivery(null)]}
          delivery={modalDelivery}
        />
      )}
    </Container>
  );
}

List.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
