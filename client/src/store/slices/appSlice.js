import { createSlice } from '@reduxjs/toolkit'


const movies = [
    { 
        title: "The Lost Grils",
        quality: "HD",
        genre: "Romance",
        
    }
]


const initialState = {
  movies: [],
  categories: [],
  modal: "" // login, registration, ""
}

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMovies(state, action){
        state.movies = action.payload;
    },
    
    toggleModal(state, action){
        state.modal = action.payload; 
    },
  },
 
})

// Action creators are generated for each case reducer function
export const { setMovies, toggleModal } = counterSlice.actions

export default counterSlice.reducer