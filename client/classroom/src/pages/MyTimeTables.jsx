import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTimeTableFail,  getTimeTableStart, getTimeTableSuccess } from '../redux/student/studentSlice'
const MyTimeTable = () => {
    const { timeTables, error, loading } = useSelector((state)=>state.student)
    const dispatch = useDispatch()
    const getAllClassesData=async()=>{
        dispatch(getTimeTableStart())
        try {
            const res = await fetch('/api/v1/getTimeTable')
            const data = await res.json();
            if (!res.ok) {
                dispatch(getTimeTableFail(data.message));
            } else {
                dispatch(getTimeTableSuccess(data.timetables));
            }
        } catch (error) {
            dispatch(getTimeTableFail(error.message));
        }
    }
    useEffect(() => {
        getAllClassesData()
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(timeTables)
  return (
    <div>
        <h1 className=' text-center text-4xl font-semibold mt-20 justify-evenly' > All TimeTables</h1>
        <div className=' flex gap-10 mt-20 ml-10 flex-wrap' >
        {
  timeTables && timeTables.length > 0 && timeTables.map((item, i) => (
    <div key={item._id} className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{item?.subject}</h2>
        <p>Start Time: {item?.startTime}</p>
        <p>End Time: {item?.endTime}</p>
        <h3>Day: {item?.day}</h3>
      </div>
    </div>
  ))
}

        </div>
    </div>
  )
}

export default MyTimeTable



