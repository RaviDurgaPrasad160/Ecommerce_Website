import React, { useState } from 'react'
import Logo from '../components/Logo'
import { GoSearch } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';

const Header = () => {

  let [menuDisplay, setMenuDisplay] = useState(false)

  let {userObj, isSuccess} = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogout = ()=>{
    dispatch(logoutUser())
    navigate('')
  }

  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>

        <div className="cursor-pointer">
          <Link to={'/'}>
            <Logo w={90} h={50}/>
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full pl-4 focus-within:shadow'>
          <input type="text" placeholder='search product here...' className='outline-none w-full'/>
          <div className='min-w-[50px] bg-red-600 text-lg flex items-center justify-center rounded-r-full h-8 text-white'>
            <GoSearch />
          </div>
        </div>

        <div className='flex items-center gap-6'>

            <div className='relative flex justify-center'>
              {
                userObj?._id && (
                  <div className='text-3xl cursor-pointer' onClick={()=>setMenuDisplay(preve => !preve)}>
                    {userObj?.profile ? (
                        <img
                          src={userObj?.profile}
                          alt={`${userObj.name || 'User'}'s profile`}
                          className='w-10 h-10 rounded-full'
                        />
                      ) : (
                          <FaRegCircleUser />
                    )}
                  </div>
                )
              }
                
                {
                  menuDisplay && (
                    <div className='absolute bg-white p-2 bottom-0 top-11 h-fit rounded shadow-lg'>
                      <nav>
                        {
                          userObj?.role === 'ADMIN' && (
                            <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                          )
                        }
                        
                      </nav>
                    </div>
                  )
                }
                
            </div>
            
                
            <div className='text-2xl relative'>
              <span><FaShoppingCart/></span>
              <div className='absolute w-5 h-5 text-white bg-red-600 flex items-center justify-center rounded-full -top-2 -right-3'>
                <p className='text-sm'>0</p>
              </div>
            </div>

            <div>
              {isSuccess ? (
                <button onClick={handleLogout} className='bg-red-600 px-3 py-1 rounded-full text-white'>Logout</button>
              ): (
                <Link to={'/login'} className='bg-red-600 px-3 py-1 rounded-full'>Login</Link>
              )
              }
            </div>

        </div>

      </div>
    </header>
  )
}

export default Header
