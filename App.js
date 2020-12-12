const express=require('express')
const mongoose  = require('mongoose')
const app =express()
const PORT =5000
const db=require('./mongodb')

require('./modals/user')

app.use(express.json())
app.use(require('./routes/auth'))

mongoose.model('User')


app.get('/',(req,res)=>{
    // console.log(res);
    res.send("Hello User")
})


app.listen(PORT,()=>{
    console.log("server is running",{PORT});
})