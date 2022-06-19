import styled from "styled-components";

export const Container = styled.nav`
  background: linear-gradient(150deg, #53f 15%, #05d5ff);

  ul{
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 24px;
  }
`;

export const DropDownDiv = styled.div`
  .dropdown-option {
    padding: 20px 24px;
    outline: 0;
    color: #fff;
    font-size: 16px;

    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
    &:focus{
      opacity: 0.55;
    }
  }

  .dropdown-root {
    z-index: 10;
    position: absolute;
  }

  .dropdown-arrow {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: #fff;

      top: -6.5px;
      left: -8px;
      border-radius: 4px 0 0 0;

      transform: rotate(45deg);
    }
  }

  .dropdown-container {
    position: absolute;
    overflow: hidden;
    box-shadow: 0px 50px 100px -20px rgba(50, 50, 93, 0.25),
                0px 30px 60px -30px rgba(0, 0, 0, 0.3)
                0px -16px 60px -10px rgba(0, 0, 0, 0.25);
    background-color: #fff;
    border-radius: 4px;
  }

  .dropdown-section {
    position: absolute;
  }

  .dropdown-background {
    position: absolute;
    bottom: 0;
    background: #f6f9fc;
    width: 100%;
  }

`;
