import React from 'react'
import styled from 'styled-components'
import Nav from "../Nav"
import Loading from './Loading'

const LoadingWrapper = styled.div`
    padding-top: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
`




const LoadingPage = () => {

    return (
        <>
        <Nav/>
        <LoadingWrapper>
            <Loading/>
        </LoadingWrapper>
        </>
    )
}

export default LoadingPage
