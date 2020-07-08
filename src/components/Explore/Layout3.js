import React from 'react';
import styled from "styled-components"
import { fadein } from "../../Styles/animations";

const Layout3Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
    "img1 big"
    "img2 big";
  grid-gap: 1vw;
  margin-bottom: 1vw;
  height: calc((100vw / 3) * 2);
  max-height: 624px;

  img {
    height: 100%;
    width: 100%;
    opacity: 0;
    animation: ${fadein} 2s .25s forwards;
  }

  .img1 {
    grid-area: img1;
  }
  .img2 {
    grid-area: img2;
  }

  .img3 {
    grid-area: big;
  }
`;

const Layout3= (props) => {
    return (
      <Layout3Wrapper>
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
      </Layout3Wrapper>
    );
};

export default Layout3;