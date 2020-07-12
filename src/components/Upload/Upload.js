import React, { useState, useContext, useRef} from "react";
import ImageUploader from "react-images-upload";
import styled from "styled-components"
import {UserContext} from '../../context'
import {backendURL} from '../../config'
import {fadeIn} from '../../Styles/animations'
import {RiImageAddLine} from "react-icons/ri"
import { toast } from "react-toastify";

const UploadWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  margin: 54px 0;
  background-color: white;
  text-align: center;

  img {
    opacity: 0;
    height: 80vw;
    max-height: 380px;
    width: 80vw;
    max-width: 380px;
    animation: ${fadeIn} 1s forwards;
    object-fit: cover;
    overflow: hidden;
    border: #dfdfdf solid 1px;
    background-color: #fafafa;
    color: #262626;
  }

  .imageWrapper{
    height: 80vw;
    max-height: 380px;
    width: 80vw;
    max-width: 380px;

  }

  .labelWrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column;
    height: 80vw;
    max-height: 380px;
    width: 80vw;
    max-width: 380px;
  }

  & svg {
    height: 20%;
    width: 20%;
    margin: 0 auto;
    fill: #262626;
  }

  textarea {
    resize: none;
    padding: 6px 10px;
    min-height: 77px;
    width: 100%;
    border: #dfdfdf 1px solid;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    width: 100%;
    color: #262626;
    margin-bottom: 5px;
    text-align: left;
    padding-left: 3px;
    font-size: 14px;
  }

  .fileContainer button, button {
    background-color: #0095f6;
    font-weight: bold;
    color: white;
    border: none;
    width: 100%;
    border-radius: 5px;
    height: 30px;
    margin: 0;
  }

  .fileContainer button:hover, button:hover {
      background-color: #545972;
      color: white;
      border: none;

  }


  .imageWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 100%;
    margin-bottom: 20px;
    
  }

  .fileUploader {
    width: 100%;
    left: calc(50% - 306);
  }

  .fileContainer {
    height: 30px;
    box-shadow: none;
    margin: 0;
    padding: 0;
    border-radius: 0;
  }

  .goback-button {
    color: #0095f6;
    background-color: white;
    margin-top: 20px;
    border: 1px solid #0095f6;
  }

  @media screen and (min-width: 500px) {
  margin: 74px auto;
  border: 1px solid #dfdfdf;
  width: 500px;
  border-radius: 3px;
  }
  
`;


const Upload = (props) => {
  const {currentUserId} = useContext(UserContext)
  const [picture, setPicture] = useState([]);
  const captionInput = useRef();

  const onDrop = (e, picture) => {
    setPicture(picture);
  };

  const goBack = (e) => {
    console.log("go back");
    props.history.push(`/`);
  };

  const handleUpload = async () =>{
    const body = {
      currentUserId,
      caption: captionInput.current.value,
      imageURL: picture[0]
    }
    const res = await fetch(`${backendURL}/post/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Isntgram_access_token")
      },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      toast.error('Upload Error. Please try again!')
    } else {
      const obj = await res.json()
      toast.success('Upload Success!')
      props.history.push(`/post/${obj.id}`)

    }




  }

  return (
    <UploadWrapper>
      <div className="imageWrapper">
        {picture.length === 0 ? (
          <div className="labelWrapper">
            <RiImageAddLine fill={"#262626"} stroke={"#262626"} />
            <p>Upload a Photo</p>
          </div>
        ) : (
          <img src={picture[0]} draggable={false} alt="User's Upload" />
        )}
      </div>
      {picture[0] ? (
        <>
          <label htmlFor='caption'>Add a Caption:</label>
          <textarea ref={captionInput} id="caption" placeholder="Tell us about your photo..." />
          <button style={{marginBottom: "6px"}} onClick={handleUpload}>Upload</button>
        </>
      ) : null}
      <ImageUploader
        {...props}
        className="uploader"
        buttonText={picture[0] ? "Change Photo" : "Choose a Photo"}
        singleImage={true}
        withIcon={false}
        onChange={onDrop}
        label=""
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <button className="goback-button" onClick={goBack}>
        Go back
      </button>
    </UploadWrapper>
  );
};

export default Upload;
