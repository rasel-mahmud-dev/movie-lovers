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
  movie: null,
  sectionMovies: {},
  seriesMovies: [],
  categories: [],
  modal: "", // login, registration, "",
  genres: [], // {name: string, _id: string }[]
  languages: [], // {name: string, _id: string }[]
  qualities: [] // {name: string, _id: string }[]
}

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMovies(state, action){
        state.movies = action.payload;
    },
    setMovie(state, action){
        state.movie = action.payload;
    },

  
    
    setGenres(state, action){
        state.genres = action.payload;
    },
    setSeriesMovies(state, action){
        state.seriesMovies = action.payload;
    },
    
    setSectionMovies(state, action){
        state.sectionMovies = action.payload;
    },
    
    setLanguages(state, action){
        state.languages = action.payload;
    },
    setQualities(state, action){
        state.qualities = action.payload;
    },
    
    toggleModal(state, action){
        state.modal = action.payload; 
    },
  },
 
})

// Action creators are generated for each case reducer function
export const { setMovies, setMovie, setGenres, setSeriesMovies, setSectionMovies, setLanguages, setQualities, toggleModal } = counterSlice.actions

export default counterSlice.reducer