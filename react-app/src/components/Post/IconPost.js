import { useContext } from 'react';
import styled from 'styled-components';
import { RiHeartLine } from 'react-icons/ri';
import { FaRegComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LikeContext, PostsContext, UserContext } from '../../Contexts';
import { toast } from 'react-toastify';

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
    const { currentUser } = useContext(UserContext);
    const { likes, setLikes } = useContext(LikeContext);
    const { setPosts } = useContext(PostsContext);

    const likePost = async () => {
        try {
            const body = {
                userId: currentUser.id,
                id: postId,
                likeableType: 'post',
            };
            console.log(body);
            const res = await fetch(`/api/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw res;

            const { like, likeList } = await res.json();

            setLikes({
                ...likes,
                [`${like.likeable_type}-${like.likeable_id}`]: like,
            });
            setPosts((posts) => ({
                ...posts,
                [postId]: { ...posts[postId], likes: likeList },
            }));

            toast.info('Liked post!', { autoClose: 1500 });
        } catch (e) {
            console.error(e);
        }
    };

    const unlikePost = async () => {
        let like = likes[`post-${postId}`];
        if (!like) return;
        console.log(like);
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
            delete newLikes[`post-${postId}`];

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

            toast.info('Unliked post!', { autoClose: 1500 });

            // if (isSinglePost) {
            //     setPostData({ ...postData, likes_post: newList });
            // }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <IconWrapper>
            <div className='left-post-icons'>
                <RiHeartLine
                    size={24}
                    onClick={likes[`post-${postId}`] ? unlikePost : likePost}
                    className={
                        likes[`post-${postId}`] ? 'liked-post' : 'unliked-post'
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
