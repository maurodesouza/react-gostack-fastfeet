import React, { useEffect, useRef } from 'react';
import ReactSelect from 'react-select';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

export default function Select({ name, ...rest }) {
  const selectRef = useRef(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map(option => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <ReactSelect
      autoFocus={false}
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      {...rest}
    />
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
};
