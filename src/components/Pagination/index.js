import React from 'react';
import PropTypes from 'prop-types';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import * as S from './styles';

export default function Pagination({
  currentPage,
  totalPages,
  backPage,
  nextPage,
}) {
  return (
    <S.Container>
      <button type="button" onClick={backPage} disabled={currentPage === 1}>
        <MdKeyboardArrowLeft size={30} />
      </button>
      <span>
        {currentPage} de {totalPages}
      </span>
      <button
        type="button"
        onClick={nextPage}
        disabled={currentPage >= totalPages}
      >
        <MdKeyboardArrowRight size={30} />
      </button>
    </S.Container>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  backPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};
