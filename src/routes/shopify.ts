import express from 'express'

import { getIndex, loginShopify, getAuthCallback } from '../controllers/shopify'
const router = express.Router()

router.get('/', getIndex)
router.get('/login', loginShopify)
router.get('/auth/callback', getAuthCallback)

export default router