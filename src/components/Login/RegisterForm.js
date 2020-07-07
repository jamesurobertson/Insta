import React from "react";
import styled from "styled-components";

const RegisterFormWrapper = styled.div`
  display: flex;
  justify-content: space-around;
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
     margin-bottom: 20px;
     text-align: left;
 }

 label {
     text-align: left;
     color: grey;
     margin-bottom: 5px;
 }

 button {
     background-color: lightblue;
     border: none;
     border-radius: 5px;
     height: 30px;
     margin-bottom: 10px;
 }

 a {
     color: #26abff;
     font-weight: 700;
 }

 a:hover {
     color: blue;
 }
`;


const RegisterForm = () => {
    return (
        <RegisterFormWrapper>
            <form className="form-wrapper">
                <input type="hidden"/>
                <input name="username" placeholder="username" />
                <input name="email" placeholder="email" />
                <input name="fullName" placeholder="full name" />
                <input name="password" type="password" placeholder="password" />
                <input type="password" placeholder="confirm password" />
                <label htmlFor="birthday">Birthday</label>
                <input type="date" placeholder="birthday" />
                <button>Register</button>
            </form>
            <div>
                Have an account?
                <a href="/auth/login"> Login</a>
            </div>

        </RegisterFormWrapper>
    );
};

export default RegisterForm;
