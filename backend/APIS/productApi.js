const exp = require('express')
const productApp = exp.Router()
const isAdmin = require('./middlewares/isAdmin')
const verifyToken = require('./middlewares/verifyToken')
const expressAsyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')

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

// route to get distinct categories names
productApp.get('/get-categories', expressAsyncHandler(async(req, res) => {
    const productCollectionObj = req.app.get('productCollectionObj')
    
    // Get distinct categories from products collection
    const categories = await productCollectionObj.distinct('category')

    const productByCategory = []

    // to find product in each category
    for(const category of categories){
        const product = await productCollectionObj.findOne({category})
        
        if(product){
            productByCategory.push(product)
        }
        else{
            res.status(404).send({ message: `No products found in ${category} category` })
        }
    }
    
    res.send({message:'Categories fetched successfully', productByCategory})
}))

// route to update product
productApp.put('/update-product/:productId', verifyToken, isAdmin, expressAsyncHandler(async(req,res)=>{
    const productCollectionObj = req.app.get('productCollectionObj')
    const {productId} = req.params
    const updatedProduct = req.body
    try{
        const result = await productCollectionObj.updateOne(
            { _id: new ObjectId(productId) },
            { $set: updatedProduct }
        )
        if(result.modifiedCount === 1){
            res.send({message:'Product updated successfully'})
        }
        else{
            res.send({message:'Product not found'})
        }
    }catch(err){
        res.send({message:'Error updating product',error:err.message})
    }
}))

// route to get all products from each category
productApp.get('/get-products-by-category/:category', expressAsyncHandler(async(req,res)=>{
    const productCollectionObj = req.app.get('productCollectionObj')
    const {category} = req.params
    const products = await productCollectionObj.find({category:category}).toArray()
    res.send({message:'Products fetched successfully',products})
    
}))

// route to get product by id
productApp.get('/product-by-id/:productId', expressAsyncHandler(async(req,res)=>{
    const productCollectionObj = req.app.get('productCollectionObj')
    const {productId} = req.params
    const product = await productCollectionObj.findOne({_id:new ObjectId(productId)})
    if(product){
        res.send({message:'product fetched successfully',product})
    }
    else{
        res.send({message:'Product not found'})
    }
}))
module.exports = productApp