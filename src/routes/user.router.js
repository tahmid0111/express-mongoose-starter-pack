const express=require('express')
const router=express.Router()

// importing user controllers
const { Registration, Login, ReadUser, UpdateUser, DeleteUser } = require('../controllers/user.controller')
const { AuthVerify } = require('../middleware/tokenVerify')

router.post('/register', Registration)
router.post('/login', Login)
router.get('/readuser', AuthVerify, ReadUser)
router.post('/updateuser', AuthVerify, UpdateUser)
router.post('/deleteuser', AuthVerify, DeleteUser)

module.exports = router