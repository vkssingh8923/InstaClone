const { JsonWebTokenError } = require("jsonwebtoken")
const {JWT_SECRET}=require('../keys')
const jwt= require('jsonwebtoken')
const mongoose= require('mongoose')
const User = mongoose.model('User')

module.exports=(req,res,next)=>{
    const {authorization} =req.headers
    console.log(req.headers);
    if(!authorization){
        res.status(401).json({error:"you must be loggin "})
    }
    const token = authorization.replace("Bearerr ","")
    console.log(token);
    jwt.verify(token,JWT_SECRET,(err,payloadJWT)=>{
    if(err){
        res.status(402).json({error:"You must be loggggggin"})
    }
    console.log(payloadJWT);
    const  {_id} =payloadJWT
    User.findById(_id).then(userdata=>{
        req.user=userdata;
    })
    next()
})
}