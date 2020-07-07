import React from "react";
import styled from "styled-components";
import { FaRegHeart } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import { FaRegPaperPlane } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';


const IconWrapper = styled.div`
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;

  .left-post-icons{
      padding-left: 8px;
  }

  .right-post-icons{
      padding-right: 8px;
  }

  .heart, .plane, .comment, .bookmark{
      margin: 0px 8px;
      background: none;
	  color: inherit;
	  border: none;
      padding: 0;
  }


`;



const IconPost = () => {
    return (
        <IconWrapper>
            <div className="left-post-icons">
                <button className='heart'><FaRegHeart size={24} /></button>
                <button className="comment"><FaRegComment size={24} /></button>
                <button className="plane"><FaRegPaperPlane size={24} /></button>
            </div>
            <div className="right-post-icons">
                <button className="bookmark"><FaRegBookmark size={24} /></button>
            </div>
        </IconWrapper>

    );
};

export default IconPost;