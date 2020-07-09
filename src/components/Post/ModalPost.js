import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import { AiOutlineConsoleSql } from "react-icons/ai";



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
   `

const ModalPost = ({postId, userId, closeModal}) => {

    const unfollowUser = (e) => {
        console.log(`Unfollowed user!`)
    }

    const copyLink =(e) => {
        console.log('copied post link!')
    }
    return (
        <ModalStyle>
            <button onClick={unfollowUser} id='button-unfollow' className='button-post'>Unfollow</button>
            <Link to={`/post/${postId}`} className='button-post'>Go To Post</Link>
            <button onClick={copyLink} className='button-post'>Copy Link</button>
            <button onClick={closeModal} id='button-cancel' className='button-post'>Cancel</button>
        </ModalStyle>
    )
}

export default ModalPost;
