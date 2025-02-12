import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDetailes = () => {
    const productId = useParams().productId
    console.log(productId)
  return (
    <div>
      <h1>Product Detailes</h1>
    </div>
  )
}

export default ProductDetailes
