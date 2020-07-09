import React from "react";
// import { toast } from "react-toastify";
// import { Route, Switch } from "react-router-dom";
// import Explore from "./Explore";
import styled from "styled-components";
import Post from "../components/Post/Post"

const Feed = styled.div`
  display: flex;
  padding-top: 55px;
  justify-content: center;
  padding-bottom: 53px;

  @media screen and (min-width: 615px) {
    padding-top: 75px;
}

@media screen and (min-width: 475px) {
    padding-bottom: 0;

  }
`;


const Home = () => {

  return (
    <Feed>
      <Post />
    </Feed>
  )
};

export default Home;
