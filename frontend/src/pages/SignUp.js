import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import imageToBase64 from '../helpers/imageToBase64';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [img, setImg] = useState(null)
  const navigate = useNavigate()

  const onImageSelect = async(event)=>{
    const file = (event.target.files[0])

    const imgPic = await imageToBase64(file)
    setImg(imgPic)
     
  }

  const onSubmit = async(data)=>{
    data.profile = img
    try{
      const response = await axios.post('http://localhost:8000/user-api/create-user', data, {
        headers : {'Content-Type' : 'application/json'} 
      })
      const result = response.data

      if(result.message === 'new user created'){
        toast.success("Sign-up successful!")
        navigate('/login')
      } 
      else if(result.message === 'user already exist'){
        toast.error("User already exists!")

      }else{
        toast.warn(result.message || "Something went wrong!")
      }

    }
    catch(err){
      toast.error("An error occurred during sign-up. Please try again.")
    }
    
  }

  

  return (
    <section id="login">
      <div className='mx-auto container p-4'>

        <div className='bg-white px-4 py-5 max-w-sm mx-auto'>

          {/* form validation */}
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* login or signUp logo */}
            <div className='w-20 h-20 mx-auto rounded-full overflow-hidden relative'>

              <div>
              <img src={img || loginIcons} alt="Login_logo" />
              </div>
            
              <label>
                <div className='text-center text-xs bg-opacity-80 bg-slate-200 pb-6 pt-1 bottom-0 w-full absolute cursor-pointer'>
                  Upload Photo
                </div>
                <input type="file" className='hidden' {...register('profile',{required: true})} onChange={(event)=> onImageSelect(event)} />
              </label>
            </div>
            {errors.profile && <p className='text-red-600 text-center'>*Profile pic is required</p>}

            {/* name input */}
            <div className='mb-2'>
              <label>Name :</label>
              <div className='bg-slate-200 p-2 rounded'>
                <input type="text" placeholder='enter name' className='outline-none bg-transparent w-full h-full' {...register('name',{required: true})} />
              </div>
              {errors.name && <p className='text-red-600'>*Name is required</p>}
            </div>

            {/* email input */}
            <div className='mb-2'>
              <label>Email :</label>
              <div className='bg-slate-200 p-2 rounded'>
                <input type="email" placeholder='enter email' className='outline-none bg-transparent w-full h-full' {...register('email',{required: "Email is required",pattern: { value: /^\S+@\S+$/, message: "Invalid email format" } })} /> 
              </div>
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>

            {/* password input */}
            <div className='mb-2'>
              <label>Password :</label>
              <div className='bg-slate-200 p-2 rounded flex'>
                <input type={showPassword ? 'text' : 'password'} placeholder='enter password' className='outline-none bg-transparent w-full h-full' {...register('password',{required: "Password is required"})}/>
                <div className='cursor-pointer' onClick={()=>setShowPassword((preve)=>!preve)}>
                  <span>
                    {
                      showPassword ? (<FaEyeSlash />) : (<FaEye />)
                    }
                  </span>
                </div>
              </div>
              {errors.password && <p className="text-red-600">{errors.password.message}</p>}
            </div>

            {/* password confirm input */}
            <div className='mb-2'>
              <label>Confirm Password :</label>
              <div className='bg-slate-200 p-2 rounded flex'>
                <input type={showConfirmPassword ? 'text' : 'password'} placeholder='enter confirm password' className='outline-none bg-transparent w-full h-full' {...register('conformpassword',{required:"Confirm Password is required", validate: value => value === watch('password') || "Passwords do not match"})}/>
                <div className='cursor-pointer' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                  <span>
                    {
                      showConfirmPassword ? (<FaEyeSlash />) : (<FaEye />)
                    }
                  </span>
                </div>
              </div>
              {errors.conformpassword && <p className="text-red-600">{errors.conformpassword.message}</p>}
            </div>
            
            <button className='bg-red-600 w-full text-white p-2 rounded-full mt-6 max-w-[150px] block mx-auto hover:scale-105 transition-all'>Sign Up</button>
          </form>
          
          <p className='my-5'>Already have account ? <Link to={'/login'} className='hover:text-red-600 hover:underline'>Login</Link></p>

        </div>
      </div>
    </section>
  )
}

export default SignUp
