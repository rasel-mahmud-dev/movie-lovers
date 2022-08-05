import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api';

import appSlice, {toggleModal} from "../slices/appSlice"

const initialState = {
    verify: false,
    auth: null
    
}

// First, create the thunk
export const registration = createAsyncThunk(
    'auth/registration',
    async function(userData, thunkAPI){
      try{
        let res = await api().post( "/api/registration", userData)

        thunkAPI.dispatch(toggleModal("verify_modal"))

        return {status: res.status, data: res.data}
      } catch(ex){
        thunkAPI.rejectWithValue("somethig were wrong")
      }
    }
  )

// First, create the thunk
export const loginAction = createAsyncThunk(
    'auth/login',
    async function(userData, thunkAPI){
      try{
        let res = await api().post( "/api/login", userData)
        if(res.status === 201){
          thunkAPI.dispatch(toggleModal(""))
        }
        return {status: res.status, data: res.data}
      } catch(ex){
        thunkAPI.rejectWithValue("somethig were wrong")
      }
    }
    
    // api().post( "/api/registration", action.payload)
    // .then((response=>{
    //     if(response.status === 206){
    //         alert("ASD")
    //         state.verify = true;
    //         state.auth = action.payload
    //     }
    // }))
  )
  

  export const loginWithTokenAction = createAsyncThunk(
    'auth/login',
    async function(userData, thunkAPI){
      try{
        let res = await api().post("/api/login-token", {
          headers: {
            authorization: token
          }
        })
        console.log(res);
        if(res.status === 201){
          // thunkAPI.dispatch(toggleModal(""))
        }
        return {status: res.status, data: res.data}
      } catch(ex){
        thunkAPI.rejectWithValue("somethig were wrong")
      }
    }
    
    // api().post( "/api/registration", action.payload)
    // .then((response=>{
    //     if(response.status === 206){
    //         alert("ASD")
    //         state.verify = true;
    //         state.auth = action.payload
    //     }
    // }))
  )
  


export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  
  extraReducers: function(builder){  
    builder.addCase(loginAction.fulfilled, (state, action) => {
      
      const {data, status} = action.payload
      if(status === 201){
        localStorage.setItem("token", data.token)
        return {
          ...state,
          auth: data.auth
        }
      }
    });


    // [registration.pending]: (state)=>{
    // },
    // [registration.fulfilled]: (state, {payload})=>{
    //   const {data, status} = payload
    //   if(status === 206){
    //     return {
    //       ...state,
    //       verify: true,
    //       auth: data.auth
    //     }
    //   }
    // },

    // [login.pending]: (state)=>{
    //   console.log("pending");
    // },

    // [login.fulfilled]: (state, response)=>{
    //   const {data, status} = response
    //   if(status === 306){
    //     return {
    //       ...state,
    //       verify: true,
    //       auth: data.auth
    //     }
    //   }
    // }
  }
})


// Action creators are generated for each case reducer function
// export const {  } = counterSlice.actions

export default counterSlice.reducer