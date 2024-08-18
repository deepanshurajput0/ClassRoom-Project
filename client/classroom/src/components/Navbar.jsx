import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutSuccess, logoutFail, logoutStart } from '../redux/user/userSlice'
const Navbar = () => {
    const { user } = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const logout=async()=>{
        dispatch(logoutStart())
        try {
          const res = await fetch('/api/v1/logout')
          const data = await res.json()
          if(res.ok){
            dispatch(logoutSuccess(data.message))
            toast.success(data.message)
          }else{
            dispatch(logoutFail(data))
          }
        } catch (error) {
          dispatch(logoutFail(error.message))
        }
      }
  return (
    <div class="navbar text-white bg-black flex justify-between ">
    <button class="btn btn-ghost text-xl">
        <Link to={'/'} >
        ClassRoom
        </Link>
    </button>
    <ul className=' gap-5' >
       {
        !user ? <li >
        <Link to='/login' > Login </Link>
        </li> : <>
        <li>
        <button onClick={logout}>Logout</button>
        </li>
        <li className=' mr-16' >
        {
    user.role === 'principal' ? (
        <Link to="/dashboard">Dashboard</Link>
    ) : user.role === 'teacher' ? (
        <Link to="/teachdashboard">Dashboard</Link>
    ) : (
        <Link to="/studentdashboard">Dashboard</Link>
    )
}

        </li>
        </>
       }
    </ul>
  </div>
  )
}

export default Navbar