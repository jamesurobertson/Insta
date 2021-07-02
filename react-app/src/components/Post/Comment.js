import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { RiHeartLine } from 'react-icons/ri';
import { LikeContext, PostsContext, UserContext } from '../../Contexts';
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
    const { currentUser } = useContext(UserContext);
    const { likes, setLikes } = useContext(LikeContext);
    const { setPosts } = useContext(PostsContext);
    console.log(id);

    const likeComment = async () => {
        const body = {
            userId: currentUser.id,
            likeableType: 'comment',
            id,
        };
        try {
            const res = await fetch(`/api/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw res;

            const { like } = await res.json();
            setLikes({ ...likes, [`comment-${id}`]: like });
            toast.info('Liked comment!', { autoClose: 1500 });
        } catch (e) {
            console.error(e);
        }
    };

    const unlikeComment = async () => {
        const like = likes[`comment-${id}`];
        try {
            const res = await fetch(`/api/like`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(like),
            });

            if (!res.ok) throw res;
            let newLikes = { ...likes };
            delete newLikes[`comment-${id}`];
            setLikes(newLikes);

            setPosts((posts) => {
                let newPost = { ...posts[postId] };
                let filtered = newPost.likes.filter(
                    (ele) => ele.id !== like.id
                );
                return {
                    ...posts,
                    [postId]: { ...posts[postId], likes: filtered },
                };
            });

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
                {likes[`comment-${id}`] ? (
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
