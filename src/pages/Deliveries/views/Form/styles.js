import styled from 'styled-components';
import { Form } from '@unform/web';

import input from '~/components/Form/Input';

export const Container = styled.div`
  margin: 30px auto;
  width: 900px;
`;

export const UnForm = styled(Form)`
  width: 100%;
  background: #fff;
  border-radius: 5px;
  padding: 30px;
  margin-top: 30px;

  button {
    display: none;
  }
`;

export const Input = styled(input)`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  align-items: center;
  padding: 10px 15px;
  color: #999;
  width: 100%;
  height: 45px;

  &::placeholder {
    color: #999;
  }
`;

export const SelectWrapper = styled.span`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin-bottom: 15px;
`;
