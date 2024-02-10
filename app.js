// initial packages
const express=require('express')
const app=express()
const mongoose=require('mongoose')
// importing routers
const userRouter=require('./src/routes/user.router')
const productRouter=require('./src/routes/product.router')
// extra packages
const cors = require('cors')
require('dotenv').config()
// using the packages
app.use(express.json())
app.use(cors())

// mongoDb connection
let url = process.env.URL
mongoose.connect(url)

// routing implement
app.use('/user/api/v1', userRouter)
app.use('/product/api/v1', productRouter)

// error routing implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"wrong connection"})
})

module.exports = app;
