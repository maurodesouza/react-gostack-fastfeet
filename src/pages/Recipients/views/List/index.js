import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import MenuActions from '~/components/MenuActions';
import Pagination from '~/components/Pagination';
import HeaderView from '~/components/HeaderView';
import Animation from '~/components/Animation';
import HeaderViewForm from '~/components/HeaderView/HeaderViewForm';
import HeaderViewRegisterButton from '~/components/HeaderView/HeaderViewRegisterButton';
import TableList from '~/components/TableList';
import NoResult from '~/components/NoResult';

import ufConversor from '~/util/ufConversor';
import api from '~/services/api';

import { Container } from './styles';

export default function List({ match }) {
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
    <Container>
      <HeaderView title="Gerenciando destinatários">
        <HeaderViewForm
          searchOnly
          placeholder="Buscar por destinatários"
          onSearch={onSearch}
        />
        <HeaderViewRegisterButton path={match.path} />
      </HeaderView>

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
    </Container>
  );
}

List.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
