import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    name:{
     type:String,
     required:true,
     unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        enum:['student','teacher','principal']
    }
})


userSchema.methods.getJwtToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
}




const userModel = mongoose.model('User',userSchema)

export default userModel


