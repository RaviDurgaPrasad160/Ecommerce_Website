import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form"
import axios from 'axios';

const ChangeUserRole = ({name, email, role, userId, onClose, fetchUsers }) => {
  const { register, handleSubmit } = useForm()
  // const [userRole, setUserRole] = useState(role)

  const onSubmit = async(data) => {
    console.log(data.role)
    try{
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:8000/user-api/change-role/${userId}`, {role: data.role}, {headers:{Authorization:`Bearer ${token}`}})
      fetchUsers()
      onClose()

    } catch(err){
      console.log(err.message)
    }
  }
  

  return (
    <div className='fixed z-10 top-0 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center bg-slate-200 bg-opacity-50'>
        <div className='w-full max-w-sm bg-white p-4'>
            <div>
              <button className='block ml-auto' onClick={onClose}><IoCloseSharp/></button>
            </div>
            <h1 className='pb-4 font-medium text-lg'>Change User Role</h1>
            <p className='mb-1'>Name: {name} </p>
            <p className='mb-1'>Email: {email} </p>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Role: </label>
                <select className='border px-4 py-1 outline-none' defaultValue={role} {...register("role")}>
                    <option value="GENERAL">GENERAL</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <button className='mx-auto block rounded-full bg-red-600 py-1 px-3 mt-2 text-white hover:bg-red-700'>Change Role</button>
              </form> 
            </div>
        </div>
    </div>
    
  )
}

export default ChangeUserRole
