import React from "react";
import navImage from "../../Images/logo.svg"
import LoginForm from './LoginForm'
import RegisterForm from "./RegisterForm"
import styled from "styled-components";

const LoginCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 85vh;
  width: 100%;
  padding: 16px;
  object-fit: cover;



 .navImage {
     margin-top: 20px;
     width: 25vh;
     max-width: 200px;
     object-fit: contain;
 }
`;


const LoginCard = (props) => {
  return (
      <LoginCardWrapper>
        <img className="navImage" src={navImage} alt="logo" />
        {window.location.href.match(/login/) ? <LoginForm/> : <RegisterForm/>}
      </LoginCardWrapper>
  );
};

export default LoginCard;
