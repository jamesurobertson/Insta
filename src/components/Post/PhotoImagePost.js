import React from "react";
import styled from "styled-components";

const PostWrapper = styled.div`
    width: 100%;
    max-width: 600px;
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
