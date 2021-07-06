import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ModalStyle = styled.div`
    width: 80vw;
    max-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .button-post {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        font-size: 16px;
        color: #0095f6;
        font-weight: bold;
        background: white;
        border: none;
        border-bottom: 1px solid #dfdfdf;
        outline: none;
    }

    #button-unfollow {
        color: red;
        font-weight: 600;
    }
    #button-cancel {
        border: none;
        color: #262626;
        cursor: pointer;
    }

    button:active {
        background: #dfdfdf;
        outline: none;
    }
`;

const ModalPost = (props) => {
    const { postId, closeModal } = props;
    return (
        <ModalStyle>
            {window.location.href.includes('/post/') ? (
                ''
            ) : (
                <Link to={`/post/${postId}`} className='button-post'>
                    Go To Post
                </Link>
            )}
            <CopyToClipboard
                style={{ cursor: 'pointer' }}
                text={window.location.href}
            >
                <button
                    onClick={() => {
                        toast.info('Copied to clipboard!');
                        closeModal();
                    }}
                    className='button-post'
                >
                    Copy Link
                </button>
            </CopyToClipboard>
            <button
                onClick={closeModal}
                id='button-cancel'
                className='button-post'
            >
                Cancel
            </button>
        </ModalStyle>
    );
};

export default ModalPost;
