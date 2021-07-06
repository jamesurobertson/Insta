import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const PostImageWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    .post-header-image {
        width: 100%;
        object-fit: cover;
    }
`;

const PhotoImagePost = ({ postImg, id, setLoad }) => {
    let history = useHistory();
    return (
        <PostImageWrapper onClick={() => history.push(`/post/${id}`)}>
            <img
                className='post-header-image'
                src={postImg}
                alt='feed-post'
                onLoad={() => setLoad(true)}
            />
        </PostImageWrapper>
    );
};

export default PhotoImagePost;
