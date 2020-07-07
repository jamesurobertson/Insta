import React from "react";
import styled from "styled-components";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMiddle from "../components/Profile/ProfileMiddle";
import ProfilePosts from "../components/Profile/ProfilePosts";

const ProfileWrapper = styled.div`
  padding-top: 55px;
  width: 100%;


  @media screen and (min-width: 736px) {
    padding: 55px 30px;
  }
  /* @media screen and (min-width: 1000px) {
    width: 614px;
  } */

`;


const Home = () => {

  return (
      <ProfileWrapper>
          <ProfileHeader/>
          <ProfileMiddle/>
          <ProfilePosts/>
      </ProfileWrapper>
    )
};

export default Home;
