import React, { useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import * as HV from '~/components/HeaderView';
import { AvatarInput } from '~/components/Form/Inputs';

import api from '~/services/api';
import history from '~/services/history';
import { atLeastTwoNames } from '~/util/regex';

import * as S from './styles';

export default function Form() {
  const formRef = useRef(null);
  const match = useRouteMatch();

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
    <S.Container>
      <HV.Container
        title={
          match.path === '/deliverymans/add'
            ? 'Cadastro de entregadores'
            : 'Edição de entregadores'
        }
        isToForm
      >
        <HV.BackButton />
        <HV.SaveButton onClick={() => formRef.current.submitForm()} />
      </HV.Container>

      <S.UnForm ref={formRef} onSubmit={validation}>
        <AvatarInput name="avatar" />
        <S.Input name="name" label="Nome" placeholder="Nome  ..." />

        <S.Input
          name="email"
          label="Email"
          placeholder="example@fastfeet.com"
        />

        <button type="submit"> * </button>
      </S.UnForm>
    </S.Container>
  );
}
