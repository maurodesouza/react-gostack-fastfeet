import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import ReactInputMask from 'react-input-mask';

import { Label } from '~/components/Form/Label';
import { Error } from '~/components/Form/Error';

export default function InputMask({ name, label, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue(value);
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <span>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <ReactInputMask ref={inputRef} {...rest} />
      {error && <Error>{error}</Error>}
    </span>
  );
}

InputMask.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

InputMask.defaultProps = {
  label: '',
};
