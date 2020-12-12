const express = require('express')

const router = express.Router()
const mongoose =require('mongoose')
const User =mongoose.model('User')
const bcrypt =require('bcrypt')
const jwt= require('jsonwebtoken')
const {JWT_SECRET} =require('../keys')
const requireLogin =require('../middleware/requireLogin')

router.get('/',(req,res)=>{
    res.send("hello")
})

router.get('/protected',requireLogin,(req,res)=>{
    res.send("Hello User")
})

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    
    if(!name||!email||!password){
        res.json({error:"please fill all details"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            res.json({error:"User exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedPass=>{
            const user=new User({
                email:email,
                password:hashedPass,
                name:name
            })
            user.save().then(user=>{
                res.json({message:"saved use"})
            }).catch(err=>{console.log(err);})
        })
        
    }).catch(err=>{
        console.log("something went wrong");
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.json({message:"enter email oir passord"})
    }
    else{
        User.findOne({email:email}).then(savedUser=>{
            if(!savedUser){
                return res.json("not exists")
            }
            else{
            
                bcrypt.compare(password,savedUser.password).then(user=>{
                    if(!user){
                        return res.json("wrong pass")
                    }
                    else{
                        const token =jwt.sign({_id:savedUser._id},JWT_SECRET)
                        return res.json({token})
                    }
                }).catch(err=>{console.log(err);})
            }
    
        })
    }
})

module.exports =router