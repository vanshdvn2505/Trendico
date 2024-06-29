import React, { useState } from 'react'
import Logo from '../assets/Logo-Black-Yellow.png'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {setAuth} from '../features/auth/authSlice'
import axios from 'axios'

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    
    const handleSubmit = async () => {
        // e.preventDefault()      
        try {
            console.log(email + " " + username + " " + password);
            const response = await axios.post('http://localhost:7000/auth/signup', {username, email, password});
            console.log("Hello12345");
            console.log(response.data)
            // dispatch(setAuth(response.data));
        }
        catch(error){
            console.log("HELLO" + error);
            alert("Something Went Wrong!!")    
        }
    }

  return (
    <div className='h-[100vh] w-full flex flex-col'>
        <div className='h-[15%] w-[full] flex justify-center items-center border-b-2 border-[#bbbfbf]'>
            <img src={Logo} className='bg-cover h-[45%] w-auto' />
        </div>
        <div className='h-[70%] w-full flex justify-center items-center'>
            <div className='h-[90%] w-[30%] rounded-lg border-[1px] border-[#bbbfbf]'>
                <div className='h-[15%] w-full rounded-t-lg flex justify-start items-center border-b-[1px] border-[#bbbfbf] pl-[10%] text-2xl'>
                    <p>Create account</p>
                </div>
                <div className='h-[75%] w-full pl-[10%] flex flex-col justify-evenly items-start border-b-[1px] border-[#bbbfbf]'>
                    <div className='h-[25%] w-[90%] '>
                        <p className='font-semibold'>Enter Email</p>
                        <input type="email"
                            className='h-[40%] w-[100%] rounded-sm border-[1px] border-[#888c8c]'
                            name='email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='h-[25%] w-[90%] '>
                        <p className='font-semibold'>Enter Username</p>
                        <input type="text"
                            className='h-[40%] w-[100%] rounded-sm border-[1px] border-[#888c8c]'
                            name='name'
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='h-[25%] w-[90%]'>
                        <p className='font-semibold'>Enter Password</p>
                        <input type="password"
                            className='h-[40%] w-[100%] rounded-sm border-[1px] border-[#888c8c]'
                            name='password'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className='h-[15%] w-[90%] rounded-md bg-[#ffd814]'
                            onClick={handleSubmit}
                    >
                        Continue
                    </button>
                </div>
                <div className='h-[10%] w-full flex justify-center items-center'>
                    <p>Already have an account, </p>
                    <Link to="/signin">
                        <p className='text-[#007185]'> Signin</p>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup