import styled from 'styled-components';

export const Button = styled.button`
  background: #7d40e7;
  border: 1px solid #7d40e7;
  width: 112px;
  padding: 10px 15px;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  margin-left: 15px;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;

export const Icon = styled.span`
  position: relative;
  width: 15px;
  height: 8px;
  border-bottom: 2px solid #fff;
  border-left: 2px solid #fff;
  transform: rotate(-45deg);
  margin-right: 8px;
  top: -3px;
`;
