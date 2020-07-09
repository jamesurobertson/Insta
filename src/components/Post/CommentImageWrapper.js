import React, { useState } from "react";
import DynamicModal from '../DynamicModal';
import Modal from 'react-modal';
import styled from "styled-components";


const CommentWrapper = styled.div`
    border-bottom: 1px solid #dfdfdf;
    padding: 0px 28px;
    height: 149px;

    .like-button, .user-name{
        font-weight: 600;
        font-size: 14px;

    }
    .like-button{
        border: none;
        padding-left: initial;
        background: none;
    }

    p{
        margin: 13px 0px 0px -5px;
        padding: 0px 0px 0px 5px;
    }

    // @media screen and (min-width: 319px) {
    //     border: none;
    // }

`
Modal.setAppElement('#root')

const CommentImageWrapper = () => {
    const [isOpen, setIsOpen] = useState(false);


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
            padding: '0',
            borderRadius: '5px',
            transform: "translate(-50%, -50%)"
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "10000"
        },
    };

    return (
        <CommentWrapper>
            <button className="like-button" onClick={() => setIsOpen(true)}>5,000,000,000 likes</button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <DynamicModal closeModal={closeModal} title={'Likes'} type={'post'}/>
            </Modal>
            <p>
                <a href="d" className="user-name">kingjames</a>
                <span>Welcome to the jungle we aint playing games. We aint got no money and you got the same disease.</span>
            </p>
            <p>
                <a href="dsfd" className="user-name">kingjames</a>
                <span>Welcome to the jungle we aint playing games. We aint got no money and you got the same disease.</span>
            </p>

        </CommentWrapper >
    )
}


export default CommentImageWrapper;
