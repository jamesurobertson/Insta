import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GrGrid } from "react-icons/gr";
import { FaRegBookmark } from "react-icons/fa";

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
    display: block;
  }
  @media screen and (min-width: 735px) {
    border-top: none;
    height: 0;
    padding: 0;

    .profile-middle__data {
      display: none;
    }
  }
`;

const ProfileMiddleIcons = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  border-bottom: 1px solid lightgray;

  .middle-icon-label {
    padding-left: 5px;
    font-size: 14px;
    font-weight: bold;
    color: grey;
    text-align: center;
  }

  & a {
      height: 100%;
      display: flex;
      align-items: center;
      flex: 0;
  }

  .active-profile-link .middle-icon-label {
      color: black;
  }

  @media screen and (min-width: 735px) {
      border-bottom: none;
  }

`;

const ProfileMiddle = (props) => {
    const {windowSize, numFollowers, numFollows, numPosts} = props
  return (
    <>
      <ProfileMiddleDataWrapper>
        <div className="profile-middle__data">
          <div>{numPosts}</div>
          <div>posts</div>
        </div>
        <div className="profile-middle__data">
          <div>{numFollowers}</div>
          <div>followers</div>
        </div>
        <div className="profile-middle__data">
          <div>{numFollows}</div>
          <div>following</div>
        </div>
      </ProfileMiddleDataWrapper>
      <ProfileMiddleIcons>
        <NavLink exact to="/profile" activeClassName='active-profile-link'>
          {windowSize < 735 ? (
            <GrGrid size="1.5em" style={{color: 'red'}} />
          ) : (
            <>
              <GrGrid size="1em" />
              <span className="middle-icon-label">POSTS</span>
            </>
          )}
        </NavLink>
        <NavLink to="/profile/saved" activeClassName='active-profile-link'>
          {windowSize < 735 ? (
            <FaRegBookmark size="1.5em"/>
          ) : (
            <>
              <FaRegBookmark size="1em" />
              <span className="middle-icon-label">SAVED</span>
            </>
          )}
        </NavLink>
      </ProfileMiddleIcons>
    </>
  );
};

export default ProfileMiddle;
