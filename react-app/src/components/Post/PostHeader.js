import { useState, useRef } from 'react';
import styled from 'styled-components';
import ModalPost from './ModalPost';
import Modal from 'react-modal';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const PostHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 16px;

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
    font-size: 14px;
    font-weight: 600;
  }

  .header-photo{
    display: flex;
    align-items: center;
  }

  .ellipsis-button{
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .ReactModal__Body--open {
  overflow-y: hidden;
  }
}
`;

const PostHeader = ({
    id: postId,
    user: { profile_image_url: userPic, username, id: userId },
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const outside = useRef();

    Modal.setAppElement('#root');

    const closeModal = () => {
        setIsOpen(false);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: '0',
            borderRadius: '5px',
            transform: 'translate(-50%, -50%)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: '1000',
        },
    };

    return (
        <PostHeaderWrapper ref={outside}>
            <div className='header-photo'>
                <Link to={`/profile/${userId}`}>
                    <img
                        className='post-header-image'
                        src={userPic}
                        alt='corner-img'
                    />
                </Link>
                <Link className='post-header-name' to={`/profile/${userId}`}>
                    {username}
                </Link>
            </div>
            <button className='ellipsis-button' onClick={() => setIsOpen(true)}>
                <div className='ellipsis'>
                    <AiOutlineEllipsis size='2em' />
                </div>
            </button>
            {/* {isOpen ? (<div className='Modal'><ModalPost /></div>) : null} */}
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Example Modal'
            >
                <ModalPost
                    closeModal={closeModal}
                    postId={postId}
                    userId={userId}
                />
            </Modal>
        </PostHeaderWrapper>
    );
};

export default PostHeader;
