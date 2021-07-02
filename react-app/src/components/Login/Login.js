import React from 'react';
import styled from 'styled-components';
import LoginCard from './LoginCard';
import Splash from './Splash';

const LoginWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
`;

const LogIn = () => {
    return (
        <LoginWrapper>
            <Splash />
            <LoginCard />
        </LoginWrapper>
    );
};

export default LogIn;
