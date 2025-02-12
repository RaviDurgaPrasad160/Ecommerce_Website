import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import displayINRCurrency from '../helpers/DisplayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'


const HorizontalCardProduct = ({category, heading}) => {
    const [products, setProducts] = useState([])
    // const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const fecthProducts = async(category, heading)=>{
        try{
            const response = await axios.get(`http://localhost:8000/product-api/get-products-by-category/${category}`)
            setProducts(response.data.products)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        fecthProducts(category, heading)
    },[category, heading])

    const scrollLeft = ()=>{
        scrollElement.current.scrollBy({
            left : -350,
            behavior : 'smooth'
        })
    }
    const scrollRight = ()=>{
        scrollElement.current.scrollBy({
            left : 350,
            behavior : 'smooth'
        })
    }
  return (
    <div className='container mx-auto px-4 relative mt-4'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        <div className='flex gap-2 items-center overflow-x-scroll scrollbar-none' ref={scrollElement}>
            <button className='bg-white rounded-full p-1 absolute left-0 hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
            <button className='bg-white rounded-full p-1 absolute right-0 hidden md:block' onClick={scrollRight}><FaAngleRight/></button>
            {
                products.map((product, index)=>{
                    return(
                        <Link to={`/product/${product._id}`} key={index} className='flex bg-white w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 rounded-sm shadow'>
                            <div className='bg-slate-200 p-2 min-w-[120px] md:min-w-[145px]'>
                                <img src={product?.productImage[0]} alt={product?.productName} className='w-full h-full object-cover hover:scale-110 transition-all'/>
                        </div>
                        <div>
                            <p className='text-base md:text-lg line-clamp-1 px-2 pt-4'>{product?.productName}</p>
                            <p className='capitalize px-2 text-slate-500'>{product?.category}</p>
                            <div className='px-2 flex gap-2'>
                                <p className='text-red-600 text-base'>{displayINRCurrency(product?.sellingPrice)}</p>
                                <p className='line-through text-slate-500'>{displayINRCurrency(product?.price)}</p>            
                            </div>
                            <button className='px-4 text-white bg-red-600 rounded-full py-1 hover:bg-red-700 transition-all mx-2 my-2' onClick={(e)=>addToCart(e, product?._id)}>Add to Cart</button>
                        </div>
                    </Link>
                )
            })
        }
      </div>
    </div>
  )
}

export default HorizontalCardProduct
