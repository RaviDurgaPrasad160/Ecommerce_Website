import React from 'react'
import CatagoreList from '../components/CatagoreList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CatagoreList/>
      <BannerProduct/>

      <HorizontalCardProduct category={'airpods'} heading={"Top's Airpods"}/>
      <HorizontalCardProduct category={'watches'} heading={"Popular Watches"}/>

      <VerticalCardProduct category={'speakers'} heading={"Top's Speakers"}/>
      <VerticalCardProduct category={'mobile'} heading={"Mobiles"}/>
      <VerticalCardProduct category={'tv'} heading={"Televisions"}/>
      <VerticalCardProduct category={'camera'} heading={"Cameras"}/>
      <VerticalCardProduct category={'earphones'} heading={"Earphones"}/>
      <VerticalCardProduct category={'mouse'} heading={"Mouses"}/>
      <VerticalCardProduct category={'refrigerator'} heading={"Refrigerators"}/>
      <VerticalCardProduct category={'trimmers'} heading={"Trimmers"}/>      
    </div>
  )
}

export default Home
