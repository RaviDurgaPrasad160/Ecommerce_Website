import React from 'react'
import { RiCloseLargeLine } from "react-icons/ri";

const DisplayImage = ({imgUrl, onClose}) => {
  return (
    <div className='fixed z-10 top-0 left-0 bottom-0 right-0 flex justify-center items-center'>
        <div className='max-w-[80vw] max-h-[80vh] bg-white p-4 shadow-lg'>
            <div className='flex justify-end'>
                <button className='hover:text-red-600 text-xl' onClick={onClose}><RiCloseLargeLine/></button>
            </div>
            <div className='flex justify-center items-center'>
                <div>
                <img src={imgUrl} alt="product" className='max-w-[80vw] max-h-[80vh]'/>
                </div>
            </div>
        </div>
    
      
    </div>
  )
}

export default DisplayImage
