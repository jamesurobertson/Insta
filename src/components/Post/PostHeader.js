import React from "react";
import styled from "styled-components";

const PostHeaderContainer = styled.div`
  align-items: center;
  flex-direction: row;
  height: 60px;
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid black;
`;


const PostHeader = () => {
  return (
      <PostHeaderContainer>
        <img/>


        <p>Juno</p>
      </PostHeaderContainer>
  );
};

export default PostHeader;
