import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const fadeInAnimation = keyframes`${fadeIn}`;

export const FadeIn = styled.div`
  animation: ${fadeInAnimation} 0.5s;
`;
