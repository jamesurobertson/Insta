import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import navImage from "../Images/logo.svg"
import MobileNav from "./MobileNav";
import {
  RiHome5Line,
  RiCamera2Line,

  RiHeartLine,
  RiSearchLine
} from "react-icons/ri";
import { UserContext } from "../context";

const NavContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  border-bottom: 1px solid #dfdfdf;
  background-color: white;
  width: 100%;
  height: 54px;
  z-index: 100;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 935px;
    padding: 0 20px;


  }

  .navImage {
    margin-top: 9px;

    height: 40px;
  }

  .nav-icon {
    font-size: 25px;
  }

  ul {
    display: flex;
  }

  li {
    margin-left: 22px;
    padding-top: 6px;
  }

  @media screen and (max-width: 475px) {
    nav {
      display: flex;
      justify-content: center;
    }
    nav ul {
      display: none;
    }
    .navImage{
      display: flex;
      justify-content: center;
    }
  }


  .active {
    color: #0095f6 !important;
  }

  .activeAvatar div {
    padding: 1px;
    border: 2px solid #0095f6;
  }
`;

const NavProfileContainer = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  .navProfilePic {
    width: 23px;
    height: 23px;
    object-fit: contain;
    border-radius: 12px;
  }
`;

const Nav = () => {
  const { currentUserProfilePic, currentUserId } = useContext(UserContext);
  return (
    <>
    <NavContainer>
      <nav>
        <Link to="/">
          <img className="navImage" src={navImage} alt="logo" />
        </Link>
        <ul>
          <li>
            <NavLink exact activeClassName="active" to="/">
              <RiHome5Line className="nav-icon" />
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/upload">
              <RiCamera2Line className="nav-icon" />
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/explore">
              <RiSearchLine className="nav-icon" />
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/notifications">
              <RiHeartLine className="nav-icon" />
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName="activeAvatar"
              to={`/profile/${currentUserId}`}
            >
              <NavProfileContainer>
                <img
                  className="navProfilePic"
                  src={currentUserProfilePic}
                  alt="avatar"
                />
              </NavProfileContainer>
            </NavLink>
          </li>
        </ul>
      </nav>
    </NavContainer>
    <MobileNav/>
    </>
  );
};

export default Nav;
