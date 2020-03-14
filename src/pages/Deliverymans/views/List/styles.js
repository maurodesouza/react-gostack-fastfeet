import styled, { css } from 'styled-components';

const noImageBackground = [
  {
    background: '#f4effc',
    color: '#a28fd0',
  },
  {
    background: '#fcf4ee',
    color: '#cb946c',
  },
  {
    background: '#ebfbfa',
    color: '#83cec9',
  },
  {
    background: '#ffeef1',
    color: '#cc7584',
  },
  {
    background: '#f4f9ef',
    color: '#a8d080',
  },
  {
    background: '#fcfcef',
    color: '#cccc8b',
  },
];

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
