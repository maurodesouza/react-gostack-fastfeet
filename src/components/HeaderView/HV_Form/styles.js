import styled from 'styled-components';
import { Form as unForm } from '@unform/web';

import { fontColors, background, borderColor } from '~/styles/colors';

export const Form = styled(unForm)`
  display: flex;
`;

export const SearchWrapper = styled.span`
  background: ${background.secund};
  width: 235px;
  border: 1px solid ${borderColor.fourth};
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-right: 20px;

  input {
    background: transparent;
    font-size: 14px;
    border: 0;
    color: ${fontColors.third};

    &::placeholder {
      color: ${fontColors.third};
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    background: transparent;

    &:hover {
      opacity: 0.6;
    }
  }

  svg {
    margin-right: 8px;
  }
`;

export const SelectWrapper = styled.div`
  width: 235px;
`;
