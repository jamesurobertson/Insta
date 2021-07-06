import React, { useState } from 'react';
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
    let [loaded, setLoaded] = useState(false);
    return (
        <LoginWrapper>
            <Splash loaded={loaded} setLoaded={setLoaded} />
            <LoginCard loaded={loaded} />
        </LoginWrapper>
    );
};

export default LogIn;
