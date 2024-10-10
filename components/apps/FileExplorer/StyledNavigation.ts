import styled from "styled-components";

const StyledNavigation = styled.nav`
  background-color: rgb(25, 25, 25);
  display: flex;
  height: ${({ theme }) => theme.sizes.fileExplorer.navBarHeight};

  button {
    height: 16px;
    margin: 9px 9px 10px;
    width: 16px;

    svg {
      color: #fff;
      fill: currentColor;
      height: 16px;
      transition: color 0.35s ease;
      width: 16px;

      &:hover {
        color: rgb(50, 152, 254);
      }

      &:active {
        color: rgb(54, 116, 178);
        transition: none;
      }
    }

    &[title^="Up"] {
      margin-right: 8px;
      position: relative;
      right: -8px;
      top: -1px;
    }

    &[title="Recent locations"] {
      left: 55px;
      position: absolute;

      svg {
        stroke: currentColor;
        stroke-width: 3px;
        width: 7px;
      }
    }

    &:disabled {
      svg {
        color: rgb(140, 140, 140);

        &:hover,
        &:active {
          color: rgb(140, 140, 140);
        }
      }
    }
  }
`;

export default StyledNavigation;
