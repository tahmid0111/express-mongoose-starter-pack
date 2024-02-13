const express=require('express')
const router=express.Router()

// importing user controllers
const { Registration, Login, ReadUser } = require('../controllers/userController')
const { AuthVerify } = require('../middleware/tokenVerify')

router.post('/register', Registration)
router.post('/login', Login)
router.get('/readuser', AuthVerify, ReadUser)
router.post('/updateuser/:id', Registration)
router.post('/deleteuser/:id', Registration)

module.exports = router