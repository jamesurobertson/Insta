import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { backendURL } from "../../config";
import { UserContext, ProfileContext } from "../../context";
import CommentNotification from "./CommentNotification";
import FollowNotification from "./FollowNotification";
import LikeNotification from "./LikeNotification";

const NotificationsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  margin: auto;
  height: calc(100% - 54px);
  min-height: calc(100vh - 54px);
  width: 100%;
  max-width: 614px;
  margin-top: 54px;
  padding-top: 20px;
  padding-bottom: 54px;
  object-fit: cover;
  border: solid 1px #dfdfdf;

  & img {
    height: 100%;
    object-fit: cover;
  }

  & .avatar {
    border-radius: 50%;
  }

  & a {
    height: 100%;
    font-weight: 700;
    color: #0095f6;
  }

  & p {
    width: 100%;
    padding: 0 10px;
    font-size: 12px;
    text-align: left;
  }

  h1 {
    padding-bottom: 5px;
  }
`;

const Notifications = () => {
  const { currentUserId } = useContext(UserContext);
  const { profileData, setProfileData } = useContext(ProfileContext);
  const [toRender, setToRender] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!currentUserId) return;
    (async () => {
      try {
        const res = await fetch(`${backendURL}/profile/${currentUserId}`);

        if (!res.ok) throw res;

        const data = await res.json();

        setProfileData(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [currentUserId, setProfileData]);

  const loadMore = () => {
    if (!currentUserId) return;
    (async () => {
      try {
        const res = await fetch(
          `${backendURL}/note/${currentUserId}/scroll/${toRender.length}`
        );

        if (!res.ok) throw res;

        const { notifications } = await res.json();

        const nodeList = notifications.map((notification, i) => {
          switch (notification.type) {
            case "comment":
              return (
                <CommentNotification
                  style={{ animationDuration: `${1 + i * 0.25}s` }}
                  post={notification.post}
                  user={notification.user}
                  key={`${notification.type}-${notification.id}`}
                />
              );
            case "follow":
              return (
                <FollowNotification
                  style={{ animationDuration: `${1 + i * 0.25}s` }}
                  post={notification.post}
                  user={notification.user}
                  key={`${notification.type}-${notification.id}`}
                />
              );
            default:
              return (
                <LikeNotification
                  type={notification.likeable_type}
                  style={{ animationDuration: `${1 + i * 0.25}s` }}
                  post={notification.post}
                  user={notification.user}
                  key={`${notification.type}}-${notification.id}`}
                />
              );
          }
        });

        setToRender([...toRender, ...nodeList]);

        if (notifications.length < 20) {
          setHasMore(false);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  };
  if (!profileData) return null;
  return (
    <NotificationsWrapper>
      <h1>Notifications</h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={true}
      >
        {toRender}
      </InfiniteScroll>
    </NotificationsWrapper>
  );
};

export default Notifications;
