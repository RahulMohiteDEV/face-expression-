const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const blacklistModel = require('../models/blacklist.model');
const redis = require('../config/cache');

async function authUser(req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Invalid token"});
    }

   const isTokenBlacklisted = await redis.get(token);

    if(isTokenBlacklisted){
        return res.status(401).json({message:"Invalid token"});
    }

   try{
     const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    ) 

    req.user = decoded;
    next();
   } catch(err){
    return res.status(401).json({message:"Invalid token"});
   }
}

module.exports = {
    authUser
}