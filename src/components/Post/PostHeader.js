import React, { useState, useRef } from "react";
import styled from "styled-components";
import ModalPost from "./ModalPost"
import Modal from 'react-modal'
import { FaEllipsisH } from 'react-icons/fa';

const PostHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 16px;
  border-bottom: 1px solid #dfdfdf;

  .post-header-image {
    display: flex;
    height: 37px;
    width: 37px;
    border-radius: 50%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

  .post-header-name {
    padding-left: 10px;
  }

  .header-photo{
    display: flex;
    align-items: center;
  }

  .ellipsis-button{
    background: none;
    border: none;
    padding: 0;
  }

  .ReactModal__Body--open {
  overflow-y: hidden;
}
  }
`;


const PostHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const outside = useRef()

  Modal.setAppElement('#root')

  const closeModal = () => {
    setIsOpen(false)
  }

  const customStyles = {

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      // width: '400px',
      padding: '0',
      borderRadius: '5px',
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: '1000'
    },
  };

  return (
    <PostHeaderWrapper ref={outside}>
      <div className="header-photo">
        <img
          className="post-header-image"
          src="https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-19/s150x150/83700920_480186686267142_2503895191161667584_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_ohc=LsIa8jPnOeEAX_QYVS3&oh=09778b07f671ce0b13ff919809ee5067&oe=5F2E8038"
          alt="corner-img" />
        <p className="post-header-name">KingJames</p>
      </div>
      <button className='ellipsis-button' onClick={() => setIsOpen(true)}>
        <div className="ellipsis"><FaEllipsisH /></div>
      </button>
      {/* {isOpen ? (<div className='Modal'><ModalPost /></div>) : null} */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalPost />
      </Modal>
    </PostHeaderWrapper>
  );
};

export default PostHeader;
