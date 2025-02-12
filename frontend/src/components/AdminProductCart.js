import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/DisplayCurrency';

const AdminProductCart = ({data,fetchData}) => {
    const [openEditProduct, setOpenEditProduct] = useState(false)
  return (
    <div>
        <div className='bg-white p-4 rounded w-[12.5rem]'>
            <div className='h-32 flex items-center justify-center'>
                <img src={data?.productImage[0]} alt={data?.productName} className='max-h-32 w-auto object-contain'/>
            </div>
            <h3 className='text-ellipsis line-clamp-2'>{data?.productName}</h3>
            <div className='font-semibold'>
                {displayINRCurrency(data?.sellingPrice)}
            </div>
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
