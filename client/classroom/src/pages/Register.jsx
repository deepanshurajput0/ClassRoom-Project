import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import  { signUpFail, signUpSuccess, signUpStart } from './../redux/user/userSlice'
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const dispatch = useDispatch()
  const handleChange=(e)=>{
    setUser({
        ...user,
        [e.target.name]:e.target.value
    })
  }

  const submitHandler=async(e)=>{
    e.preventDefault()
    try {
        dispatch(signUpStart())
        const res = await fetch('/api/v1/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        })
        const data = await res.json()
        if(!res.ok){
            dispatch(signUpFail(data.message))
            toast.error(data.message)
        }else{
            dispatch(signUpSuccess(data))
            toast.success(data.message)
        }
    } catch (error) {
        dispatch(signUpFail(error.message))
        toast.error(error.message)
    }
  }
  return (
    <div>
      <h1 className=" text-center text-4xl font-semibold mt-10">
        Register Now
      </h1>
      <form onSubmit={submitHandler}  className=" flex justify-center flex-col items-center gap-10 mt-20">
        <label className="input input-bordered w-[30rem] flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text"
          value={user.name}
          onChange={handleChange}
          name="name" 
          className="grow" 
          placeholder="Username" />
        </label>
        <label className="input input-bordered w-[30rem] flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input 
          type="text" 
          className="grow"
          value={user.email}
          onChange={handleChange}
          name="email"  
          placeholder="Email" />
        </label>

        <label className="input input-bordered w-[30rem] flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input 
          type="password" 
          className="grow"
          onChange={handleChange}
          value={user.password} 
          name="password"
          />
        </label>
        <select value={user.role} onChange={handleChange} name="role" className="select select-bordered w-[30rem] ">
          <option disabled selected>
            Select Your Role
          </option>
          <option>Select Your Role</option>
          <option>principal</option>
          <option>teacher</option>
          <option>student</option>
        </select>
        <button type="submit" className="btn w-[30rem] btn-outline">Register Now</button>
        <p>
          {" "}
          Already have an account <Link to={"/login"}>Login Now</Link> ?{" "}
        </p>
      </form>
    </div>
  );
};

export default Register;
