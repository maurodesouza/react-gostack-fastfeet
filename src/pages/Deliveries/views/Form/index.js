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

import { Container, UnForm, Input, SelectWrapper } from './styles';

export default function Form({ match }) {
  const formRef = useRef(null);

  const addRequest = async data => {
    try {
      await api.post('/deliveries', data);

      toast.success('Encomenda cadastrada com sucesso !');
    } catch (err) {
      const { error } = err.response.data;

      toast.error(error);
    }
  };

  const editRequest = async data => {
    const { params } = match;

    try {
      await api.put(`/deliveries/${params.id}`, data);

      toast.success('Encomenda editada com sucesso !');
      history.push('/deliveries');
    } catch (err) {
      const { error } = err.response.data;

      history.push('/deliveries');
      toast.error(error);
    }
  };

  const validation = async (data, { reset }) => {
    formRef.current.setErrors({});

    const { path } = match;

    try {
      const schema = Yup.object().shape({
        recipient_id: Yup.string().required(),
        deliveryman_id: Yup.string().required(),
        product: Yup.string()
          .min(6)
          .required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (path === '/deliveries/add') {
        addRequest(data);
        reset();
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

  const loadDeliverymanOptions = async (q = '') => {
    const response = await api.get('/deliverymans', {
      params: {
        q,
      },
    });

    const data = response.data.map(d => ({
      value: String(d.id),
      label: d.name,
    }));

    return data;
  };

  const loadRecipientOptions = async (q = '') => {
    const response = await api.get('/recipients', {
      params: {
        q,
      },
    });

    const data = response.data.map(d => ({
      label: d.name,
      value: d.id,
    }));

    return data;
  };

  useEffect(() => {
    const { url, params } = match;

    if (url === '/deliveries/add') return;

    const loadDelivery = async () => {
      try {
        const { data } = await api.get(`/deliveries/${params.id}`);

        formRef.current.setFieldValue('product', data.product);

        formRef.current.setFieldValue('recipient_id', {
          value: data.recipient.id,
          label: data.recipient.name,
        });

        formRef.current.setFieldValue('deliveryman_id', {
          value: data.deliveryman.id,
          label: data.deliveryman.name,
        });
      } catch (err) {
        const { error } = err.response.data;

        history.push('/deliveries');
        toast.error(error);
      }
    };

    loadDelivery();
  }, [match]);

  return (
    <Container>
      <HeaderView
        title={
          match.path === '/deliveries/add'
            ? 'Cadastro de encomendas'
            : 'Edição de encomendas'
        }
        isToForm
      >
        <HeaderViewBackButton />
        <HeaderViewSaveButton onClick={() => formRef.current.submitForm()} />
      </HeaderView>

      <UnForm ref={formRef} onSubmit={validation}>
        <SelectWrapper>
          <SelectAsync
            placeholder="Nome do destinatário ..."
            name="recipient_id"
            label="Destinatário"
            loadOptions={loadRecipientOptions}
            defaultOptions
            noOptionsMessage={() => 'Nenhum destinatário foi encontrado !'}
          />
          <SelectAsync
            placeholder="Nome do entregador ..."
            name="deliveryman_id"
            label="Entregador"
            loadOptions={loadDeliverymanOptions}
            defaultOptions
            noOptionsMessage={() => 'Nenhum Entregador foi encontrado !'}
          />
        </SelectWrapper>

        <Input
          name="product"
          label="Nome do produto"
          placeholder="Nome do produto ..."
        />

        <button type="submit"> * </button>
      </UnForm>
    </Container>
  );
}

Form.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
