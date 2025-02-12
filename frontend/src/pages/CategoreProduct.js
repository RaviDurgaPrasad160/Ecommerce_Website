import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import displayINRCurrency from './../helpers/DisplayCurrency';

const CategoreProduct = () => {
    const params = useParams()
    const categoryName = params?.categoryName

    const [products, setProducts] = useState([])
    const fetchProductByCategory = useCallback(async()=>{
      try{
        const response = await axios.get(`http://localhost:8000/product-api/get-products-by-category/${categoryName}`)
        setProducts(response.data.products)
        console.log(response.data.products)
      }catch(err){
        console.log(err)
      }
    },[categoryName])

    useEffect(()=>{
      fetchProductByCategory()
    },[fetchProductByCategory])

  return (
    <div className='mt-4 container mx-auto'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4'>
        {
          products.map((product, index)=>{
            return(
              <div key={index} className='rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 my-2'>
                <div className='bg-slate-200 p-3 h-32 rounded-t-lg'>
                  <img src={product?.productImage[0]} alt={product?.productName} className='w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300' />
                </div>
                <div className='bg-white p-3 rounded-b-lg'>
                  <p className='line-clamp-1 text-base font-medium mb-1'>{product?.productName}</p>
                  <p className='text-slate-500 text-sm mb-2 capitalize'>{product?.category}</p>
                  <div className='flex items-center gap-2'>
                    <p className='text-red-600 font-semibold'>{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className='text-slate-400 text-sm line-through'>{displayINRCurrency(product?.price)}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default CategoreProduct
