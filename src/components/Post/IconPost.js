import React from "react";
import styled from "styled-components";
import { RiHeartLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import {Link} from 'react-router-dom'

const IconWrapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;

  .comment,
  .bookmark {
    margin: 0px 8px;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
  }

    .liked-post {
      color: rgb(237, 73, 86);
    }

    .unliked-post {
      color: #262626;
    }
  }
`;

const IconPost = ({ postId }) => {
    // TODO: LOGIC FOR CURRENT USER LIKING A POST- from context?
  const likePost = (e) => {
    console.log("like post!");
    e.target.classList.toggle("liked-post");
  };
  const commentPost = () => {
    console.log("comment post!");
  };
  const savePost = () => {
    console.log("save post!");
  };

  return (
    <IconWrapper>
      <div className="left-post-icons">
        <RiHeartLine
          size={24}
          onClick={likePost}
          className={true ? "liked-post" : "unliked-post"}
        />
        <Link to={`/post/${postId}`} onClick={commentPost} className="comment">
          <FaRegComment size={24} />
        </Link>
      </div>
      <div className="right-post-icons">
          <FaRegBookmark onClick={savePost}  size={24} />
      </div>
    </IconWrapper>
  );
};

export default IconPost;
