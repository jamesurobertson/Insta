import React, {useState, useEffect, useContext} from "react";
// import { toast } from "react-toastify";
// import { Route, Switch } from "react-router-dom";
// import Explore from "./Explore";
import styled from "styled-components";
import Post from "../components/Post/Post"
import {backendURL} from '../config'
import {UserContext} from '../context'

const Feed = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 55px;
  align-items: center;
  justify-content: center;
  padding-bottom: 53px;

  @media screen and (min-width: 640px) {
    padding-top: 75px;
}

@media screen and (min-width: 475px) {
    padding-bottom: 0;

  }
`;


const Home = () => {

    const {currentUserId} = useContext(UserContext)
    const [feedPosts, setFeedPosts] = useState([])

    useEffect(() => {
        if (!currentUserId) return
        (async () => {

            try {
                const res = await fetch(`${backendURL}/post/${currentUserId}/scroll/0`)

                if (!res.ok) throw res

                const {posts} = await res.json()

                setFeedPosts([...feedPosts, ...posts])
            } catch (e) {
                console.error(e)
            }
        })()
    }, [currentUserId])

  if (!feedPosts) return
  return (
    <Feed>
      {feedPosts.map(post => <Post key={`feedPost-${post.id}`} post={post}/>)}
    </Feed>
  )
};

export default Home;
