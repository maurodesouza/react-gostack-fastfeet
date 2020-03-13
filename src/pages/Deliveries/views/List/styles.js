import styled, { css } from 'styled-components';

const stateColor = {
  pendente: {
    background: '#f0f0df',
    color: '#c1bc35',
  },
  retirada: {
    background: '#bad2ff',
    color: '#4d85ee',
  },
  entregue: {
    background: '#dff0df',
    color: '#2ca42b',
  },
  cancelada: {
    background: '#fab0b0',
    color: '#de3b3b',
  },
};

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
  padding-bottom: 30px;
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
    color: ${({ haveProblem }) => (haveProblem ? '#de3b3b !important' : '')};
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
