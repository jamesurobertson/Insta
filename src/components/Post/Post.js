import React from "react";
import styled from "styled-components";
import PostHeader from "./PostHeader";

const PostContainer = styled.div`
  height: 679px;
  width: 100%;
  max-width: 614px;

  @media screen and (min-width: 640px) {
    border: 1px solid red;
    border-radius: 3px;
    margin-top: 15px;
    width: 600px;
    height: 318.66;
  }
  @media screen and (min-width: 1000px) {
    width: 614px;
  }
`;

const Post = () => {
  return (
    <PostContainer>
      <PostHeader />
      {/* <PhotoImagePost />
                <IconBarImageC />
                <CommentImageContainer />
                <AddCommentImageContainer /> */}
      <p>Juno</p>
    </PostContainer>
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
