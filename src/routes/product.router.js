const express=require('express')
const router=express.Router()

const { AuthVerify } = require('../middleware/tokenVerify')
const { CreateProduct, ReadAllProduct, ReadSingleProduct, UpdateProduct, DeleteProduct, DeleteAllProduct } = require('../controllers/product.controller')

router.post('/createproduct', AuthVerify, CreateProduct)
router.get('/readallproduct', AuthVerify, ReadAllProduct)
router.get('/readproduct/:id', AuthVerify, ReadSingleProduct)
router.post('/updateproduct/:id', AuthVerify, UpdateProduct)
router.post('/deleteproduct/:id', AuthVerify, DeleteProduct)
router.post('/deleteallproduct', AuthVerify, DeleteAllProduct)

module.exports = router