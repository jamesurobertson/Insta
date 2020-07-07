import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProfilePostWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    opacity: 75%;
  }
`;

const ProfilePost = ({ post }) => {
  return (
    <ProfilePostWrapper>
      <Link to="/post/id">
        <img src={post} alt="img" />
      </Link>
    </ProfilePostWrapper>
  );
};

export default ProfilePost;
