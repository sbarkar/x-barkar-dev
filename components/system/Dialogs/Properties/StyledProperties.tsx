import styled from "styled-components";

const StyledProperties = styled.div`
  padding: 0 8px 0 6px;

  table.general {
    background-color: #fff;
    border: 1px solid rgb(217, 217, 217);
    height: calc(100% - 36px - 28px);
    padding-top: 14px;
    position: relative;
    top: -1px;
    width: 100%;

    tbody {
      display: flex;
      flex-direction: column;
      font-size: 11.5px;
      gap: 11px;

      tr {
        display: flex;
        padding: 0 12px;
        place-content: center;
        place-items: center;

        &.header {
          margin-bottom: -4px;
          margin-top: -2px;
          padding: 0 10px 0 12px;
        }
      }

      th {
        font-weight: 400;
        text-align: left;
        width: 74px;

        picture:nth-child(2) {
          position: absolute;
          top: -2px;
        }
      }

      td {
        cursor: text;
        display: flex;
        user-select: text;
        width: calc(100% - 70px);

        &.spacer {
          border-bottom: 1px solid rgb(160, 160, 160);
          display: block;
          width: 100%;
        }

        input {
          border: 1px solid rgb(122, 122, 122);
          font-size: 11px;
          height: 23px;
          padding: 3px;
          width: 100%;
        }

        img {
          margin-right: 7px;
        }
      }
    }
  }

  nav {
    &.tabs {
      display: flex;
      height: 28px;
      padding-top: 7px;
      position: relative;
      z-index: 1;

      button {
        background-color: #fff;
        border: 1px solid rgb(217, 217, 217);
        border-bottom-width: 0;
        display: flex;
        font-size: 11.5px;
        height: 21px;
        letter-spacing: -0.25px;
        line-height: 16px;
        padding: 1px 6px;
        place-content: center;
        width: auto;
        z-index: 2;

        &.inactive {
          background-color: rgb(240, 240, 240);
          border-bottom: 1px solid rgb(217, 217, 217);
          height: 19px;
          left: -1px;
          position: relative;
          top: 2px;
          z-index: 1;

          &:first-child {
            left: 2px;
          }

          &:hover {
            background-color: rgb(216, 234, 249);
          }
        }
      }
    }

    &.buttons {
      display: flex;
      gap: 8px;
      height: 35px;
      margin-right: -1px;
      place-content: flex-end;
      place-items: center;

      button {
        height: 21px;
        line-height: 19px;
      }
    }
  }
`;

export default StyledProperties;
