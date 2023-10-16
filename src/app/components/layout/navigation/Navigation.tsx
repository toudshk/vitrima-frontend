"use client";

import  { useState } from 'react'


const Navigation = () => {

    const [isLogin, setIsLogin] = useState(false)
  return (
    <div className='text-white'>
        {isLogin ? 
        <div>true </div> : <div>ВХОД/РЕГИСТРАЦИЯ</div>}
    </div>
  )
}

export default Navigation