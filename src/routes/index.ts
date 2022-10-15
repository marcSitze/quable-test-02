import express from 'express'

import { getProducts, getAllProducts, getQuableProducts } from '../controllers'

const router = express.Router()

router.get('/products', getAllProducts)
router.get('/products/quable', getQuableProducts)

export default router