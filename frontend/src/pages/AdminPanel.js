import React from 'react'
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';



const AdminPanel = () => {

    let {userObj} = useSelector((state)=>state.user)
    
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-60 shadow'>
        <div className='h-32 flex justify-center items-center flex-col pt-4'>
            <div className='text-5xl cursor-pointer'>
                {userObj?.profile ? (
                <img
                src={userObj?.profile}
                alt={`${userObj.name || 'User'}'s profile`}
                className='w-20 h-20 rounded-full'/>
                ) : (
                <FaRegCircleUser />
                )}
            </div>
            <p className='capitalize text-lg font-semibold'>{userObj?.name}</p>
            <p className='text-sm'>{userObj?.role}</p>
        </div> 
        <div>
            <nav className='flex flex-col p-6'>
                <Link to={'all-users'} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                <Link to={'all-products'} className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
            </nav>
        </div>  
      </aside>
      <main className='w-full p-4 h-full'>
        <Outlet/>
      </main>

    </div>
  )
}

export default AdminPanel
