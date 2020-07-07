import React from "react";
import styled from "styled-components";


const CommentWrapper = styled.div`
    padding: 0px 28px;

    .like-button, .user-name{
        font-weight: 600;
        font-size: 14px;
    }

    p{
        margin: 13px 0px 0px -5px;
        padding: 0px 0px 0px 5px;
    }


`

const CommentImageWrapper = () => {
    return (
        <CommentWrapper>
            <a className="like-button">5,000,000,000 likes</a>

            <p>
                <a className="user-name">kingjames</a>
                <span>Welcome to the jungle we aint playing games. We aint got no money and you got the same disease.</span>
            </p>

            <p>
                <a className="user-name">kingjames</a>
                <span>Welcome to the jungle we aint playing games. We aint got no money and you got the same disease.</span>
            </p>
        </CommentWrapper >
    )
}


export default CommentImageWrapper;