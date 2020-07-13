import React from "react";
import styled from "styled-components";
import JamesAvatar from "../../Images/profile.jpeg"
import AaronAvatar from '../../Images/aaron-profile.jpeg'
import MyloAvatar from '../../Images/mylo-profile.jpg'


const GitIconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 100%;
  padding: 16px;
  

 img {
     width: 20vw;
     max-width: 100px;
     border-radius: 50%;
     margin: 0 20px;
     object-fit: cover;
 }
    

`;


const GitIcons = () => {
    return (
        <GitIconsWrapper>
            <a href="https://github.com/jamesurobertson/">
            <img src={JamesAvatar} alt="James Robertson"/>
            </a>
            <a href="https://github.com/ajpierskalla3/">
            <img src={AaronAvatar} alt="Aaron Pierskalla"/>
            </a>
            <a href="https://github.com/zachary-henderson/">
            <img src={MyloAvatar} alt="Zachary Henderson also known as Mylo"/>
            </a>
        </GitIconsWrapper>
    );
};

export default GitIcons;
