import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import PostHeader from '../components/Post/PostHeader';
import PhotoImagePost from '../components/Post/PhotoImagePost';
import IconPost from '../components/Post/IconPost';
import PostCommentSection from '../components/Post/PostCommentSection';
import CommentInputField from '../components/Post/CommentInputField';
import { useParams } from 'react-router-dom';
import { PostsContext } from '../Contexts';

const SinglePostWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 54px auto;
    background-color: white;

    @media screen and (min-width: 640px) {
        border: 1px solid #dfdfdf;
        margin-top: 77px;
        border-radius: 3px;
        height: 318.66;
    }
`;

const SinglePost = (props) => {
    let { posts, setPosts } = useContext(PostsContext);
    let [load, setLoad] = useState(false);
    let { id } = useParams();

    useEffect(() => {
        (async () => {
            setLoad(false);
            try {
                const res = await fetch(`/api/post/${id}`);

                if (!res.ok) throw res;

                const { post } = await res.json();
                setPosts((posts) => ({ ...posts, [post.id]: post }));
                setLoad(true);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [id, setPosts]);

    if (!load) return null;
    let post = posts[id];
    console.log(post);
    return (
        <>
            <SinglePostWrapper>
                <PostHeader {...post} isSinglePost={true} />
                <PhotoImagePost
                    id={id}
                    postImg={post.image_url}
                    setLoad={setLoad}
                />
                <IconPost isSinglePost={true} {...post} />
                <PostCommentSection {...post} isSinglePost={true} />
                <CommentInputField {...post} isSinglePost={true} />
            </SinglePostWrapper>
        </>
    );
};

export default SinglePost;
