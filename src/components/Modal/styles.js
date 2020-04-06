import styled from 'styled-components';
import { transparentize } from 'polished';

import { fontColors, background, borderColor } from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${transparentize(0.3, background.seventh)};
  position: fixed;
  top: 0;
  left: 0;
`;

export const Wrapper = styled.div`
  padding: 30px 30px 60px;
  background: ${background.secund};
  width: 450px;
  border-radius: 5px;

  h2 {
    color: ${fontColors.fourth};
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 14px;
  }

  p {
    font-size: 16px;

    & + p {
      margin-top: 10px;
    }
  }

  strong {
    font-size: 16px;
    font-weight: bold;
  }

  div {
    padding: 10px 0;
    margin: 10px 0;
    border-top: 1px solid ${borderColor.third};
    border-bottom: 1px solid ${borderColor.third};
  }

  img {
    display: block;
    margin: 20px auto 0;
  }
`;
