import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { GrEdit } from "react-icons/gr";
import moment from 'moment'
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateRole, setUpdateRole] =useState({
    name:'',
    email:'',
    role:'',
    userId: '',
  })

  // Fetch users from the API
  const fetchUsers = async ()=>{

    try{
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/user-api/get-users',{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      setUsers(response.data.users)
    }
    catch(err){
      console.log(err.response?.data?.message)
    }
  }

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='bg-white'>
      <table className='userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>CreatedAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((el,index)=>{
              return(
                <tr key={el._id || index}>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('ll')}</td>
                  <td>
                    <button className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white' onClick={()=>{
                      setUpdateRole({
                        name: el.name,
                        email: el.email,
                        role: el.role,
                        userId: el._id,
                      })
                      setOpenUpdateRole(true)
                      }}><GrEdit/></button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole onClose={()=>setOpenUpdateRole(false)} name={updateRole.name} email={updateRole.email} role={updateRole.role} fetchUsers={fetchUsers} userId={updateRole.userId}/>
        )
      }
      
    </div>
  )
}

export default AllUsers
