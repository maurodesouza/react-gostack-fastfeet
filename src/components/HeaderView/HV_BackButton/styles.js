import styled from 'styled-components';

import { fontColors, background, borderColor } from '~/styles/colors';

export const Button = styled.button`
  background: ${background.fourth};
  border: 1px solid ${borderColor.fifth};
  padding: 10px 15px;
  width: 112px;
  color: ${fontColors.first};
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
  border-top: 2px solid ${borderColor.secund};
  border-left: 2px solid ${borderColor.secund};
  transform: rotate(-45deg);
`;
