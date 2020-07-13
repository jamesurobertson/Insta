import React from 'react'
import LoginCard from "./LoginCard"
import LoadingPage from "../Loading/LoadingPage"
import GitIcons from "./GitIcons"


const LogIn = () => {
    return (
      <>
        <LoadingPage />
        <LoginCard />
        <GitIcons />
      </>
    );
}


export default LogIn
