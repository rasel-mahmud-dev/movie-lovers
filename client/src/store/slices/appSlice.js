import {createSlice} from '@reduxjs/toolkit'


const movies = [
    {
        title: "The Lost Grils",
        quality: "HD",
        genre: "Romance",

    }
]


const initialState = {
    movies: null,  // {1: Movie[], 2: Movie[], 3: Movie[]} // // for caching
    movieCache: {}, // { [id: string]: { detail: {}, similarMovies: [] } }
    allMovies: null, // []
    sectionMovies: null, // {}
    seriesMovies: [],
    categories: [],
    modal: "", // login, registration, "",
    genres: [], // {name: string, _id: string }[]
    languages: [], // {name: string, _id: string }[]
    qualities: [], // {name: string, _id: string }[]
    searchValue: "",
    pagination: {
        currentPage: 1,
        perPageView: 10,
    },
    totalMovies: 0,
    filter: {
        genres: [],     // {_id: string, name: string}[]
        language: [],   // {_id: string, name: string}[]
        quality: [],    // {_id: string, name: string}[]
    }
}

export const counterSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {

        setMovies(state, action) {
            state.movies = action.payload;
        },

        setAllMovie(state, action) {
            state.allMovies = action.payload;
        },

        setPaginatedMovie(state, action) {
            state.movies = {
                ...state.movies,
                ...action.payload
            }
        },

        setMovieCache(state, action) {
            // payload = {_id: string, detail: Movie}
            const {_id, detail} = action.payload
            state.movieCache = {
                ...state.movieCache,
                [_id]: {
                    detail: detail,
                    similarMovies: null
                }
            }
        },

        setSimilarMovieCache(state, action) {
            // payload = {_id: string, similarMovies: Movie[]}
            const {_id, similarMovies} = action.payload
            state.movieCache = {
                ...state.movieCache,
                [_id]: {
                    ...state.movieCache[_id],
                    similarMovies: similarMovies.filter(item => item._id !== _id)
                }
            }
        },


        //  change pagination...
        changePageAction(state, action) {
            const {pageNumber, paginatedMovie} = action.payload

            state.pagination = {
                ...state.pagination,
                currentPage: pageNumber
            };

            // for caching
            if (paginatedMovie) {
                state.movies = {
                    ...state.movies,
                    ...paginatedMovie
                }
            }
        },

        //  change filter...
        setFilterMovies(state, action) {
            const {currentPage, paginatedMovie, filter, totalMovies} = action.payload

            if (totalMovies !== null) {
                state.totalMovies = totalMovies
            }

            if (filter) {
                state.filter = filter
            }

            if (currentPage !== null) {
                state.pagination = {
                    ...state.pagination,
                    currentPage: currentPage
                };
            }

            // for caching
            if (paginatedMovie) {
                state.movies = {
                    ...state.movies,
                    ...paginatedMovie
                }
            }
        },

        setGenres(state, action) {
            state.genres = action.payload;
        },

        setAddGenre(state, action) {
            state.genres = [...state.genres, action.payload]
        },

        setSeriesMovies(state, action) {
            state.seriesMovies = action.payload;
        },

        setSectionMovies(state, action) {
            state.sectionMovies = action.payload;
        },

        setLanguages(state, action){
            state.languages = action.payload;
        },

        setAddLanguage(state, action){
            state.languages = [...state.languages, action.payload];
        },

        setQualities(state, action){
            state.qualities = action.payload;
        },

        setAddQuality(state, action){
            state.qualities = [...state.qualities, ...action.payload]
        },


        toggleModal(state, action) {
            state.modal = action.payload;
        },

        setSearchValue(state, action) {
            state.searchValue = action.payload
        },

        setResetSearch(state, action) {
            const {paginatedMovie, updateFilter} = action.payload;
            state.searchValue = ""
            state.movies = paginatedMovie
            state.pagination.currentPage = 1
            if (updateFilter) {
                state.filter = updateFilter
            }
        },

        setFilter(state, action) {
            state.filter = action.payload
        }

    },

})


// Action creators are generated for each case reducer function
export const {
    setMovies,
    setMovieCache,
    setGenres,
    changePageAction,
    setSeriesMovies,
    setSectionMovies,
    setLanguages,
    setQualities,
    setTotalMovie,
    toggleModal,
    setSimilarMovieCache,
    setPaginatedMovie,
    setSearchValue,
    setResetSearch,
    setFilter,
    setAllMovie,
    setFilterMovies,
    setAddLanguage,
    setAddGenre,
    setAddQuality
} = counterSlice.actions

export default counterSlice.reducer