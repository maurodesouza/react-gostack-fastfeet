import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import MenuActions from '~/components/MenuActions';
import Pagination from '~/components/Pagination';
import Animation from '~/components/Animation';
import HeaderView from '~/components/HeaderView';
import HeaderViewForm from '~/components/HeaderView/HeaderViewForm';
import HeaderViewRegisterButton from '~/components/HeaderView/HeaderViewRegisterButton';
import TableList from '~/components/TableList';
import NoResult from '~/components/NoResult';

import api from '~/services/api';
import { firtsLetters } from '~/util/regex';

import * as S from './styles';

export default function List({ match }) {
  const [loading, setLoading] = useState(true);
  const [deliverymans, setDeliverymans] = useState([]);

  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const onSearch = search => {
    setQ(search);
    setPage(1);
  };

  const backPage = () => setPage(page - 1);

  const nextPage = () => setPage(page + 1);

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
      <HeaderView title="Gerenciando entregadores">
        <HeaderViewForm
          searchOnly
          placeholder="Buscar por entregadores"
          onSearch={onSearch}
        />
        <HeaderViewRegisterButton path={match.path} />
      </HeaderView>

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
              backPage={backPage}
              nextPage={nextPage}
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

List.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
