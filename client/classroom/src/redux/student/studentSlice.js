import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    classMates:[],
    timeTables:[],
    loading:false,
    error:null,
    messages:null
}


const studentSlice = createSlice({
    name:'student',
    initialState,
    reducers:{
        getClassmatesStart:(state,action)=>{
         state.loading = true
        },
        getClassmatesSuccess:(state,action)=>{
         state.loading = false
         state.classMates = action.payload
        },
        getClassmatesFail:(state,action)=>{
         state.loading = false
         state.error = action.payload
        },
        getTimeTableStart:(state,action)=>{
          state.loading = true
        },
        getTimeTableSuccess:(state,action)=>{
         state.loading = false
         state.timeTables = action.payload
        },
        getTimeTableFail:(state,action)=>{
         state.loading = false
         state.error = action.payload
        },
    }
})


export const { getClassmatesFail, getClassmatesStart, getClassmatesSuccess, getTimeTableFail, getTimeTableStart, getTimeTableSuccess } = studentSlice.actions


export default studentSlice.reducer


