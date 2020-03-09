import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const Icon = styled.div`
  display: flex;
  padding: 5px;

  &:hover span {
    opacity: 0.6;
  }

  span {
    display: block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #c6c6c6;

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
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 2px #00000026;
  padding: 10px;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    background: #fff;
    box-shadow: -1px 1px 2px #00000015;
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
    color: #999;
    padding: 6px 0;
    cursor: pointer;
    border-bottom: 1px solid #eee;

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
  color: ${({ confirm }) => (confirm ? '#c1bc35' : '#999')};
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  border: 0;
  background: none;

  &:hover {
    opacity: 0.6;
  }

  svg {
    margin-right: 10px;
  }
`;
