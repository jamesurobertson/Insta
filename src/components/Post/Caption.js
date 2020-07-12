import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const CaptionWrapper =styled.div`
    width: 100%;
    padding: 5px 16px 0 0;
    display: flex;

    @media screen and (min-width: 735px) {
    padding: 5px 0 0 0;
  }
`


const Caption = ({userId, username, content}) => {
    return (
        <CaptionWrapper>
        <Link style={{fontWeight: 'bold', paddingRight: '8px'}}to={`/profile/${userId}`}>
          {username}
        </Link>
        {content}
      </CaptionWrapper>
    )
}


export default Caption
