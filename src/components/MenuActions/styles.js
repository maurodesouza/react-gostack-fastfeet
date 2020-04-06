import styled from 'styled-components';
import { transparentize } from 'polished';

import { fontColors, background, borderColor } from '~/styles/colors';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const Icon = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;

  &:hover span {
    opacity: 0.6;
  }

  span {
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${background.fifth};
    cursor: pointer;

    & + span {
      margin-left: 2px;
    }
  }
`;

export const ActionsList = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  width: 150px;
  left: calc(50% - 75px);
  top: calc(100% + 10px);
  background: ${background.secund};
  border-radius: 5px;
  box-shadow: 0px 0px 2px ${transparentize(0.85, background.seventh)};
  padding: 10px;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: ${background.secund};
    box-shadow: -1px 1px 2px ${transparentize(0.92, background.seventh)};
    transform: rotate(135deg);
    top: -5px;
    left: calc(50% - 5px);
    z-index: 1;
  }

  a {
    display: flex;
    text-align: left;
    align-items: center;
    font-size: 16px;
    color: ${fontColors.third};
    padding: 6px 0;
    cursor: pointer;
    border-bottom: 1px solid ${borderColor.third};

    &:hover {
      opacity: 0.6;
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const DeleteButton = styled.button`
  display: flex;
  text-align: left;
  align-items: center;
  font-size: 16px;
  color: ${({ confirm }) => (confirm ? fontColors.fifth : fontColors.third)};
  padding: 6px 0;
  border-bottom: 1px solid ${borderColor.third};
  border: 0;
  background: none;

  &:hover {
    opacity: 0.6;
  }

  svg {
    margin-right: 10px;
  }
`;
