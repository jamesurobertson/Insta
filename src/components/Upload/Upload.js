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

  button {
    background-color: #0095f6;
    font-weight: bold;
    color: white;
    border: none;
    width: 100%;
    border-radius: 5px;
    height: 30px;
    margin: 0;
  }

  button:hover {
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

.custom-file-input {
  color: transparent;
  width: 100%;
  height: 30px;
  margin-top: 20px;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  display: flex;
  justify-content: center;
  align-items: center;

  content: 'Upload Photo';
  color: white;
  height: 30px;
  background: #0095f6;
  border-radius: 5px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  font-weight: 700;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}

`;


const Upload = (props) => {
  const {currentUserId} = useContext(UserContext)
  const [picture, setPicture] = useState(null);
  const [imagePreview, setImagePreview] = useState()
  const captionInput = useRef();


  const onDrop = (e) => {
    setPicture(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  };

  const goBack = (e) => {
    props.history.push(`/`);
  };

  const handleUpload = async () =>{

    const formData = new FormData()
    formData.append('file', picture)

    const caption = encodeURIComponent(captionInput.current.value)

    const res = await fetch(`${backendURL}/aws/post/${currentUserId}/${caption}`, {
      method: "POST",
      body: formData
    })

    if (!res.ok) {
      toast.error('Upload Error. Please try again!')
    } else {
      const post = await res.json()
      toast.info('Upload Success!')
      props.history.push(`/post/${post.id}`)

    }




  }

  return (
    <UploadWrapper>
      <div className="imageWrapper">
        {!picture ? (
          <div className="labelWrapper">
            <RiImageAddLine fill={"#262626"} stroke={"#262626"} />
            <p>Upload a Photo</p>
          </div>
        ) : (
          <img src={imagePreview} draggable={false} alt="User's Upload" />
        )}
      </div>
      {picture ? (
        <>
          <label htmlFor='caption'>Add a Caption:</label>
          <textarea ref={captionInput} id="caption" placeholder="Tell us about your photo..." />
          <button style={{marginBottom: "6px"}} onClick={handleUpload}>Upload</button>
        </>
      ) : null}
      <input className="custom-file-input" type='file' multiple={false} accept='.jpg, .gif, .png, .gif' onChange={onDrop}/>

      <button className="goback-button" onClick={goBack}>
        Go back
      </button>
    </UploadWrapper>
  );
};

export default Upload;
