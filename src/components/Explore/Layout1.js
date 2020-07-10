import React from 'react';
import {Link} from 'react-router-dom'
import { RiHeartLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import styled from "styled-components"
import {fadeIn} from "../../Styles/animations"



const Layout1Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.97fr 1fr;
  grid-template-areas: "img1 img2 img3";
  grid-gap: 1vw;
  margin: 1vw 0;
  height: calc(100vw / 3);
  max-height: 204px;
  overflow: hidden;

  & * {
    color: white;
    font-size: 2vw;
  }

  img {
    opacity: 0;
    height: 100%;
    width: 100%;
    animation: ${fadeIn} 2s 0.25s forwards;
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

  .explore-image-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    z-index: 2;
  }

  .explore-image-overlay:hover {
    opacity: 1;
  }
`;

const Layout1 = (props) => {
    return (
        <Layout1Wrapper>
            {props.componentPhotos.map((photo, i) => {
              return (
                <Link
                  key={`img${i + 1}`}
                  className={`img${i + 1}`}
                  style={{ position: "relative" }}
                  to={`/post/${photo.id}`}
                >
                  <div className={`explore-image-overlay`}>
                    <div style={{ color: "white", display: "flex", alignItems: "center" }}>
                      <RiHeartLine />
                      <div style={{ paddingLeft: "1vw" }}>
                        {photo["like_count"]}
                      </div>
                    </div>
                    <div style={{ color: "white", display: "flex", alignItems: "center" }}>
                      <FaRegComment />
                      <div style={{ paddingLeft: "1vw" }}>
                        {" "}
                        {photo["comment_count"]}
                      </div>
                    </div>
                  </div>
                  <img
                    className={`img${i + 1}`}
                    draggable={false}
                    src={photo.image_url}
                    alt={photo.caption}
                  />
                </Link>
              );
            })}
        </Layout1Wrapper>
    );
};

export default Layout1;