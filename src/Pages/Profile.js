import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileMiddle from "../components/Profile/ProfileMiddle";
import ProfilePosts from "../components/Profile/ProfilePosts";

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

const Home = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [followers, setFollowers] = useState([])
  const [follows, setFollows] = useState([])
  const [numPosts, setNumPosts] = useState('')
  const [posts, setPosts] = useState([])
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  useEffect(() => {
      (async () => {
          try {
              const res = await fetch(`http://localhost:5000/api/profile/1`)

              if (!res.ok) throw res

              const {followersList, followsList, num_posts, posts, user} = await res.json()
              setFollowers(followersList)
              setFollows(followsList)
              setNumPosts(num_posts)
              setPosts(posts)
              setUserInfo(user)
          } catch (e) {
              console.error(e)
          }
      })()
  }, [])

  if (!userInfo) return null
  return (
    <ProfileWrapper>
      <ProfileHeader followers={followers} follows={follows} numPosts={numPosts} userInfo={userInfo} windowSize={windowSize} />
      <ProfileMiddle followers={followers} follows={follows} numPosts={numPosts} userInfo={userInfo} windowSize={windowSize} />
      <ProfilePosts posts={posts}/>
    </ProfileWrapper>
  );
};

export default Home;
