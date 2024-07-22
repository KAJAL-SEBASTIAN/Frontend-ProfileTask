import React, { useContext, useEffect, useState } from 'react';
import '../CSS/UpdateProfile.css';
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn
} from 'mdb-react-ui-kit';
import { baseUrl } from '../services/baseUrl';
import { updateUserProfileAPI } from '../services/allAPIs';
import { editUserProfileContextApi } from '../ContextAPI/ContextShare';

function UpdateProfile({ profile }) {
  
  const{editProfileRes,setEditProfileRes} =useContext(editUserProfileContextApi)

  const [centredModal, setCentredModal] = useState(false);
  const [profileDetails, setProfileDetails] = useState({
    username: '',
    age: '',
    dob: '',
    contact: '',
    profileImage: null
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (profile) {
      setProfileDetails({
        username: profile.username || '',
        age: profile.age || '',
        dob: profile.dob || '',
        contact: profile.contact || '',
        profileImage: null
      });
      setPreview(profile.profileImage ? `${baseUrl}/uploads/${profile.profileImage}` : '');
    }
  }, [profile]);

  useEffect(() => {
    if (profileDetails.profileImage) {
      setPreview(URL.createObjectURL(profileDetails.profileImage));
    }
  }, [profileDetails.profileImage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProfileDetails(prevDetails => ({
      ...prevDetails,
      profileImage: e.target.files[0]
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', profileDetails.username);
    formData.append('age', profileDetails.age);
    formData.append('dob', profileDetails.dob);
    formData.append('contact', profileDetails.contact);
    if (profileDetails.profileImage) {
      formData.append('profileImage', profileDetails.profileImage);
    }

    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      };

      try {
        const result = await updateUserProfileAPI(profile._id, formData, reqHeader);
        if (result.status === 200) {
          console.log('Profile updated successfully:', result.data);
          setEditProfileRes(result.data);
          setCentredModal(false);
        } else {
          console.error('Failed to update profile:', result.response.data);
          setEditProfileRes(result.response.data)
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={() => setCentredModal(true)} className='btn btn-secondary update'>
        Update
      </button>

      <MDBModal size="sm" open={centredModal} onClose={() => setCentredModal(false)}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalBody>
              <form className='formssup' onSubmit={updateProfile}>
                <div className="profile-headers">
                  <div className="profile-avatar">
                    <label>
                      <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                      />
                      <img
                        src={preview}
                        alt="User Avatar"
                        className="profile-image"
                      />
                    </label>
                  </div>
                </div>
                <div className="form-content">
                  <div className="form-group">
                    <label>Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={profileDetails.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Age:</label>
                    <input
                      type="text"
                      name="age"
                      value={profileDetails.age}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                      type="text"
                      name="dob"
                      value={profileDetails.dob}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact:</label>
                    <input
                      type="text"
                      name="contact"
                      value={profileDetails.contact}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <MDBModalFooter>
                    <MDBBtn onClick={ updateProfile } type="submit">Update</MDBBtn>
                  </MDBModalFooter>
                </div>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default UpdateProfile;



