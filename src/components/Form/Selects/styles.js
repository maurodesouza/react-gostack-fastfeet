import styled from 'styled-components';
import { transparentize } from 'polished';

import { fontColors, background, borderColor } from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const defaultStyles = {
  container: provided => ({
    ...provided,
    width: '100%',
    height: '45px',
  }),
  control: provided => ({
    ...provided,
    height: '100%',
    boxShadow: 0,
    background: background.secund,
    width: '100%',
    border: `1px solid ${borderColor.fourth}`,
    borderRadius: '5px',
    cursor: 'pointer',

    ':hover': {
      border: `1px solid ${borderColor.fourth}`,
    },
  }),
  placeholder: provider => ({
    ...provider,
    color: fontColors.third,
  }),
  indicatorSeparator: provider => ({
    ...provider,
    display: 'none',
  }),
  dropdownIndicator: provider => ({
    ...provider,
    color: fontColors.third,

    ':hover': {
      opacity: 0.6,
    },
  }),
  singleValue: provider => ({
    ...provider,
    color: fontColors.third,
  }),
  menuList: provider => ({
    ...provider,
    width: '100%',
    flexDirection: 'column',
  }),
  option: (provider, { isSelected }) => ({
    ...provider,
    background: isSelected ? background.first : background.secund,
    color: isSelected ? fontColors.first : fontColors.third,
    cursor: isSelected ? 'default' : 'pointer',

    ':hover': {
      background: isSelected ? '' : transparentize(0.4, background.first),
      color: fontColors.first,
    },
  }),
};
