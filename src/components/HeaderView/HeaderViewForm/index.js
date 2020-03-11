import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import Select from '~/components/Form/Select';
import { options, customStyles } from './selectContent';

import { Form, SearchWrapper } from './styles';
import Input from '~/components/Form/Input';

export default function HeaderForm({ onSearch, ...rest }) {
  const handleSubmit = ({ search = '', status }) => {
    onSearch(search, status);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <SearchWrapper>
          <button type="submit" onSubmit={handleSubmit}>
            <MdSearch size={20} color="#999" />
          </button>
          <Input name="search" {...rest} />
        </SearchWrapper>
        <Select
          styles={customStyles}
          options={options}
          defaultValue={options[0]}
          placeholder="Selecione o status"
          name="status"
          isSearchable={false}
          onChange={({ value }) => handleSubmit({ status: value })}
        />
      </Form>
    </>
  );
}

HeaderForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
