import styled from 'styled-components';

export const Container = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 25px;
  border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  &:hover {
    opacity: 0.6;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
  }

  input {
    display: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    font-size: 16px;
    color: #ddd;
    font-weight: bold;
  }
`;
