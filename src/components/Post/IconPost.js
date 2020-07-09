import React from "react";
import styled from "styled-components";
import { RiHeartLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

const IconWrapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;

  .heart,
  .comment,
  .bookmark {
    margin: 0px 8px;
    background: none;
    color: inherit;
    border: none;
    padding: 0;

    .red {
      background: none;
    }

    .red--active {
      color: red;
    }

    .black {
      background: none;
    }

    .black--active {
      color: blue;
    }
  }
`;

const IconPost = () => {
  const likePost = (e) => {
    console.log("like post!");
    e.target.classList.toggle("red--active");
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
        <button onClick={likePost} className="heart">
          <RiHeartLine size={24} />
        </button>
        <button onClick={commentPost} className="comment">
          <FaRegComment size={24} />
        </button>
      </div>
      <div className="right-post-icons">
        <button onClick={savePost} className="bookmark">
          <FaRegBookmark size={24} />
        </button>
      </div>
    </IconWrapper>
  );
};

export default IconPost;
