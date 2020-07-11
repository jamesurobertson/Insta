import React from "react";
import styled from "styled-components";

const PostImageWrapper = styled.div`
    width: 100%;
    max-width: 600px;
  .post-header-image {
    width: 100%;
    object-fit: cover;
  }
`;

const PhotoImagePost = ({postImg}) => {
  return (
    <PostImageWrapper>
      <img
        className="post-header-image"
        src={postImg}
        alt="feed-post"
      />
    </PostImageWrapper>
  );
};

export default PhotoImagePost;
