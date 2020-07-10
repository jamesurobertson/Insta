import React, {useContext, useState} from "react";
import {backendURL} from "../../config"
import {UserContext} from '../../context'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from "styled-components";
import { withRouter } from "react-router-dom";

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
     color: #262626;
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




const RegisterForm = (props) => {

    const {
      setCurrentUserId,
      setCurrentUserFollowerCount,
      setCurrentUserFollowingCount,
      setCurrentUserProfilePic,
    } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [birthday, setBirthday] = useState("");

    const updateState = (e) => {
      const value = e.target.value
      switch (e.target.getAttribute('name')){
        case ('username'):
            setUsername(value)
            break
        case ('email'):
            setEmail(value)
            break
        case ('fullName'):
            setFullName(value)
            break
        case ('password'):
            setPassword(value)
            break
        case ('confirmPassword'):
            setConfirmPassword(value)
            break
        // case('birthday'):
        //     setBirthday(value)
        //     break
        default:
            return

      }

    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = { username, email, fullName, password, confirmPassword };

      const res = await fetch(`${backendURL}/session/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status !== 200) {

        const {error} = await res.json()
        toast(error, {
            position: 'top-right',
            autoClose: 5000,
            closeOnClick: true,


        })

      } else {
        const { user, access_token } = await res.json();
        localStorage.setItem("Isntgram_access_token", access_token);
        setCurrentUserId(user.id);
        setCurrentUserProfilePic(user.profile_image_url);
        setCurrentUserFollowerCount(user.numFollowers);
        setCurrentUserFollowingCount(user.numFollowing);
        props.history.push("/");
      }
    };

    return (
      <RegisterFormWrapper>
        <form onSubmit={handleSubmit} className="form-wrapper">
          <label style={{ display: "none" }} htmlFor="username">
            Username
          </label>
          <input
            name="username"
            placeholder="Username"
            onChange={updateState}
          />

          <label style={{ display: "none" }} htmlFor="email">
            Email
          </label>

          <input
            name="email"
            placeholder="Email"
            onChange={updateState}
          />

          <label style={{ display: "none" }} htmlFor="fullName">
            Full Name
          </label>

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={updateState}
          />

          <label style={{ display: "none" }} htmlFor="password">
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={updateState}
          />
          <label style={{ display: "none" }} htmlFor="confirmPassword">
            Confirm Password
          </label>

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={updateState}
          />

          {/* <label htmlFor="birthday">Birthday</label>

          <input
            required
            name="birthday"
            type="date"
            placeholder="Birthday"
            onChange={updateState}
          /> */}

          <button type="submit">Register</button>
        </form>
        <div>
          Have an account?
          <a href="/auth/login"> Login</a>
        </div>
      </RegisterFormWrapper>
    );
};

export default withRouter(RegisterForm);
