import React, {useContext } from "react";
import styled from "styled-components";
import ProfilePost from "./ProfilePost"
import {ProfileContext} from '../../context'


const ProfilePostWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: .125rem;
    grid-column-gap: .125rem;
    cursor: pointer;

    @media screen and (min-width: 735px) {
        grid-row-gap: 1.5rem;
        grid-column-gap: 1.5rem;
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
