import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    classStudents:[],
    myClass:[],
    loading:false,
    error:null,
    messages:null
}


const teacherSlice = createSlice({
    name:'teacher',
    initialState,
    reducers:{
        getClassStudentsStart:(state,action)=>{
         state.loading = true
        },
        getClassStudentsSuccess:(state,action)=>{
         state.loading = false
         state.classStudents = action.payload
        },
        getClassStudentsFail:(state,action)=>{
         state.loading = false
         state.error = action.payload
        },
        myClassStart:(state,action)=>{
         state.loading = true

        },
        myClassSuccess:(state,action)=>{
         state.loading = false
         state.myClass = action.payload
        },
        myClassFail:(state,action)=>{
         state.loading = false
         state.error = action.payload
        },
        createTimeTableStart:(state,action)=>{
          state.loading = true
        },
        createTimeTableSuccess:(state,action)=>{
         state.loading = false
         state.messages = action.payload
        },
        createTimeTableFail:(state,action)=>{
         state.loading = false
         state.error = action.payload
        },
    }
})


export const { getClassStudentsFail, getClassStudentsStart, getClassStudentsSuccess, myClassFail, myClassSuccess, myClassStart, createTimeTableStart, createTimeTableSuccess, createTimeTableFail } = teacherSlice.actions


export default teacherSlice.reducer


