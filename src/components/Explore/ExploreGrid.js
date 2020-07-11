import React, { useState, useContext, useEffect  } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { backendURL } from "../../config";
import { UserContext } from "../../context";


import Loading from "../Loading/Loading";
import Layout1 from "./Layout1";
import Layout2 from "./Layout2";
import Layout3 from "./Layout3";

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

  z-index: -5;
  position: fixed;
  bottom: 55vh;
  opacity: 1;
  animation-name: fadeIn;
  animation-duration: 2s;
  animation-fill-mode: forwards;
`;

const ExploreGridWrapper = styled.div`
  margin: auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
  width: 95vw;
  max-width: 614px;
  

  
`;

const ExploreGrid = (props) => {
  const { currentUserId } = useContext(UserContext);

  
  const [toRender, setToRender] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  function getTemplate(toRender, photoArray) {
    const randomInt = getRandomInt(2, 4);

    if (
      toRender.length === 0 ||
      photoArray.length < 3 ||
      !toRender[toRender.length - 1].key.includes(`layout1key`)
    ) {
      return [
        <Layout1
          key={`layout1key-${toRender.length}`}
          componentPhotos={photoArray}
        />,
      ];
    }

    if (
      toRender.length === 1 || randomInt == 2
    ) {
      return [
        <Layout2
          key={`layout2key-${toRender.length}`}
          componentPhotos={photoArray}
        />,
      ];
    }

    if (
      toRender.length === 0 ||
      photoArray.length < 3 ||
      !toRender[toRender.length - 1].key.includes(`layout1key`)
    ) {
      return [
        <Layout1
          key={`layout1key-${toRender.length}`}
          componentPhotos={photoArray}
        />,
      ];
    } else {
      return [
            <Layout3
              key={`layout3key-${toRender.length}`}
              componentPhotos={photoArray}
            />,
          ];
    }
   
   
  }

  const fetchMore = () => {
    if (!currentUserId) return;
    setLoading(true);

    fetch(`${backendURL}/post/scroll/${toRender.length * 3}`, {
      Authorization: localStorage.getItem("Isntgram_access_token"),
    })
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        let photoArray = obj.posts;
        if (photoArray.length < 3) {
          setHasMore(false);
        }
        const componentToRender = getTemplate(toRender, photoArray);
        setToRender([...toRender, ...componentToRender]);
      });
    setLoading(false);
  };

  if (!toRender || !currentUserId) return null;
  return (
    <ExploreGridWrapper key="gridWrapper">
      <InfiniteScroll initialLoad={true} pageStart={4} loadMore={fetchMore} hasMore={hasMore}>
        {toRender}
      </InfiniteScroll>
      <LoadingWrapper
        style={{ animationName: `${loading ? "fadeIn" : "fadeOut"}` }}
        >
        <Loading />
      </LoadingWrapper>
    </ExploreGridWrapper>
  );
};

export default ExploreGrid;
