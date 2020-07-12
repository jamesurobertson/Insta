import React, {useState, useEffect, useContext} from "react";
// import { toast } from "react-toastify";
// import { Route, Switch } from "react-router-dom";
// import Explore from "./Explore";
import InfiniteScroll from "react-infinite-scroller";
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
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)

    const loadMore = () => {
        if (!currentUserId) return
        (async () => {

            try {
                const res = await fetch(`${backendURL}/post/${currentUserId}/scroll/${feedPosts.length}`)

                if (!res.ok) throw res

                const {posts} = await res.json()

                const nodeList = posts.map(post=>{
                  return <Post key={`feedPost-${post.id}`} post={post}/>
                })


                setFeedPosts([...feedPosts, ...nodeList])

                if (posts.length < 3) {
                  setHasMore(false);
                }
            } catch (e) {
                console.error(e)
            }
        })()
    }

  if (!feedPosts) return
  return (
    <Feed>
      <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasMore}>
        {feedPosts}
      </InfiniteScroll>
    </Feed>
  );
};

export default Home;
