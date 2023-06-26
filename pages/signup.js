'use client';
import React from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';

const Signup = () => {

    let [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
      })
    
      const router=useRouter();
      const [status, setStatus] = useState(null);
      const [pmatch, setPmatch] = useState(null)
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setUser((prevuser)=>({
            ...prevuser,[name]:value
        }));
    
    
    }
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(user.password!=user.confirmPassword){
            setPmatch("not");
            return;
        }
    
        const response=await fetch('/api/register',{
            method:"POST",
            headers:{"Content_Type":"application/json"},
            body:JSON.stringify({
                name:user.name,
                email:user.email,
                password:user.password
            })
        })
        if(response.status===200){
          router.push('/login');
        }else{
          setStatus("fail");
        }
        
    }
  return (
    <>
    <Head>
      <title>AkaNotes-Signup</title>
    </Head>
    <div className='flex my-5 justify-center items-center'>
      
      <Image src="/akanotesimg.png" height={0} width={300} alt="login image" style={{height:'539px'}}/>
      <div className='border-solid border-gray-300 border-[1px] flex flex-col w-96 h-[539px] px-10 py-5 items-center bg-[#f4eeee]'>
        <span className='text-5xl font-semibold font-Cursive mt-10 mb-10'>Aka-Notes</span>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input type="text" name="name" value={user.name} required placeholder='Enter your Name'  onChange={handleChange} className='my-1 p-1 w-60'/>
          <input type="email" name="email" value={user.email} required placeholder='Enter your E-mail'  onChange={handleChange} className='my-1 p-1 w-60'/>
          <input type="password" name="password" value={user.password} required placeholder='Enter your password' onChange={handleChange} className='my-1 p-1 w-60'/>
          <input type="password" name="confirmPassword" value={user.confirmPassword} required placeholder='Enter password again' onChange={handleChange} className='my-1 p-1 w-60'/>
          {pmatch==="not" && <div className='text-red-600'>password not matching</div> }
          <button className='bg-blue-500 p-1 rounded-md my-5 hover:bg-blue-600' type='submit' >Signup</button>
             
        </form>

        {status==='fail' && <div className='text-red-500'>Internal server error. Please try again</div> }
        
        
      </div>
      
    </div>
    </>
  )
}

export default Signup