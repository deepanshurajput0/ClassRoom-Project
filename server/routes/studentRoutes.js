import express from 'express'
import { getAllClassmates, getMyTimeTable} from '../controllers/studentController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/allclassmates',authMiddleware,getAllClassmates)

router.get('/getTimeTable',authMiddleware,getMyTimeTable)

export default router