import React from 'react';
import styled from "styled-components"
import {fadein} from "../../Styles/animations"



const Layout1Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr .97fr 1fr;
  grid-template-areas: "img1 img2 img3";
  grid-gap: 1vw;
  margin: 1vw 0;
  height: calc(100vw / 3);
  max-height: 312px;

  img {
    opacity: 0;
    height: 100%;
    width: 100%;
    animation: ${fadein} 2s .25s forwards;
    object-fit: cover;
  }

  .img1 {
    grid-area: img1;
  }
  .img2 {
    grid-area: img2;
  }
  .img3 {
    grid-area: img3;
  }
`;

const Layout1 = (props) => {
    return (
        <Layout1Wrapper>
            {props.componentPhotos.map((photo, i) => {
                return <img draggable={false} alt={photo.caption} key={`img${i + 1}`} src={photo.image_url} className={`img${i + 1}`} />;
            })}
        </Layout1Wrapper>
    );
};

export default Layout1;