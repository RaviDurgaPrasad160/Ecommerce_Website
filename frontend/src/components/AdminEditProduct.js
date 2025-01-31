import React, { useState } from 'react'
import { RiCloseLargeLine } from "react-icons/ri";
import { useForm} from "react-hook-form"
import productCategory from '../helpers/productCaterory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminEditProduct = ({onClose, productData, fetchData}) => {
    console.log(productData._id)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            productName: productData?.productName || '',
            brandName: productData?.brandName || '',
            category: productData?.category || '',
            price: productData?.price || '',
            sellingPrice: productData?.sellingPrice || '',
            description: productData?.description || ''
        }
    })

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState('')
    const [productImageUrl, setProductImageUrl] = useState({
        productImage : productData?.productImage || []
    })
    const onImageSelect = async(event)=>{
        try {
            const file = event.target.files[0]
            const uploadedUrl = await uploadImage(file)
            setProductImageUrl({productImage : [...productImageUrl.productImage, uploadedUrl]})
        } catch (error) {
            console.error('Error uploading image:', error)
        }
    }
    const onDelete = (index)=>{
        const deleteImage = productImageUrl.productImage
        deleteImage.splice(index, 1)
        setProductImageUrl({productImage : [...deleteImage]})
    }


    const onSubmit = async(data)=>{ 
        try{
            const token = localStorage.getItem('token')
            // Add product images to the data
            data.productImage = productImageUrl.productImage

            const response = await axios.put(
                `http://localhost:8000/product-api/update-product/${productData._id}`, 
                data,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            
            if(response.data.message === 'Product updated successfully'){
                toast.success("Product updated successfully")
                fetchData()
                onClose()
            } else {
                toast.error(response.data.message)
            }
        }
        catch(err){
            toast.error(err.response?.data?.message || "An error occurred during product update. Please try again.")
        }
    }
  return (
    <div>
      <div>
      <div>
        <div className='fixed z-10 top-0 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center bg-slate-200 bg-opacity-50'>
            <div className='w-full max-w-2xl bg-white p-4 h-full max-h-[80%] overflow-hidden overflow-y-scroll overflow-x-hidden'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-semibold'>Edit Product</h2>
                    <div>
                        <button className='hover:text-red-600 text-xl' onClick={onClose}><RiCloseLargeLine/></button>
                    </div>
                </div>
                <div>
                    <form className='mt-4' onSubmit={handleSubmit(onSubmit)} >
                        <div className='mb-4'>
                            <label htmlFor="productName" className='block mb-1'>Product Name: </label>
                            <input type="text" id='productName' placeholder='enter product name' {...register("productName", { required: true })} className='w-full p-1 border bg-slate-100 rounded'/>
                            {errors.productName && <p className='text-red-600 text-xs'>*Product name is required</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="brandName" className='block mb-1'>Brand Name: </label>
                            <input type="text" id='brandName' placeholder='enter brand name' {...register("brandName", { required: true })} className='w-full p-1 border bg-slate-100 rounded'/>
                            {errors.brandName && <p className='text-red-600 text-xs'>*Brand name is required</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="category" className='block mb-1'>Category: </label>
                            <select {...register("category", { required: true })} className='w-full p-1 border bg-slate-100 rounded'>
                            <option value=''>Select Category</option>
                                {
                                    productCategory.map((el, index)=>{
                                        return(
                                            <option key={index} value={el.value} selected={el.value === productData?.category}>{el.label}</option>
                                        )
                                    })
                                }
                            </select>
                            {errors.category && <p className='text-red-600 text-xs'>*Category is required</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="productImage" className='block mb-1'>Product Image: </label>
                            <label>
                                <div className='w-full p-1 border bg-slate-100 rounded h-32'>
                                    <div className='flex flex-col justify-center items-center h-full'>
                                        <FaCloudUploadAlt className='text-4xl cursor-pointer'/>
                                        <p className='text-sm cursor-pointer'>Upload Product Image</p>
                                        <input type="file" id='productImage' hidden onChange={onImageSelect}/>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className='mb-4'>
                            {
                                productImageUrl?.productImage[0] ? (
                                    <div>
                                        <div className='flex flex-wrap gap-2'>
                                            {
                                                productImageUrl?.productImage.map((el,index)=>{
                                                    return(
                                                        <div> 
                                                            <div className='relative group'>
                                                                <img key={index} 
                                                                src={el} 
                                                                alt={el} 
                                                                width={80} 
                                                                height={80} className='bg-slate-100 border cursor-pointer' 
                                                                onClick={
                                                                    ()=>{
                                                                        setOpenFullScreenImage(true)
                                                                        setFullScreenImage(el)
                                                                    }}/>
                                                                <div className='absolute bottom-0 right-0 p-1'>
                                                                    <MdDelete className='text-md cursor-pointer bg-red-600 text-white rounded-full hidden group-hover:block' onClick={()=>onDelete(index)}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <p className='text-red-600 text-xs'>*Please upload product image</p>
                                )
                            }
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="price" className='block mb-1'>Price: </label>
                            <input type="text" id='price' placeholder='enter product price' {...register("price", { required: true })} className='w-full p-1 border bg-slate-100 rounded'/>
                            {errors.price && <p className='text-red-600 text-xs'>*Price is required</p>}
                        </div> 
                        <div className='mb-4'>
                            <label htmlFor="sellingPrice" className='block mb-1'>Selling Price: </label>
                            <input type="text" id='sellingPrice' placeholder='enter product selling price' {...register("sellingPrice", { required: true })} className='w-full p-1 border bg-slate-100 rounded'/>
                            {errors.sellingPrice && <p className='text-red-600 text-xs'>*Selling price is required</p>}
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="description" className='block mb-1'>Description: </label>
                            <textarea cols="30" rows="5" placeholder='enter product description' id='description' {...register("description")} className='w-full p-1 border bg-slate-100 rounded resize-none'></textarea>
                        </div>   
                        <button type='submit' className='bg-red-600 text-white px-4 py-2  w-full rounded hover:bg-red-700 transition'>Update Product</button>
                    </form>
                </div>
                {/* display uploaded images */}
                {
                    openFullScreenImage && <DisplayImage imgUrl={fullScreenImage} onClose={()=>setOpenFullScreenImage(false)}/>
                }
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminEditProduct
