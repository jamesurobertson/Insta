import { useContext } from 'react';
import styled from 'styled-components';
import { RiHeartLine } from 'react-icons/ri';
import { FaRegComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PostsContext, UserContext } from '../../Contexts';

const IconWrapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;

  .comment,
  .bookmark {
    margin: 0px 8px;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
  }

    .liked-post {
      color: rgb(237, 73, 86);
      cursor: pointer;
    }

    .unliked-post {
      cursor: pointer;
      color: #262626;
    }
  }
`;

const IconPost = ({ id: postId, isSinglePost }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { posts, setPosts } = useContext(PostsContext);

    const likePost = async () => {
        try {
            const res = await fetch(`/api/like/post/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) throw res;

            const { like } = await res.json();

            setCurrentUser((currentUser) => ({
                ...currentUser,
                likes: { ...currentUser.likes, [`post-${postId}`]: like },
            }));

            console.log(postId);

            setPosts((posts) => ({
                ...posts,
                [postId]: {
                    ...posts[postId],
                    likes: [...posts[postId].likes, like],
                },
            }));

            toast.info('Liked post!', { autoClose: 1500 });
        } catch (e) {
            console.error(e);
        }
    };

    const unlikePost = async () => {
        try {
            const res = await fetch(`/api/like/post/${postId}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw res;

            const { like } = await res.json();
            let newLikes = { ...currentUser.likes };
            delete newLikes[`post-${postId}`];

            setCurrentUser((currentUser) => ({
                ...currentUser,
                likes: newLikes,
            }));

            setPosts((posts) => ({
                ...posts,
                [postId]: {
                    ...posts[postId],
                    likes: posts[postId].likes.filter(
                        (likeI) => likeI.id !== like.id
                    ),
                },
            }));

            toast.info('Unliked post!', { autoClose: 1500 });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <IconWrapper>
            <div className='left-post-icons'>
                <RiHeartLine
                    size={24}
                    onClick={
                        currentUser.likes[`post-${postId}`]
                            ? unlikePost
                            : likePost
                    }
                    className={
                        currentUser.likes[`post-${postId}`]
                            ? 'liked-post'
                            : 'unliked-post'
                    }
                />
                {isSinglePost ? (
                    ''
                ) : (
                    <Link to={`/post/${postId}`} className='comment'>
                        <FaRegComment size={24} />
                    </Link>
                )}
            </div>
            {/* <div className="right-post-icons">
        <FaRegBookmark onClick={savePost} size={24} />
      </div> */}
        </IconWrapper>
    );
};

export default IconPost;
