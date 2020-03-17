import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { Label } from '../Label';
import { Error } from '../Error';

export default function Input({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <input ref={inputRef} {...rest} />
      {error && <Error>{error}</Error>}
    </>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Input.defaultProps = {
  label: '',
};
