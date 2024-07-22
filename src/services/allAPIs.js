//All API calls


import { baseUrl } from "./baseUrl";
import { commonAPI } from "./commonAPI";

//Register API call
export const registerAPI = async (user) => {
    return await commonAPI("post", `${baseUrl}/register`, user, "")
}

//Login API call
export const loginAPI = async (user) => {
    return await commonAPI("post", `${baseUrl}/login`, user, "")
}


//add profile api call
export const addProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("post", `${baseUrl}/profile/add`, reqBody, reqHeader)
}

//get profile details api call
export const homeProfileAPI = async() =>{
    return await commonAPI("get", `${baseUrl}/profile/get-profile`,"","")
}

//update profile details api call
export const updateUserProfileAPI = async(profileId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/profile/update-profile/${profileId}`,reqBody,reqHeader)
}
