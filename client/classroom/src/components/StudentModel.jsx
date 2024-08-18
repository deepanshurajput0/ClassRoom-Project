import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getStudentFail, getStudentStart, getStudentSuccess,addStudentFail, addStudentStart, addStudentSuccess } from '../redux/principal/principalSlice'; 
import toast from 'react-hot-toast';
const StudentModel = () => {
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.principal);
    const { id } = useParams()
    const getAllStudents =async()=>{
        dispatch(getStudentStart())
        try {
           const res = await fetch('/api/v1/getAllStudents')
            const data = await res.json();
            if (!res.ok) {
                dispatch(getStudentFail(data.message));
                
            } else {
                dispatch(getStudentSuccess(data));
                
            }  
        } catch (error) {
            dispatch(getStudentFail(error.message));
            
        }
    }

    
    const addTeacher = async (e) => {
        e.preventDefault();
        dispatch(addStudentStart())
        try {
          const res = await fetch(`/api/v1/assignStudent/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({studentId:selectedStudentId}), // Send teacher ID
          });
          const data = await res.json();
          if (!res.ok) {
            dispatch(addStudentFail(data.message))
            toast.error(data.message)
          } else {
            dispatch(addStudentSuccess(data))
            toast.success(data.message)
          }
        } catch (error) {
          dispatch(addStudentFail(error.message)); 
          toast.error(error.message)
        }
      };
    
      useEffect(() => {
        getAllStudents()
      }, []);
  return (
    <div className=' flex justify-center h-[100vh] items-center' >
    <div className="card bg-base-100 w-96 shadow-xl">
<div className="card-body space-y-5">
<h1> Assign Your Student</h1>
<form onSubmit={addTeacher} >
<select className='select w-full max-w-xs' value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)} required>
    <option  value="">Select a Select</option>
    {students.length > 0 && students.map((item) => (
      <option key={item._id} value={item._id}>{item.name}</option>
    ))}
  </select>
  <button className="btn btn-neutral mt-5">Assign Student</button>
</form>
</div>
</div>
</div>
  )
}

export default StudentModel

