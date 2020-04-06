import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { toast } from 'react-toastify';

import Pagination from '~/components/Pagination';
import Animation from '~/components/Animation';
import NoResult from '~/components/NoResult';
import * as HV from '~/components/HeaderView';

import api from '~/services/api';
import history from '~/services/history';

import Modal from './modalContent';
import TableList from './tableListContent';

import * as S from './styles';

export default function List() {
  const match = useRouteMatch();

  const [loading, setLoading] = useState(true);
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
    setLoading(true);

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
    setLoading(false);
  }, [page, q, state]);

  useEffect(() => {
    loadDeliveries();
  }, [loadDeliveries]);

  useEffect(() => {
    const { url, path } = match;

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

    loadDelivery();
  }, [match]);

  return (
    <S.Container>
      <HV.Container title="Gerenciando encomendas">
        <HV.Form placeholder="Buscar por encomendas" onSearch={onSearch} />
        <HV.RegisterButton path={match.path} />
      </HV.Container>

      {!loading &&
        (deliveries.length ? (
          <Animation>
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
          </Animation>
        ) : (
          <Animation>
            <NoResult />
          </Animation>
        ))}

      {modalDelivery && (
        <Animation>
          <Modal
            onClose={() => [
              history.push('/deliveries'),
              setModalDelivery(null),
            ]}
            delivery={modalDelivery}
          />
        </Animation>
      )}
    </S.Container>
  );
}
