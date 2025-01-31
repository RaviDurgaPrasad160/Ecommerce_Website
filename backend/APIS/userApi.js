const exp = require('express')
const userApp = exp.Router()
require('dotenv').config()
const bcryptjs = require('bcryptjs')
let jwt = require('jsonwebtoken')
const expressAsyncHandler = require('express-async-handler')
const verifyToken = require('./middlewares/verifyToken')
const isAdmin = require('./middlewares/isAdmin')
const { ObjectId } = require('mongodb')

// to extract body of request
userApp.use(exp.json())
// route to handle user login
userApp.post('/loginuser', expressAsyncHandler(async(req,res)=>{
    const userCollectionObj = req.app.get('userCollectionObj')
    const loginCredentials = req.body
    const userofDB = await userCollectionObj.findOne({email:loginCredentials.email})
    if(!userofDB){
        res.send({message:"Invalid email or password"})
    }
    // if username match
    else {
        // to compare passwords
        let isPasswordValid = await bcryptjs.compare(loginCredentials.password, userofDB.password)
        // if password does not match
        if(!isPasswordValid){
            res.send({message:"Invalid username or password"})
        }
        // if psssword match
        else {
            // create token
            const token = jwt.sign(
                {
                    email: userofDB.email,
                    role: userofDB.role
                }, 
                process.env.SECRET_KEY, 
                {expiresIn: '7d'}
            )
            res.send({message:"success", payload:token, userObj:userofDB})
        }
    }
    
}))
// route to handle user creation
userApp.post('/create-user', expressAsyncHandler(async(req,res)=>{
    const userCollectionObj = req.app.get('userCollectionObj')
    const newUserObj = req.body
    // to check whether new user exist or not
    const userofDB = await userCollectionObj.findOne({email:newUserObj.email})
    // if username  exist
    if(userofDB){
       res.send({message:"user already exist"})
    }
    // if username does not existed
    else{
         // password hashing
         let hashedPassword = await bcryptjs.hash(newUserObj.password,6)
         
        //  assign hashed password
        newUserObj.password = hashedPassword;
        // insert newUser
        newUserObj.role = newUserObj.role || 'GENERAL';
        newUserObj.createdAt = new Date();
        delete newUserObj.conformpassword
        await userCollectionObj.insertOne(newUserObj)
        res.send({message:"new user created"})
    }
}))
// Route to get all users
userApp.get('/get-users', verifyToken, expressAsyncHandler(async (req, res) => {
    const userCollectionObj = req.app.get('userCollectionObj');
    const users = await userCollectionObj.find().toArray();
    res.send({ message: "Users fetched successfully", users });
}));
// route to change user role
userApp.put('/change-role/:userId', verifyToken, isAdmin, expressAsyncHandler(async(req,res)=>{
    const userCollectionObj = req.app.get('userCollectionObj')
    const {userId} = req.params
    const {role} = req.body
    
    try {
        const result = await userCollectionObj.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { role: role } }
        )
        
        if(result.modifiedCount === 1) {
            res.send({message: "User role updated successfully"})
        } else {
            res.send({message: "User not found or role unchanged"})
        }
    } catch(err) {
        res.status(500).send({message: "Error updating user role", error: err.message})
    }
}))

module.exports = userApp