import React from "react";
import styled from "styled-components";


const LikeStyle = styled.div`

    .like-row-wrapper{
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: space-around;
        margin-top: 15px;
        padding-bottom: 10px;
    }
    .post-header-image {
        display: flex;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        overflow: hidden;
        justify-content: center;
        align-items: center;
        padding: 5px;
        margin-top: -13px;
    }

    .user-row{
        display: flex;
        justify-content: flex-start;
    }

    .like-header{
        text-align: center;
        padding: 17px;
        border-bottom: 1px solid lightgrey;
    }

    .button-follow{
        padding: 9px 5px;
        margin-left: 114px;
        font-size: 14px;
        font-weight: bold;
        color: white;
        width: 68px;
        height: 33px;
        background-color: #0095f6;
        border-radius: 4px;
        border: none;

    }
    .user-alias{
        font-size: 14px;
        font-weight: bold;
        color: #262626;
    }

    .user-name{
        font-szie:1 4px;
        color: #8E8E8E;
    }
   `

const LikeModal = () => {
    return (
        <LikeStyle>
            <h1 className='like-header'>Likes</h1>
            <div className='like-row-wrapper'>
                <div className='user-row'>
                    <img
                        className="post-header-image"
                        src="https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-19/s150x150/83700920_480186686267142_2503895191161667584_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_ohc=LsIa8jPnOeEAX_QYVS3&oh=09778b07f671ce0b13ff919809ee5067&oe=5F2E8038"
                        alt="corner-img" />

                    <div>
                        <div className='user-alias'>Big Lips</div>
                        <div className="user-name">Aaron</div>
                    </div>
                </div>
                <button className='button-follow'>Follow</button>
            </div>
            <div className='like-row-wrapper'>
                <div className='user-row'>
                    <img
                        className="post-header-image"
                        src="https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-19/s150x150/83700920_480186686267142_2503895191161667584_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_ohc=LsIa8jPnOeEAX_QYVS3&oh=09778b07f671ce0b13ff919809ee5067&oe=5F2E8038"
                        alt="corner-img" />

                    <div>
                        <div className='user-alias'>Big Lips</div>
                        <div className="user-name">Aaron</div>
                    </div>
                </div>
                <button className='button-follow'>Follow</button>
            </div>
        </LikeStyle>
    )
}

export default LikeModal;
