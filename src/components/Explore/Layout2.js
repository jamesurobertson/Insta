import React from 'react';
import styled from "styled-components"
import { fadeIn } from "../../Styles/animations";

const Layout2Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    "big img2"
    "big img3";
  grid-gap: 1vw;
  margin-bottom: 1vw;
  height: calc((100vw / 3) * 2);
  max-height: 409px;

  img {
    height: 100%;
    width: 100%;
    opacity: 0;
    animation: ${fadeIn} 1s .25s forwards;
    object-fit: cover;
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
              alt={photo.caption}
              key={`img${i + 1}`}
              src={photo.image_url}
              className={`img${i + 1}`}
            />
          );
        })}
      </Layout2Wrapper>
    );
};

export default Layout2;