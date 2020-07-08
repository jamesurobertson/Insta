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
  const [numFollowers, setNumFollowers] = useState('')
  const [numFollows, setNumFollows] = useState('')
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

              const {num_followers, num_follows, num_posts, posts, user} = await res.json()
              setNumFollowers(num_followers)
              setNumFollows(num_follows)
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
      <ProfileHeader numFollowers={numFollowers} numFollows={numFollows} numPosts={numPosts} userInfo={userInfo} windowSize={windowSize} />
      <ProfileMiddle numFollowers={numFollowers} numFollows={numFollows} numPosts={numPosts} windowSize={windowSize} />
      <ProfilePosts posts={posts}/>
    </ProfileWrapper>
  );
};

export default Home;
