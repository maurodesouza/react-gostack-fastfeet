import styled from 'styled-components';

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
    background: '#fff',
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '5px',

    ':hover': {
      border: '1px solid #ddd',
    },
  }),
  placeholder: provider => ({
    ...provider,
    color: '#999',
  }),
  indicatorSeparator: provider => ({
    ...provider,
    display: 'none',
  }),
  dropdownIndicator: provider => ({
    ...provider,
    color: '#999',

    ':hover': {
      opacity: 0.6,
    },
  }),
  singleValue: provider => ({
    ...provider,
    color: '#999',
  }),
  menuList: provider => ({
    ...provider,
    width: '100%',
    flexDirection: 'column',
  }),
  option: (provider, { isSelected }) => ({
    ...provider,
    background: isSelected ? '#7D40E7' : '#fff',
    color: isSelected ? '#fff' : '#999',

    ':hover': {
      background: isSelected ? '' : '#7D40E799',
      color: '#fff',
    },
  }),
};
