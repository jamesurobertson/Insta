import React from "react";
import styled from "styled-components";

const PostWrapper = styled.div`
  .post-header-image {
    width: 100%;
    object-fit: cover;
  }
`;

const PhotoImagePost = ({postImg}) => {
  return (
    <PostWrapper>
      <img
        className="post-header-image"
        src={postImg}
        alt="feed-post"
      />
    </PostWrapper>
  );
};

export default PhotoImagePost;
