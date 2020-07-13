import React from 'react'
import styled from 'styled-components'
import Nav from "../Nav"
import Loading from './Loading'

const LoadingWrapper = styled.div`
    position: fixed;
    padding-top: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    z-index: 50;
`




const LoadingPage = () => {

    return (
        <>
        <Nav/>
        <LoadingWrapper>
            <Loading style={{top: 0}}/>
        </LoadingWrapper>
        </>
    )
}

export default LoadingPage
