import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import PropTypes from 'prop-types';

import HeaderView from '~/components/HeaderView';
import HeaderViewBackButton from '~/components/HeaderView/HeaderViewBackButton';
import HeaderViewSaveButton from '~/components/HeaderView/HeaderViewSaveButton';
import { AvatarInput } from '~/components/Form/Inputs';

import api from '~/services/api';
import history from '~/services/history';
import { atLeastTwoNames } from '~/util/regex';

import { Container, UnForm, Input } from './styles';

export default function Form({ match }) {
  const formRef = useRef(null);

  const addRequest = async data => {
    try {
      await api.post('/deliverymans', data);

      toast.success('Entegador cadastrado com sucesso !');
    } catch (err) {
      const { error } = err.response.data;

      toast.error(error);
    }
  };

  const editRequest = async data => {
    const { params } = match;

    try {
      await api.put(`/deliverymans/${params.id}`, data);

      toast.success('Entregador editado com sucesso !');
      history.push('/deliverymans');
    } catch (err) {
      const { error } = err.response.data;

      history.push('/deliverymans');
      toast.error(error);
    }
  };

  const postFile = async file => {
    const data = new FormData();

    data.append('file', file);

    try {
      const response = await api.post('/files', data);

      const { id } = response.data;

      return id;
    } catch (err) {
      return null;
    }
  };

  const validation = async (data, { reset }) => {
    formRef.current.setErrors({});

    const { path } = match;

    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .matches(atLeastTwoNames, 'Passe nome e sobrenome no minimo !')
          .required(),
        email: Yup.string()
          .email()
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { avatar, ...rest } = data;

      const avatar_id = avatar && (await postFile(avatar));

      const newData = {
        ...rest,
        avatar_id,
      };

      if (path === '/deliverymans/add') {
        addRequest(newData);
        reset();
        return;
      }

      editRequest(newData);
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  };

  useEffect(() => {
    const { url, params } = match;

    if (url === '/deliverymans/add') return;

    const loadDeliveryman = async () => {
      try {
        const { data } = await api.get(`/deliverymans/${params.id}`);

        formRef.current.setData(data);
        if (data.avatar)
          formRef.current.setFieldValue('avatar', data.avatar.url);
      } catch (err) {
        const { error } = err.response.data;

        history.push('/deliverymans');
        toast.error(error);
      }
    };

    loadDeliveryman();
  }, [match]);

  return (
    <Container>
      <HeaderView
        title={
          match.path === '/deliverymans/add'
            ? 'Cadastro de entregadores'
            : 'Edição de entregadores'
        }
        isToForm
      >
        <HeaderViewBackButton />
        <HeaderViewSaveButton onClick={() => formRef.current.submitForm()} />
      </HeaderView>

      <UnForm ref={formRef} onSubmit={validation}>
        <AvatarInput name="avatar" />
        <Input name="name" label="Nome" placeholder="Nome  ..." />

        <Input name="email" label="Email" placeholder="example@fastfeet.com" />

        <button type="submit"> * </button>
      </UnForm>
    </Container>
  );
}

Form.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
