import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import Select from '~/components/Form/Select';
import { options } from './selectContent';

import { Form, SearchWrapper, SelectWrapper } from './styles';
import Input from '~/components/Form/Input';

export default function HeaderForm({ onSearch, ...rest }) {
  const formRef = useRef(null);

  const handleSubmit = ({ search = '', status }) => {
    onSearch(search, status);

    if (search === '') formRef.current.setFieldValue('search', '');
  };

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SearchWrapper>
          <button type="submit" onSubmit={handleSubmit}>
            <MdSearch size={20} color="#999" />
          </button>
          <Input name="search" {...rest} />
        </SearchWrapper>
        <SelectWrapper>
          <Select
            options={options}
            defaultValue={options[0]}
            placeholder="Selecione o status"
            name="status"
            isSearchable={false}
            onChange={({ value }) => handleSubmit({ status: value })}
          />
        </SelectWrapper>
      </Form>
    </>
  );
}

HeaderForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
