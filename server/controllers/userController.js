import userModel from "../models/userModel.js"
import { sendToken } from "../utils/sendToken.js"
import bcrypt from 'bcryptjs'
export const register =async(req,res)=>{
    try {
     const {name, email, password, role } = req.body
     console.log(role)
     if( !name, !email || !password || !role){
        return res.status(400).json({
            message:"All Fields are required"
        })
     }        
     const existingUser = await userModel.findOne({email})
     if(existingUser){
        return res.status(401).json({
            message:"User Already exists"
        })
     }
     const hashedPassword = await bcrypt.hash(password,10)
     const user = await userModel.create({
        name,
        email,
        password:hashedPassword,
        role
     })
    sendToken(res,user,'User Registered Successfully',201)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Internal Server error"
        })
    }
}

export const login = async(req,res)=>{
   try {
    const { email, password } = req.body
    if(!email || !password){
      return res.status(400).json({
        message:'All fields are required'
      })  
    }
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message:'Invalid email & password'
          })  
         }
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword){
     return res.status(401).json({
       message:'Invalid email & password'
     })  
    }
   sendToken(res,user,`Welcome back ${user.name}`,201)
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"Internal Server error"
    })
   }
}


export const loggedInUser=async(req,res)=>{
  try {
    const user = await userModel.findById(req.user._id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });  
  }
}


export const logout =async(req,res)=>{
   try {
     res.cookie('token',null,{
        expires:new Date(Date.now()),
        secure:true,
        sameSite:'none'
     }).json(
        {
            message:"Logout Successfully"
         }
     )
   } catch (error) {
    console.log(error)
    res.status(500).json({
        message: 'Internal Server Error'
      });  


   }
}






