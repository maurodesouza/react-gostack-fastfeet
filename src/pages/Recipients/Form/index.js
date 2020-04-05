import React, { useEffect, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import * as HV from '~/components/HeaderView';
import { SelectAsync } from '~/components/Form/Selects';

import api from '~/services/api';
import history from '~/services/history';

import { atLeastTwoNames, validCep } from '~/util/regex';
import ufConversor from '~/util/ufConversor';

import { options } from './selectContent';

import * as S from './styles';

export default function Form() {
  const formRef = useRef(null);
  const match = useRouteMatch();

  const addRequest = async (data, reset) => {
    try {
      await api.post('/recipients', data);

      reset();
      toast.success('Destinatário cadastrado com sucesso !');
    } catch (err) {
      const { error } = err.response.data;

      toast.error(error);
    }
  };

  const editRequest = async data => {
    const { params } = match;

    try {
      await api.put(`/recipients/${params.id}`, data);

      toast.success('Destinatário editado com sucesso !');
      history.push('/recipients');
    } catch (err) {
      const { error } = err.response.data;

      history.push('/recipients');
      toast.error(error);
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
        street: Yup.string().required(),
        number: Yup.string().required(),
        complement: Yup.string().max(40),
        city: Yup.string().required(),
        state: Yup.string().required(),
        zip_code: Yup.string()
          .matches(validCep, 'Passe um cep válido !')
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (path === '/recipients/add') {
        addRequest(data, reset);
        return;
      }

      editRequest(data);
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

  const loadStateOptions = (query, callback) => {
    callback(
      options
        .filter(o => o.label.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
    );
  };

  useEffect(() => {
    const { url, params } = match;

    if (url === '/recipients/add') return;

    const loadDeliveryman = async () => {
      try {
        const { data } = await api.get(`/recipients/${params.id}`);

        formRef.current.setData(data);
        formRef.current.setFieldValue('state', {
          label: ufConversor(data.state),
          value: data.state,
        });
      } catch (err) {
        const { error } = err.response.data;

        history.push('/recipients');
        toast.error(error);
      }
    };

    loadDeliveryman();
  }, [match]);

  return (
    <S.Container>
      <HV.Container
        title={
          match.path === '/recipients/add'
            ? 'Cadastro de destinatários'
            : 'Edição de destinatários'
        }
        isToForm
      >
        <HV.BackButton />
        <HV.SaveButton onClick={() => formRef.current.submitForm()} />
      </HV.Container>

      <S.UnForm ref={formRef} onSubmit={validation}>
        <S.Wrapper columns={2}>
          <S.Input name="name" label="Nome" placeholder="Nome  ..." />

          <S.Input
            name="email"
            label="Email"
            placeholder="example@fastfeet.com"
          />
        </S.Wrapper>

        <S.Wrapper>
          <S.Input name="street" label="Rua" placeholder="Rua ..." />
          <S.Input
            name="number"
            type="number"
            label="Número"
            placeholder="0000"
          />
          <S.Input
            name="complement"
            label="Complemento"
            placeholder="Complemento ..."
          />
        </S.Wrapper>

        <S.Wrapper>
          <S.Input name="city" label="Cidade" placeholder="Cidade ..." />
          <SelectAsync
            name="state"
            label="Estado"
            placeholder="Selecione o estado"
            loadOptions={loadStateOptions}
            defaultOptions
            noOptionsMessage={() => 'Nenhum estado foi encontrado !'}
          />
          <S.InputMask
            name="zip_code"
            label="CEP"
            placeholder="CEP ..."
            mask="99999-999"
          />
        </S.Wrapper>

        <button type="submit"> * </button>
      </S.UnForm>
    </S.Container>
  );
}
