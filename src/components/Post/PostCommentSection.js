import React, { useState } from "react";
import DynamicModal from "../DynamicModal";
import Modal from "react-modal";
import styled from "styled-components";
import Comment from './Comment'

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
      color: #8E8E8E;
  }
`;
Modal.setAppElement("#root");

const PostCommentSection = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        5,000,000,000 likes
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <DynamicModal closeModal={closeModal} title={"Likes"} type={"post"} />
      </Modal>
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
      <div className='post-date-created'>6 HOURS AGO</div>
    </CommentWrapper>
  );
};

export default PostCommentSection;
