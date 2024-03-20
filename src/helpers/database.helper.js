const mongoose=require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    let url = process.env.URL;
    await mongoose.connect(url)
    console.log('database connencted')
}

module.exports = connectDB