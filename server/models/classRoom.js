import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    days: [{ type: String, required: true }],
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    students:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    timetables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timetable' }] 
})


const classRoom = mongoose.model('classroom',classSchema)

export default classRoom



