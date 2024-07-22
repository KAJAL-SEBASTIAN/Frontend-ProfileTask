import React, {  useEffect, useState } from 'react'
import '../CSS/Dashboard.css'
import { Col } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import MyProfile from '../Components/MyProfile';
import project1 from '../assets/Project1.png';
import project2 from '../assets/Project2.png';

function Dashboard() {
  
  const existingUser = JSON.parse(sessionStorage.getItem("existingUser"))

  return (
    <div className='dash'>

  <a href='/' className='btn'><i className='fa-solid fa-right-from-bracket fs-2'></i></a>
  <Row>
  <h1 className='m-5 text-primary'>Welcome <span className='text-light'> {existingUser.username} </span></h1>
    <Col>
   <MyProfile/>
    </Col>
    <Col>

<div>
<h3 className='text-light ps-3 ms-5' >My Projects</h3>
  <div class="projects align-items-center ">
    <div class="projectcard">
      <img src={project1} alt="Project 1" />
      <h2>Salon Booking </h2>
      <p>This application is for booking and managing services according to user interest.</p>
      <a href='https://github.com/KAJAL-SEBASTIAN/Salon-Frontend.git'><i className='fa-brands fa-github'></i></a>
    </div>
    <div class="projectcard">
      <img src={project2} alt="Project 2" />
      <h2>ShopEase E-Cart</h2>
      <p>Developed an e-cart site with wishlist, cart management,using Redux for state management..</p>
      <a href='https://github.com/KAJAL-SEBASTIAN/E-Cart.git'><i className='fa-brands fa-github'></i></a>
    </div>
 
  </div>
</div>
    </Col>
  </Row>
</div>


  )
}

export default Dashboard
