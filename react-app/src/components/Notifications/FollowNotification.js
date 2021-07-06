import { useContext } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../Styles/animations';
import { UserContext } from '../../Contexts';
import { showErrors } from '../../config';

const FollowNotificationWrapper = styled.div`
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

    button {
        height: 25px;
        background: transparent;
        padding: 5px 9px;
        border: 1px solid #dfdfdf;
        border-radius: 3px;
        font-size: 12px;
        font-weight: bold;
    }
`;

const FollowNotification = ({ user, style }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const followUser = async () => {
        const res = await fetch(`/api/follow/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errors = await res.json();
            showErrors([errors]);
            return;
        }

        const follow = await res.json();

        setCurrentUser((currentUser) => ({
            ...currentUser,
            following: {
                ...currentUser.following,
                [follow.following_id]: follow,
            },
        }));
    };

    const unfollowUser = async () => {
        try {
            const res = await fetch(`/api/follow/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errors = await res.json();
                showErrors([errors]);
                return;
            }

            const follow = await res.json();
            const newFollows = { ...currentUser.following };
            delete newFollows[follow.following_id];
            setCurrentUser((currentUser) => ({
                ...currentUser,
                following: newFollows,
            }));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <FollowNotificationWrapper style={style}>
            <>
                <a href={`/profile/${user.id}`}>
                    <img
                        className='avatar'
                        src={user.profile_image_url}
                        alt={user.full_name}
                    />
                </a>
                <p>
                    <a href={`/profile/${user.id}`}>{user.username} </a>
                    started following you!
                </p>
                {currentUser.following[user.id] ? (
                    <div className='buttonWrapper'>
                        <button
                            style={{ width: '85px' }}
                            onClick={unfollowUser}
                        >
                            Following{' '}
                        </button>
                    </div>
                ) : (
                    <div>
                        <button
                            style={{
                                width: '85px',
                                outline: '0',
                                backgroundColor: '#0096F5',
                                color: 'white',
                            }}
                            onClick={followUser}
                        >
                            Follow
                        </button>
                    </div>
                )}
            </>
        </FollowNotificationWrapper>
    );
};

export default FollowNotification;
