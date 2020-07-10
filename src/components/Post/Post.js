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

const Post = ({ post }) => {
  const {
    id: postId,
    user_info: userInfo,
    comments,
    created_at: createdAt,
    caption,
    image_url: postImg,
    likeCount,
    user_id: userId,
  } = post;

  return (
    <div style={{ dispaly: "flex", flexFlow: "column" }}>
      <PostWrapper>
        <PostHeader userPic={userInfo.profilePic} username={userInfo.username} postId={postId} userId={userId}/>
        <PhotoImagePost postImg={postImg} />
        <IconPost postId={postId}/>
        <PostCommentSection postId={postId} username={userInfo.username} postUserId={userId} caption={caption} createdAt={createdAt} likeCount={likeCount} comments={comments}/>
        <CommentInputField />
      </PostWrapper>
    </div>
  );
};

export default Post;
