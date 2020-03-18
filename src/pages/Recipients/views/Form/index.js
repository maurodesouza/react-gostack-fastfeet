import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import PropTypes from 'prop-types';

import HeaderView from '~/components/HeaderView';
import HeaderViewBackButton from '~/components/HeaderView/HeaderViewBackButton';
import HeaderViewSaveButton from '~/components/HeaderView/HeaderViewSaveButton';

import { SelectAsync } from '~/components/Form/Selects';

import api from '~/services/api';
import history from '~/services/history';

import { atLeastTwoNames, validCep } from '~/util/regex';
import ufConversor from '~/util/ufConversor';

import { options } from './selectContent';

import { Container, UnForm, Input, InputMask, Wrapper } from './styles';

export default function Form({ match }) {
  const formRef = useRef(null);

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
    <Container>
      <HeaderView
        title={
          match.path === '/recipients/add'
            ? 'Cadastro de destinatários'
            : 'Edição de destinatários'
        }
        isToForm
      >
        <HeaderViewBackButton />
        <HeaderViewSaveButton onClick={() => formRef.current.submitForm()} />
      </HeaderView>

      <UnForm ref={formRef} onSubmit={validation}>
        <Wrapper columns={2}>
          <Input name="name" label="Nome" placeholder="Nome  ..." />

          <Input
            name="email"
            label="Email"
            placeholder="example@fastfeet.com"
          />
        </Wrapper>

        <Wrapper>
          <Input name="street" label="Rua" placeholder="Rua ..." />
          <Input
            name="number"
            type="number"
            label="Número"
            placeholder="0000"
          />
          <Input
            name="complement"
            label="Complemento"
            placeholder="Complemento ..."
          />
        </Wrapper>

        <Wrapper>
          <Input name="city" label="Cidade" placeholder="Cidade ..." />
          <SelectAsync
            name="state"
            label="Estado"
            placeholder="Selecione o estado"
            loadOptions={loadStateOptions}
            defaultOptions
            noOptionsMessage={() => 'Nenhum estado foi encontrado !'}
          />
          <InputMask
            name="zip_code"
            label="CEP"
            placeholder="CEP ..."
            mask="99999-999"
          />
        </Wrapper>

        <button type="submit"> * </button>
      </UnForm>
    </Container>
  );
}

Form.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
