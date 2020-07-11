import React, {useEffect, useContext, useState} from 'react'
import styled from "styled-components";
import PostHeader from "./PostHeader";
import PhotoImagePost from "./PhotoImagePost";
import IconPost from "./IconPost";
import PostCommentSection from "./PostCommentSection";
import CommentInputField from "./CommentInputField";
import Nav from "../Nav"
import {backendURL} from "../../config"

import {UserContext} from '../../context'

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
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [numPostLikes, setNumPostLikes] = useState(null)


    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${backendURL}${props.location.pathname}`)

                if (!res.ok) throw res

                const {comments: postComments, likes_post: likesPost, post: post1} = await res.json()
                setPost(post)
                setComments(postComments)
                setNumPostLikes(likesPost.length)
                setPost(post1)


            } catch (e) {
                console.error(e)
            }
        })()
    }, [])

    if (!post) return null
    console.log(`numPost`, numPostLikes)
    console.log(`comments`, comments)
    console.log(`post`, post)
    return (
        <>
        <Nav/>
        <SinglePostWrapper>
        <PostHeader userPic={post.user.profile_image_url} username={post.user.username} postId={post.id} userId={post.user.id}/>
        <PhotoImagePost postImg={post.image_url} />
        <IconPost postId={post.id}/>
        <PostCommentSection postId={post.id} username={post.user.username} postUserId={post.user.id} caption={post.caption} createdAt={post.created_at} likeCount={numPostLikes} isSinglePost={true} commentsList={comments}/>
        <CommentInputField postId={post.id} isSinglePage={true}/>
        </SinglePostWrapper>
        </>
    )
}

export default SinglePost
