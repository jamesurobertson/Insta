import React, {useState, useEffect, useCallback, useRef} from 'react';
import styled from "styled-components";
import { backendURL } from "../../config";
import { UserContext } from "../../context";
import Layout1 from "./Layout1";

  const ExploreGridWrapper = styled.div`
    margin: auto;
    margin-top: 10vh;
    margin-bottom: 10vh;
    width: 95vw;
    max-width: 614px;
  `;

const ExploreGridScratch = () => {


    const [toRender, setToRender] = useState()
    const [hasMore, setHasMore] = useState(true)
    // const [loading, setLoading] = useState()
    const infiniteScroll = useRef()

    const loadMore = async () => {
      if (hasMore === false) return
      const res = await fetch(
        `${backendURL}/post/scroll/${toRender.length * 3}`,
        {
          Authorization: localStorage.getItem("Isntgram_access_token"),
        }
      );

      const obj = await res.json();
      let photoArray = obj.posts;
      if (photoArray.length < 3) {
        setHasMore(false)
      }
      setToRender([...toRender, photoArray]);

    };

    useEffect(()=>{
      if (!infiniteScroll.current) return
      infiniteScroll.current.addEventListener("scroll", () => {
        if ((infiniteScroll.current.scrollTop + infiniteScroll.current.clientHeight >=
            infiniteScroll.current.scrollHeight - 1) && hasMore === true) {
          loadMore();
        }
      });

    },[toRender])

    useEffect(()=>{
      loadInit()
    },[])

      const loadInit = async () => {
        const res = await fetch(`${backendURL}/post/scroll/init`, {
          Authorization: localStorage.getItem("Isntgram_access_token"),
        });

        const obj = await res.json();
        let photoArray = obj.posts;
        let setOfTwelve = [];
        let setOfThree = [];
        photoArray.forEach((photo) => {
          setOfThree.push(photo);
          if (setOfThree.length === 3) {
            setOfTwelve.push(setOfThree);
            setOfThree = [];
          }
        });
        setToRender(setOfTwelve);

      };

      const renderLayout = () => {
        if (!toRender) return null;
        const result = [];

        toRender.forEach((node) => {
          result.push(
            <Layout1 key={`layout1key-${node[0].id}`} componentPhotos={node} />
          );
        });
        return result;
      };



      if(!toRender) return null
    return (
      <ExploreGridWrapper style={{ height: '100vh', overflow: "auto" }} ref={infiniteScroll}>
        <div>{renderLayout()}</div>
        <h1>{`${infiniteScroll}`}</h1>
      </ExploreGridWrapper>
    );
};

export default ExploreGridScratch;
