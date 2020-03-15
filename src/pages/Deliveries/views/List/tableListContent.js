import React from 'react';
import PropTypes from 'prop-types';

import TableList from '~/components/TableList';
import MenuActions from '~/components/MenuActions';

import { firtsLetters, onlyTwoNames } from '~/util/regex';
import ufConversor from '~/util/ufConversor';

import { Status, Tr, DeliverymanWrapper, NoImage } from './styles';

export default function TableListContent({ deliveries, path, load }) {
  return (
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
      {deliveries.map(delivery => {
        const { deliveryman, recipient } = delivery;

        return (
          <Tr key={delivery.id} haveProblem={delivery.have_problem}>
            <td>{delivery.idFormatted}</td>

            <td>
              {recipient
                ? onlyTwoNames(delivery.recipient.name)
                : 'Foi Excluido !'}
            </td>

            <td>
              {(deliveryman && (
                <DeliverymanWrapper>
                  {(deliveryman.avatar && (
                    <img src={deliveryman.avatar.url} alt={deliveryman.name} />
                  )) || <NoImage>{firtsLetters(deliveryman.name)}</NoImage>}
                  <p>{onlyTwoNames(deliveryman.name)}</p>
                </DeliverymanWrapper>
              )) ||
                'Foi Excluido !'}
            </td>

            <td>{recipient ? recipient.city : ''}</td>
            <td>{recipient ? ufConversor(recipient.state) : ''}</td>

            <td>
              <Status status={delivery.status}>
                <span />
                {delivery.status}
              </Status>
            </td>

            <td>
              <MenuActions
                options={{
                  deleteSuccessMessage: 'Encomenda deletada com sucesso !',
                }}
                path={path}
                id={delivery.id}
                load={load}
              />
            </td>
          </Tr>
        );
      })}
    </TableList>
  );
}

TableListContent.propTypes = {
  deliveries: PropTypes.instanceOf(Array).isRequired,
  path: PropTypes.string.isRequired,
  load: PropTypes.func.isRequired,
};
