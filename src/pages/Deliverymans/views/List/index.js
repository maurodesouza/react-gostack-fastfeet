import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import MenuActions from '~/components/MenuActions';
import Pagination from '~/components/Pagination';
import HeaderView from '~/components/HeaderView';
import HeaderViewForm from '~/components/HeaderView/HeaderViewForm';
import HeaderViewRegisterButton from '~/components/HeaderView/HeaderViewRegisterButton';
import TableList from '~/components/TableList';

import api from '~/services/api';

import { Container, NoImage, Img } from './styles';

export default function List({ match }) {
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

  const firtsLetters = fullName =>
    fullName.replace(
      /([a-zà-ú])([a-zà-ú]*\s)([a-zà-ú]{2,3}\s)?([a-zà-ú])?(.+)?/i,
      '$1$4'
    );

  const loadDeliverymans = useCallback(async () => {
    window.scroll({
      behavior: 'smooth',
      top: 0,
    });

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
  }, [page, q]);

  useEffect(() => {
    loadDeliverymans();
  }, [loadDeliverymans]);

  return (
    <Container>
      <HeaderView title="Gerenciando entregadores">
        <HeaderViewForm
          searchOnly
          placeholder="Buscar por entregadores"
          onSearch={onSearch}
        />
        <HeaderViewRegisterButton path={match.path} />
      </HeaderView>

      <TableList thead={['ID', 'Foto', 'Nome', 'Email', 'Ações']}>
        {deliverymans.map(deliveryman => (
          <tr key={deliveryman.id}>
            <td>{deliveryman.idFormatted}</td>

            <td>
              {(deliveryman.avatar && (
                <Img src={deliveryman.avatar.url} alt={deliveryman.name} />
              )) || <NoImage>{firtsLetters(deliveryman.name)}</NoImage>}
            </td>

            <td>{deliveryman.name}</td>

            <td>{deliveryman.email}</td>

            <td>
              <MenuActions
                noView
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
      />
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
