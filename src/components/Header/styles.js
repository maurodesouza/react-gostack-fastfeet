import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  background: #fff;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;

  div {
    display: flex;
    align-items: center;
    margin: 15px 0;

    img {
      height: 26px;
    }

    nav {
      margin-left: 30px;
      padding: 6px 0 6px 30px;
      border-left: 1px solid #ddd;

      a {
        font-size: 15px;
        color: #999;
        text-transform: uppercase;
        font-weight: bold;
        margin-right: 20px;
        transition: color 0.3s;

        &.active,
        &:hover {
          color: #444;
        }
      }
    }
  }

  aside {
    strong {
      display: block;
      margin: 5px 0;
    }

    button {
      border: none;
      background: none;
      color: #de3b3b;
    }
  }
`;
