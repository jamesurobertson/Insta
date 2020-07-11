import React from "react";
import styled from "styled-components";
import { fadeIn } from "../../Styles/animations";

const LikeNotificationWrapper = styled.div`
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
`;

const LikeNotification = (props) => {
  return (
    <LikeNotificationWrapper style={props.style}>
      <>
        <a href={`/profile/${props.user.id}`}>
          <img
            className="avatar"
            src={props.user.profile_image_url}
            alt={props.user.full_name}
          />
        </a>
        <p>
          <a href={`/profile/${props.user.id}`}>{props.user.username} </a> liked your
          <a href={`/post/${props.post.id}`}> {props.type}</a>
        </p>
        <a href={`/post/${props.post.id}`}>
          <img src={props.post.image_url} alt={props.post.caption} />
        </a>
      </>
    </LikeNotificationWrapper>
  );
};

export default LikeNotification;
