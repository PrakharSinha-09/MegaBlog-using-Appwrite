//this authSlice will track if the user is logged in/authenticated or not, each time we will ask our store.
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,                   //initially user isn't authenticated, so status is kept false initially!
    userData:null                   //so, userData also null.
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true                           //obviously, if somebody logs in, status will change to true right.
            state.userData=action.payload.userData      //and since logged in we have to update the user data as well.
        },

        logout:(state,action)=>{
            state.status=false
            state.userData=null
        }
    }
})

export const {login,logout}=authSlice.actions
export default authSlice.reducer