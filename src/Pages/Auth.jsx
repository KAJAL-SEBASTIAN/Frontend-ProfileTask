import React, { useState } from 'react'
import '../CSS/Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allAPIs';
import img from '../assets/circle.png';

function Auth({ register }) {

  const location = useNavigate()

  const isRegisterForm = register ? true : false

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",

  })

  const registerData = async () => {
    const { username, email, password } = userData
    if (!username || !email || !password) {
      alert("Please fil the form")
    }
    else {
      const result = await registerAPI(userData);
      console.log(result);

      if (result.status == 200) {
        alert(result.data)//user registration successfull
        location('/')
      }
      else {
        alert(result.response.data)//user already registered
      }
    }

    console.log(userData);
  }

  const loginData = async () => {
    const { email, password } = userData
    if (!email || !password) {
      alert("Please fill the form")
    }
    else {
      const result = await loginAPI(userData)
      console.log(result);
      if (result.status === 200) {
        alert("Login successful")//user login successful
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.user))
        sessionStorage.setItem("token", result.data.token)
        location('/dashboard')
      }
      else {
        alert("Invalid user data")
      }
    }
  }

  return (
    <div className='justify-content-center align-items-center' id='auth'>
     
     
          <div className="row" id='row'>
            <div className="col-md-6 bg-light">
              <img id='img' src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?t=st=1721431747~exp=1721435347~hmac=4918df0a5d442918215062ecc0dd53be16cc952724a1cff2f79cdc31f136eddd&w=740" alt="" />
            </div>
            <div className="col-md-6">

              <h2 className='text-center text-dark '>
                {
                  isRegisterForm ? 'Register here' : 'Login here'
                }
              </h2>

              {
                isRegisterForm ? null :
                  <img id='logimg' src={img} alt="" />
              }
              <form className=' p-2 forms  align-items-center '  >
                {

                  isRegisterForm &&
                  <input type="text" value={userData.username} onChange={e => setUserData({ ...userData, username: e.target.value })} placeholder='Username' className='form-control mb-3  text-dark' />
                }
                <input type="email" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} placeholder='Email' className='form-control mb-3 text-dark' />
                <input type="password" value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })} required id="pass" name="password" minlength="8" placeholder='Password' className='form-control mb-3  text-dark' />

              </form>

              {
                isRegisterForm ?
                  <div className='text-center '>
                    <button onClick={registerData} className='btn btn-info text-light' >Register</button>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>
                      <p className='mt-2' >Already Register? please login from here...</p>
                    </Link>
                  </div>
                  :
                  <div className='text-center'>
                    <button onClick={loginData} className='btn btn-info text-light' >Login</button>
                    <Link to={'/register'} style={{ textDecoration: 'none', color: 'black' }}>
                      <p className='mt-1' >New to here? Please Register...</p>
                    </Link>
                  </div>
              }


            </div>
          </div>
       
      
    </div>
  )
}

export default Auth
