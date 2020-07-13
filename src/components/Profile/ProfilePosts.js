import React, {useContext } from "react";
import styled from "styled-components";
import ProfilePost from "./ProfilePost"
import {ProfileContext} from '../../context'


const ProfilePostWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: .25rem;
    grid-column-gap: .25rem;
    margin-top: 20px;
    padding-bottom: 53px;
    cursor: pointer;

    @media screen and (min-width: 735px) {
        grid-row-gap: 1.5rem;
        grid-column-gap: 1.5rem;
        padding-bottom: 0;
  }

`

const ProfilePosts = ({posts}) => {
    const {profileData} = useContext(ProfileContext)


    if (!profileData) return null
    return (
        <ProfilePostWrapper>
            {profileData.posts.map(post => {
                return <ProfilePost key={`post - ${post.id}`} post={post}/>
            })}
        </ProfilePostWrapper>
    )
}

export default ProfilePosts
