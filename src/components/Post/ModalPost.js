import React, { useState } from "react";
import styled from "styled-components";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'


const ModalStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .button-post{
        height: 48px;
        background: white;
        border: none;
        border-bottom: 1px solid #dfdfdf;
        outline: none;
    }

    #button-unfollow{
        color: red;
        font-weight: 600;
    }
    #button-cancel{
        border: none;
    }

    button:active{
        background: #dfdfdf;
        outline: none;
    }

}
   `;

const ModalPost = ({ postId, userId, closeModal }) => {
    const [value, setValue] = useState('');
    const [copied, setCopied] = useState(false);

    const unfollowUser = (e) => {
        console.log(`Unfollowed user!`)
    }

    return (
        <ModalStyle>
            <button onClick={unfollowUser} id='button-unfollow' className='button-post'>Unfollow</button>
            <Link to={`/post/${postId}`} className='button-post'>Go To Post</Link>
            <CopyToClipboard text={`${window.location.href}/post/${postId}`} onCopy={() => setCopied(true)}>
                <button onClick={({ target: { value } }) => {
                    setValue(value);
                    setCopied(false);
                    toast.info('copied to clipboard!')
                    closeModal()
                }} className='button-post'>Copy Link</button>
            </CopyToClipboard>
            <button onClick={closeModal} id='button-cancel' className='button-post'>Cancel</button>
        </ModalStyle >
    )
}

export default ModalPost;
