import styled from 'styled-components';

import { fontColors } from '~/styles/colors';
import noResultImage from '~/assets/images/noresult.svg';

export const Container = styled.div`
  margin-top: 50px;
  background: url(${noResultImage}) no-repeat center center;
  background-size: contain;
  height: 350px;
  display: flex;

  h2 {
    color: ${fontColors.fourth};
    font-size: 24px;
  }
`;
