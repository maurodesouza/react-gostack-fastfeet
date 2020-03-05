import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: #7159c1;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    background: #fff;
    padding: 60px 30px;
    width: 360px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;

    img {
      width: 100%;
      margin-bottom: 40px;
    }

    label {
      color: #444;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    input {
      border: 1px solid #ddd;
      padding: 12px 15px;
      color: #999;
      font-size: 16px;
      border-radius: 5px;
      margin-bottom: 15px;

      &::placeholder {
        color: #999;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        box-shadow: 0 0 0 30px #fff inset !important;
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: #999 !important;
      }
    }

    button {
      background: #7159c1;
      border: 0;
      padding: 12px 0;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border-radius: 5px;
      transition: opacity 0.3s;

      &:hover {
        opacity: 0.9;
      }
    }
  }
`;
