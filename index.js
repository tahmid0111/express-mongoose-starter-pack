const app=require('./app')
require('dotenv').config()

let port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is running`)
})