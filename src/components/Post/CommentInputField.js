import React, {useState, useContext} from "react";
import {backendURL} from '../../config'
import styled from "styled-components";
import {UserContext} from '../../context'


const CommentInputWrapper = styled.section`
    padding: 0 16px;
    height: 55px;
    max-height: 80px;
    border-top: 1px solid #dfdfdf;
    display: none;

    .comment-post{
        resize: none;
        max-height: 80px;
        width: 100%;
        border: none;
        outline: 0;
    }

    .button-post{
        border: none;
        padding: 0;
        color: #0096f5;
        font-weight: 600;
        background-color: transparent;
        outline: 0;
    }

    .form-post{
        height: 100%;
        display: flex;
    }

    /* @media screen and (min-width: 319px) {
    width: 615px;
    height: 35px; */

    @media screen and (min-width: 735px){
        display: block;
    }

`;

const CommentInputField = (props) => {
    const [content, setContent] = useState('');
    const { currentUserId } = useContext(UserContext)
    const { postId } = props


    const updateCommentState = (e) => {
        setContent(e.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = { content, userId: currentUserId, postId }
        const res = await fetch(`${backendURL}/comment`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (res.status !== 200) {
            console.log("Error, comment was not posted")
        }
        else {
            const content = await res.json()
            console.log(content)
            setContent(content)
        }
    }

    return (
        <CommentInputWrapper>
            <form className='form-post' onSubmit={handleSubmit}>
                <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
                <input className='comment-post'
                    placeholder="Add a comment..."
                    onChange={updateCommentState} />

                </div>
                <button type="submit" className='button-post'>Post</button>
            </form>
        </CommentInputWrapper>
    )

}

export default CommentInputField;
