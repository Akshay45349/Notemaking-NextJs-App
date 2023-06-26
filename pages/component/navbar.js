import React from 'react'
import {  useSession, signOut } from 'next-auth/react';
import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import 'rsuite/dist/rsuite-no-reset.min.css';


const HomeNavbar = () => {

    const {data:session}=useSession();
    const handleLogout=async(e)=>{
      await signOut({redirect:false,callbackUrl:'/login'});
      
    }
    
  return (
    <Navbar appearance="inverse" className='shadow-xl sticky z-50 top-0'>
    <Navbar.Brand className='font-pattya text-3xl'>Aka Notes</Navbar.Brand>
    <Nav>
      <Nav.Item icon={<HomeIcon />}>Home</Nav.Item>
      <Nav.Item> About</Nav.Item>  
      <Nav.Item>Contact</Nav.Item>  
      <Nav.Item>Enjoy</Nav.Item>
    </Nav>
    
    <Nav pullRight>
      <Nav.Menu placement='bottomEnd' trigger="hover"  title={session.token.name[0].toUpperCase()} className='bg-green-400 font-semibold text-2xl rounded-full'>
        <Nav.Item>{session.token.email}</Nav.Item>
        <Nav.Item><button onClick={handleLogout}>Logout</button></Nav.Item>
      </Nav.Menu>
    </Nav>
  </Navbar>


    
  )
}

export default HomeNavbar