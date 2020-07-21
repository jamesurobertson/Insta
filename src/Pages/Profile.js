import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMiddle from "../components/Profile/ProfileMiddle";
import ProfilePosts from "../components/Profile/ProfilePosts";
import { ProfileContext, UserContext } from "../context";
import LoadingPage from "../components/Loading/LoadingPage";
import { backendURL } from "../config";

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
const Profile = (props) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { profileData, setProfileData } = useContext(ProfileContext);
  const { currentUserId } = useContext(UserContext);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let url = window.location.href.split("/");
    const userId = url[url.length - 1];
    setUserId(userId);
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res = await fetch(`${backendURL}/profile/${userId}`);

        if (!res.ok) throw res;

        const data = await res.json();
        setProfileData(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userId, setProfileData]);

  if (!profileData || !currentUserId) return null;

  if (
    profileData.user.id !== parseInt(props.location.pathname.match(/(\d+)$/)[0])
  )
    return <LoadingPage style={{ animationDuration: "1s" }} />;
  return (
    <ProfileWrapper>
      <ProfileHeader windowSize={windowSize} />
      <ProfileMiddle windowSize={windowSize} />
      <ProfilePosts />
    </ProfileWrapper>
  );
};

export default Profile;
