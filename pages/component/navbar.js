'use client';

import React from 'react'
import {  useSession, signOut } from 'next-auth/react';
import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import 'rsuite/dist/rsuite-no-reset.min.css';



const HomeNavbar = () => {

    const {data:session}=useSession();
    const handleLogout=async(e)=>{
      e.preventDefault();
      await signOut({redirect:false,callbackUrl:'/login'});
      
    }
  if(!session){
    return (
      <>
      <div>No-session</div>
      </>
    )
  } 
  return (
    <Navbar appearance="inverse" className='shadow-xl sticky z-50 top-0'>
    <Navbar.Brand className='font-pattya text-3xl'>Aka Notes</Navbar.Brand>
    <Nav>
      <Nav.Item href='#' icon={<HomeIcon />}>Home</Nav.Item>
      <Nav.Item href='#' > About</Nav.Item>  
      <Nav.Item href='#' >Contact</Nav.Item>  
      <Nav.Item href='#' >Enjoy</Nav.Item>
    </Nav>
    
    <Nav pullRight>
      <Nav.Menu placement='bottomEnd' trigger="hover"  title={session.token.name[0].toUpperCase()} className='bg-green-400 font-semibold text-2xl rounded-full'>
        <Nav.Item href='#' >{session.token.email}</Nav.Item>
        <Nav.Item href='#' ><button onClick={handleLogout}>Logout</button></Nav.Item>
      </Nav.Menu>
    </Nav>
  </Navbar>


    
  )
}

export default HomeNavbar