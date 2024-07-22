import React, { useContext, useEffect, useState } from 'react';
import AddProfile from './AddProfile';
import '../CSS/MyProfile.css';
import UpdateProfile from './UpdateProfile';
import { homeProfileAPI } from '../services/allAPIs';
import { baseUrl } from '../services/baseUrl';
import { addProfileContextApi, editUserProfileContextApi } from '../ContextAPI/ContextShare';
import profile from '../assets/profile.png';

function MyProfile() {
  const {addProfileRes,setAddProfileRes} = useContext(addProfileContextApi)
    const{editProfileRes,setEditProfileRes} =useContext(editUserProfileContextApi)
    const [homeProfile, setHomeProfile] = useState({});

    const getHomeProfile = async () => {
        const result = await homeProfileAPI();
        if (result.status === 200) {
            setHomeProfile(result.data);
        } else {
            console.log("Api fetching profile details failed");
        }
    };

    useEffect(() => {
        if (addProfileRes) {
            setHomeProfile(addProfileRes);
        } else {
            getHomeProfile();
        }
    }, [addProfileRes,editProfileRes]);

    return (
        <div className='profile'>
            <div className='d-flex'>
                <h3 className='ms-5 text-primary'>My Profile</h3>
                <div className='ms-auto'>
                    <AddProfile />
                </div>
            </div>
            <div className='container text-dark bg-light text-center border shadow w-75 ms-5'>
                <div>
                    <img
                        src={homeProfile.profileImage ? `${baseUrl}/uploads/${homeProfile.profileImage}` : profile}
                        alt="Profile Image"
                        className="profile-image"
                    />
                </div>
                <div>
                    <h2 className="profile-name">Name: {homeProfile.username}</h2>
                    <p className="profile-age">Age: {homeProfile.age}</p>
                    <p className="profile-dob">Date of Birth: {homeProfile.dob}</p>
                    <p className="profile-contact">Contact: {homeProfile.contact}</p>
                </div>
            </div>
            <UpdateProfile profile={homeProfile} />
        </div>
    );
}

export default MyProfile;


