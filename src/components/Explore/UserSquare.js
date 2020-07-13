import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fadeIn } from "../../Styles/animations";

const UserSquareWrapper = styled.div`
  & * {
    color: white;
    font-size: 2vw;
  }

  img {
    opacity: 0;
    height: 100%;
    width: calc(95vw / 3);
    max-width: calc(614px / 3);

    animation: ${fadeIn} 1s forwards;
    object-fit: cover;
    padding: 0.5vw;
  }

  .search-image-overlay {
    position: absolute;
    height: calc(95vw / 3);
    max-height: calc(614px / 3);
    width: calc(95vw / 3);
    max-width: calc(614px / 3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.3);
    overflow: hidden;
    z-index: 2;
  }

  .search-image-overlay:hover {
    opacity: 1;
  }
`;

const UserSquare = (props) => {
  const {result} = props
  return (
    <UserSquareWrapper>
          <Link
            key={`result-${result.id}`}
            className={`result-${result.id}`}
            style={{ position: "relative" }}
            to={`/profile/${result.id}`}
          >
            <div className={`search-image-overlay`}>
             <h3>{result.full_name}</h3>

            </div>
            <img
              className={`result-${result.id}`}
              draggable={false}
              src={result.profile_image_url || 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png'}
              alt={result.full_name}
            />
          </Link>
    </UserSquareWrapper>
  )
};

export default UserSquare;
