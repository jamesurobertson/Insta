import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMiddle from "../components/Profile/ProfileMiddle";
import ProfilePosts from "../components/Profile/ProfilePosts";
import {ProfileContext} from '../context'

const ProfileWrapper = styled.div`
  padding-top: 55px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 735px) {
    margin: auto;
    padding: 85px 20px 0;
    max-width: 975px;
  }
  /* @media screen and (min-width: 1000px) {
    width: 614px;
  } */
`;
const Profile = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const {profileData, setProfileData} = useContext(ProfileContext)

  const [userId, setUserId] = useState(null)

  useEffect(() => {
      let url = window.location.href.split('/')
      const userId = url[url.length - 1]
      setUserId(userId)
  })


  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  useEffect(() => {
      if (!userId) return
      (async () => {
          try {
              const res = await fetch(`http://localhost:5000/api/profile/${userId}`)

              if (!res.ok) throw res

              const data = await res.json()
              console.log(data)
              setProfileData(data)


          } catch (e) {
              console.error(e)
          }
      })()
  }, [userId, setProfileData])

  if (!profileData) return null
  return (
    <ProfileWrapper>
      <ProfileHeader windowSize={windowSize} />
      <ProfileMiddle windowSize={windowSize} />
      <ProfilePosts/>
    </ProfileWrapper>
  );
};

export default Profile;
