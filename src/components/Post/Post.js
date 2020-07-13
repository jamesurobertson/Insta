import React, {useState} from "react";
import styled from "styled-components";
import PostHeader from "./PostHeader";
import PhotoImagePost from "./PhotoImagePost";
import IconPost from "./IconPost";
import PostCommentSection from "./PostCommentSection";
import CommentInputField from "./CommentInputField";

const PostWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;

  @media screen and (min-width: 640px) {
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    margin-bottom: 60px;
    height: 318.66;
  }
`;

const Post = (props) => {
  const [postId, setPostId] = useState(props.post.id)
  const [userInfo, setUserInfo] = useState(props.post.user_info)
  const [commentsList, setCommentsList] = useState(props.post.comments.commentsList)
  const [total, setTotal] = useState(props.post.comments.total)
  const [createdAt, setCreatedAt] = useState(props.post.created_at)
  const [caption, setCaption] = useState(props.post.caption)
  const [postImg, setPostImg] = useState(props.post.image_url)
  const [userId, setUserId] = useState(props.post.user_id)
  const [likesList, setLikesList] = useState(props.post.likesList)

  return (
    <div className="Pst"style={{ dispaly: "flex", flexFlow: "column" }}>
      <PostWrapper>
        <PostHeader userPic={userInfo.profilePic} username={userInfo.username} postId={postId} userId={userId}/>
        <PhotoImagePost postImg={postImg} />
        <IconPost postId={postId} likesList={likesList} setLikes={setLikesList}/>
        <PostCommentSection postId={postId} username={userInfo.username} postUserId={userId} caption={caption} createdAt={createdAt} likeCount={likesList.length} commentsList={commentsList} total={total}/>
        <CommentInputField />
      </PostWrapper>
    </div>
  );
};

export default Post;
