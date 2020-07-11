import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { backendURL } from "../../config";
import { Redirect } from "react-router-dom";
import { UserContext, ProfileContext } from "../../context";
import Nav from "../Nav";
import { toast } from "react-toastify";

const EditProfileWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin: 54px 0;
  background-color: white;

  @media screen and (min-width: 500px) {
    margin: 74px auto;
    border: 1px solid #dfdfdf;
    width: 500px;
    border-radius: 3px;
  }

  .form-wrapper {
    padding-top: 10px;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
  }

  input {
    padding: 0 5px;
    height: 32px;
    width: 100%;
    border: #dfdfdf 1px solid;
    border-radius: 3px;
    margin-bottom: 20px;
  }

  textarea {
    resize: none;
    padding: 6px 10px;
    min-height: 77px;
    width: 100%;
    border: #dfdfdf 1px solid;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    width: 100%;
    color: #262626;
    margin-bottom: 5px;
  }

  button {
    background-color: #0095f6;
    font-weight: bold;
    color: white;
    border: none;
    width: 100%;
    border-radius: 5px;
    height: 30px;
  }

  .editProfile__header {
    display: flex;
    width: 100%;
  }

  .editProfile__picture {
    width: 45px;
    height: auto;
    border-radius: 50%;
    cursor: pointer;
  }

  .editProfile__user-details {
    display: flex;
    margin-left: 20px;
    flex-flow: column;
    justify-content: space-around;
  }

  .editProfile__username {
    font-size: 20px;
  }

  .editProfile__change-username {
    font-size: 14px;
    font-weight: bold;
    color: #0095f6;
    cursor: pointer;
  }

  .edit_Profile__fullName-info {
    font-size: 12px;
    color: #8e8e8e;
    margin-top: -10px;
    margin-bottom: 16px;
  }

  .goback-button {
      color: #0095f6;
      background-color: white;
      margin-top: 20px;
      border: 1px solid #0095f6;
  }
`;

const EditProfile = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");

  const {
    currentUserId,
    setCurrentUserId,
    currentUserProfilePic,
  } = useContext(UserContext);

  const { profileData } = useContext(ProfileContext);

  useEffect(() => {
    if (!profileData) return;
    const { user } = profileData;
    setUsername(user.username);
    setEmail(user.email);
    setFullName(user.full_name);
    setBio(user.bio);
  }, []);

  if (!currentUserId) return null;

  if (!profileData) {
    return <Redirect to={`/profile/${currentUserId}`} />;
  }

  const updateState = (e) => {
    const value = e.target.value;
    switch (e.target.getAttribute("name")) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "fullName":
        setFullName(value);
        break;
      case "bio":
        setBio(value);
        break;
      // case('birthday'):
      //     setBirthday(value)
      //     break
      default:
        return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { id: currentUserId, username, email, fullName, bio };

    const res = await fetch(`${backendURL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
        const {error} = await res.json()
            toast.error(error, {
            autoClose: 3000,
            closeOnClick: true,
          });
    } else {
        const { access_token } = await res.json()
        localStorage.setItem("Isntgram_access_token", access_token)
        toast.info('Successfully updated!',{
            autoClose: 3000,
            closeOnClick: true,
          })
        props.history.push(`/profile/${currentUserId}`);
    }

  };

  const changeProfilePic = (e) => {
    console.log("change Profile picture!");
  };

  const goBack = (e) => {
      console.log('go back')
      props.history.push(`/profile/${currentUserId}`);
  }
  return (
    <>
      <Nav />
      <EditProfileWrapper>
        <div className="editProfile__header">
          <img
            onClick={changeProfilePic}
            className="editProfile__picture"
            src={currentUserProfilePic}
            alt="profile-pic"
          />
          <div className="editProfile__user-details">
            <div className="editProfile__username">{username}</div>
            <div
              onClick={changeProfilePic}
              className="editProfile__change-username"
            >
              Change Profile Photo
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-wrapper">
          <label htmlFor="fullName">Name</label>
          <input
            id="fullName"
            name="fullName"
            onChange={updateState}
            value={fullName}
          />
          <p className="edit_Profile__fullName-info">
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </p>
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            onChange={updateState}
            value={username}
          />
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            onChange={updateState}
            value={bio ? bio : ""}
          />

          <label htmlFor="email">Email</label>
          <input
            value={email}
            id="email"
            id="email"
            name="email"
            onChange={updateState}
          />
          <button type="submit">Submit</button>
        </form>
          <button className='goback-button' onClick={goBack}>Go back</button>
      </EditProfileWrapper>
    </>
  );
};

export default EditProfile;
