import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { ProfileContext } from "../../context";
import styled from "styled-components";

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

  .uploadPhoto {
    font-weight: bold;
    color: #0095f6;
  }

  .removeCurrentPhoto {
    font-weight: bold;
    color: #ed4956;
  }
`;

const ProfilePicModal = (props) => {
  const { openModal, setOpenModal, closeModal } = props;

  const { profileData } = useContext(ProfileContext);

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

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Profile Picture"
    >
      <EditProfilePicWrapper>
        <div className="changeProfilePhoto">Change Profile Photo</div>
        <div className="uploadPhoto">Upload Photo</div>
        <div className="removeCurrentPhoto">Remove Current Photo</div>
        <div className="cancel" onClick={() => closeModal(false)}>
          Cancel
        </div>
      </EditProfilePicWrapper>
    </Modal>
  );
};

export default ProfilePicModal;
