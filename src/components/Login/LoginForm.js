import React, {useState, useContext} from "react";
import styled from "styled-components";
import {withRouter} from 'react-router-dom'
import {UserContext} from "../../context"
import {backendURL} from "../../config"
import {toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

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


const LoginForm = (props) => {
    const {
        setCurrentUserId, 
        setCurrentUserFollowerCount, 
        setCurrentUserFollowingCount, 
        setCurrentUserProfilePic} = useContext(UserContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const updateState = (e) => {
        if (e.target.getAttribute('name') === "username") {
            setUsername(e.target.value)
        }
        else setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { username, password }

        const res = await fetch(`${backendURL}/session`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify(data)
        })

        if (res.status !== 200) {
            const {error} = await res.json()
            toast.info(error, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
            })
        } else {
            const { user, access_token } = await res.json()
            localStorage.setItem("Isntgram_access_token", access_token)
             setCurrentUserId(user.id);
             setCurrentUserProfilePic(user.profile_image_url);
             setCurrentUserFollowerCount(user.numFollowers);
             setCurrentUserFollowingCount(user.numFollowing);
            props.history.push("/")
        }


    }

    return (
      <LoginFormWrapper>
        <form onSubmit={handleSubmit} className="form-wrapper">

          <label style={{ display: "none" }} htmlFor="username">
            Username
          </label>

          <input
            // required
            placeholder="Username"
            name="username"
            onChange={updateState}
          />

          <label style={{ display: "none" }} htmlFor="password">
            Password
          </label>

          <input
            // required
            type="password"
            placeholder="Password"
            name="password"
            onChange={updateState}
          />

          <button style={{cursor:"pointer"}} type="submit">Log In</button>
        </form>
        <button style={{ cursor: 'pointer', width: "80%" }}>Try Our Demo</button>

        <div>
          Don't have an account?
          <a href="/auth/register"> Sign up</a>
        </div>
      </LoginFormWrapper>
    );
};

export default withRouter(LoginForm);
