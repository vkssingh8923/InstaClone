const express=require('express')
const app =express()
const PORT =5000

const middleware=(req,res,next)=>{
    console.log("mid1");
    next()
}

// app.use(middleware)

app.get('/home',middleware,(req,res)=>{
    res.send("homew")
})

app.get('/',(req,res)=>{
    // console.log(res);
    res.send("Hello User")
})


app.listen(PORT,()=>{
    console.log("server is running",{PORT});
})