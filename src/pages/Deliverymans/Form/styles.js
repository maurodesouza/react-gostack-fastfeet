import styled from 'styled-components';

import { Form } from '@unform/web';
import { Input as input } from '~/components/Form/Inputs';

import { fontColors, background, borderColor } from '~/styles/colors';

export const Container = styled.div`
  margin: 30px auto;
  width: 900px;
`;

export const UnForm = styled(Form)`
  width: 100%;
  background: ${background.secund};
  border-radius: 5px;
  padding: 30px;
  margin-top: 30px;

  button {
    display: none;
  }
`;

export const Input = styled(input)`
  background: ${background.secund};
  border: 1px solid ${borderColor.fourth};
  border-radius: 5px;
  align-items: center;
  padding: 10px 15px;
  color: ${fontColors.third};
  width: 100%;
  height: 45px;
  margin-bottom: 15px;
  text-transform: ${({ name }) => name === 'name' && 'capitalize'};

  &::placeholder {
    color: ${fontColors.third};
    text-transform: none;
  }
`;
