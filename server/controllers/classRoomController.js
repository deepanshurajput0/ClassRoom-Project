import classRoom from "../models/classRoom.js";
import userModel from "../models/userModel.js";
import bcrypt from 'bcryptjs'

export const createClassRoom =async(req,res)=>{
   try {
    const { name, startTime, endTime, days } = req.body;
    const classroom = await classRoom.create({
        name,
        startTime,                                                        
        endTime,
        days
    })
    res.status(201).json({ message: 'Classroom created successfully', classroom });
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal Server error"
    })
   } 
}

export const getSingleUser =async(req,res)=>{
    try {
        const id = req.params.id
        const singleStudent = await userModel.findById(id)
        if(!singleStudent){
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(singleStudent)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        }) 
    }
}

export const getAllClasses =async(req,res)=>{
    try {
        const classes = await classRoom.find({})
        res.status(200).json(classes)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        })
     
    }
}

export const assignTeachersToClass =async(req,res)=>{
   try {
    const  classRoomId  = req.params.id 
    const { teacherId } = req.body
    const teacher = await userModel.findById(teacherId)
    if(!teacher || teacher.role !== 'teacher'){
        return res.status(404).json({ message: 'Teacher not found or invalid role' });
    }
    const existingClassroom = await classRoom.findOne({teacher:teacherId})
    if(existingClassroom){
        return res.status(400).json({ message: 'This teacher is already assigned to a classroom' });
    }
    const classRooms = await classRoom.findByIdAndUpdate(
        classRoomId,
        {teacher:teacherId},
        {new:true}
    )
    if (!classRooms) {
        return res.status(404).json({ message: 'Classroom not found' });
      }
  
      res.status(200).json({ message: 'Teacher assigned to classroom successfully'});
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal Server error"
    })
   }
}




export const assignStudentToTeacher =async(req,res)=>{
   try {
    const  classRoomId  = req.params.id 
    const { studentId} = req.body
    const classroom = await classRoom.findById(classRoomId)
    if (!classroom) {
        return res.status(404).json({ message: 'Classroom not found' });
      }
    const student = await userModel.findById(studentId)
    if(!student && !student.role !== 'student'){
        return res.status(404).json({ message: 'Student not found or invalid role' });
    }
    
    classroom.students.push(studentId)
    await classroom.save()
    res.status(200).json({ message: 'Student assigned to classroom successfully', student });
   } catch (error) {
    res.status(500).json({ message: 'Error assigning student to classroom', error });
   }

}



export const getAllTeachers =async(req,res)=>{
    try {
      const teachers = await userModel.find({role:'teacher'})
      
      if(!teachers && teachers.role !== 'teacher'){
        return res.status(404).json({ message: 'Teacher not found or invalid role' });
      }
      res.status(200).json(teachers)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal Server error '
        })
    }
}
export const getAllStudents =async(req,res)=>{
    try {
      const students = await userModel.find({role:'student'})
      
      if(!students && students.role !== 'student'){
        return res.status(404).json({ message: 'Student not found or invalid role' });
      }
      res.status(200).json(students)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal Server error '
        })
    }
}


export const updateTeacher =async(req,res)=>{
   try {
    const { id } = req.params
    const { name, email, password, role } = req.body
    const teacher = await userModel.findById(id)
    if(!teacher && teacher.role !== 'teacher'){
        return res.status(404).json({ message: 'Teacher not found or invalid role' });
      }
    if(teacher) teacher.name = name
    if(teacher) teacher.email = email
    const newhashPassword = await bcrypt.hash(password,10)
    if(teacher) teacher.password = newhashPassword
    if(teacher) teacher.role = role
    
    await teacher.save()
    res.status(201).json({
        message:'Teacher Updated Successfully'
    })

   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message:'Internal Server Error'
    })
   }
}

export const updateStudent =async(req,res)=>{
   try {
    const { id } = req.params
    const { name, email, password, role } = req.body
    const student = await userModel.findById(id)
    if(!student && student.role !== 'student'){
        return res.status(404).json({ message: 'Student not found or invalid role' });
      }
    if(student) student.name = name
    if(student) student.email = email
    const newhashPassword = await bcrypt.hash(password,10)
    if(student) student.password = newhashPassword
    if(student) student.role = role
    
    await student.save()
    res.status(201).json({
        message:'Student Updated Successfully'
    })

   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message:'Internal Server Error'
    })
   }
}



export const deleteTeacher =async(req,res)=>{
   try {
   const { id } = req.params
   const teacher = await  userModel.findById(id)
   if(!teacher && teacher.role !== 'teacher'){
    return res.status(404).json({ message: 'Teacher not found or invalid role' });
  }
    await teacher.deleteOne()
    res.status(201).json({
        message:'Teacher Deleted Successfully'
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message:'Internal Server Error'
    })
   }
}
export const deleteStudent =async(req,res)=>{
   try {
   const { id } = req.params
   const student = await  userModel.findById(id)
   if(!student && student.role !== 'student'){
    return res.status(404).json({ message: 'Teacher not found or invalid role' });
  }
    await student.deleteOne()
    res.status(201).json({
        message:'Student Deleted Successfully'
    })
   } catch (error) {
    console.log(error)
    return res.status(500).json({
        message:'Internal Server Error'
    })
   }
}



