import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Home = () => {
  const { user } = useSelector((state)=>state?.user)
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">ClassRoom</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
     {
    user?.role === 'principal' ? (
      <Link to={'/createclass'} >
      <button className="btn bg-black text-white hover:bg-black">Get Started</button>
      </Link>
    ) : user?.role === 'teacher' ? (
      <Link to={'/teachdashboard'} >
      <button className="btn bg-black text-white hover:bg-black">My Class</button>
      </Link>
    ) : (
      <Link to={'/createclass'} >
      <button className="btn bg-black text-white hover:bg-black">ClassRoom</button>
      </Link>
    )
}

    </div>
  </div>
</div>
    </div>
  )
}

export default Home


