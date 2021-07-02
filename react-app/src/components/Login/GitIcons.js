import styled from 'styled-components';
import JamesAvatar from '../../Images/profile.jpeg';
import AaronAvatar from '../../Images/aaron-profile.jpeg';
import MyloAvatar from '../../Images/mylo-profile.jpg';

const GitIconsWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    width: 90%;
    bottom: 35px;
    left: 5%;

    a {
        display: flex;
        justify-content: center;
        width: 30%;
    }

    img {
        width: 70%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }

    img:hover {
        opacity: 0.8;
    }
`;

const GitIcons = () => {
    return (
        <GitIconsWrapper>
            <a href='https://github.com/jamesurobertson/'>
                <img src={JamesAvatar} alt='James Robertson' />
            </a>
            <a href='https://github.com/ajpierskalla3/'>
                <img src={AaronAvatar} alt='Aaron Pierskalla' />
            </a>
            <a href='https://github.com/mylo-james/'>
                <img src={MyloAvatar} alt='Mylo James' />
            </a>
        </GitIconsWrapper>
    );
};

export default GitIcons;
