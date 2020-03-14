import styled from 'styled-components';

export const Button = styled.button`
  background: #cccccc;
  border: 1px solid #cccccc;
  padding: 10px 15px;
  width: 112px;
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
`;

export const Icon = styled.span`
  width: 10px;
  height: 10px;
  margin-right: 8px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  transform: rotate(-45deg);
`;
