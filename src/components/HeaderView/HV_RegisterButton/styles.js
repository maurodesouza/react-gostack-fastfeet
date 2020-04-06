import styled from 'styled-components';

import { fontColors, background, borderColor } from '~/styles/colors';

export const Button = styled.button`
  background: ${background.first};
  border: 1px solid ${borderColor.first};
  padding: 10px 15px;
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

  svg {
    margin-right: 8px;
  }
`;
