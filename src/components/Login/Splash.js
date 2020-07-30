import React from "react";
import styled from "styled-components";
import { fadeIn } from "../../Styles/animations";

const SplashWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: -5;
`;

const SplashImg = styled.img`
  opacity: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${fadeIn} 5s 3s forwards;
`;

const Splash = () => {
  return (
    <SplashWrapper>
      <SplashImg src="https://picsum.photos/2000/3000" />
    </SplashWrapper>
  );
};

export default Splash;
