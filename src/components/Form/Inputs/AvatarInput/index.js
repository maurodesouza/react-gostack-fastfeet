import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@unform/core';

import { MdImage } from 'react-icons/md';

import { iconColors } from '~/styles/colors';
import * as S from './styles';

export default function AvatarInput({ name }) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const previewImage = useCallback(e => {
    const file = e.target.files?.[0];

    if (!file) {
      setPreview(null);
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref) {
        ref.value = '';
        setPreview(null);
      },
      setValue(_, value) {
        setPreview(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.Container>
      <label htmlFor={fieldName}>
        {(preview && <img src={preview} alt="" />) || (
          <S.Wrapper>
            <MdImage size={60} color={iconColors.sixth} />
            <span>Adicionar foto</span>
          </S.Wrapper>
        )}

        <input id="avatar" type="file" ref={inputRef} onChange={previewImage} />
      </label>
    </S.Container>
  );
}

AvatarInput.propTypes = {
  name: PropTypes.string.isRequired,
};
