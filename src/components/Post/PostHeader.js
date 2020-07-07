import React from "react";
import styled from "styled-components";
import { FaEllipsisH } from 'react-icons/fa';

const PostHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 16px;
  border-bottom: 1px solid grey;

  .post-header-image {
    display: flex;
    height: 37px;
    width: 37px;
    border-radius: 50%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

  .post-header-name {
    padding-left: 10px;
  }

  .header-photo{
    display: flex;
    align-items: center;
  }
`;


const PostHeader = () => {
  return (
    <PostHeaderWrapper>
      <div className="header-photo">
        <img
          className="post-header-image"
          src="https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-19/s150x150/83700920_480186686267142_2503895191161667584_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_ohc=LsIa8jPnOeEAX_QYVS3&oh=09778b07f671ce0b13ff919809ee5067&oe=5F2E8038"
          alt="corner photo" />
        <p className="post-header-name">KingJames</p>
      </div>
      <div className="ellipsis"><FaEllipsisH /></div>

    </PostHeaderWrapper>
  );
};

export default PostHeader;
