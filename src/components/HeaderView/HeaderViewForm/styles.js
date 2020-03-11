import styled from 'styled-components';
import { Form as unForm } from '@unform/web';

export const Form = styled(unForm)`
  display: flex;
`;

export const SearchWrapper = styled.span`
  background: #fff;
  width: 235px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  margin-right: 20px;

  input {
    background: transparent;
    font-size: 14px;
    border: 0;
    color: #999;

    &::placeholder {
      color: #999;
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
