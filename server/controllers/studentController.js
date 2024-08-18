import classRoom from "../models/classRoom.js"
import userModel from "../models/userModel.js"

export const getAllClassmates =async(req,res)=>{
    try {
        const studentId = await userModel.findById(req.user._id)
        const classStudent = await classRoom.findOne({students:studentId._id}).populate('students')
        if(!classStudent){
          return res.status(401).json({
            message:'No Students found in Classroom'
          })
        } 
      res.status(200).json(classStudent)
    } catch (error) {
       console.log(error)
       return res.status(500).json({
        message:'Internal Server Error'
    })
    }
  
}





export const getMyTimeTable =async(req,res)=>{
    try {
        const studentId = await userModel.findById(req.user._id)
        const classStudent = await classRoom.findOne({students: studentId._id}).select('+timetables').populate('timetables');

        if(!classStudent){
          return res.status(401).json({
            message:'No Students found in Classroom'
          })
        } 
      res.status(200).json(classStudent)
    } catch (error) {
       console.log(error)
       return res.status(500).json({
        message:'Internal Server Error'
    })
    }
}