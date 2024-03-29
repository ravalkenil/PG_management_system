import React from 'react'
import {Link} from "react-router-dom";
import { useAppContext } from '../Contexts/AppContext';

const Header = () => {

    const { isLoggedIn }= useAppContext();
    console.log(isLoggedIn);
    

  return (
    <div className='bg-blue-800 py-6'>
        <div className='container mx-auto flex justify-between'>
            <span className='text-3xl text-white font-bold tracking-tight'>
                <Link to="/">PGBook.com</Link>
            </span>
            <span className='flex space-x-4 items-center'>
                { isLoggedIn ? <>
                   <Link to="/my-bookings" > My Bookings</Link>
                   <Link to="/my-hotels" > My Hotels</Link>
                    <button> Sign out</button>
                </> :
                <Link to="/sign-in" className='flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-grey-100'>
                    Sign In
                </Link >
                }
            </span>
        </div>
    </div>
  )
}

export default Header