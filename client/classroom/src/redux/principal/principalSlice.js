import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    classrooms:[],
    teachers:[],
    students:[],
    loading:false,
    error:null,
    messages:null
}


export const principalSlice = createSlice({
    name:'principal',
    initialState,
    reducers:{
        createClassStart:(state,action)=>{
            state.loading = true
          },
          createClassSuccess:(state,action)=>{
            state.loading = false,
            state.messages = action.payload

          },
          createClassFail:(state,action)=>{
           state.loading = false,
           state.error = action.payload
          },
          getClassesStart:(state,action)=>{
           state.loading = true
          },
          getClassesSuccess:(state,action)=>{
           state.loading = false
           state.classrooms = action.payload
          },
          getClassesFail:(state,action)=>{
           state.loading = false
           state.error = action.payload
          },
          getTeacherStart:(state)=>{
            state.loading = true
          },
          getTeacherSuccess:(state,action)=>{
            state.loading = false
            state.teachers = action.payload
          },
          getTeacherFail:(state,action)=>{
            state.loading = false
            state.error = action.payload
          },
          getStudentStart:(state)=>{
            state.loading = true
          },
          getStudentSuccess:(state,action)=>{
            state.loading = false
            state.students = action.payload
          },
          getStudentFail:(state,action)=>{
            state.loading = false
            state.error = action.payload
          },
          addTeacherStart:(state)=>{
            state.loading = true
          },
          addTeacherSuccess:(state,action)=>{
           state.loading = false,
           state.messages = action.payload.message
          },
          addTeacherFail:(state,action)=>{
            state.loading = false
            state.error = action.payload            
          },
          addStudentStart:(state)=>{
            state.loading = true
          },
          addStudentSuccess:(state,action)=>{
           state.loading = false,
           state.messages = action.payload.message
          },
          addStudentFail:(state,action)=>{
            state.loading = false
            state.error = action.payload            
          },
          updateStudentStart:(state,action)=>{
             state.loading = true
          },
          updateStudentSuccess:(state,action)=>{
             state.loading = false
             state.messages = action.payload.message
          },
          updateStudentFail:(state,action)=>{
             state.loading = false
             state.error = action.payload
          },
          updateTeacherStart:(state,action)=>{
             state.loading = true
          },
          updateTeacherSuccess:(state,action)=>{
             state.loading = false
             state.messages = action.payload.message
          },
          updateTeacherFail:(state,action)=>{
             state.loading = false
             state.error = action.payload
          },
          

    }

})


export const { createClassStart, createClassFail, createClassSuccess, getClassesFail, getClassesSuccess, getClassesStart, getTeacherFail, getTeacherStart, getTeacherSuccess, getStudentFail, getStudentStart, getStudentSuccess, addTeacherFail, addTeacherStart, addTeacherSuccess, addStudentFail, addStudentSuccess, addStudentStart, updateStudentFail, updateStudentStart, updateStudentSuccess, updateTeacherFail, updateTeacherSuccess, updateTeacherStart } = principalSlice.actions

export default principalSlice.reducer