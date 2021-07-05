import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiHeartLine } from 'react-icons/ri';
import { UserContext } from '../../Contexts';
import { toast } from 'react-toastify';

const CommentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 5px 16px 0 0;
    line-height: 18px;

    .comment_username {
        font-weight: bold;
    }

    @media screen and (min-width: 735px) {
        padding: 5px 0 0 0;
    }

    .liked-comment {
        cursor: pointer;
        color: rgb(237, 73, 86);
    }

    .unliked-comment {
        cursor: pointer;
        color: #8e8e8e;
    }
`;

const Comment = ({ username, content, postId, userId, id }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const likeComment = async () => {
        try {
            const res = await fetch(`/api/like/comment/${id}`, {
                method: 'POST',
            });

            if (!res.ok) throw res;

            const { like } = await res.json();
            console.log(like);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                likes: {
                    ...currentUser.likes,
                    [`comment-${id}`]: like,
                },
            }));
            toast.info('Liked comment!', { autoClose: 1500 });
        } catch (e) {
            console.error(e);
        }
    };

    const unlikeComment = async () => {
        try {
            const res = await fetch(`/api/like/comment/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw res;
            let newLikes = { ...currentUser.likes };
            delete newLikes[`comment-${id}`];
            setCurrentUser((currentUser) => ({
                ...currentUser,
                likes: newLikes,
            }));

            toast.info('Unliked comment!', { autoClose: 1500 });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <CommentWrapper>
            <div>
                <Link className='comment_username' to={`/profile/${userId}`}>
                    {username}{' '}
                </Link>
                {content}
            </div>
            <div>
                {currentUser.likes[`comment-${id}`] ? (
                    <RiHeartLine
                        onClick={unlikeComment}
                        className='liked-comment'
                    />
                ) : (
                    <RiHeartLine
                        onClick={likeComment}
                        className='unliked-comment'
                    />
                )}
            </div>
        </CommentWrapper>
    );
};

export default Comment;
