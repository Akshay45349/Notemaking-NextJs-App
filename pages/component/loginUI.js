'use client';
import React from 'react'
import Link from 'next/link'


const LoginUI = () => {
  return (
    <>
    <div>Session Expired</div>
    <span>Please </span><Link href='/login' className='text-blue-600 underline'>login</Link>
    </>
  )
}

export default LoginUI