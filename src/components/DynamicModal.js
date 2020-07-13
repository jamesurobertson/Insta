import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { UserContext, ProfileContext } from "../context";

const ModalWrapper = styled.div`
  width: 260px;
  max-height: 400px;

  .dynamic-modal__header {
    width: 100%;
    text-align: center;
    padding: 17px;
    background-color: white;
    border-bottom: 1px solid #dfdfdf;
  }

  .dynamic-modal__row {
    width: 100%;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    padding-bottom: 10px;
  }
  .dynamic-modal__row-image {
    display: flex;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin-top: -13px;
  }

  .user-row {
    display: flex;
    justify-content: flex-start;
  }

  .dynamic-modal__follow-button {
    padding: 9px 5px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    height: 33px;
    background-color: #0095f6;
    border-radius: 4px;
    border: none;
  }
  .dynamic-modal__username {
    font-size: 14px;
    font-weight: bold;
    color: #262626;
  }

  .dynamic-modal__fullName {
    font-size: 14px;
    color: #8e8e8e;
  }

  @media screen and (min-width: 735px) {
    width: 400px;
  }
`;

const DynamicModal = (props) => {
  const {
    title,
    closeModal,
    type,

  } = props;
  const [userArray, setUserArray] = useState([]);
  const [currentUserFollows, setCurrentUserFollows] = useState([]);
  const [endpoint, setEndpoint] = useState("");

  const { currentUserId } = useContext(UserContext);
  const {profileData} = useContext(ProfileContext);
  const {user: {id}} = profileData
  useEffect(() => {
    if (!currentUserId) return;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/follow/${currentUserId}/following`
        );

        if (!res.ok) throw res;

        const { users } = await res.json();
        const userIds = users.map((user) => user.id);
        setCurrentUserFollows(userIds);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [currentUserId]);


  useEffect(() => {
    let url;
    if (title === "Likes" && type === "post") {
      url = `post/${id}`;
    } else if (title === "Likes" && type === "comment") {
      url = `comment/${id}`;
    } else if (title === "Followers") {
      url = `api/follow/${id}`;
    } else {
      url = `api/follow/${id}/following`;
    }
    setEndpoint(url);
  }, [id, title, type]);

  useEffect(() => {
    if (!endpoint) return
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/${endpoint}`);

        if (!res.ok) throw res;

        const { users } = await res.json();
        setUserArray(users);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [currentUserFollows, endpoint]);

  const followUser = async (e, userFollowedId) => {
    e.preventDefault();
    const body = { userId: currentUserId, userFollowedId };
    try {
      const res = await fetch(`http://localhost:5000/api/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw res;

      const response = await res.json();
      const { user_followed_id: id } = response

      setCurrentUserFollows([...currentUserFollows, id]);
    } catch (e) {
      console.error(e);
    }
  };

  const unfollowUser = async (e, userFollowedId) => {
    e.preventDefault();
    const body = { userId: currentUserId, userFollowedId };
    try {
      const res = await fetch(`http://localhost:5000/api/follow`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw res;

      const {user_followed_id: id} = await res.json();

      let currentUserFollowsCopy = [...currentUserFollows];
      const index = currentUserFollowsCopy.indexOf(id);
      currentUserFollowsCopy.splice(index, 1);


      setCurrentUserFollows(currentUserFollowsCopy);



    } catch (e) {
        console.error(e);
    }
};
  if (!profileData) return null;
  return (
    <ModalWrapper>
      <h1 className="dynamic-modal__header">{title}</h1>
      {userArray.map((user) => {
        const {
          username,
          full_name: fullName,
          id,
          profile_image_url: profileImg,
        } = user;
        return (
          <div key={`userRow ${id}`} className="dynamic-modal__row">
            <div className="user-row">
              <Link onClick={() => closeModal()} to={`/profile/${id}`}>
                <img
                  className="dynamic-modal__row-image"
                  src={profileImg}
                  alt="corner-img"
                />
              </Link>

              <div>
                <Link onClick={() => closeModal()} to={`/profile/${id}`}>
                  <div className="dynamic-modal__username">{username}</div>
                </Link>
                <div className="dynamic-modal__fullName">{fullName}</div>
              </div>
            </div>
            {currentUserId === id ? (
              ""
            ) : currentUserFollows.includes(id) ? (
              <button
                style={{
                  outline: "0",
                  textAlign: "center",
                  border: "1px solid #dfdfdf",
                  backgroundColor: "white",
                  color: "#262626",
                }}
                onClick={(e) => unfollowUser(e, id)}
                className="dynamic-modal__follow-button"
              >
                Following
              </button>
            ) : (
              <button
                onClick={(e) => followUser(e, id)}
                className="dynamic-modal__follow-button"
              >
                Follow
              </button>
            )}
          </div>
        );
      })}
    </ModalWrapper>
  );
};

export default DynamicModal;
