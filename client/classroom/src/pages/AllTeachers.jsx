import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherFail, getTeacherStart, getTeacherSuccess } from '../redux/principal/principalSlice'
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
const AllTeachers = () => {
    const dispatch = useDispatch()
   const { teachers } = useSelector((state)=>state.principal)
   
    const getAllTeachers =async()=>{
        dispatch(getTeacherStart())
        try {
           const res = await fetch('/api/v1/getAllTeachers')
            const data = await res.json();
            if (!res.ok) {
                dispatch(getTeacherFail(data.message));
            } else {
                dispatch(getTeacherSuccess(data));
            }  
        } catch (error) {
            dispatch(getTeacherFail(error.message));
        }
    }


    
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/v1/deleteTeacher/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (res.ok) {
                // Update the students array in the state by filtering out the deleted student
                dispatch(getTeacherSuccess(teachers.filter(teacher => teacher._id !== id)));
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(()=>{
        getAllTeachers()
    },[])

  return (
    <div>
        <h1 className=' text-center text-4xl mt-5 mb-10 font-semibold' > All Teachers </h1>
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
        teachers.length>0 && teachers.map((item,i)=>(
            <tbody key={item._id} >
            {/* row 1 */}
            <tr>
              <th>{i}</th>
              <td>{item?.name}</td>
              <td>{item?.email}</td>
              <td>{item?.role}</td>
              <td>
              <Link to={`/editteacher/${item._id}`} ><button className="btn">Edit</button></Link>
              </td>
              <td>
                <button onClick={()=>handleDelete(item._id)} className='btn' >
                <RiDeleteBinLine/>
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

export default AllTeachers


