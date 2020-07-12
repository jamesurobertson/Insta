import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { backendURL } from "../../config";
import {fadeIn} from "../../Styles/animations"
import { UserContext, ProfileContext } from "../../context";

const FollowNotificationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px #dfdfdf solid;
  height: 50px;
  width: 100%;
  object-fit: cover;
  opacity: 0;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  button {
    height: 25px;
    background: transparent;
    padding: 5px 9px;
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    font-size: 12px;
    font-weight: bold;
  }
`;

const FollowNotification = (props) => {

    const { currentUserId } = useContext(UserContext);
    const { profileData, setProfileData } = useContext(ProfileContext);
    const [followingList, setFollowingList] = useState([])

    useEffect(()=>{
        if(!profileData) return
         const resFollowingList = profileData.followingList.map((followingEntry) => {
           return followingEntry.user_followed_id;
         });
         setFollowingList(resFollowingList);

    },[profileData, setFollowingList])



     const followUser = async () => {
       const body = { userId: currentUserId, userFollowedId: props.user.id };
       try {
         const res = await fetch(`${backendURL}/follow`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(body),
         });



         if (!res.ok) throw res;

         const response = await res.json();

         const updatesList = [...profileData.followingList, response];
         setProfileData({ ...profileData, ...{ followingList: updatesList } });
       } catch (e) {
         console.error(e);
       }
     };


      const unfollowUser = async () => {
        const body = { userId: currentUserId, userFollowedId: props.user.id };
        try {
          const res = await fetch(`${backendURL}/follow`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          if (!res.ok) throw res;

          const response = await res.json();


          const { user_followed_id: deletedId } = response;


          const filteredList = profileData.followingList.filter(
            (user) => user.user_followed_id !== deletedId
          );
          setProfileData({
            ...profileData,
            ...{ followingList: filteredList },
          });
        } catch (e) {
          console.error(e);
        }
      };

    if (!followingList) return null
    return (
      <FollowNotificationWrapper style={props.style}>
        <>
          <a href={`/profile/${props.user.id}`}>
            <img
              className="avatar"
              src={props.user.profile_image_url}
              alt={props.user.full_name}
            />
          </a>
          <p>
            <a href={`/profile/${props.user.id}`}>{props.user.username} </a>
            started following you!
          </p>
          {followingList.includes(props.user.id) ? (
            <div className="buttonWrapper">
              <button style={{ width: "85px" }} onClick={unfollowUser}>
                Following{" "}
              </button>
            </div>
          ) : (
            <div>
              <button
                style={{
                  width: "85px",
                  outline: "0",
                  backgroundColor: "#0096F5",
                  color: "white",
                }}
                onClick={followUser}
              >
                Follow
              </button>
            </div>
          )}
        </>
      </FollowNotificationWrapper>
    );
};

export default FollowNotification;
