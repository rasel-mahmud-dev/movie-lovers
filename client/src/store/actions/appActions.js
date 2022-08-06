import { api } from "../../api"

export function fetchMovies(cb){
    
    /******* Fetch all genres ********/
    api.get("/api/movies").then(response=>{
        if(response.status === 200){
            cb(response.data)
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



export function fetchAuthProfile(profileId, cb){
 /******* Fetch all qualities ********/
 api.get("/api/user/" + profileId).then(response=>{
    if(response.status === 200){
        cb(response.data.user)
    }
  })    
}