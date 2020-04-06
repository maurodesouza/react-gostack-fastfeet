import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

import { fontColors } from '~/styles/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  body, button, input {
    font: 14px Roboto, sans-serif;
    color: ${fontColors.default};
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  a {
    color: ${fontColors.default};
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  p, h1, h2, th, td, strong, span {
    cursor: default;
  }

  .toast {
    border-radius: 5px;
    font-size: 16px;
  }
`;
