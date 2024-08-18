import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import useLoadUser from './components/LoadUser'
import PrivateRoutes from './components/PrivateRoute'
import CreateClass from './pages/createClass'
import { useEffect } from 'react'
import MyClasses from './pages/MyClasses'
import AllTeachers from './pages/AllTeachers'
import AllStudents from './pages/AllStudents'
import TeacherModel from './components/TeacherModel'
import StudentModel from './components/StudentModel'
import Dashboard from './components/Dashboard'
import EditStudent from './pages/EditStudent'
import EditTeacher from './pages/EditTeacher'
import { Toaster } from 'react-hot-toast'
import TeacherDashboard from './components/TeacherDashboard'
import PrincipalRoute from './components/PrincipalRoute'
import ClassStudents from './pages/ClassStudents'
import Timetable from './pages/Timetable'
import MyClass from './pages/MyClass'
import ClassMates from './components/ClassMates'
import StudentDash from './components/StudentDash'
function App() {
  const loadUser = useLoadUser()
  useEffect(()=>{
   loadUser()
  },[])
  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={
          <PrivateRoutes>
            <Login/>
          </PrivateRoutes>
        } />
        <Route path='/register' element={
          <PrivateRoutes>
            <Register/>
          </PrivateRoutes>
        } />
        <Route path='/createclass' element={
          <PrincipalRoute>
            <CreateClass/>
          </PrincipalRoute>
        } />
        <Route path='/myclasses' element={<MyClasses/>} />
        <Route path='/teachers' element={
          <PrincipalRoute>
            <AllTeachers/>
          </PrincipalRoute>
        } />
        <Route path='/students' element={
          <PrincipalRoute>
            <AllStudents/>
          </PrincipalRoute>
        } />
        <Route path='/assignTeacher/:id' element={
          <PrincipalRoute>
            <TeacherModel/>
          </PrincipalRoute>
        } />
        <Route path='/assignStudent/:id' element={
          <PrincipalRoute>
            <StudentModel/>
          </PrincipalRoute>
        } />
        <Route path='/editstudent/:id' element={
            <EditStudent/>
        } />
        <Route path='/editteacher/:id' element={
          <PrincipalRoute>
            <EditTeacher/>
          </PrincipalRoute>
        } />
        <Route path='/dashboard' element={
          <PrincipalRoute>
            <Dashboard/>
          </PrincipalRoute>
        }>
        
       
        </Route>
        <Route path='/teachdashboard' element={<TeacherDashboard/>} />
        <Route path='/classstudents' element={<ClassStudents/>} />
        <Route path='/createtimetable' element={<Timetable/>} />
        <Route path='/myclass' element={<MyClass/>} />
        <Route path='/classmates' element={<ClassMates/>} />
        <Route path='/studentdashboard' element={<StudentDash/>} />
      </Routes>
      <Toaster/>
     </Router>
    </>
  )
}

export default App
