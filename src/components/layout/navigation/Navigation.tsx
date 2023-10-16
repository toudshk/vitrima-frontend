"use client";

import Link from 'next/link';
import  { useState } from 'react'


const Navigation = () => {

    const [isLogin, setIsLogin] = useState(false)
  return (
    <div className='text-white'>
        {isLogin ? 
        <div>true </div> : <Link href={'/login'} >ВХОД/РЕГИСТРАЦИЯ</Link>}
    </div>
  )
}

export default Navigation