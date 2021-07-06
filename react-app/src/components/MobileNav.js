import { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {
    RiHome5Line,
    RiCamera2Line,
    RiHeartLine,
    RiSearchLine,
} from 'react-icons/ri';
import { UserContext } from '../Contexts';

const NavContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
    border-top: 1px solid #dfdfdf;
    background-color: white;
    width: 100vw;
    height: 54px;
    z-index: 100;

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 20px;
    }

    .navImage {
        margin-top: 9px;
        width: 40vw;
        height: 40px;
    }

    .nav-icon {
        font-size: 25px;
    }

    ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    li {
        margin-left: 22px;
        padding-top: 6px;
    }

    @media screen and (min-width: 475px) {
        display: none;
    }

    @media screen and (min-width: 1000px) {
        nav {
            width: 975px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 400px;
    overflow: hidden;

    .navProfilePic {
        width: inherit;
        height: inherit;
        object-fit: cover;
    }
`;

const MobileNav = () => {
    const { currentUser } = useContext(UserContext);
    return (
        <NavContainer>
            <nav>
                <ul>
                    <li>
                        <NavLink exact activeClassName='active' to='/'>
                            <RiHome5Line className='nav-icon' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/explore'>
                            <RiSearchLine className='nav-icon' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/upload'>
                            <RiCamera2Line className='nav-icon' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/notifications'>
                            <RiHeartLine className='nav-icon' />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            activeClassName='activeAvatar'
                            to={`/profile/${currentUser.id}`}
                        >
                            <NavProfileContainer>
                                <img
                                    className='navProfilePic'
                                    src={currentUser.profile_image_url}
                                    alt='avatar'
                                />
                            </NavProfileContainer>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </NavContainer>
    );
};

export default MobileNav;
