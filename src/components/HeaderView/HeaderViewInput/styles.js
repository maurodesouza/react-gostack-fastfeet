import styled from 'styled-components';

export const Label = styled.label`
  background: #fff;
  width: 235px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 10px 15px;

  svg {
    margin-right: 8px;
  }

  input {
    background: transparent;
    font-size: 14px;
    border: 0;
    color: #999;

    &::placeholder {
      color: #999;
    }
  }
`;
