import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    day: { type: String, required: true },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }
  });


  const timeTableModel = mongoose.model('Timetable',TimetableSchema)


  export default timeTableModel


