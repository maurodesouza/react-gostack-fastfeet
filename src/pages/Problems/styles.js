import styled from 'styled-components';

export const Container = styled.div`
  margin: 30px auto 0;
  padding-bottom: 50px;
  max-width: 1200px;
`;

export const Td = styled.td`
  width: 100%;

  div {
    display: flex;
    align-items: center;
    position: relative;
  }

  span {
    position: absolute;
    left: 0;
    right: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
