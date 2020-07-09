import React from "react";
import styled from "styled-components";
import PostHeader from "./PostHeader";
import PhotoImagePost from "./PhotoImagePost";
import IconPost from "./IconPost";
import PostCommentSection from "./PostCommentSection";
import CommentInputField from "./CommentInputField";

const PostWrapper = styled.div`
  width: 100%;
  max-width: 614px;
  background-color: white;

  @media screen and (min-width: 615px) {
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    margin-bottom: 60px;
    height: 318.66;
  }
`;

const Post = () => {
  return (
    <div style={{ dispaly: "flex", flexFlow: "column" }}>
      <PostWrapper>
        <PostHeader />
        <PhotoImagePost />
        <IconPost />
        <PostCommentSection />
        <CommentInputField />
      </PostWrapper>
      <PostWrapper>
        <PostHeader />
        <PhotoImagePost />
        <IconPost />
        <PostCommentSection />
        <CommentInputField />
      </PostWrapper>
    </div>
  );
};

export default Post;

//  align-items: stretch;
//   border: 0 solid #000;
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   flex-shrink: 0;
//   margin: 0;
//   padding: 0;

// @media screen and (max-width: 601px) {
//     width: 200px;
//   }
