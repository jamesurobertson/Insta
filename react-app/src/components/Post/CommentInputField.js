import { useState, useContext } from 'react';
import styled from 'styled-components';
import { PostsContext, UserContext } from '../../Contexts';

const CommentInputWrapper = styled.section`
    padding: 0 16px;
    height: 55px;
    max-height: 80px;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    display: none;

    .comment-post {
        resize: none;
        max-height: 80px;
        width: 100%;
        border: none;
        outline: 0;
    }

    .button-post {
        border: none;
        padding: 0;
        color: #0095f5;
        font-weight: 600;
        background-color: transparent;
        outline: 0;
        cursor: pointer;
    }

    .form-post {
        height: 100%;
        display: flex;
    }

    /* @media screen and (min-width: 319px) {
    width: 615px;
    height: 35px; */

    @media screen and (min-width: 735px) {
        display: block;
    }
`;

const CommentInputField = ({ id: postId, isSinglePost }) => {
    const [content, setContent] = useState('');
    const { currentUser } = useContext(UserContext);
    const { setPosts } = useContext(PostsContext);

    const updateCommentState = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content === '') return;
        const data = { content, userId: currentUser.id, postId };
        const res = await fetch(`/api/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw res;
        const comment = await res.json();
        console.log(comment);
        setPosts((posts) => {
            let currentPost = posts[postId];
            let commentList = [...currentPost.comments, comment];
            return {
                ...posts,
                [postId]: { ...currentPost, comments: commentList },
            };
        });
        setContent('');
    };
    if (!isSinglePost) return null;
    return (
        <CommentInputWrapper>
            <form className='form-post' onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <input
                        className='comment-post'
                        placeholder='Add a comment...'
                        onChange={updateCommentState}
                        value={content}
                    />
                </div>
                <button type='submit' className='button-post'>
                    Post
                </button>
            </form>
        </CommentInputWrapper>
    );
};

export default CommentInputField;
