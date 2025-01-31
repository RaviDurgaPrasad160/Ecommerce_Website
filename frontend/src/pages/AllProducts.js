import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import axios from 'axios'


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
      
      <div className='flex items-center gap-4 py-3'>
        {
          allProducts.map((product, index)=>{
            return(
              <div className='bg-white p-4 rounded'>
                  <div>
                    <img src={product.productImage[0]} width={100} height={100}/>
                  </div>
                  <h3>{product.productName}</h3>
              </div>
              
            )
          })
        }
      </div>
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>{setOpenUploadProduct(false)}}/>
        )
      }
    </div>
  )
}

export default AllProducts
