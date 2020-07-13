import React, {useEffect, useContext, useState} from 'react'
import styled from "styled-components";
import PostHeader from "../components/Post/PostHeader";
import PhotoImagePost from "../components/Post/PhotoImagePost";
import IconPost from "../components/Post/IconPost";
import PostCommentSection from "../components/Post/PostCommentSection";
import CommentInputField from "../components/Post/CommentInputField";
import Nav from "../components/Nav"
import {backendURL} from "../config"

import {PostContext} from '../context'

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
    const {postData, setPostData} = useContext(PostContext)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${backendURL}${props.location.pathname}`)

                if (!res.ok) throw res

                const data = await res.json()
                setPostData(data)

            } catch (e) {
                console.error(e)
            }
        })()
    }, [])

    if (!postData || postData.post.id !== parseInt(window.location.href.match(/(\d+)$/))) return null
    return (
        <>
        <SinglePostWrapper>
        <PostHeader isSinglePost={true}/>
        <PhotoImagePost postImg={postData.post.image_url} />
        <IconPost isSinglePost={true} postId={postData.post.id} likesList={postData.likes_post}/>
        <PostCommentSection isSinglePost={true}/>
        <CommentInputField postId={postData.post.id} isSinglePost={true}/>
        </SinglePostWrapper>
        </>
    )
}

export default SinglePost

{/* <PostHeader isSinglePost={true}/>
        <PhotoImagePost isSinglePost={true}/>
        <IconPost isSinglePost={true}/>
        <PostCommentSection isSinglePost={true}/>
        <CommentInputField isSinglePage={true}/> */}
