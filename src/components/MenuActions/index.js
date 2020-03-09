import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdRemoveRedEye, MdCreate, MdDeleteForever } from 'react-icons/md';
import { IoMdAlert } from 'react-icons/io';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '~/services/api';
import { Container, Icon, ActionsList, DeleteButton } from './styles';

export default function MenuActions({ path, id, load }) {
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [timeOut, setTimeOut] = useState(false);

  const onDelete = async () => {
    if (confirm) {
      clearTimeout(timeOut);
      setVisible(false);
      setConfirm(false);

      try {
        await api.delete(`${path}/${id}`);
        load();
        toast.success('Item deletado com sucesso !');
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }

      return;
    }

    setConfirm(true);
    setTimeOut(setTimeout(() => setConfirm(false), 2500));
  };

  return (
    <Container>
      <Icon onClick={() => setVisible(!visible)}>
        <span />
        <span />
        <span />
      </Icon>
      <ActionsList visible={visible}>
        <Link to={`${path}/${id}`}>
          <MdRemoveRedEye color="#8e5be8" /> Visualizar
        </Link>
        <Link to={`${path}/edit/${id}`}>
          <MdCreate color="#4d85ee" /> Editar
        </Link>
        <DeleteButton onClick={onDelete} confirm={confirm}>
          {confirm ? (
            <>
              <IoMdAlert color="#c1bc35" /> Confirmar !
            </>
          ) : (
            <>
              <MdDeleteForever color="#de3b3b" /> Deletar
            </>
          )}
        </DeleteButton>
      </ActionsList>
    </Container>
  );
}

MenuActions.propTypes = {
  path: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
};
