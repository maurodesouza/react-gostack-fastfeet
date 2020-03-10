import styled from 'styled-components';

export const WrapperPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    margin: 0 10px;

    input {
      border: 1px solid #ddd;
      text-align: center;
      border-radius: 5px;
      width: 40px;
      height: 30px;
      background: #fff;
      padding: 5px 2px;
      margin-right: 3px;
    }
  }
`;
