import { api } from "../../api"


export function toggleFavoriteMovie(movieId, cb){
  /******* Toggle Favorite Movie ********/
  api.post("/api/user/toggle-favorite", {movieId}).then(response=>{
      if(response.status === 201){
          cb(response.data)
      }
    })    
  }


export function fetchFavoriteMovies(profileId, cb){
  /******* Fetch all Favorite Movieities ********/
  api.get("/api/user/favorite-movies/" + profileId).then(response=>{
      if(response.status === 200){        
        if(response.data.favorites){
          let fv = response.data.favorites.map(fv=>{
            return fv.movieId
          })
          cb(fv)
        }
      }
    })    
  }


export function fetchAuthProfile(profileId, cb){
  /******* Fetch Auth Profile ********/
  api.get("/api/user/" + profileId).then(response=>{
      if(response.status === 200){
          cb(response.data.user)
      }
    })    
  }
