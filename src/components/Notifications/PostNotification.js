import React from "react";
import styled from "styled-components";
import { fadeIn } from "../../Styles/animations";

const PostNotificationWrapper = styled.div`
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

const PostNotification = (props) => {
  return (
    <PostNotificationWrapper style={props.style}>
      <>
        <a href={`/profile/${props.user.id}`}>
          <img
            className="avatar"
            src={props.user.image_url}
            alt={props.user.caption}
          />
        </a>
        <p>
          <a href={`/profile/${props.user.id}`}>{props.user.name} </a> posted a
          <a href={`/post/${props.post.id}`}> photo</a>
        </p>
        <a href={`/post/${props.post.id}`}>
          <img src={props.post.image_url} alt={props.post.caption} />
        </a>
      </>
    </PostNotificationWrapper>
  );
};

export default PostNotification;
