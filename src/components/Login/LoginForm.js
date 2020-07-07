import React from "react";
import styled from "styled-components";

const LoginFormWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 100%;
  max-width: 500px;
  padding: 16px;
  object-fit: cover;

 * {
     width: 90%;
     font-size: .9rem;
     text-align: center;
   }

 .form-wrapper {
     display: flex;
     flex-flow: column;
     align-items: center;
 }

 input {
     padding: 0 5px;
     height: 32px;
     border: #dcdcdc 1px solid;
     border-radius: 5px;
     margin-bottom: 30px;
     text-align: left;
 }

 button {
     background-color: lightblue;
     border: none;
     border-radius: 5px;
     height: 30px;
 }

 a {
     color: #26abff;
     font-weight: 700;
 }

 a:hover {
     color: blue;
 }
`;


const LoginForm = () => {
    return (
        <LoginFormWrapper>
            
            <form className="form-wrapper">
                <input type="hidden" />
                <input placeholder="username"/>
                <input placeholder="password"/>
                <button>Log In</button>
            </form>
            <button style={{width: "80%"}}>Try Our Demo</button>

            
            <div>
                Don't have an account?
                <a href="/auth/register"> Sign up</a>
            </div>

        </LoginFormWrapper>
    );
};

export default LoginForm;
