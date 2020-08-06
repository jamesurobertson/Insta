import React, { useState, useContext } from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import Post from "../components/Post/Post";
import { backendURL } from "../config";
import { UserContext } from "../context";
import NoFollows from "../components/NoFollows";
import Loading from "../components/Loading/Loading";

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

const LoadingWrapper = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  z-index: 2;
  position: fixed;
  opacity: 1;
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
`;

const Home = () => {
  const { currentUserId, currentUserFollowingCount } = useContext(UserContext);
  const [feedPosts, setFeedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  const loadMore = () => {
    if (!currentUserId) return;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${backendURL}/post/${currentUserId}/scroll/${feedPosts.length}`
        );

        if (!res.ok) throw res;

        const { posts } = await res.json();

        const nodeList = posts.map((post) => {
          return <Post key={`feedPost-${post.id}`} post={post} />;
        });

        setFeedPosts([...feedPosts, ...nodeList]);

        if (posts.length < 3) {
          setHasMore(false);
          setLoading(false);
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    })();
  };

  if (!feedPosts) return null;
  return (
    <>
      <LoadingWrapper
        style={{ animationName: `${loading ? "fadeIn" : "fadeOut"}` }}
      >
        <Loading />
      </LoadingWrapper>
      <Feed>
        {currentUserFollowingCount !== 0 ? (
          <InfiniteScroll pageStart={0} loadMore={loadMore} hasMore={hasMore}>
            {feedPosts}
          </InfiniteScroll>
        ) : (
          <NoFollows />
        )}
      </Feed>
    </>
  );
};

export default Home;
