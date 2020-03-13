import React from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import Modal from '~/components/Modal';

export default function ModalContent({ delivery, ...rest }) {
  return (
    <Modal {...rest}>
      <h2> Informações da encomenda </h2>
      <p>{`${delivery.recipient.street}, ${delivery.recipient.number}`}</p>
      <p>{`${delivery.recipient.city} - ${delivery.recipient.state}`}</p>
      <p>{delivery.recipient.zip_code}</p>
      <p>
        <strong>Status: </strong>
        {delivery.status}
      </p>
      {delivery.have_problem && (
        <p>
          Essa encomenda possui {delivery.delivery_problems.length}{' '}
          {delivery.delivery_problems.length > 1 ? 'problemas' : 'problema'}
        </p>
      )}

      <div>
        <h2>Datas</h2>
        {(delivery.start_date && (
          <p>
            <strong>Retirada: </strong>
            {format(parseISO(delivery.start_date), 'dd/MM/yyyy')}
          </p>
        )) || (
          <>
            <p>
              <strong>Cadastrada: </strong>
              {format(parseISO(delivery.createdAt), 'dd/MM/yyyy')}
            </p>
            <p>Aguardando para ser retirada !</p>
          </>
        )}

        {(delivery.canceled_at && (
          <p>
            <strong>Cancelada: </strong>
            {format(parseISO(delivery.canceled_at), 'dd/MM/yyyy')}
          </p>
        )) ||
          (delivery.start_date && (
            <p>
              <strong>Entrega: </strong>
              {delivery.end_date
                ? format(parseISO(delivery.end_date), 'dd/MM/yyyy')
                : 'ainda não foi entregue !'}
            </p>
          ))}
      </div>

      {delivery.end_date && (
        <>
          <h2>Assinatura do destinatário</h2>
          <img src={delivery.signature.url} alt={delivery.signature.name} />
        </>
      )}
    </Modal>
  );
}

ModalContent.propTypes = {
  delivery: PropTypes.instanceOf(Object).isRequired,
};
