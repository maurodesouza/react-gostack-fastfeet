import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #444;
    margin: ${({ existChildren }) => (existChildren ? '5px 0 35px' : '0')};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ${({ isToForm }) =>
    isToForm &&
    css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      h1 {
        margin: 0;
      }

      div {
        align-items: stretch;
      }
    `}
`;
