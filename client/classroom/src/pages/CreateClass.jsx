import React, { useState } from 'react';
import { createClassStart, createClassFail, createClassSuccess } from '../redux/principal/principalSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const CreateClass = () => {
  const [classRoom, setClassRoom] = useState({
    name: '',
    startTime: '',
    endTime: '',
    days: [] // Initialize as an empty array
  });
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading } = useSelector((state)=>state.principal)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassRoom({
      ...classRoom,
      [name]: value
    });
  };

  const handleDaysChange = (e) => {
    const selectedDays = Array.from(e.target.selectedOptions, option => option.value);
    setClassRoom({
      ...classRoom,
      days: selectedDays
    });
  };

  const SubmitHandle = async (e) => {
    e.preventDefault();
    try {
      dispatch(createClassStart());
      const res = await fetch('/api/v1/createroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(classRoom)
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(createClassFail(data.message));
        toast.error(data.message)
      } else {
        dispatch(createClassSuccess(data));
        toast.success(data.message)
        // navigate('/myclasses')
      }
    } catch (error) {
      dispatch(createClassFail(error.message));
      toast.error(error.message)
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">Create Classroom</h2>
        <form onSubmit={SubmitHandle}>
          {/* Course Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Class Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={classRoom.name}
              onChange={handleChange}
              placeholder="Class Name" 
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

          {/* Days */}
          <div className="mb-6">
            <label htmlFor="days" className="block text-sm font-medium text-gray-600">Days</label>
            <select 
              id="days" 
              name="days" 
              multiple
              value={classRoom.days}
              onChange={handleDaysChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              className="bg-black text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              {
                loading ? <span className="loading bg-white loading-spinner loading-xs"></span> : <>
                Submit
                </>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
