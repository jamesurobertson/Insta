import React from "react";
import styled from "styled-components";
import { fadeIn } from "../../Styles/animations";


const CommentNotificationWrapper = styled.div`
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

const CommentNotification = (props) => {
  return (
    <CommentNotificationWrapper style={props.style}>
      <>
        <a href={`/profile/${props.user.id}`}>
          <img
            className="avatar"
            src={props.user.image_url}
            alt={props.user.caption}
          />
        </a>
        <p>
          <a href={`/profile/${props.user.id}`}>{props.user.name} </a>
          commented on your
          <a href={`/post/${props.post.id}`}> post</a>
        </p>
        <a href={`/post/${props.post.id}`}>
          <img src={props.post.image_url} alt={props.post.caption} />
        </a>
      </>
    </CommentNotificationWrapper>
  );
};

export default CommentNotification;
