import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';

import MenuActions from '~/components/MenuActions';
import Pagination from '~/components/Pagination';
import Animation from '~/components/Animation';
import TableList from '~/components/TableList';
import NoResult from '~/components/NoResult';
import * as HV from '~/components/HeaderView';

import ufConversor from '~/util/ufConversor';
import api from '~/services/api';

import * as S from './styles';

export default function List() {
  const match = useRouteMatch();

  const [loading, setLoading] = useState(true);
  const [recipients, setRecipients] = useState([]);

  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const onSearch = search => {
    setQ(search);
    setPage(1);
  };

  const backPage = () => setPage(page - 1);

  const nextPage = () => setPage(page + 1);

  const loadRecipients = useCallback(async () => {
    setLoading(true);

    const response = await api.get('/recipients', {
      params: {
        q,
        page,
      },
    });

    const data = response.data.map(recipient => ({
      ...recipient,
      idFormatted: `#${`00${recipient.id}`.slice(-2)}`,
      address: `${recipient.street}, ${recipient.number}, ${
        recipient.city
      } - ${ufConversor(recipient.state)}`,
    }));

    const pageTotal = Math.ceil(response.headers['x-total-count'] / 10);

    setRecipients(data);
    setTotalPages(pageTotal);
    setLoading(false);
  }, [page, q]);

  useEffect(() => {
    loadRecipients();
  }, [loadRecipients]);

  return (
    <S.Container>
      <HV.Container title="Gerenciando destinatários">
        <HV.Form
          searchOnly
          placeholder="Buscar por destinatários"
          onSearch={onSearch}
        />
        <HV.RegisterButton path={match.path} />
      </HV.Container>

      {!loading &&
        (recipients.length ? (
          <Animation>
            {' '}
            <TableList thead={['ID', 'Nome', 'Endereço', 'Ações']}>
              {recipients.map(recipient => (
                <tr key={recipient.id}>
                  <td>{recipient.idFormatted}</td>

                  <td>{recipient.name}</td>

                  <td>{recipient.address}</td>

                  <td>
                    <MenuActions
                      noView
                      options={{
                        deleteSuccessMessage:
                          'Destinatário deletado com sucesso !',
                      }}
                      path={match.path}
                      id={recipient.id}
                      load={loadRecipients}
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
