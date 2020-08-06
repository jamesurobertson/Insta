import React, { useContext, useState } from "react";
import styled from "styled-components";
import { RiHeartLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PostContext, UserContext } from "../../context";
import {backendURL} from '../../config'
import {toast} from 'react-toastify'

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

const IconPost = ({ postId, likesList, isSinglePost, setLikes }) => {
  const { postData, setPostData } = useContext(PostContext);
  const {currentUserId } = useContext(UserContext);
  const [likesArray, setLikesArray] = useState(likesList)

  const likePost = async () => {
    try {
        const body = {userId: currentUserId, id: postId, likeableType: 'post' }
        const res = await fetch(`${backendURL}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) throw res

        const response = await res.json()
        const newList = [...likesArray, response]
        if (setLikes) setLikes(newList)
        toast.info("Liked post!", { autoClose: 1500 });
        setLikesArray(newList)
        if (isSinglePost) {
            setPostData({...postData, likes_post: newList})
        }
    } catch (e) {
        console.error(e)
    }
  };

  const unlikePost = async () => {

    const body = {
        userId: currentUserId,
        likeableType: "post",
        id: postId,
      };
      try {
        const res = await fetch(`${backendURL}/like`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) throw res;

        toast.info("Unliked post!", { autoClose: 1500 });

        const newList = likesArray.filter(user => user.id !== currentUserId)
        if(setLikes) setLikes(newList)
        setLikesArray(newList)
        if (isSinglePost) {
            setPostData({...postData, likes_post: newList})
        }


      } catch (e) {
        console.error(e);
      }
    };

  return (
    <IconWrapper>
      <div className="left-post-icons">
        <RiHeartLine
          size={24}
          onClick={likesArray.some(user => user.id === currentUserId) ? unlikePost : likePost}
          className={likesArray.some(user => user.id === currentUserId) ? "liked-post" : "unliked-post"}
        />
        {isSinglePost ? (
          ''
        ) : (
          <Link to={`/post/${postId}`} className="comment">
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
