import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import navImage from "../Images/navImage.png";
import profile from "../Images/profile.jpeg";
import Search from "./Search";
import { HomeIcon, HeartIcon, ExploreIcon, InboxIcon } from "./Icons";

const NavContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 54px;
  background-color: whitesmoke;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 20px;
  }

  .navImage {
    margin-top: 9px;
    height: 29px;
  }

  ul {
    display: flex;
  }

  li {
    margin-left: 22px;
  }

  @media screen and (max-width: 501px) {
    input {
      display: none;
    }
  }

  @media screen and (min-width: 1000px) {
      nav {
          width:975px;
      }
  }
`;

const Nav = () => {
  return (
    <NavContainer>
      <nav>
        <Link to="/">
          <img className="navImage" src={navImage} alt="logo" />
        </Link>
        <Search />
        <ul>
          <li>
            <Link to="/">
              <HomeIcon />
            </Link>
          </li>
          <li>
            <Link to="/direct/inbox">
              <InboxIcon />
            </Link>
          </li>
          <li>
            <Link to="/explore">
              <ExploreIcon />
            </Link>
          </li>
          <li>
            <Link to="/">
              <HeartIcon />
            </Link>
          </li>
          <li>
            <Link to={`/profile`}>
              <img
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
                src={profile}
                alt="avatar"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </NavContainer>
  );
};

export default Nav;
