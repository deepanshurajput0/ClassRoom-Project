import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../redux/user/userSlice'
import principalReducer from './principal/principalSlice'
import teacherReducer from './teacher/teacherSlice'
import studentReducer from './student/studentSlice'
export const store = configureStore({
    reducer:{
        user:userReducer,
        principal:principalReducer,
        teacher:teacherReducer,
        student:studentReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    }),
})









