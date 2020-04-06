import styled, { css } from 'styled-components';

import { fontColors, stateColor, noImageBackground } from '~/styles/colors';

export const Container = styled.div`
  margin: 30px auto 0;
  padding-bottom: 50px;
  max-width: 1200px;
`;

export const Status = styled.span`
  background: ${({ status }) => stateColor[status].background};
  color: ${({ status }) => stateColor[status].color};
  padding: 3px 10px;
  border-radius: 50px;
  text-transform: uppercase;
  font-weight: bold;

  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: ${({ status }) => stateColor[status].color};
    border-radius: 50%;
    margin-right: 5px;
  }
`;

export const Tr = styled.tr`
  td {
    color: ${({ haveProblem }) =>
      haveProblem ? `${fontColors.sixth} !important` : ''};
  }
`;

export const DeliverymanWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }
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
