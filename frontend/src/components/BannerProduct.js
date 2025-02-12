import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

// importing mobile images
import image1m from '../assest/banner/img1_mobile.jpg'
import image2m from '../assest/banner/img2_mobile.webp'
import image3m from '../assest/banner/img3_mobile.jpg'
import image4m from '../assest/banner/img4_mobile.jpg'
import image5m from '../assest/banner/img5_mobile.png'

const BannerProduct = () => {
    const desktopImg = [image1, image2, image3, image4, image5]
    const mobileImg = [image1m, image2m, image3m, image4m, image5m]

    const [position, setPosition] = useState(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setPosition(position === desktopImg.length - 1 ? 0 : position + 1)
        },5000)
        return ()=>clearInterval(interval)
    },[desktopImg.length, position])

  
  return (
    <div className='container mx-auto px-4'>
      <div className='h-56 md:h-72 w-full bg-slate-200 rounded relative'>
        <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
            <div className='flex w-full justify-between'>
                <button className='bg-white rounded-full text-2xl' onClick={()=>setPosition(position === 0 ? desktopImg.length - 1 : position - 1)}><FaAngleLeft/></button>
                <button className='bg-white rounded-full text-2xl' onClick={()=>setPosition(position === desktopImg.length - 1 ? 0 : position + 1)}><FaAngleRight/></button>
            </div>
        </div>
        
        {/* desktop and tablet view */}
        <div className='hidden md:flex w-full h-full overflow-hidden'>
            {
                desktopImg.map((imgURL, index)=>{
                    return(
                        <div key={index} className='h-full w-full min-w-full min-h-full' style={{transform:`translatex(-${position * 100}%)`}}>
                            <img src={imgURL} alt="" className='h-full w-full object-cover'/>
                        </div>
                    )
                })
            }
        </div>

        {/* mobile view */}
        <div className='flex w-full h-full overflow-hidden md:hidden'>
            {
                mobileImg.map((imgURL, index)=>{
                    return(
                        <div key={index} className='h-full w-full min-w-full min-h-full' style={{transform:`translatex(-${position * 100}%)`}}>
                            <img src={imgURL} alt="" className='h-full w-full object-cover'/>
                        </div>
                    )
                })
            }
        </div>
      </div>
    </div>
  )
}

export default BannerProduct
