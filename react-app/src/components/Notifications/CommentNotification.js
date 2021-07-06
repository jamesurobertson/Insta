import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Contexts';
import { fadeIn } from '../../Styles/animations';

const CommentNotificationWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: 1px #dfdfdf solid;
    height: 50px;
    width: 100%;
    object-fit: cover;
    opacity: 0;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;
`;

const CommentNotification = ({ post, user, style, id }) => {
    let { currentUser } = useContext(UserContext);

    return (
        <CommentNotificationWrapper style={style}>
            <>
                <a href={`/profile/${user.id}`}>
                    <img
                        className='avatar'
                        src={user.profile_image_url}
                        alt={user.full_name}
                    />
                </a>
                <p>
                    <a href={`/profile/${user.id}`}>
                        {user.username === currentUser.username
                            ? 'You'
                            : user.username}{' '}
                    </a>
                    commented on your
                    <a href={`/post/${post.id}`}> post</a>
                </p>
                <a href={`/post/${id}`}>
                    <img src={post.image_url} alt={post.caption} />
                </a>
            </>
        </CommentNotificationWrapper>
    );
};

export default CommentNotification;
