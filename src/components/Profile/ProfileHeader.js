import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profile from "../../Images/profile.jpeg";
import { IoIosSettings } from "react-icons/io";

const ProfileHeaderContainer = styled.div`
  display: flex;
  height: 82px;
  margin: 30px 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileImgWrapper = styled.div`
  height: 82px;
  width: 77px;
  margin-right: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;

  @media screen and (min-width: 735px) {
    height: 150px;
    width: 150px;
  }
`;

const ButtonWrapper = styled.button`
  border: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: transparent;

`;


const ProfileDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 82px;

  @media screen and (max-width: 735px) {
    width: 100%;
  }

  .profile-details__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;

    .profile-details__username {
        width: 50vw;
        font-size: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }
  }
  button {
    height: 30px;
    background: transparent;
    padding: 5px 9px;
    border: 1px solid lightgray;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
  }
`;

const ProfileFullName = styled.div`
    padding: 0 16px 21px;
    font-weight: bold;
`

const ProfileHeader = (props) => {
  const [profImgUrl, setProfImgUrl] = useState(profile);

  const changeProfImg = () => {
    console.log("change profile picture!");
  };

  const editProfile = () => {
      console.log('edit profile!')
  }

  const logOut = () => {
      console.log(`logout!`)
  }

  console.log(window.innerWidth)
  return (
      <>
    <ProfileHeaderContainer>
      <ProfileImgWrapper>
        <ButtonWrapper onClick={changeProfImg}>
          <img src={profile} alt="avatar" />
        </ButtonWrapper>
      </ProfileImgWrapper>

      <ProfileDetails>
        <div className="profile-details__header">
          <div className="profile-details__username">jamesurobertson</div>
          <IoIosSettings onClick={logOut}/>

        </div>
        <button onClick={editProfile}>Edit Profile</button>
      </ProfileDetails>
    </ProfileHeaderContainer>
    <ProfileFullName>James Robertson</ProfileFullName>
    </>
  );
};

export default ProfileHeader;
