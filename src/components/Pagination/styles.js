import styled from 'styled-components';

import { Input as input } from '~/components/Form/Inputs';
import { background, borderColor } from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
  }

  span {
    display: flex;
    align-items: center;
  }
`;

export const Input = styled(input)`
  border: 1px solid ${borderColor.fourth};
  text-align: center;
  border-radius: 5px;
  width: 40px;
  height: 30px;
  background: ${background.secund};
  padding: 5px 2px;
  margin-right: 3px;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
