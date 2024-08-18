import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { myClassFail, myClassSuccess, myClassStart } from '../redux/teacher/teacherSlice'
import { Link } from 'react-router-dom'
const MyClass= () => {
    const { myClass } = useSelector((state)=>state.teacher)
    const dispatch = useDispatch()
    const getAllClassesData=async()=>{
        dispatch(myClassStart())
        try {
            const res = await fetch('/api/v1/myclassroom')
            const data = await res.json();
            if (!res.ok) {
                dispatch(myClassFail(data.message));
            } else {
                dispatch(myClassSuccess(data));
            }
        } catch (error) {
            dispatch(myClassFail(error.message));
        }
    }
    useEffect(()=>{
    getAllClassesData()
    },[])
    console.log(myClass)
  return (
    <div>
    <h1 className=' text-center text-4xl font-semibold mt-20 justify-evenly'>All Classes</h1>
    <div className=' flex gap-10 mt-20 ml-10 flex-wrap'>
        {myClass.length > 0 ? (
            myClass.map((item) => (
                <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{item.name}</h2>
                        <p>Start Time: {item.startTime}</p>
                        <p>End Time: {item.endTime}</p>
                        <h3>Day: {item.days.join(', ')}</h3> {/* Ensure days is an array */}
                    </div>
                </div>
            ))
        ) : (
            <p>No classes available</p> // Handle empty state
        )}
    </div>
</div>
  )
}

export default MyClass


