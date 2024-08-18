import express from 'express'
import { loggedInUser, login, logout, register } from '../controllers/userController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register',register)

router.post('/login',login)

router.get('/logout',logout)

router.get('/me',authMiddleware,loggedInUser)

export default router