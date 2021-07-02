import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaRegComment } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';



const ProfilePostWrapper = styled.div`
  width: 100%;
  height: 100%;
  position:relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile-post-overlay {
      position:absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      display: none;
      background-color: rgba(0,0,0,.3);
      background-size: 100% 100%;
      overflow: hidden;
  }

  .profile-post-overlay div {
    font-size: 3.5vw;
    color: white;
    text-align: center;
  }

  &:hover .profile-post-overlay {
      display: flex;
  }

  @media screen and (min-width: 1000px) {
      .profile-post-overlay div {
          font-size: 35px;
      }
  }
`;

const ProfilePost = ({post}) => {
    const {image_url: imageUrl, comment_count: commentCount, like_count: likeCount, id } = post

  return (
    <ProfilePostWrapper>
      <Link to={`/post/${id}`}>
        <div className='profile-post-overlay'>
            <div style={{display: 'flex', alignItems: 'center'}}><FaRegHeart/><div style={{paddingLeft: '1vw', }}>{likeCount}</div></div>
            <div style={{display: 'flex', alignItems: 'center'}}><FaRegComment/><div style={{paddingLeft: '1vw'}}> {commentCount}</div></div>
        </div>
        <img src={imageUrl} alt="img" />
      </Link>
    </ProfilePostWrapper>
  );
};

export default ProfilePost;
