import express from 'express'
import {panels} from '../controllers/productControllers.js'
const router = express.Router();

router.get('/panels', panels)

export default router