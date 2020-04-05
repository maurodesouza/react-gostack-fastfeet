import styled from 'styled-components';

export const Button = styled.button`
  background: #7d40e7;
  border: 1px solid #7d40e7;
  padding: 10px 15px;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  svg {
    margin-right: 8px;
  }
`;
