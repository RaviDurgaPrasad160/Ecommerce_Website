import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import axios from 'axios'
import AdminProductCart from '../components/AdminProductCart'


const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async()=>{
    try{
      const response = await axios.get('http://localhost:8000/product-api/get-products')
      setAllProducts(response.data.products)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchAllProducts()
  },[])

  return (
    <div>
      <div className='bg-white p-4'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold'>All Products</h2>
            <div>
              <button className='border-2 text-red-500 border-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-full transition' onClick={()=>{setOpenUploadProduct(true)}}>Upload Product</button>
            </div>
          </div>
      </div>

    {/* AdminProductCart to display all products */}
    <div className='flex items-center gap-4'>
      {
        allProducts.map((product, index)=>{
          return(
            <AdminProductCart data={product} fetchData={fetchAllProducts} key={index}/>
          )
        })
      }
    </div>
    
      

    {/* UploadProduct to upload new product */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>{setOpenUploadProduct(false)}}/>
        )
      }
    </div>
  )
}

export default AllProducts
