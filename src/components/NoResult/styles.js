import styled from 'styled-components';

import noResultImage from '~/assets/images/noresult.svg';

export const Container = styled.div`
  margin-top: 50px;
  background: url(${noResultImage}) no-repeat center center;
  background-size: contain;
  height: 350px;
  display: flex;

  h2 {
    color: #444;
    font-size: 24px;
  }
`;
