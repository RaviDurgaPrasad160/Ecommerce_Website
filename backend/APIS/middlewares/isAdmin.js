const jwt = require('jsonwebtoken')
require('dotenv').config()
const isAdmin = (req, res, next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1]; // to extract token
        if(!token){
            return res.send({message:'token missing'})
        }
        // verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
         // Check if the user role is ADMIN
         if (decoded.role !== 'ADMIN') {
            return res.send({ message: 'Access denied. Only admins can perform this action' });
        }
        next()
    } catch(err){
        return res.send({ message: 'Invalid or expired token' });
    }
}
module.exports = isAdmin