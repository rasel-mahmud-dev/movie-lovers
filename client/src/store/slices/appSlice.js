import { createSlice } from '@reduxjs/toolkit'


const movies = [
    { 
        title: "The Lost Grils",
        quality: "HD",
        genre: "Romance",
        
    }
]


const initialState = {
  movies: null,  // {1: Movie[], 2: Movie[], 3: Movie[]} // // for caching
  movie: null,
  sectionMovies: {},
  seriesMovies: [],
  categories: [],
  modal: "", // login, registration, "",
  genres: [], // {name: string, _id: string }[]
  languages: [], // {name: string, _id: string }[]
  qualities: [], // {name: string, _id: string }[]

  pagination: {
    currentPage: 1,
    perPageView: 20,
  },
  totalMovie: 0
}

export const counterSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {

    setTotalMovie(state, action){
        state.totalMovie = action.payload
    },

    setMovies(state, action){
        state.movies = action.payload;
    },
    
    setPaginatedMovie(state, action){
        state.movies = {
            ...state.movies,
            ...action.payload
        }
    },




    setMovie(state, action){
        state.movie = action.payload;
    },

    changePageAction(state, action){

        const {pageNumber, paginatedMovie} = action.payload

        state.pagination = {
            ...state.pagination,
            currentPage: pageNumber
        };

        // for caching
        if(paginatedMovie){
            state.movies = {
                ...state.movies,
                ...paginatedMovie
            }
        }
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
export const { 
        setMovies, 
        setMovie, 
        setGenres, 
        changePageAction, 
        setSeriesMovies, 
        setSectionMovies, 
        setLanguages, 
        setQualities,
        setTotalMovie,
        toggleModal,
        setPaginatedMovie
    } = counterSlice.actions

export default counterSlice.reducer