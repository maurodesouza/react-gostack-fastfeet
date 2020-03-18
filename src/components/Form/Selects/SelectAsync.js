import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import ReactSelect from 'react-select/async';

import { Label } from '../Label';
import { Error } from '../Error';

import * as S from './styles';

export default function Select({ name, label, ...rest }) {
  const selectRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value',
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }
          return ref.select.state.value.map(option => option.value);
        }
        if (!ref.select.state.value) {
          return '';
        }
        return ref.select.state.value.value;
      },
      setValue(ref, value) {
        ref.select.select.setValue(value);
      },
      clearValue(ref, value) {
        ref.select.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <S.Container>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <ReactSelect
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        styles={S.defaultStyles}
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </S.Container>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Select.defaultProps = {
  label: '',
};
