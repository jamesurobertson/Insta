import React, { useState } from "react";
import DynamicModal from "../DynamicModal";
import Modal from "react-modal";
import styled from "styled-components";
import Comment from "./Comment";
import {Link} from "react-router-dom"

const CommentWrapper = styled.div`
  padding: 0px 16px 16px;

  .like-button,
  .user-name {
    font-weight: 600;
    font-size: 14px;
  }
  .like-button {
    border: none;
    padding-left: initial;
    background: none;
  }

  .post-date-created {
    padding-top: 5px;
    font-size: 11px;
    color: #8e8e8e;
  }

  .comments__view-all {
    padding: 16px;
    color: #0095F6;

    @media screen and (min-width: 735px) {
      padding: 0;
    }
  }



`;
Modal.setAppElement("#root");

const PostCommentSection = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    likeCount,
    caption,
    comments: { commentsList, total },
    createdAt,
    postUserId,
    username,
    postId
  } = props;

  const closeModal = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      borderRadius: "5px",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "10000",
    },
  };

  return (
    <CommentWrapper>
      <button className="like-button" onClick={() => setIsOpen(true)}>
        {likeCount} likes
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DynamicModal closeModal={closeModal} title={"Likes"} type={"post"} />
      </Modal>
      <Comment userId={postUserId} username={username} content={caption} ></Comment>
      {total > 2 ? <Link className='comments__view-all' to={`/post/${postId}`}>
          {`View all ${total} comments`}
      </Link>: ''}
      {commentsList.map((comment) => {
          const {id, user_id, username: {username}, likesComment, content} = comment
        return <Comment key={`post-comment-${id}`} userId={user_id} username={username} likesComment={likesComment} content={content} ></Comment>;
      })}
      <div className="post-date-created">6 HOURS AGO</div>
    </CommentWrapper>
  );
};

export default PostCommentSection;
