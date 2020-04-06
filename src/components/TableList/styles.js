import styled from 'styled-components';

import { fontColors, background } from '~/styles/colors';

export const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  border-spacing: 0 20px;

  thead th {
    font-size: 16px;
    font-weight: bold;
    color: ${fontColors.fourth};
    text-align: left;
    padding: 20px;

    &:last-child {
      text-align: right;
    }
  }

  tbody {
    transform: translateY(-20px);

    td {
      padding: 20px;
      vertical-align: middle;
      background: ${background.secund};
      font-size: 16px;

      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        text-align: right;
      }
    }
  }
`;
