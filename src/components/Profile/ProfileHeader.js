import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import DynamicModal from "../DynamicModal";
import { IoIosSettings } from "react-icons/io";

const ProfileHeaderWrapper = styled.div`
  display: flex;
  height: 82px;
  margin: 30px 16px;
`;

const ProfileImgWrapper = styled.div`
  height: 82px;
  width: 77px;
  margin-right: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
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

const ProfileHeaderBig = styled.section`
  display: flex;
  height: 150px;
  max-width: 975px;
  margin-bottom: 44px;
`;

const BigProfileImageWrapper = styled(ProfileImgWrapper)`
  height: 150px;
  width: 150px;
  cursor: pointer;
`;

const BigProfileInfo = styled.section`
  width: 100%;

  .big-profile-details__header {
    display: flex;
    font-size: 28px;
    font-weight: normal;
    align-items: center;
    margin-bottom: 20px;
  }

  .big-profile__username {
    font-size: 28px;
  }

  .big-profile__editProfile-button {
    background-color: transparent;
    border: 1px solid lightgray;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 9px;
    margin-left: 20px;
    font-weight: bold;
    cursor: pointer;
  }

  .big-profile__logout-icon {
    margin-left: 5px;
    cursor: pointer;
  }

  .big-profile-details {
    display: flex;
    margin-bottom: 20px;
  }

  .big-profile__detail {
    margin-right: 40px;
  }
`;

const ProfileFullName = styled.div`
  padding: 0 16px 21px;
  font-weight: bold;
`;

Modal.setAppElement("#root");

const ProfileHeader = (props) => {
  // const [profImgUrl, setProfImgUrl] = useState(profile);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);

  const {
    windowSize,
    followers,
    follows,
    numPosts,
    userInfo: {
      id,
      bio,
      full_name: fullName,
      profile_image_url: profileImg,
      username,
    },
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
      zIndex: "10000",
    },
  };

  const changeProfImg = () => {
    console.log("change profile picture!");
  };

  const editProfile = () => {
    console.log("edit profile!");
  };

  const logOut = () => {
    console.log(`logout!`);
  };

  return (
    <>
      {windowSize < 735 ? (
        <ProfileHeaderWrapper>
          <ProfileImgWrapper>
            <ButtonWrapper onClick={changeProfImg}>
              <img src={profileImg} alt="avatar" />
            </ButtonWrapper>
          </ProfileImgWrapper>
          <ProfileDetails>
            <div className="profile-details__header">
              <div className="profile-details__username">{username}</div>
              <IoIosSettings onClick={logOut} />
            </div>
            <button onClick={editProfile}>Edit Profile</button>
          </ProfileDetails>
        </ProfileHeaderWrapper>
      ) : (
        <ProfileHeaderBig>
          <BigProfileImageWrapper onClick={changeProfImg}>
            <img src={profileImg} alt="avatar" />
          </BigProfileImageWrapper>
          <BigProfileInfo>
            <div className="big-profile-details__header">
              <div className="big-profile__username">{username}</div>
              <button
                className="big-profile__editProfile-button"
                onClick={editProfile}
              >
                {" "}
                Edit Profile
              </button>
              <IoIosSettings
                className="big-profile__logout-icon"
                onClick={logOut}
              />
            </div>
            <div className="big-profile-details">
              <div className="big-profile__detail">
                <span style={{ fontWeight: "bold" }}>{numPosts}</span> posts
              </div>
              <div
                className="big-profile__detail"
                style={{ cursor: "pointer" }}
                onClick={() => setIsFollowersOpen(true)}
              >
                <span style={{ fontWeight: "bold" }}>{followers.length}</span>{" "}
                followers
              </div>
              <div
                className="big-profile__detail"
                style={{ cursor: "pointer" }}
                onClick={() => setIsFollowingOpen(true)}
              >
                <span style={{ fontWeight: "bold" }}>{follows.length}</span>{" "}
                following
              </div>
            </div>
            <div style={{ fontWeight: "bold" }}>{fullName}</div>
          </BigProfileInfo>
        </ProfileHeaderBig>
      )}
      {windowSize < 735 ? <ProfileFullName>{fullName}</ProfileFullName> : ""}
      <Modal
        isOpen={isFollowersOpen}
        onRequestClose={closeFollowersModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DynamicModal title={"Followers"} id={id} followsList={follows} />
      </Modal>
      <Modal
        isOpen={isFollowingOpen}
        onRequestClose={closeFollowingModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DynamicModal title={"Following"} id={id} followsList={follows} />
      </Modal>
    </>
  );
};

export default ProfileHeader;
