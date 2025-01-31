const exp = require('express')
const productApp = exp.Router()
const isAdmin = require('./middlewares/isAdmin')
const verifyToken = require('./middlewares/verifyToken')
const expressAsyncHandler = require('express-async-handler')

// to extract body of request
productApp.use(exp.json())

// route to handle product creation
productApp.post('/create-product', verifyToken, isAdmin, expressAsyncHandler(async(req,res)=>{
    const productCollectionObj = req.app.get('productCollectionObj')
    const newProduct = req.body
    
    // to check whether new product exist or not
    const productofDB = await productCollectionObj.findOne({productName:newProduct.productName})
    // if product exist
    if(productofDB){
        res.send({message:'Product already exist'})
    }
    // if product does not exist
    else{
        newProduct.createdAt = new Date()
        await productCollectionObj.insertOne(newProduct)
        res.send({message:'new product created'})
    }
}));

// route to get all products
productApp.get('/get-products',expressAsyncHandler(async(req,res)=>{
    const productCollectionObj = req.app.get('productCollectionObj')
    const products = await productCollectionObj.find().toArray()
    res.send({message:'products fetched successfully', products})
}))

module.exports = productApp