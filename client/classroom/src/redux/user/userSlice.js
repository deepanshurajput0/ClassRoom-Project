import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: false,
    messages: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.messages = action.payload.message;
        },
        signUpFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload.message;
        },
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.messages = action.payload.message;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload.message;
        },
        loadUserStart:(state,action)=>{
            state.loading = true
         },
         loadUserSuccess:(state,action)=>{
            state.loading = false
            state.isAuthenticated = true,
            state.user = action.payload
         },
         loadUserFail:(state,action)=>{
            state.loading = false
            state.isAuthenticated = false,
            state.error = action.payload.message
         },
         logoutStart:(state,action)=>{
            state.loading = true
           },
           logoutSuccess:(state,action)=>{
            state.loading = false
            state.isAuthenticated = false,
            state.user = null
            state.messages = action.payload.message;
           },
           logoutFail:(state,action)=>{
            state.loading = false
            state.isAuthenticated = false
            state.error = action.payload.message
           }
    }
});

export const {
    signUpStart,
    signUpSuccess,
    signUpFail,
    loginStart,
    loginSuccess,
    loginFail,
    logout,
    loadUserFail,
    loadUserStart,
    loadUserSuccess,
    logoutStart,
    logoutSuccess,
    logoutFail
} = userSlice.actions;

export default userSlice.reducer;
