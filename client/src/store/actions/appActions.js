import {api, getApi} from "../../api"


export function fetchMovies(payload, cb){

    const { currentPage, perPageView, searchValue, filter } = payload

    let filterPayload = {};
    if(filter){
        for(let itemKey in filter){
            if(filter[itemKey] && filter[itemKey].length){
                filterPayload[itemKey] = filter[itemKey].map(item => item._id)
            }
        }
    }

    /******* Fetch all movies ********/
    api.post("/api/movies", {
        pageNumber: currentPage, 
        perPageView: perPageView, 
        text: searchValue,
        filter: filterPayload,
    })
    .then(response=>{
        if(response.status === 200){
            cb({[currentPage]: response.data.movies}, response.data.totalMovies);
        }
    })    
}


export function fetchGenres(cb){
    
    /******* Fetch all genres ********/
    api.get("/api/genres").then(response=>{
        if(response.status === 200){
            cb(response.data)
        }
      })    
}


export function fetchMovieDetails(movieId, cb){
 /******* Fetch all qualities ********/
 api.get("/api/movie-details/" + movieId).then(response=>{
    if(response.status === 200){
        cb(response.data.movie)
    }
  })    
}


export function fetchSimilarMovies(movie, cb){
    getApi().post("/api/similar-movies", {
        pageNumber: 1,
        perPageView: 10,
        or: {
            genres: movie.genres._id,
            language: movie.language._id,
            title: movie.title,
            tags: movie.tags
        },
    }).then(response=>{
        if(response.status === 200) {
            cb(response.data)
        }
    }).catch(ex=>{
        // console.log(ex)
    })
}


