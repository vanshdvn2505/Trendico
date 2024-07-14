import express from 'express'
const router = express.Router();
import {panels, search, similar, addToCart, fetchCart, removeFromCart} from '../controllers/productControllers.js'

router.get('/panels', panels)
router.post('/search', search)
router.post('/similar', similar)
router.post('/addToCart', addToCart)
router.post('/fetchCart', fetchCart)
router.post('/removeFromCart', removeFromCart)

export default router