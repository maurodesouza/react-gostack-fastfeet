import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #444;
    margin-bottom: 35px;
    margin-top: 5px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
