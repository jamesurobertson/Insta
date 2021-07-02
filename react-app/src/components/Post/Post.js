
import styled from 'styled-components';
import PostHeader from './PostHeader';
import PhotoImagePost from './PhotoImagePost';
import IconPost from './IconPost';
import PostCommentSection from './PostCommentSection';
import CommentInputField from './CommentInputField';
;

const PostWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    background-color: white;

    @media screen and (min-width: 640px) {
        border: 1px solid #dfdfdf;
        border-radius: 3px;
        margin-bottom: 60px;
        height: 318.66;
    }
`;

const Post = ({ post, post: { id, image_url } }) => {

    return (
        <div className='Pst' style={{ display: 'flex', flexFlow: 'column' }}>
            <PostWrapper>
                <PostHeader {...post} />
                <PhotoImagePost id={id} postImg={image_url} />
                <IconPost {...post} />
                <PostCommentSection {...post} />
                <CommentInputField {...post} />
            </PostWrapper>
        </div>
    );
};

export default Post;
