import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClassStudentsFail, getClassStudentsSuccess, getClassStudentsStart } from '../redux/teacher/teacherSlice';
import { Link } from 'react-router-dom'
import { RiDeleteBinLine } from "react-icons/ri";
import toast from 'react-hot-toast';
const ClassStudents = () => {
    const dispatch = useDispatch()
   const { classStudents } = useSelector((state)=>state.teacher)
    const getAllStudents =async()=>{
        dispatch(getClassStudentsStart())
        try {
           const res = await fetch('/api/v1/classStudents')
            const data = await res.json();
            console.log(data)
            if (!res.ok) {
                dispatch(getClassStudentsFail(data.message));
            } else {
                dispatch(getClassStudentsSuccess(data));
            }  
        } catch (error) {
            dispatch(getClassStudentsFail(error.message));
        }
    }



    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/v1/deleteStudent/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data)
            if (res.ok) {
                // Update the students array in the state by filtering out the deleted student
                dispatch(getClassStudentsSuccess(classStudents.filter(student => student._id !== id)));
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    useEffect(()=>{
        getAllStudents()
    },[])
  return (
    <div>
        <h1 className=' text-center text-4xl mt-5 mb-10 font-semibold' > All Students </h1>
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
      {
        classStudents.length>0 && classStudents.map((item,i)=>(
            <tbody key={item._id} >
            {/* row 1 */}
            <tr>
              <th>{i}</th>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.role}</td>
              <td>
                <Link to={`/editstudent/${item._id}`} ><button className="btn">Edit</button></Link>
              </td>
              <td>
                <button onClick={()=>handleDelete(item._id)}  className='btn' >
                 <RiDeleteBinLine />
                </button>
              </td>
            </tr>
            {/* row 2 */}
          </tbody>  
        ))
      }
  </table>
</div>
    </div>
  )
}

export default ClassStudents
