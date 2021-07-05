import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../Contexts';
import { fadeIn } from '../../Styles/animations';

const LikeNotificationWrapper = styled.div`
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

const LikeNotification = ({ style, user, content_type, content }) => {
    let { currentUser } = useContext(UserContext);
    return (
        <LikeNotificationWrapper style={style}>
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
                    </a>{' '}
                    liked your
                    <a href={`/post/${content.post?.id || content.id}`}>
                        {' '}
                        {content_type}
                    </a>
                </p>
                <a href={`/post/${content.post?.id || content.id}`}>
                    <img
                        src={content.post?.image_url || content.image_url}
                        alt={content.post?.caption || content.caption}
                    />
                </a>
            </>
        </LikeNotificationWrapper>
    );
};

export default LikeNotification;
