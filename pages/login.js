'use client';

import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router';
import {signIn} from 'next-auth/react';





export default function Login() {

  let [user, setUser] = useState({
    email:"",
    password:""
  })

  const router=useRouter();
  const [status, setStatus] = useState(null);

const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setUser((prevuser)=>({
        ...prevuser,[name]:value
    }));


}

const handleSubmit=async(e)=>{
    e.preventDefault();

    try {
      const authuser=await signIn("credentials",{...user, redirect:false});
    // console.log(authuser)
      if(authuser.status===200){
        router.push('/');
      }else{
        setUser({
          email:"",
          password:""
        })
        setStatus("fail");
        
      }
    } catch (error) {
      setUser({
        email:"",
        password:""
      })
      setStatus("fail");
    }
    
}

  return (
    <>
    <Head>
      <title>AkaNotes-Login</title>
    </Head>

    <div className='flex my-5 justify-center items-center'>
      
      <Image src="/akanotesimg.png" height={0} width={300} alt="login image" style={{height:'539px'}}/>
      <div className='border-solid border-gray-300 border-[1px] flex flex-col w-96 h-[539px] px-10 py-5 items-center bg-[#f4eeee]'>
        <span className='text-5xl font-semibold font-Cursive mt-10 mb-10'>Aka-Notes</span>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input type="email" name="email" value={user.email} required placeholder='Enter your E-mail'  onChange={handleChange} className='my-1 p-1 w-60'/>
          <input type="password" name="password" value={user.password} required placeholder='Enter your password' onChange={handleChange} className='my-1 p-1 w-60'/>
          <button className='bg-blue-500 p-1 rounded-md my-5 hover:bg-blue-600' type='submit' >Login</button>
             
        </form>
        {status==="fail" && <div className='text-red-500'>invalid username or password</div> }
        <div>
        <span>Do not have an Account? </span>
        <Link href='/signup'><span className='text-blue-700 underline'>Signup</span></Link>
        </div>
      </div>
      
    </div>

    


    </>
  )
}