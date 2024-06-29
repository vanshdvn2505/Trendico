import React, {useState} from 'react'
import logo from '../assets/Logo-White-Yellow.png'
import {Link} from 'react-router-dom'

function Header() {

    const [user, setUser] = useState('signin');

  return (
    <div className='h-[10vh] w-full flex justify-evenly items-center bg-[#131921]'>
        <div className='h-full w-[20%] flex justify-center items-center'>
            <img src={logo} className='bg-cover'/>
        </div>
        <div className='h-full w-[80%] flex justify-evenly items-center'>
            <div className='h-full w-[60%] flex justify-center items-center'>
                <div className='h-[70%] w-[95%] flex justify-center items-center
                    rounded-md'>
                    <input type="text"
                        className='h-full w-[85%] rounded-l-md pl-2 text-xl outline-none'
                        placeholder='Search Trendico'
                    />
                    <button className='h-full w-[15%] text-2xl rounded-r-md bg-[#febd69]'>
                        <i className="fa-solid fa-magnifying-glass font-[#131921]"></i>
                    </button>
                </div>
            </div>
            <Link to="/signin">
                <button className='h-[10vh] w-[20vh] flex flex-col justify-center items-start'>
                    <p className='text-white'>Hello, {user}</p>
                    <p className='text-white font-bold'>Accounts & Lists</p>
                </button>
            </Link>
            <Link>
                <button className='h-[10vh] w-[15vh] flex flex-col justify-center items-start'>
                    <p className='text-white'>Returns</p>
                    <p className='text-white font-bold'>& Orders</p>
                </button>
            </Link>
            <Link>
                <button className='h-[10vh] w-[15vh] flex flex-col justify-center items-start'>
                    <i className="fa-solid fa-cart-shopping text-white text-3xl"></i>
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Header