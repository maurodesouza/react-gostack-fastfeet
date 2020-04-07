import React, { useEffect, useState, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

import MenuActions from '~/components/MenuActions';
import Pagination from '~/components/Pagination';
import Animation from '~/components/Animation';
import TableList from '~/components/TableList';
import Modal from '~/components/Modal';
import NoResult from '~/components/NoResult';
import * as HV from '~/components/HeaderView';

import api from '~/services/api';
import history from '~/services/history';

import * as S from './styles';

export default function List() {
  const match = useRouteMatch();

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
    <S.Container>
      <HV.Container title="Problemas na entrega" />
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

                    <S.Td>
                      <div>
                        <span>
                          {delivery_problems.length > 1 &&
                            `( ${delivery_problems.length} )`}{' '}
                          {delivery_problems[0].description}
                        </span>
                      </div>
                    </S.Td>

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
          <h2>Visualizar Problemas</h2>

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
    </S.Container>
  );
}
