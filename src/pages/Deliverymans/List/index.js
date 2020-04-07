import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';

import MenuActions from '~/components/MenuActions';
import Pagination from '~/components/Pagination';
import Animation from '~/components/Animation';
import TableList from '~/components/TableList';
import NoResult from '~/components/NoResult';
import * as HV from '~/components/HeaderView';

import api from '~/services/api';
import { firtsLetters } from '~/util/regex';

import * as S from './styles';

export default function List() {
  const match = useRouteMatch();

  const [loading, setLoading] = useState(true);
  const [deliverymans, setDeliverymans] = useState([]);

  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const onSearch = search => {
    setQ(search);
    setPage(1);
  };

  const loadDeliverymans = useCallback(async () => {
    setLoading(true);

    const response = await api.get('/deliverymans', {
      params: {
        q,
        page,
      },
    });

    const data = response.data.map(deliveryman => ({
      ...deliveryman,
      idFormatted: `#${`00${deliveryman.id}`.slice(-2)}`,
    }));

    const pageTotal = Math.ceil(response.headers['x-total-count'] / 10);

    setDeliverymans(data);
    setTotalPages(pageTotal);
    setLoading(false);
  }, [page, q]);

  useEffect(() => {
    loadDeliverymans();
  }, [loadDeliverymans]);

  return (
    <S.Container>
      <HV.Container title="Gerenciando entregadores">
        <HV.Form
          searchOnly
          placeholder="Buscar por entregadores"
          onSearch={onSearch}
        />
        <HV.RegisterButton path={match.path} />
      </HV.Container>

      {!loading &&
        (deliverymans.length ? (
          <Animation>
            <TableList thead={['ID', 'Foto', 'Nome', 'Email', 'Ações']}>
              {deliverymans.map(deliveryman => (
                <tr key={deliveryman.id}>
                  <td>{deliveryman.idFormatted}</td>

                  <td>
                    {(deliveryman.avatar && (
                      <S.Img
                        src={deliveryman.avatar.url}
                        alt={deliveryman.name}
                      />
                    )) || (
                      <S.NoImage>{firtsLetters(deliveryman.name)}</S.NoImage>
                    )}
                  </td>

                  <td>{deliveryman.name}</td>

                  <td>{deliveryman.email}</td>

                  <td>
                    <MenuActions
                      noView
                      options={{
                        deleteSuccessMessage:
                          'Entregador deletado com sucesso !',
                      }}
                      path={match.path}
                      id={deliveryman.id}
                      load={loadDeliverymans}
                    />
                  </td>
                </tr>
              ))}
            </TableList>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              setPage={p => setPage(p)}
            />{' '}
          </Animation>
        ) : (
          <Animation>
            <NoResult />
          </Animation>
        ))}
    </S.Container>
  );
}
