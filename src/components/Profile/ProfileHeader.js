import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import DynamicModal from "../DynamicModal";
import { IoIosSettings } from "react-icons/io";
import { ProfileContext, UserContext } from "../../context";

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
    border: 1px solid #dfdfdf;
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
    border: 1px solid #dfdfdf;
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
  padding: 0 16px 11px;
  font-weight: bold;
`;

const ProfileBio = styled.div`
  padding: 0 16px 21px;
`;

Modal.setAppElement("#root");

const ProfileHeader = (props) => {
  const { windowSize } = props;
  const { profileData } = useContext(ProfileContext);
  const { currentUserId } = useContext(UserContext);
  const {
    num_posts: numPosts,
    followingList,
    user: {
      id: profileId,
      bio,
      profile_image_url: profileImg,
      username,
      full_name: fullName,
    },
  } = profileData;

  // const [profImgUrl, setProfImgUrl] = useState(profile);
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [currentUserFollowingList, setCurrentUserFollowingList] = useState([]);

  useEffect(() => {
    console.log(`yaaa`, followingList)
    const list = followingList.map((user) => user.id);
    setCurrentUserFollowingList(list);
  }, [followingList]);

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

  const changeProfImg = () => {
    console.log("change profile picture!");
  };

  const editProfile = () => {
    console.log("edit profile!");
  };

  const logOut = () => {
    console.log(`logout!`);
  };

  const followUser = () => {
    console.log("follow user!");
  };

  const unfollowUser = () => {
    console.log("follow user!");
  };

  if (!profileData) return null;
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
            {currentUserId == profileId ? (
              <button onClick={editProfile}>Edit Profile</button>
            ) : currentUserFollowingList.includes(profileId) ?
              <button style={{ width: "85px" }} onClick={unfollowUser}>
                Following </button> : <button style={{ width: "85px" }} onClick={followUser}>
                Follow
              </button>
            }
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
              {currentUserId == profileId ? (
                <button
                  className="big-profile__editProfile-button"
                  onClick={editProfile}
                >
                  Edit Profile
                </button>
              ) : currentUserFollowingList.includes(profileId) ? (
                <button
                  className="big-profile__editProfile-button"
                  onClick={unfollowUser}
                >
                  Following
                </button>
              ) : (
                <button
                  className="big-profile__editProfile-button"
                  onClick={followUser}
                >
                  Follow
                </button>
              )}

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
                <span style={{ fontWeight: "bold" }}>
                  {profileData.followersList.length}
                </span>{" "}
                followers
              </div>
              <div
                className="big-profile__detail"
                style={{ cursor: "pointer" }}
                onClick={() => setIsFollowingOpen(true)}
              >
                <span style={{ fontWeight: "bold" }}>
                  {profileData.followingList.length}
                </span>{" "}
                following
              </div>
            </div>
            <div style={{ fontWeight: "bold" }}>{fullName}</div>
            <div style={{ paddingTop: "5px" }}>{bio}</div>
          </BigProfileInfo>
        </ProfileHeaderBig>
      )}
      {windowSize < 735 ? (
        <>
          <ProfileFullName>{fullName}</ProfileFullName>
          <ProfileBio>{bio}</ProfileBio>
        </>
      ) : (
        ""
      )}
      <Modal
        isOpen={isFollowersOpen}
        onRequestClose={closeFollowersModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DynamicModal
          closeModal={closeFollowersModal}
          title={"Followers"}
          type={"post"}
        />
      </Modal>
      <Modal
        isOpen={isFollowingOpen}
        onRequestClose={closeFollowingModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DynamicModal
          closeModal={closeFollowingModal}
          title={"Following"}
          type={"post"}
        />
      </Modal>
    </>
  );
};

export default ProfileHeader;
