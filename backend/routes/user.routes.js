import express from 'express'
import isAuthorised from '../middlewares/isAuthorised.middleware.js'
import { saveChanges, verifyCode, sendEmail } from '../controllers/userControllers.js';
const router = express.Router();

router.post('/sendEmail', sendEmail)
router.post('/saveChanges', saveChanges)
router.post('/verifyCode', verifyCode)

export default router