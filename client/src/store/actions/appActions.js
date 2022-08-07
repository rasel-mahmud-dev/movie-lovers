import { api } from "../../api"


export function fetchMovies(payload, cb){

    const { currentPage, perPageView, searchValue, filter } = payload
    
    /******* Fetch all genres ********/
    api.post("/api/movies", {
        pageNumber: currentPage, 
        perPageView: perPageView, 
        text: searchValue,
        filter: filter,
    })
    .then(response=>{
        if(response.status === 200){
            cb({[currentPage]: response.data.movies});
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



export function fetchLanguages(cb){

    /******* Fetch all languages ********/
    api.get("/api/languages").then(response=>{
        if(response.status === 200){
            cb(response.data)
        }
    })    
}




export function fetchQualities(cb){

    /******* Fetch all qualities ********/
    api.get("/api/qualities").then(response=>{
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



