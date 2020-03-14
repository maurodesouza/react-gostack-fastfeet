import React from 'react';

import HeaderView from '~/components/HeaderView';
import HeaderViewBackButton from '~/components/HeaderView/HeaderViewBackButton';
import HeaderViewSaveButton from '~/components/HeaderView/HeaderViewSaveButton';
import Select from '~/components/Form/Select';

import { Container, UnForm, SelectWrapper, Input } from './styles';

export default function Form() {
  return (
    <Container>
      <HeaderView title="Cadastro de encomendas" isToForm>
        <HeaderViewBackButton />
        <HeaderViewSaveButton />
      </HeaderView>
      <UnForm>
        <SelectWrapper>
          <Select
            placeholder="Nome do destinatário ..."
            name="recipient_id"
            label="Destinatário"
          />
          <Select
            placeholder="Nome do entregador ..."
            name="deliveryman_id"
            label="Entregador"
          />
        </SelectWrapper>
        <Input
          placeholder="Nome do Produto ..."
          label="Nome do produto"
          name="product"
        />
      </UnForm>
    </Container>
  );
}
