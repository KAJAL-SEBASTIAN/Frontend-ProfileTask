import React, { createContext, useState } from 'react'

export const addProfileContextApi = createContext()
export const editUserProfileContextApi = createContext()

function ContextShare({children}) {
    const [addProfileRes,setAddProfileRes] = useState("")
    const [editProfileRes,setEditProfileRes] = useState("")
  return (
    <div>
        <addProfileContextApi.Provider value={{addProfileRes,setAddProfileRes}}>
            <editUserProfileContextApi.Provider value={{editProfileRes,setEditProfileRes}}>
            {children}
            </editUserProfileContextApi.Provider>
        </addProfileContextApi.Provider>

    </div>
  )
}

export default ContextShare
