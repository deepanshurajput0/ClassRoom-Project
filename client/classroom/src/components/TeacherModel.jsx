import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getTeacherFail, getTeacherStart, getTeacherSuccess, addTeacherFail, addTeacherSuccess, addTeacherStart } from '../redux/principal/principalSlice'; 
import toast from 'react-hot-toast';
const TeacherModel = () => {
    const [selectedTeacherId, setSelectedTeacherId] = useState('');
    const dispatch = useDispatch();
    const { teachers, loading } = useSelector((state) => state.principal);
    const { id } = useParams()
    const getAllTeachers = async () => {
      dispatch(getTeacherStart());
      try {
        const res = await fetch('/api/v1/getAllTeachers');
        const data = await res.json();
        if (!res.ok) {
          dispatch(getTeacherFail(data.message));
        } else {
          dispatch(getTeacherSuccess(data));
        }
      } catch (error) {
        dispatch(getTeacherFail(error.message));
      }
    };

    const addTeacher = async (e) => {
        e.preventDefault();
        dispatch(addTeacherStart())
        try {
          const res = await fetch(`/api/v1/assignTeacher/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({teacherId:selectedTeacherId}), // Send teacher ID
          });
          const data = await res.json();
          if (!res.ok) {
            dispatch(addTeacherFail(data.message))
            toast.error(data.message)
          } else {
            dispatch(addTeacherSuccess(data))
            toast.success(data.message)
          }
        } catch (error) {
          dispatch(addTeacherFail(error.message)); 
          toast.error(error.message)
        }
      };
    
      useEffect(() => {
        getAllTeachers();
      }, []);
    

  return (
   <div className=' flex justify-center h-[100vh] items-center' >
        <div className="card bg-base-100 w-96 shadow-xl">
  <div className="card-body space-y-5">
  <h1> Assign Your Teacher</h1>
<form onSubmit={addTeacher} >
<select className='select w-full max-w-xs' value={selectedTeacherId} onChange={(e) => setSelectedTeacherId(e.target.value)} required>
        <option  value="">Select a teacher</option>
        {teachers.length > 0 && teachers.map((item) => (
          <option key={item._id} value={item._id}>{item.name}</option>
        ))}
      </select>
      <button className="btn btn-neutral mt-5">Assign Teacher</button>
</form>
  </div>
</div>
   </div>

  )
}

export default TeacherModel








