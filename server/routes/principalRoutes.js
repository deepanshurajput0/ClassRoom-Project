import express from 'express'
import { assignStudentToTeacher, assignTeachersToClass, createClassRoom, deleteStudent, deleteTeacher, getAllClasses, getAllStudents, getAllTeachers, getSingleUser , updateStudent, updateTeacher } from '../controllers/classRoomController.js'
import { authMiddleware, isPrincipal } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/createroom',authMiddleware,isPrincipal,createClassRoom)

router.get('/getclassrooms',authMiddleware,isPrincipal,getAllClasses)

router.get('/singleuser/:id',authMiddleware,getSingleUser)

router.post('/assignTeacher/:id',authMiddleware,isPrincipal,assignTeachersToClass)

router.post('/assignStudent/:id',authMiddleware,isPrincipal,assignStudentToTeacher)

router.get('/getAllTeachers',authMiddleware,isPrincipal,getAllTeachers)

router.get('/getAllStudents',authMiddleware,isPrincipal,getAllStudents)

router.put('/updateTeacher/:id',authMiddleware,isPrincipal,updateTeacher)

router.put('/updateStudent/:id',authMiddleware,updateStudent)

router.delete('/deleteTeacher/:id',authMiddleware,isPrincipal,deleteTeacher)

router.delete('/deleteStudent/:id',authMiddleware,deleteStudent)


export default router


