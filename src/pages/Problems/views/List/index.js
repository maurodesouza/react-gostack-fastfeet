import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import MenuActions from '~/components/MenuActions';
import Pagination from '~/components/Pagination';
import Animation from '~/components/Animation';
import HeaderView from '~/components/HeaderView';
import TableList from '~/components/TableList';
import Modal from '~/components/Modal';
import NoResult from '~/components/NoResult';

import api from '~/services/api';
import history from '~/services/history';
import { yet100Digits } from '~/util/regex';

import { Container } from './styles';

export default function List({ match }) {
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [modalProblems, setModalProblems] = useState(null);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const backPage = () => setPage(page - 1);

  const nextPage = () => setPage(page + 1);

  const loadProblems = useCallback(async () => {
    setLoading(true);

    const response = await api.get('/deliveries', {
      params: {
        page,
        state: 'problemas',
      },
    });

    const data = response.data.map(problem => ({
      ...problem,
      idFormatted: `#${`00${problem.id}`.slice(-2)}`,
    }));

    const pageTotal = Math.ceil(response.headers['x-total-count'] / 10);

    setProblems(data);
    setTotalPages(pageTotal);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadProblems();
  }, [loadProblems]);

  useEffect(() => {
    const { url, path } = match;

    if (path === '/problems') return;

    const loadDeliveryProblems = async () => {
      try {
        const { data } = await api.get(url);

        setModalProblems(data);
      } catch (err) {
        const { error } = err.response.data;

        history.push('/problems');
        toast.error(error);
      }
    };

    loadDeliveryProblems();
  }, [match]);

  return (
    <Container>
      <HeaderView title="Problemas na entrega" />
      {!loading &&
        (problems.length ? (
          <Animation>
            {' '}
            <TableList thead={['Encomenda', 'Problema', 'Ações']}>
              {problems.map(problem => {
                const { delivery_problems } = problem;

                return (
                  <tr key={problem.id}>
                    <td>{problem.idFormatted}</td>

                    <td>
                      {delivery_problems.length > 1 &&
                        `( ${delivery_problems.length} )`}{' '}
                      {yet100Digits(delivery_problems[0].description)}
                    </td>

                    <td>
                      <MenuActions
                        noEditable
                        options={{
                          deleteUrlSuffix: '/cancel-delivery',
                          deleteLabel: 'Cancelar',
                          deleteSuccessMessage:
                            'Encomenda cancelada com sucesso !',
                          deleteId: delivery_problems[0].id,
                        }}
                        path={match.path}
                        id={problem.id}
                        load={loadProblems}
                      />
                    </td>
                  </tr>
                );
              })}
            </TableList>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              backPage={backPage}
              nextPage={nextPage}
            />
          </Animation>
        ) : (
          <Animation>
            <NoResult />
          </Animation>
        ))}

      {modalProblems && (
        <Modal
          onClose={() => [history.push('/problems'), setModalProblems(null)]}
        >
          <h2>Visualizar Problmeas</h2>

          <div>
            {modalProblems.delivery_problems.map(problem => (
              <span key={problem.id}>
                <p>
                  <strong>Cadastrado: </strong>
                  {format(parseISO(problem.created_at), 'dd/MM/yyyy')}
                </p>
                <p>{problem.description}</p>
                <br />
              </span>
            ))}
          </div>
        </Modal>
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
