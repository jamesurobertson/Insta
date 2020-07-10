import React from "react";
import { Link } from "react-router-dom";
import { RiHeartLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import styled from "styled-components";
import { fadeIn } from "../../Styles/animations";

const Layout3Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
    "img1 big"
    "img2 big";
  grid-gap: 1vw;
  margin-bottom: 1vw;
  height: calc((100vw / 3) * 2);
  max-height: 409px;

  img {
    height: 100%;
    width: 100%;
    opacity: 0;
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
    grid-area: big;
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
    background-size: 100% 100%;
    overflow: hidden;
    z-index: 2;
  }

  .explore-image-overlay:hover {
    opacity: 1;
  }
`;

const Layout3= (props) => {
    return (
      <Layout3Wrapper>
        {props.componentPhotos.map((photo, i) => {
          return (
            <Link
              key={`img${i + 1}`}
              className={`img${i + 1}`}
              style={{ position: "relative" }}
              to={`/post/${photo.id}`}
            >
              <div className={`explore-image-overlay`}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RiHeartLine />
                  <div style={{ paddingLeft: "1vw" }}>
                    {photo["like_count"]}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
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
      </Layout3Wrapper>
    );
};

export default Layout3;