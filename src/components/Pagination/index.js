import React, { useRef } from 'react';
import { Form } from '@unform/web';
import PropTypes from 'prop-types';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import * as S from './styles';

export default function Pagination({ currentPage, totalPages, setPage }) {
  const formRef = useRef(null);

  const backPage = () => setPage(currentPage - 1);

  const nextPage = () => setPage(currentPage + 1);

  const onSubmit = ({ page }) => {
    if (page > totalPages || page < 1) {
      formRef.current.setFieldValue('page', currentPage);
      return;
    }

    setPage(Number(page));
  };

  return (
    totalPages > 1 && (
      <S.Container>
        <button type="button" onClick={backPage} disabled={currentPage === 1}>
          <MdKeyboardArrowLeft size={30} />
        </button>

        <span>
          <Form
            ref={formRef}
            initialData={{ page: currentPage }}
            onSubmit={onSubmit}
          >
            <S.Input name="page" type="number" />
          </Form>
          de {totalPages}
        </span>

        <button
          type="button"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
        >
          <MdKeyboardArrowRight size={30} />
        </button>
      </S.Container>
    )
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
