import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api, getApi } from '../../api';

import {toggleModal} from "../slices/appSlice"

const initialState = {
    verify: false,
    authFetched: false,
    auth: null,  // {}
    authProfile: null, // {}
    favorites: null // []
}

// First, create the thunk
export const registrationAction = createAsyncThunk(
    'auth/registration',
    async function(userData, thunkAPI){
      try{
        let res = await api.post( "/api/registration", userData)
        thunkAPI.dispatch(toggleModal("get_otp_modal"))
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
        let res = await api.post("/api/login", userData)
        if(res.status === 201){
          if(!res.data.auth.verify){
            return thunkAPI.dispatch(toggleModal("get_otp_modal"))
          } else{
            thunkAPI.dispatch(toggleModal(""))
          }
        }
        return {status: res.status, data: res.data}
      } catch(ex){
        thunkAPI.rejectWithValue("somethig were wrong")
      }
    }
  )
  

  export const loginWithTokenAction = createAsyncThunk(
    'auth/loginWithToken',
    async function(_, thunkAPI){
      try{
        let res = await getApi().post("/api/auth/login-token")
        if(res.status === 201){
          if(!res.data.auth.verify){
            thunkAPI.dispatch(toggleModal("get_otp_modal"))
            return { status: 403, data: res.data}
          } else{
            return { status: res.status, data: res.data}
          }
        }

      } catch(ex){
        console.log(ex);
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

    setAuthProfile(state, action){
      state.authProfile = action.payload;
      state.auth =  {
        ...state.auth,
        ...action.payload 
      };
    },

    setAuth(state, action){
      state.authFetched = true
      localStorage.setItem("token", action.payload.token)
      state.auth = action.payload.auth;
      state.authProfile = action.payload.auth;
    },
    
    setFavoritesMovies(state, action){
      state.favorites = action.payload
    },
    
    addToFavorite(state, action){
      state.favorites = [...state.favorites, action.payload]
    },

    removeFromFavorite(state, action){
      state.favorites = state.favorites.filter(f=>f._id !== action.payload)
    },
    
    logOutAction(state, payload){
      localStorage.removeItem("token")
      state.auth = null;
      state.authProfile = null;
      state.authFetched = true
    }
  },
  
  extraReducers: {

  // extraReducers: function(builder){  
    
    // builder.addCase(loginAction.fulfilled, (state, action) => {
    //   const {data, status} = action.payload
    //   if(status === 201){
    //     localStorage.setItem("token", data.token)
    //     return {
    //       ...state,
    //       auth: data.auth
    //     }
    //   }
    // });
    // builder.addCase(loginWithTokenAction.fulfilled, (state, action) => {
    //   const {data, status} = action.payload
    //   return {
    //       ...state,
    //       auth: data.auth
    //     }
    // });
  // }
    

    [loginAction.fulfilled]: (state, {payload})=>{
      const {data, status} = payload
      if(status === 201){
        localStorage.setItem("token", data.token)
        return {
          ...state,
          auth: data.auth
        }
      }
    },
  
    [loginWithTokenAction.fulfilled]: (state, {payload})=>{
      
      const {data, status} = payload
      if(status === 306){
        return {
          ...state,
          verify: true,
          auth: data.auth
        }
      }  else if(status === 403){
        return {
          ...state,
          verify: false,
          authProfile: data.auth
        }
      } else {
        return {
          ...state,
          verify: true,
          auth: data.auth
        }
      }
    }
  }
})


// Action creators are generated for each case reducer function
export const { 
  logOutAction, 
  setAuthProfile,
  setFavoritesMovies,
  addToFavorite,
  removeFromFavorite,
  setAuth,
} = counterSlice.actions

export default counterSlice.reducer