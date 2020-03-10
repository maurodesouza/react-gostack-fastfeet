import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

// import { Container } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return <input ref={inputRef} {...rest} />;
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
};
