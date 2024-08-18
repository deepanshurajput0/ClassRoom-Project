import React,{useState,useEffect} from 'react'
import { updateTeacherSuccess, updateTeacherFail, updateTeacherStart } from '../redux/principal/principalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const EditTeacher = () => {
    const { loading } = useSelector((state)=>state.principal)
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      const { id } = useParams()
      const dispatch = useDispatch()
      const handleChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
      }
    
    const currentUser =async()=>{
        try {
            const res = await fetch(`/api/v1/singleuser/${id}`);
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message)
            } else {
                setUser({
                    ...data,
                    password: "", // Keep password field empty
                  });
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
      currentUser()
    },[])

    const updateStudent =async(e)=>{
       e.preventDefault()
       try {
        dispatch(updateTeacherStart());
        const res = await fetch(`/api/v1/updateTeacher/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(updateTeacherFail(data.message));
          toast.error(data.message)
        } else {
          dispatch(updateTeacherSuccess(data));
          toast.success(data.message)
        }
      } catch (error) {
        dispatch(updateTeacherFail(error.message));
        toast.error(error.message)
      }
    }
  return (
    <div>
    <div>
 <h1 className=" text-center text-4xl font-semibold mt-10">
   Update Teacher
 </h1>
 <form onSubmit={updateStudent}  className=" flex justify-center flex-col items-center gap-10 mt-20">
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
   <select  name="role" className="select select-bordered w-[30rem] ">
     <option disabled selected>
       Select Your Role
     </option>
     <option>principal</option>
     <option>teacher</option>
     <option>student</option>
   </select>
   <button type="submit" className="btn w-[30rem] btn-outline">
    {
        loading ? 

        <span className="loading loading-spinner loading-xs"></span> : <>
        Update Teacher
        </>
    }
   </button>
 </form>
</div>
</div>
  )
}

export default EditTeacher


