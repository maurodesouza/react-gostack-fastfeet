import styled, { css } from 'styled-components';

import { noImageBackground } from '~/styles/colors';

export const Container = styled.div`
  margin: 30px auto 0;
  padding-bottom: 50px;
  max-width: 1200px;
`;

export const NoImage = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 16px;

  ${() => {
    const randomNumber = Math.floor(Math.random() * 5);

    return css`
      background: ${noImageBackground[randomNumber].background};
      color: ${noImageBackground[randomNumber].color};
    `;
  }}
`;

export const Img = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`;
