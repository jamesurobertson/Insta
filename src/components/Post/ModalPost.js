import React from "react";
import styled from "styled-components";



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

const ModalPost = () => {
    return (
        <ModalStyle>
            <button id='button-unfollow' className='button-post'>Unfollow</button>
            <button className='button-post'>Go To Post</button>
            <button className='button-post'>Copy Link</button>
            <button id='button-cancel' className='button-post'>Cancel</button>
        </ModalStyle>
    )
}

export default ModalPost;
