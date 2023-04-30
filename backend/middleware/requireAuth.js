const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const requireAuth = async (req, res, next) => {
    // Check if user is logged in
    const {authorization} = req.headers;
    
    if(!authorization){
        // If user is not logged in, return error
        return res.status(401).json({error: "authorization token is required"});
    }
    // Get token from header
    const token = authorization.split(' ')[1];

    try{
        // Verify token
        const {_id} = jwt.verify(token, process.env.SECRET_KEY);
        // Add user to request
        req.user = await User.findOne({_id}).select('_id');
        // Continue to next middleware
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({error: 'Requet is not authorized'})
    }
}
module.exports = requireAuth;