import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CatagoreList = () => {
    const [categories, setCategories] = useState([])

    const fetchCategories = async()=>{
        try{
            const response = await axios.get('http://localhost:8000/product-api/get-categories')
            setCategories(response.data.productByCategory)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchCategories()
    },[])
  return (
    <div className='container mx-auto p-4 overflow-x-scroll scrollbar-none'>
      <div className='flex gap-2 items-start justify-between'>
        {
            categories.map((category, index)=>{
                return(
                    <Link to={`/product-category/${category?.category}`} key={index}>
                        <div className='cursor-pointer'>
                            <div className='w-16 h-16 lg:w-20 lg:h-20 rounded-full p-4 overflow-hidden flex items-center justify-center bg-slate-200'>
                                <img src={category?.productImage[0]} alt={category?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125'/>
                            </div>
                            <p className='text-center text-sm lg:text-base capitalize'>{category?.category}</p>
                        </div>
                    </Link>
                )
            })
        }
      </div>
    </div>
  )
}

export default CatagoreList
