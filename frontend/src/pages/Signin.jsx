import React from 'react'
import Logo from '../assets/Logo-Black-Yellow.png'
import { Link } from 'react-router-dom'

function Signin() {
  return (
    <div className='h-[100vh] w-full flex flex-col'>
        <div className='h-[15%] w-[full] flex justify-center items-center border-b-2 border-[#bbbfbf]'>
            <img src={Logo} className='bg-cover h-[45%] w-auto' />
        </div>
        <div className='h-[70%] w-full flex justify-center items-center'>
            <div className='h-[80%] w-[30%] rounded-lg border-[1px] border-[#bbbfbf]'>
                <div className='h-[20%] w-full rounded-t-lg flex justify-start items-center border-b-[1px] border-[#bbbfbf] pl-[10%] text-2xl'>
                    <p>Sign in or create account</p>
                </div>
                <div className='h-[65%] w-full pl-[10%] flex flex-col justify-evenly items-start border-b-[1px] border-[#bbbfbf]'>
                    <div className='h-[30%] w-[90%] '>
                        <p className='font-semibold'>Enter Email</p>
                        <input type="text"
                            className='h-[50%] w-[100%] rounded-sm border-[1px] border-[#888c8c]'
                            name = "email"
                        />
                    </div>
                    <div className='h-[30%] w-[90%]'>
                        <p className='font-semibold'>Enter Password</p>
                        <input type="password"
                            className='h-[50%] w-[100%] rounded-sm border-[1px] border-[#888c8c]'
                            name='password'
                        />
                    </div>
                    <button className='h-[20%] w-[90%] rounded-md bg-[#ffd814]'>
                        Continue
                    </button>
                </div>
                <div className='h-[15%] w-full flex justify-center items-center'>
                    <p>new to Trendico, </p>
                    <Link to="/signup">
                        <p className='text-[#007185]'> Create Account</p>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin