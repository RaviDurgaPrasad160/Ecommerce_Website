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
            const token = jwt.sign({message:userofDB.email}, process.env.SECRET_KEY, {expiresIn: '7d'})
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
// route to handle change-role 
userApp.put('/change-role/:userId', verifyToken, isAdmin, expressAsyncHandler(async (req, res) => {
    const userCollectionObj = req.app.get('userCollectionObj');
    const { role } = req.body; // Extract the role from the request body
    const userId = req.params.userId; // Extract the userId from params
    // Validate userId
    if (!ObjectId.isValid(userId)) {
        return res.status(400).send({ message: 'Invalid userId format' });
    }
    try {
        // Update the user's role in the database
        const result = await userCollectionObj.updateOne(
            { _id: new ObjectId(userId) }, // Find user by ObjectId
            { $set: { role } } // Set the new role
        );
        // Check if the update was successful
        if (result.modifiedCount > 0) {
            res.send({ message: 'success' });
        } else {
            res.status(404).send({ message: 'User not found or role not updated' });
        }
    } catch (error) {
        // Handle errors
        console.error("Error updating role:", error);
        res.status(500).send({ message: 'Internal server error' });
    }
}));
module.exports = userApp