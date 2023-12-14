// initial packages
const express=require('express');
const router=express.Router()

// user controllers are here
const { CreateUser } = require('../controllers/UserController');

router.get('/register', CreateUser)


module.exports = router;