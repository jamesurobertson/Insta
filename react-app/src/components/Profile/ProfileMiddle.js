import { useState, useContext } from 'react';
import styled from 'styled-components';
import DynamicModal from '../DynamicModal';
import Modal from 'react-modal';
import { ProfileContext } from '../../Contexts';

const ProfileMiddleDataWrapper = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 61px;
    padding: 12px 0;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;

    .profile-middle__data {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .profile-data__type {
        font-size: 14px;
        color: #aaa;
    }
    @media screen and (min-width: 735px) {
        border-top: none;
        height: 0;
        padding: 0;

        .profile-middle__data {
            display: none;
        }
    }

    .profile-data__number {
        font-weight: bold;
        font-size: 14px;
    }
`;

const ProfileMiddle = (props) => {
    const { profileData } = useContext(ProfileContext);

    const { posts, user } = profileData;

    const [isFollowersOpen, setIsFollowersOpen] = useState(false);
    const [isFollowingOpen, setIsFollowingOpen] = useState(false);

    const closeFollowersModal = () => {
        setIsFollowersOpen(false);
    };

    const closeFollowingModal = () => {
        setIsFollowingOpen(false);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: '0',
            borderRadius: '5px',
            transform: 'translate(-50%, -50%)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: '500',
        },
    };

    return (
        <>
            <ProfileMiddleDataWrapper>
                <div className='profile-middle__data'>
                    <div className='profile-data__number'>{posts.length}</div>
                    <div className='profile-data__type'>posts</div>
                </div>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsFollowersOpen(true)}
                    className='profile-middle__data'
                >
                    <div className='profile-data__number'>
                        {user.followers.length}
                    </div>
                    <div className='profile-data__type'>followers</div>
                </div>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => setIsFollowingOpen(true)}
                    className='profile-middle__data'
                >
                    <div className='profile-data__number'>
                        {user.following.length}
                    </div>
                    <div className='profile-data__type'>following</div>
                </div>
            </ProfileMiddleDataWrapper>
            <Modal
                isOpen={isFollowersOpen}
                onRequestClose={closeFollowersModal}
                style={customStyles}
                contentLabel='Example Modal'
            >
                <DynamicModal
                    closeModal={closeFollowersModal}
                    title={'Followers'}
                />
            </Modal>
            <Modal
                isOpen={isFollowingOpen}
                onRequestClose={closeFollowingModal}
                style={customStyles}
                contentLabel='Example Modal'
            >
                <DynamicModal
                    closeModal={closeFollowingModal}
                    title={'Following'}
                />
            </Modal>
        </>
    );
};

export default ProfileMiddle;
