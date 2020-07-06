import React from "react";
import Nav from "../components/Nav";
import { Route, Switch } from "react-router-dom";
import Explore from "./Explore";
import styled from "styled-components";

const Feed = styled.div`
  padding-top: 55px;
`;


const Home = () => {
  return (
      <Feed>
          Hello World!
      </Feed>
  )
};

export default Home;
