import styled from 'styled-components';

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
