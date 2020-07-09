import React from "react";
import styled from "styled-components";

const PostWrapper = styled.div`
  .post-header-image {
    width: 100%;
    object-fit: cover;
  }
`;

const PhotoImagePost = () => {
  return (
    <PostWrapper>
      <img
        className="post-header-image"
        src="https://images.unsplash.com/photo-1573935146153-f6322e84d1e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
        alt="feed-post"
      />
    </PostWrapper>
  );
};

export default PhotoImagePost;
