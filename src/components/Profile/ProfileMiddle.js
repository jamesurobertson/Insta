import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GrGrid } from "react-icons/gr";

const ProfileMiddleDataWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 61px;
  padding: 12px 0;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;

  .profile-middle__data {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileMiddleIcons = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  padding-top: 4px;
  border-bottom: 1px solid lightgray;
`;

const ProfileMiddle = () => {
  return (
    <>
      <ProfileMiddleDataWrapper>
        <div className="profile-middle__data">
          <div>64</div>
          <div>posts</div>
        </div>
        <div className="profile-middle__data">
          <div>64</div>
          <div>followers</div>
        </div>
        <div className="profile-middle__data">
          <div>64</div>
          <div>following</div>
        </div>
      </ProfileMiddleDataWrapper>
      <ProfileMiddleIcons>
        <Link to="/profile">
          <GrGrid size="1.5em" />
        </Link>
        <Link to="/profile/saved">
          <GrGrid size="1.5em" />
        </Link>
      </ProfileMiddleIcons>
    </>
  );
};

export default ProfileMiddle;
