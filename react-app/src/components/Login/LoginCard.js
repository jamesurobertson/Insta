import React from 'react';
import navImage from '../../Images/logo.svg';
import LoginForm from './LoginForm';
import GitIcons from './GitIcons';
import RegisterForm from './RegisterForm';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(500px);
  } 

  to {
    transform: translateX(0px);
  }
`;

const LoginCardWrapper = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
    max-width: 500px;
    border: 1px #dfdfdf solid;
    background-color: white;
    transform: translateX(500px);
    animation: ${slideIn} 2s 2s forwards;

    .navImage {
        display: flex;
        justify-content: center;
        width: 100%;
        max-width: 200px;
        margin: auto;
        margin-top: 20%;
        object-fit: contain;
    }
`;

const LoginCard = ({ loaded }) => {
    if (!loaded) return null;
    return (
        <LoginCardWrapper>
            <img className='navImage' src={navImage} alt='logo' />
            {window.location.href.match(/login/) ? (
                <LoginForm />
            ) : (
                <RegisterForm />
            )}
            <GitIcons />
        </LoginCardWrapper>
    );
};

export default LoginCard;
