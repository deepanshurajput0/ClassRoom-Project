import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTimeTableSuccess, createTimeTableFail, createTimeTableStart } from '../redux/teacher/teacherSlice';
import toast from 'react-hot-toast';
const Timetable = () => {
  const [classroomId, setClassRoomId] = useState('');

  const { myClass, loading } = useSelector((state) => state.teacher);
  const dispatch = useDispatch();

  const getAllClassesData = async () => {
    try {
      const res = await fetch('/api/v1/myclassroom');
      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        toast.error(data.message)
      } else {
        setClassRoomId(data._id);
        setClassRoom({
          ...classRoom,
          classRoomId: data._id,  // Update classroomId in the state
        });
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const [classRoom, setClassRoom] = useState({
    subject: '',
    startTime: '',
    endTime: '',
    day: '',
    classRoomId: '', // Initialize as an empty string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassRoom({
      ...classRoom,
      [name]: value,
    });
  };

  useEffect(() => {
    getAllClassesData();
  }, []);

  const SubmitHandle = async(e) => {
    e.preventDefault();
    try {
      dispatch(createTimeTableStart());
      const res = await fetch('/api/v1/createTimeTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(classRoom)
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(createTimeTableFail(data.message));
        toast.error(data.message)
      } else {
        dispatch(createTimeTableSuccess(data));
        toast.success(data.message)
        // navigate('/myclasses')
      }
    } catch (error) {
      dispatch(createTimeTableFail(error.message));
      toast.error(error.message)
    }
  };



  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Create Timetable</h2>
        <form onSubmit={SubmitHandle}>
          {/* Class Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Subject</label>
            <input 
              type="text" 
              id="name" 
              name="subject" 
              value={classRoom.subject}
              onChange={handleChange}
              placeholder="Subject" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Start Time */}
          <div className="mb-4">
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-600">Start Time</label>
            <input 
              type="text" 
              id="startTime" 
              name="startTime"
              value={classRoom.startTime}
              onChange={handleChange} 
              placeholder="9AM" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* End Time */}
          <div className="mb-4">
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-600">End Time</label>
            <input 
              type="text" 
              id="endTime" 
              name="endTime" 
              value={classRoom.endTime}
              onChange={handleChange}
              placeholder="12AM" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="day" className="block text-sm font-medium text-gray-600">Day</label>
            <input 
              type="text" 
              id="day" 
              name="day" 
              value={classRoom.day}
              onChange={handleChange}
              placeholder="Day" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Days */}
          

          {/* Classroom ID */}
          <div className="mb-4">
            <label htmlFor="classRoomId" className="block text-sm font-medium text-gray-600">Classroom ID</label>
            <input 
              type="text" 
              id="classRoomId" 
              name="classRoomId" 
              value={classRoom.classRoomId}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              readOnly // Makes the classroom ID field read-only
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              className="bg-black text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              {
                loading ? <span className="loading bg-white loading-spinner loading-xs"></span> : 'Submit'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Timetable;

