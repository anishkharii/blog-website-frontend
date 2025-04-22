import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialState = {
    user:{
        role:"",
        email:"",
        fname:"",
        lname:"",
        image:"",
    },
    isAuthenticated:false,
    isAuthLoading:false,
    otpRequired:false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user.role = action.payload.user.role;
            state.user.email = action.payload.user.email;
            state.user.fname = action.payload.user.fname;
            state.user.lname = action.payload.user.lname;
            state.user.image = action.payload.user.image;
            state.isAuthenticated = true;
            state.isAuthLoading = false;
        },
        updateUser:(state, action)=>{
            state.user.fname = action.payload.fname;
            state.user.lname = action.payload.lname;
            state.user.image = action.payload.image;
        },
        removeUser:(state)=>{
            state.user = {
                role:"",
                email:"",
                fname:"",
                lname:"",
                image:"",
            };
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("id");
        },
        setOtpRequired:(state, action)=>{
            state.otpRequired = action.payload;
        },
        setIsAuthLoading:(state, action)=>{
            state.isAuthLoading = action.payload;
        }
    }
});


export const {   setUser, updateUser, removeUser, setOtpRequired, setIsAuthLoading} = authSlice.actions;
export default authSlice.reducer;