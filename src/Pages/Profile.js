import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMiddle from "../components/Profile/ProfileMiddle";
import ProfilePosts from "../components/Profile/ProfilePosts";

const ProfileWrapper = styled.div`
  padding-top: 55px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 735px) {
    margin: auto;
    padding: 55px 20px;
    max-width: 975px;
  }
  /* @media screen and (min-width: 1000px) {
    width: 614px;
  } */
`;

const Home = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  console.log(windowSize)
  return (
    <ProfileWrapper>
      {windowSize < 735 ? (
        <>
          <ProfileHeader />
          <ProfileMiddle />{" "}
        </>
      ) : (
        ""
      )}
      <ProfilePosts />
    </ProfileWrapper>
  );
};

export default Home;
