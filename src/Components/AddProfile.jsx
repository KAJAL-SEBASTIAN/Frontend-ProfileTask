import React, { useContext, useEffect, useState } from 'react';
import '../CSS/AddProfile.css';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
} from 'mdb-react-ui-kit';
import profile from '../assets/profile.png';
import { addProfileAPI } from '../services/allAPIs';
import { addProfileContextApi } from '../ContextAPI/ContextShare';

function AddProfile() {
    const { addProfileRes, setAddProfileRes } = useContext(addProfileContextApi);
    const [token, setToken] = useState("");
    const [centredModal, setCentredModal] = useState(false);
    const [profileDetails, setProfileDetails] = useState({
        username: "", age: "", dob: "", contact: "", profileImage: ""
    });
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"));
        }
    }, []);

    useEffect(() => {
        if (profileDetails.profileImage) {
            setPreview(URL.createObjectURL(profileDetails.profileImage));
        }
    }, [profileDetails.profileImage]);

    const profileAdd = async () => {
        const { username, age, dob, contact, profileImage } = profileDetails;
        if (!username || !age || !dob || !contact || !profileImage) {
            alert("Please fill the form");
            return;
        }

        const reqBody = new FormData();
        reqBody.append("username", username);
        reqBody.append("age", age);
        reqBody.append("dob", dob);
        reqBody.append("contact", contact);
        reqBody.append("profileImage", profileImage);

        const reqHeader = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        };

        try {
            const result = await addProfileAPI(reqBody, reqHeader);
            if (result.status === 200) {
                alert("Profile added successfully...");
                setAddProfileRes(result.data); // Update context state
                handleClose(); // Close modal
                setProfileDetails({
                    username: "", age: "", dob: "", contact: "", profileImage: ""
                });
                setPreview(""); // Clear image preview
            } else {
                console.error(result.response.data);
            }
        } catch (error) {
            console.error("Error adding profile:", error);
        }
    };

    const handleClose = () => {
        setCentredModal(false);
    };

    return (
        <div>
            <button onClick={() => setCentredModal(true)} className='btn btn-secondary'>Add Profile</button>

            <MDBModal size="sm" open={centredModal} onClose={handleClose}>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalBody>
                            <form className='formss'>
                                <div className="profile-headers">
                                    <div className="profile-avatar">
                                        <label>
                                            <input
                                                type="file"
                                                id="fileInput"
                                                style={{ display: 'none' }}
                                                onChange={e => setProfileDetails({ ...profileDetails, profileImage: e.target.files[0] })}
                                            />
                                            <img
                                                src={preview ? preview : profile}
                                                alt="User Avatar"
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
                                            onChange={e => setProfileDetails({ ...profileDetails, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Age:</label>
                                        <input
                                            type="text"
                                            name="age"
                                            value={profileDetails.age}
                                            onChange={e => setProfileDetails({ ...profileDetails, age: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth:</label>
                                        <input
                                            type="text"
                                            name="dob"
                                            value={profileDetails.dob}
                                            onChange={e => setProfileDetails({ ...profileDetails, dob: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Contact:</label>
                                        <input
                                            type="text"
                                            name="contact"
                                            value={profileDetails.contact}
                                            onChange={e => setProfileDetails({ ...profileDetails, contact: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <MDBBtn onClick={profileAdd} type="button">Add</MDBBtn>
                                </div>
                            </form>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
}

export default AddProfile;
