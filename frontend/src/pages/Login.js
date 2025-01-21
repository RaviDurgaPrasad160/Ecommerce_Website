import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import {userLogin} from '../store/slices/userSlice'
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  let { isError, isSuccess, errMsg} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  

  const onSubmit = (userCredentialObj)=>{
    dispatch(userLogin(userCredentialObj))
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Login successful!');
      navigate('/');
    } else if (isError) {
      toast.error(errMsg);
    }
  }, [isSuccess, isError, errMsg, navigate]);

  const [showPassword, setShowPassword] = useState(false)

  return (
    <section id="login">
      <div className='mx-auto container p-4'>

        <div className='bg-white px-4 py-5 max-w-sm mx-auto'>

          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt="Login_logo" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-2'>
              <label>Email :</label>
              <div className='bg-slate-200 p-2 rounded'>
                <input type="email" placeholder='enter email' className='outline-none bg-transparent w-full h-full' {...register('email',{required:true})} />
              </div>
              {errors.email && <p className='text-red-600'>*Email is required</p>}
            </div>

            <div className='mb-2'>
              <label>Password :</label>
              <div className='bg-slate-200 p-2 rounded flex'>
                <input type={showPassword ? 'text' : 'password'} placeholder='enter password' className='outline-none bg-transparent w-full h-full' {...register('password',{required:true})}/>
                <div className='cursor-pointer' onClick={()=>setShowPassword((preve)=>!preve)}>
                  <span>
                    {
                      showPassword ? (<FaEyeSlash />) : (<FaEye />)
                    }
                  </span>
                </div>
              </div>
              {errors.password && <p className='text-red-600'>*Password is required</p>}
              <Link to={'/forgot-password'} className='w-fit block ml-auto hover:underline hover:text-red-600'>Forgot Password</Link>
            </div>
            
            <button className='bg-red-600 w-full text-white p-2 rounded-full mt-6 max-w-[150px] block mx-auto hover:scale-105 transition-all'>Login</button>
          </form>
          <p className='my-5'>Don`t have account ? <Link to={'/sign-up'} className='hover:text-red-600 hover:underline'>Sign up</Link></p>

        </div>
      </div>
    </section>
    
  )
}

export default Login
