import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { MdRemoveRedEye, MdCreate, MdDeleteForever } from 'react-icons/md';
import { IoMdAlert } from 'react-icons/io';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { iconColors } from '~/styles/colors';
import * as S from './styles';

export default function MenuActions({
  path,
  id,
  load,
  noView,
  noEditable,
  options,
}) {
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [timeOut, setTimeOut] = useState(false);

  const onDelete = async () => {
    if (confirm) {
      clearTimeout(timeOut);
      setVisible(false);
      setConfirm(false);

      try {
        await api.delete(
          `${path}/${options.deleteId || id}${options.deleteUrlSuffix || ''}`
        );
        load();
        toast.success(
          options.deleteSuccessMessage || 'Item deletado com successo !'
        );
      } catch (err) {
        const { error } = err.response.data;

        const autoClose = error.length > 50 ? 5000 : '';

        toast.error(error, {
          autoClose,
        });
      }

      return;
    }

    setConfirm(true);
    setTimeOut(setTimeout(() => setConfirm(false), 2500));
  };

  return (
    <S.Container>
      <S.Icon onClick={() => setVisible(!visible)}>
        <span />
        <span />
        <span />
      </S.Icon>

      <S.ActionsList visible={visible}>
        {!noView && (
          <Link to={`${path}/${id}`} onClick={() => setVisible(false)}>
            <MdRemoveRedEye color={iconColors.first} /> Visualizar
          </Link>
        )}

        {!noEditable && (
          <Link to={`${path}/edit/${id}`}>
            <MdCreate color={iconColors.third} /> Editar
          </Link>
        )}

        <S.DeleteButton onClick={onDelete} confirm={confirm}>
          {confirm ? (
            <>
              <IoMdAlert color={iconColors.fourth} /> Confirmar !
            </>
          ) : (
            <>
              <MdDeleteForever color={iconColors.secund} />{' '}
              {options.deleteLabel || 'Deletar'}
            </>
          )}
        </S.DeleteButton>
      </S.ActionsList>
    </S.Container>
  );
}

MenuActions.propTypes = {
  path: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  load: PropTypes.func.isRequired,
  noView: PropTypes.bool,
  noEditable: PropTypes.bool,
  options: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

MenuActions.defaultProps = {
  noView: false,
  noEditable: false,
  options: {},
};
