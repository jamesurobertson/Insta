import React from 'react';
import styled from "styled-components"
import { fadein } from "../../Styles/animations";

const Layout2Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    "big img2"
    "big img3";
  grid-gap: 1vw;
  margin-bottom: 1vw;
  height: calc((100vw / 3) * 2);
  max-height: 624px;

  img {
    height: 100%;
    width: 100%;
    opacity: 0;
    animation: ${fadein} 2s 1s forwards;
  }

  .img1 {
    grid-area: big;
  }

  .img2 {
    grid-area: img2;
    
  }
  .img3 {
    grid-area: img3;
  
  }
`;

const Layout2 = (props) => {

    return (
      <Layout2Wrapper>
        {props.componentPhotos.map((photo, i) => {
          return (
            <img
              draggable={false}
              alt="random"
              key={`img${i + 1}`}
              src={props.componentPhotos[i]}
              className={`img${i + 1}`}
            />
          );
        })}
      </Layout2Wrapper>
    );
};

export default Layout2;