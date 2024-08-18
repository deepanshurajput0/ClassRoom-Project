import userModel from "../models/userModel.js"
import classRoom from "../models/classRoom.js"
import bcrypt from 'bcryptjs'
import timeTableModel from "../models/timetable.js";

export const getStudentsInClassRoom = async (req, res) => {
    try {
        const teacher = await userModel.findById(req.user._id);
        if (!teacher) {
            return res.status(400).json({
                message: 'Teacher not found'
            });
        }
        const teacherClass = await classRoom.findOne({ teacher: teacher._id }).populate('students');
        if (!teacherClass) {
            return res.status(400).json({
                message: 'Classroom not found for the teacher'
            });
        }

        return res.status(200).json(teacherClass.students);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};



export const updateClassStudent =async(req,res)=>{
    try {
       const { id } = req.params
       const { name, email, password, role } = req.body
       const teacher = await userModel.findById(req.user._id);
       if (!teacher) {
           return res.status(400).json({
               message: 'Teacher not found'
           });
       }
       const teacherClass = await classRoom.findOne({ teacher: teacher._id })
       
       if (!teacherClass) {
           return res.status(400).json({
               message: 'Classroom not found for the teacher'
           });
       }
    
       if(!teacherClass.students.includes(id)){
          return res.status(200).json({
            message:'Student is not present'
          })
       }
       const student  = await userModel.findById(id)
       if(student) student.name = name
       if(student) student.email = email
       const newhashPassword = await bcrypt.hash(password,10)
       if(student) student.password = newhashPassword
       if(student) student.role = role

       await student.save()
       return res.status(200).json({
        message:'class student updated successfully'
       });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}




export const deleteStudents =async(req,res)=>{
   try {
    const { id } = req.params
    const teacher = await userModel.findById(req.user._id);
    if (!teacher) {
        return res.status(400).json({
            message: 'Teacher not found'
        });
    }
    const teacherClass = await classRoom.findOne({ teacher: teacher._id })
    
    if (!teacherClass) {
        return res.status(400).json({
            message: 'Classroom not found for the teacher'
        });
    }
 
    if(!teacherClass.students.includes(id)){
       return res.status(200).json({
         message:'Student is not present'
       })
    }
    const student  = await userModel.findById(id)
      await student.deleteOne()
     res.status(200).json({
        message:'Class Deleted student successfully'
     })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message: 'Internal Server Error'
    });
   }
}


export const createTimeTable=async(req,res)=>{
   try {
    const { subject, startTime, endTime, day, classRoomId} = req.body
    if(!subject || !startTime || !endTime || !day || !classRoomId){
        return res.status(400).json({
            message:'All fields are required'
        })
    }
    const newTimetable = await timeTableModel.create({
        subject,
        startTime,
        endTime,
        day,
        classroom:classRoomId
     })
     await classRoom.findByIdAndUpdate(
        classRoomId,
        { $push: { timetables: newTimetable._id } },
        { new: true }
      );
  
      res.status(201).json({ message: 'Timetable entry created successfully', timetable: newTimetable });
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message: 'Internal Server Error'
    });
   }   
}

export const getClassRoomDetails=async(req,res)=>{
    try {
        const user = await userModel.findById(req.user._id)
        const classroom = await classRoom.findOne({ teacher: user._id });
        if (!classroom) {
          return res.status(404).json({ message: 'Classroom not found' });
        }
        res.status(200).json(classroom);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}


