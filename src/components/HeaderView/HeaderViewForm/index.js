import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';

import { Form } from './styles';

export default function HeaderForm({ onSearch, ...rest }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSearch(value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <button type="submit" onSubmit={handleSubmit}>
        <MdSearch size={20} color="#999" />
      </button>
      <input value={value} onChange={e => setValue(e.target.value)} {...rest} />
    </Form>
  );
}

HeaderForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
