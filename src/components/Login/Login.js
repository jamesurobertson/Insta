import React from 'react'
import LoginCard from "./LoginCard"
import Loading from "../Loading/Loading"
import GitIcons from "./GitIcons"



const LogIn = () => {
    return (
        <>
        <Loading position={{top: "-40%"}}/>
        <LoginCard/>
        <GitIcons/>
        </>
    )
}


export default LogIn
