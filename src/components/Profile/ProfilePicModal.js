import React, {useContext } from "react";
import Modal from "react-modal";
import { ProfileContext, UserContext } from "../../context";
import styled from "styled-components";
import { toast } from "react-toastify";
import { backendURL } from "../../config";

Modal.setAppElement("#root");

const EditProfilePicWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 260px;

  @media screen and (min-width: 735px) {
    width: 400px;
  }

  & div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    border-top: 1px solid #dfdfdf;
    font-size: 15px;
    cursor: pointer;
  }

  .changeProfilePhoto {
    border: none;
    height: 78px;
    font-weight: bold;
    font-size: 18px;
    cursor: default;
  }

  .uploadPhoto label {
    font-weight: bold;
    color: #0095f6;
  }

  .removeCurrentPhoto {
    font-weight: bold;
    color: #ed4956;
  }

  #photoUploadButton {
    display: none;
  }
  #photoUploadLabel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  & .Toastify__toast--success {
    background-color: #0095f6;
  }
`;

const ProfilePicModal = (props) => {
  const { openModal, closeModal } = props;


  const { profileData, setProfileData } = useContext(ProfileContext);
  const { currentUserId, setCurrentUserProfilePic } = useContext(UserContext);
  const changePhoto = (e) => {
    const file = e.currentTarget.files[0];
    let formData;

    if (file) {
      formData = new FormData();
      formData.append("file", file);
    }
    postImage(formData);
  };

  const postImage = async (formData) => {
    if (!formData) return;
    try {
      const res = await fetch(`${backendURL}/aws/${currentUserId}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Error uploading photo. Please try again");
        throw res;
      }

      const { img } = await res.json();

      const newProfileData = { ...profileData };

      newProfileData.user.profile_image_url = img;
      setProfileData(newProfileData);
      toast.info("Photo upload Success!");
      closeModal();
      setCurrentUserProfilePic(img);
    } catch (e) {
      console.error(e);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      borderRadius: "10px",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: "500",
    },
  };

  const removeProfilePic = async () => {
    try {
      const res = await fetch(`${backendURL}/user/${currentUserId}/resetImg`);

      if (!res.ok) throw res;

      toast.info("Image Removed!");
      setProfileData({...setProfileData, user: res})
      closeModal()
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Profile Picture"
    >
      <EditProfilePicWrapper>
        <div className="changeProfilePhoto">Change Profile Photo</div>
        <div className="uploadPhoto">
          <label htmlFor="photoUploadButton" id="photoUploadLabel">
            <input
              accept="image/*"
              type="file"
              onChange={changePhoto}
              id="photoUploadButton"
            />
            Upload Photo
          </label>
        </div>
        <div onClick={removeProfilePic} className="removeCurrentPhoto">
          Remove Current Photo
        </div>
        <div className="cancel" onClick={() => closeModal(false)}>
          Cancel
        </div>
      </EditProfilePicWrapper>
    </Modal>
  );
};

export default ProfilePicModal;
