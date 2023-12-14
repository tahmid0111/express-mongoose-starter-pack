// initial packages
const express=require('express')
const app=express()
const mongooe=require('mongoose')
const router=require('./src/routes/api')

// extra packages
const cors = require('cors')
const { default: mongoose } = require('mongoose')
require('dotenv').config()

// using the packages
app.use(express.json())
app.use(cors())

// mongoDb connection
let url = `mongodb://127.0.0.1:27017`

mongoose.connect(url)

// routing implement
app.use('api/v1', router)

// error routing implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"something went wrong"})
})

module.exports = app;