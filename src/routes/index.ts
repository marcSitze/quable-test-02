import express from 'express'

import { getProducts, getAllProducts } from '../controllers'

const router = express.Router()

router.get('/products', getAllProducts)

export default router