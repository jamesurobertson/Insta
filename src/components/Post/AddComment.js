import React from "react";
import styled from "styled-components";


const AddCommentStyle = styled.div`
    height: 54px;

    .comment-post{
        bottom: 0px;
        width: 95%;
        border: none;
        height: 36px;
    }

    textarea{
        resize: none;
    }

    .button-post{
        border: none;
        padding: 0;
        color: blue;
        font-weight: 600;
        Background: none;
    }

    .comment-wrapper{
        border: 1px solid #262626
        height: 40px;

    }

    .form-post{
        bottom: 0px;
        border: 1px solid #262626
        height: 40px;
    }

    /* @media screen and (min-width: 319px) {
    width: 615px;
    height: 35px; */

    .form-post{
            display: none;
        }

    .comment-post{
        width:90%
    }
}

    @media screen and (min-width: 700px){
        .form-post{
            display: initial;
    }

`

const AddComment = () => {
    return (
        <AddCommentStyle>
            <form className='form-post'>
                <input className='comment-post' placeholder="Add a comment..." />
                <button className='button-post'>Post</button>
            </form>

        </AddCommentStyle>
    )
}


export default AddComment;
