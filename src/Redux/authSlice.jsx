import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{
        role:"",
        email:"",
        fname:"",
        lname:"",
    },
    isAuthenticated:false
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        removeUser:(state)=>{
            state.user = {
                role:"",
                email:"",
                fname:"",
                lname:"",
            };
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("id");
        }
    }
});


export const {   setUser, removeUser} = authSlice.actions;
export default authSlice.reducer;