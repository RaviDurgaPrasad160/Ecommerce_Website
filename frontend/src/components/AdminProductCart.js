import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCart = ({data,fetchData}) => {
    const [openEditProduct, setOpenEditProduct] = useState(false)
  return (
    <div className='flex items-center gap-4 py-3 flex-row'>
        <div className='bg-white p-4 rounded'>
            <div>
                <img src={data?.productImage[0]} alt={data?.productName} width={100} height={100}/>
            </div>
            <h3>{data?.productName}</h3>
            <div className='w-fit ml-auto bg-green-100 p-2 rounded-full hover:bg-green-600 cursor-pointer hover:text-white'>
                <MdModeEdit onClick={()=>{setOpenEditProduct(true)}}/>
            </div>
            {
                openEditProduct && (
                    <AdminEditProduct onClose={()=>{setOpenEditProduct(false)}} productData={data} fetchData={fetchData}/>
                )
            }
        </div>
    </div>
  )
}

export default AdminProductCart
