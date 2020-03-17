import styled from 'styled-components';
import { Form } from '@unform/web';

import { Input as input } from '~/components/Form/Inputs';

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
  margin-bottom: 15px;
  text-transform: ${({ name }) => name === 'name' && 'capitalize'};

  &::placeholder {
    color: #999;
    text-transform: none;
  }
`;
