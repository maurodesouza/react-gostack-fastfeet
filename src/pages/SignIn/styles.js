import styled from 'styled-components';

import { fontColors, background, borderColor } from '~/styles/colors';

export const Container = styled.div`
  height: 100%;
  background: ${background.first};
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    background: ${background.secund};
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
      color: ${fontColors.fourth};
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    input {
      border: 1px solid ${borderColor.fourth};
      padding: 12px 15px;
      color: ${fontColors.third};
      font-size: 16px;
      border-radius: 5px;
      margin-bottom: 15px;
      width: 100%;

      &::placeholder {
        color: ${fontColors.third};
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        box-shadow: 0 0 0 30px ${background.secund} inset !important;
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: ${fontColors.third} !important;
      }
    }

    button {
      background: ${background.first};
      border: 0;
      padding: 12px 0;
      color: ${fontColors.primary};
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
