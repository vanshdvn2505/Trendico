import express from 'express'
import isAuthorised from '../middlewares/isAuthorised.middleware.js'
import { saveChanges, verifyCode, sendEmail, addAddress, fetchAddress, removeAddress } from '../controllers/userControllers.js';
const router = express.Router();

router.post('/sendEmail', sendEmail)
router.post('/saveChanges', saveChanges)
router.post('/verifyCode', verifyCode)
router.post('/addAddress', addAddress)
router.post('/fetchAddress', fetchAddress)
router.post('/removeAddress', removeAddress)

export default router