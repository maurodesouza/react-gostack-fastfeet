import styled from 'styled-components';

import { Form } from '@unform/web';
import { Input as input, InputMask as Mask } from '~/components/Form/Inputs';

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
  display: flex;
  flex-direction: column;

  button {
    display: none;
  }
`;

export const Input = styled(input)`
  display: block;
  background: ${background.secund};
  border: 1px solid ${borderColor.fourth};
  border-radius: 5px;
  align-items: center;
  padding: 10px 15px;
  color: ${fontColors.third};
  width: 100%;
  height: 45px;
  text-transform: ${({ name }) => name === 'name' && 'capitalize'};

  &::placeholder {
    color: ${fontColors.third};
    text-transform: none;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

export const InputMask = styled(Mask)`
  display: block;
  background: ${background.secund};
  border: 1px solid ${borderColor.fourth};
  border-radius: 5px;
  align-items: center;
  padding: 10px 15px;
  color: ${fontColors.third};
  width: 100%;
  height: 45px;

  &::placeholder {
    color: ${fontColors.third};
    text-transform: none;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ columns = 3 }) => `repeat(${columns}, 1fr)`};
  grid-gap: 15px;
  margin-top: 15px;

  &:first-child {
    margin: 0;
  }

  &:nth-child(2) {
    grid-template-columns: 3fr 1.1fr 1.1fr;
  }
`;
