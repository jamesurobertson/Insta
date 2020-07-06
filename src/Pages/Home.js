import React from "react";
import Nav from "../components/Nav";
import { toast } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import Explore from "./Explore";
import styled from "styled-components";
import Post from "../components/Post/Post"

const Feed = styled.div`
  padding-top: 55px;
  display: flex;
  justify-content: center;
`;


const Home = () => {

  return (
      <Feed>
        <Post />
      </Feed>
  )
};

export default Home;
