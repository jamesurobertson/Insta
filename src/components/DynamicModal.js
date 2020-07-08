import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  width: 260px;
  max-height: 400px;

  .dynamic-modal__header {
    width: 100%;
    text-align: center;
    padding: 17px;
    background-color: white;
    border-bottom: 1px solid lightgrey;
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
  const { title, type, id, followsList } = props;
  const [userArray, setUserArray] = useState([]);
  const [follows, setFollows] = useState([])

  useEffect(() => {
    (async () => {
      let endpoint;
      if (title === "Likes" && type === "post") {
        endpoint = `post/${id}`;
      } else if (title === "Likes" && type === "comment") {
        endpoint = `comment/${id}`;
      } else if (title === "Followers") {
        endpoint = `api/follow/${id}`;
      } else {
        endpoint = `api/follow/${id}/following`;
      }

      try {
        const res = await fetch(`http://localhost:5000/${endpoint}`);

        if (!res.ok) throw res;

        const { users } = await res.json();
        setUserArray(users);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
      let followsIdList = []
      followsList.forEach(user => {
          followsIdList.push(user.user_followed_id)
      })
      setFollows(followsIdList)
  }, [followsList])

  const followUser = (e, id) => {
    e.preventDefault();
    console.log(`follow user ${id}!`);
  };

  const unfollowUser = (e, id) => {
    e.preventDefault();
    console.log(`unfollow user ${id}!`);
  };
  if (!userArray) return null;
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
              <img
                className="dynamic-modal__row-image"
                src={profileImg}
                alt="corner-img"
              />

              <div>
                <div className="dynamic-modal__username">{username}</div>
                <div className="dynamic-modal__fullName">{fullName}</div>
              </div>
            </div>
            {follows.includes(id) ? <button style={{ outline: '0', textAlign: 'center', border: '1px solid lightgrey', backgroundColor: 'white', color: '#262626'}}
              onClick={(e) => unfollowUser(e, id)}
              className="dynamic-modal__follow-button"
            >
              Following
            </button> : <button
              onClick={(e) => followUser(e, id)}
              className="dynamic-modal__follow-button"
            >
              Follow
            </button>}
          </div>
        );
      })}
    </ModalWrapper>
  );
};

export default DynamicModal;
