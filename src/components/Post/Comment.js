import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RiHeartLine } from "react-icons/ri";
import { PostContext, UserContext } from "../../context";
import { backendURL } from "../../config";
import { toast } from "react-toastify";

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 5px 16px 0 0;
  line-height: 18px;

  .comment_username {
    font-weight: bold;
  }

  @media screen and (min-width: 735px) {
    padding: 5px 0 0 0;
  }

  .liked-comment {
    color: rgb(237, 73, 86);
  }

  .unliked-comment {
    color: #8e8e8e;
  }
`;

const Comment = ({ username, likesCommentList, content, userId, commentId }) => {
  const { postData, setPostData } = useContext(PostContext);
  const { currentUserId } = useContext(UserContext);
  const [likesCommentArr, setLikesCommentArr] = useState(likesCommentList)

  const likeComment = async () => {

    const body = {
      userId: currentUserId,
      likeableType: "comment",
      id: commentId,
    };
    try {
      const res = await fetch(`${backendURL}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw res;

      const response = await res.json();
      toast.info("Liked comment!", { autoClose: 1500 });

      const newLikes = [...likesCommentList, response]
      setLikesCommentArr(newLikes)

      let commentIdx
      if (postData) {

          const newComment = postData.comments.filter((comment, idx) => {

              if (comment.id === commentId) {
                commentIdx = idx
                return comment.id === commentId
              }
          })[0]

          newComment.likes_comment = newLikes

          const newPostData = {...postData}

          setPostData(newPostData)
      }


    } catch (e) {
      console.error(e);
    }
  };

  const unlikeComment = async () => {

    const body = {
      userId: currentUserId,
      likeableType: "comment",
      id: commentId,
    };
    try {
      const res = await fetch(`${backendURL}/like`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw res;


      const response = await res.json();
      toast.info("Unliked comment!", { autoClose: 1500 });

      console.log(likesCommentArr)
      const updatedList = likesCommentArr.filter(user => user.id !== currentUserId)
      setLikesCommentArr(updatedList)
      if (postData) {

          let commentIdx
          for (let i = 0; i < postData.comments.length; i++) {
              if (postData.comments[i].id === commentId) {
                  commentIdx = i
                  break
              }
          }

          const newList = postData.comments[commentIdx].likes_comment.filter(user => user.id !== currentUserId)

          const newPostData = {...postData}
          newPostData.comments[commentIdx].likes_comment = newList

          setPostData(newPostData)
      }

    } catch (e) {
      console.error(e);
    }
  };


  if (!likesCommentList) return null;
  return (
    <CommentWrapper>
      <div>
        <Link className="comment_username" to={`/profile/${userId}`}>
          {username}{" "}
        </Link>
        {content}
      </div>
      <div>
        {likesCommentArr.some((user) => user.id === currentUserId) ? (
          <RiHeartLine onClick={unlikeComment} className="liked-comment" />
        ) : (
          <RiHeartLine onClick={likeComment} className="unliked-comment" />
        )}
      </div>
    </CommentWrapper>
  );
};

export default Comment;
