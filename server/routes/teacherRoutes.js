import express from 'express'
import { createTimeTable, deleteStudents, getClassRoomDetails, getStudentsInClassRoom, updateClassStudent } from '../controllers/teacherController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()


router.get('/classStudents',authMiddleware,getStudentsInClassRoom)

router.put('/updateClassStudent/:id',authMiddleware,updateClassStudent)

router.delete('/deleteClassStudent/:id',authMiddleware,deleteStudents)

router.post('/createTimeTable',authMiddleware,createTimeTable)

router.get('/myclassroom',authMiddleware,getClassRoomDetails)

export default router