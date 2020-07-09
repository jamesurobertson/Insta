import React, { useState, useContext} from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GrGrid } from "react-icons/gr";
import { FaRegBookmark } from "react-icons/fa";
import DynamicModal from "../DynamicModal";
import Modal from "react-modal";
import {ProfileContext} from '../../context'


const ProfileMiddleDataWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 61px;
  padding: 12px 0;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;

  .profile-middle__data {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media screen and (min-width: 735px) {
    border-top: none;
    height: 0;
    padding: 0;

    .profile-middle__data {
      display: none;
    }
  }

  .profile-data__number {
    font-weight: bold;
  }
`;

const ProfileMiddleIcons = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  border-bottom: 1px solid #dfdfdf;

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
    color: #262626;
  }

  @media screen and (min-width: 735px) {
    border-bottom: none;
  }
`;

const ProfileMiddle = (props) => {
  const {profileData} = useContext(ProfileContext)
  const {num_posts: numPosts} = profileData

  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const {
    windowSize
  } = props;


  const closeFollowersModal = () => {
    setIsFollowersOpen(false);
  };

  const closeFollowingModal = () => {
    setIsFollowingOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      borderRadius: "5px",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "500",
    },
  };

  return (
    <>
      <ProfileMiddleDataWrapper>
        <div className="profile-middle__data">
          <div className="profile-data__number">{numPosts}</div>
          <div>posts</div>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setIsFollowersOpen(true)}
          className="profile-middle__data"
        >
          <div className="profile-data__number">{profileData.followersList.length}</div>
          <div>followers</div>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setIsFollowingOpen(true)}
          className="profile-middle__data"
        >
          <div className="profile-data__number">{profileData.followingList.length}</div>
          <div>following</div>
        </div>
      </ProfileMiddleDataWrapper>
      <ProfileMiddleIcons>
        <NavLink exact to="/profile" activeClassName="active-profile-link">
          {windowSize < 735 ? (
            <GrGrid size="1.5em" style={{ color: "red" }} />
          ) : (
            <>
              <GrGrid size="1em" />
              <span className="middle-icon-label">POSTS</span>
            </>
          )}
        </NavLink>
        <NavLink to="/profile/saved" activeClassName="active-profile-link">
          {windowSize < 735 ? (
            <FaRegBookmark size="1.5em" />
          ) : (
            <>
              <FaRegBookmark size="1em" />
              <span className="middle-icon-label">SAVED</span>
            </>
          )}
        </NavLink>
      </ProfileMiddleIcons>
      <Modal
        isOpen={isFollowersOpen}
        onRequestClose={closeFollowersModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DynamicModal closeModal={closeFollowersModal} title={"Followers"}/>
      </Modal>
      <Modal
        isOpen={isFollowingOpen}
        onRequestClose={closeFollowingModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DynamicModal closeModal={closeFollowingModal} title={"Following"}/>
      </Modal>
    </>
  );
};

export default ProfileMiddle;
