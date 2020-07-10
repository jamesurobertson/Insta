import React, { useState } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import { backendURL } from "../../config";
import {fadeIn} from '../../Styles/animations'
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
  animation-duration: 3s;
  animation-fill-mode: forwards;
`;

const ExploreGridWrapper = styled.div`
  margin: auto;
  margin-top: 10vh;
  margin-bottom: 10vh;
  width: 95vw;
  max-width: 614px;

  & {
    animation: ${fadeIn} 2s 0.25s forwards;
    opacity: 0;
  }
`;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getTemplate(toRender, photoArray) {
  const randomInt = getRandomInt(0, 4);

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
  if (toRender[toRender.length - 1].key.includes(`layout${randomInt}key`)) {
    return getTemplate(toRender, photoArray);
  } else {
    switch (randomInt) {
      case 1:
        return [
          <Layout1
            key={`layout1key-${toRender.length}`}
            componentPhotos={photoArray}
          />,
        ];
      case 2:
        return [
          <Layout2
            key={`layout2key-${toRender.length}`}
            componentPhotos={photoArray}
          />,
        ];
      default:
        console.log(toRender);
        return [
          <Layout3
            key={`layout3key-${toRender.length}`}
            componentPhotos={photoArray}
          />,
        ];
    }
  }
}

const ExploreGrid = (props) => {
  const [toRender, setToRender] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMore = () => {
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

  return (
    <ExploreGridWrapper key="gridWrapper">
      <InfiniteScroll pageStart={0} loadMore={fetchMore} hasMore={hasMore}>
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
