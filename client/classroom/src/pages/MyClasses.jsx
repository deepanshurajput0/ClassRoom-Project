import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getClassesFail, getClassesSuccess, getClassesStart } from '../redux/principal/principalSlice'
import TeacherModel from '../components/TeacherModel'
import { Link } from 'react-router-dom'
const MyClasses = () => {
    const { classrooms } = useSelector((state)=>state.principal)
    const [show,setShow] = useState(false)
    const dispatch = useDispatch()
    const getAllClassesData=async()=>{
        dispatch(getClassesStart())
        try {
            const res = await fetch('/api/v1/getclassrooms')
            const data = await res.json();
            if (!res.ok) {
                dispatch(getClassesFail(data.message));
            } else {
                dispatch(getClassesSuccess(data));
            }
        } catch (error) {
            dispatch(getClassesFail(error.message));
        }
    }
    useEffect(()=>{
    getAllClassesData()
    },[])
  return (
    <div>
        <h1 className=' text-center text-4xl font-semibold mt-20 justify-evenly' > All Classes</h1>
        <div className=' flex gap-10 mt-20 ml-10 flex-wrap' >
      {
        classrooms.length>0 && classrooms.map((item,i)=>(
            <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item?.name}</h2>
              <p>Start Time : {item?.startTime}</p>
              <p>End Time : {item?.endTime}</p>
              <h3>Day : {item?.days}</h3>
             <div className=' space-x-4' >
             <Link to={`/assignTeacher/${item._id}`} >
              <button className="btn btn-neutral mt-5">Assign Teacher</button>
              </Link>
              <Link to={`/assignStudent/${item._id}`} >
              <button className="btn btn-neutral mt-5">Assign Student</button>
              </Link>
             </div>
            </div>
          </div>
        ))
      }
        </div>
    </div>
  )
}

export default MyClasses


