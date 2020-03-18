import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { MdSearch } from 'react-icons/md';

import { Select } from '~/components/Form/Selects';
import { Input } from '~/components/Form/Inputs';

import { options } from './selectContent';

import * as S from './styles';

export default function HeaderForm({ onSearch, searchOnly, ...rest }) {
  const formRef = useRef(null);

  const handleSubmit = ({ search = '', status }) => {
    onSearch(search, status);

    if (search === '') formRef.current.setFieldValue('search', '');
  };

  return (
    <>
      <S.Form ref={formRef} onSubmit={handleSubmit}>
        <S.SearchWrapper>
          <button type="submit" onSubmit={handleSubmit}>
            <MdSearch size={20} color="#999" />
          </button>
          <Input name="search" {...rest} />
        </S.SearchWrapper>

        {!searchOnly && (
          <S.SelectWrapper>
            <Select
              options={options}
              defaultValue={options[0]}
              placeholder="Selecione o status"
              name="status"
              isSearchable={false}
              onChange={({ value }) => handleSubmit({ status: value })}
            />
          </S.SelectWrapper>
        )}
      </S.Form>
    </>
  );
}

HeaderForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchOnly: PropTypes.bool,
};

HeaderForm.defaultProps = {
  searchOnly: false,
};
