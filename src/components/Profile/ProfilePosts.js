import React, { useState, useEffect } from "react";
import styled from "styled-components";
import profile from "../../Images/profile.jpeg";
import ProfilePost from "./ProfilePost"

const ProfilePostWrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: .125rem;
    grid-column-gap: .25rem;
    cursor: pointer;

`

const ProfilePosts = () => {

    const [postsArray, setPostsArray] = useState(null)

    useEffect(() => {
        let picArray = []
        for (let i = 0; i < 20; i++) {
            picArray.push(profile)
        }

        setPostsArray(picArray)
    }, [])



    if (!postsArray) return null
    return (
        <ProfilePostWrapper>
            {postsArray.map(post => {
                return <ProfilePost post={post}/>
            })}
        </ProfilePostWrapper>
    )
}

export default ProfilePosts
