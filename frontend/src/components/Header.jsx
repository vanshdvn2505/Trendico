import React, {useEffect, useState} from 'react'
import logo from '../assets/Logo-White-Yellow.png'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setAuth } from '../features/auth/authSlice'

function Header() {

    const [user, setUser] = useState('signin');
    const [log, setLog] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.value)
    const navigate = useNavigate();

    const handleSignout = () => {
        if(auth == null){
            navigate('/signin')
            return;
        }
        setLog(!log);
    }

    const signoutUser = async () => {
        try {
            const response = await axios.post("http://localhost:7000/auth/signout", {auth});
            console.log(response.data);
            dispatch(setAuth(null));
            setLog(false);
            navigate('/home');
        }
        catch(error){
            console.log("Error At Signout " + error);
            alert("Something Went Wrong!!")    
        }
    }

    useEffect(() => {
        if(auth){
            const name = auth.username.split(' ')
            setUser(name[0]);
        }
        else{
            setUser('signin')
        }
    }, [auth])
  return (
    <>
        {log && (
            <div className='h-[40vh] w-[40%] ml-[30%] mt-[20%] absolute rounded-lg z-50
                flex flex-col justify-center items-center text-white bg-[#232f3e]'>
                <p className='text-2xl'>Do You Want To Sign Out</p>
                <div className='h-[50%] w-[90%] flex justify-evenly items-center'>
                    <button className='h-[50%] w-[40%] rounded-xl text-black bg-[#ffd814]'
                    onClick={handleSignout}>
                        Cancel
                    </button>
                    <button className='h-[50%] w-[40%] rounded-xl border-[#e6e6e6] border-2 hover:brightness-125'
                    onClick={signoutUser}>
                        Signout
                    </button>
                </div>
            </div>
        )}
    <div className='h-[10vh] w-full flex justify-evenly items-center fixed z-50 top-0 bg-[#131921]'>
        <div className='h-[90%] w-[20%] hover:border-[1px] border-white flex justify-center items-center'>
            <img src={logo} className='bg-cover'/>
        </div>
        <div className='h-full w-[75%] flex justify-evenly items-center'>
            <div className='h-full w-[60%] flex justify-center items-center'>
                <div className='h-[70%] w-[95%] flex justify-center items-center
                    rounded-md'>
                    <input type="text"
                        className='h-full w-[85%] rounded-l-md pl-2 text-xl outline-none'
                        placeholder='Search Trendonic'
                    />
                    <button className='h-full w-[15%] text-2xl rounded-r-md bg-[#febd69]'>
                        <i className="fa-solid fa-magnifying-glass font-[#131921]"></i>
                    </button>
                </div>
            </div>
            <Link to={auth == null ? '/signin' : '/account_options'}>
                <button className='h-[9vh] w-[20vh] hover:border-[1px] border-white flex flex-col justify-center items-start'>
                    <p className='text-white'>Hello, {user}</p>
                    <p className='text-white font-bold'>Accounts & Lists</p>
                </button>
            </Link>
            <Link>
                <button className='h-[9vh] w-[15vh] hover:border-[1px] border-white flex flex-col justify-center items-start'>
                    <p className='text-white'>Returns</p>
                    <p className='text-white font-bold'>& Orders</p>
                </button>
            </Link>
            <Link>
                <button className='h-[9vh] w-[10vh] hover:border-[1px] border-white flex justify-center items-center'>
                    <i className="fa-solid fa-cart-shopping text-white text-3xl"></i>
                </button>
            </Link>
            <button className='h-[9vh] w-[10vh] hover:border-[1px] border-white flex justify-center items-center'
            onClick={handleSignout}>
                <i className="fa-solid fa-power-off text-white text-3xl"></i>
            </button>
        </div>
    </div>
    </>
  )
}

export default Header