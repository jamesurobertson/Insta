import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiHeartLine } from "react-icons/ri";

const CommentWrapper = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 5px 16px 0;
  line-height: 18px;

  .comment_username {
    font-weight: bold;
  }

  @media screen and (min-width: 735px) {
    padding: 5px 0 0 0;
  }

  .liked-comment {
    color: rgb(237, 73, 86);
  }

  .unliked-comment {
    color: #8E8E8E;
  }
`;

const Comment = () => {


    const likeComment = () => {
        console.log('like comment!')
    }
  return (
    <CommentWrapper>
      <div>
        <Link className="comment_username" to={`/profile/1`}>
          kingjames{" "}
        </Link>
        Welcome to the jungle we aint playing games. We aint got no money and
        you got the same disease.
      </div>
      <div>
        <RiHeartLine onClick={likeComment} className={true ? 'liked-comment' : 'unliked-comment'} />
      </div>
    </CommentWrapper>
  );
};

export default Comment;
