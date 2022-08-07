import { api } from "../../api"


export function fetchFavoriteMovies(profileId, cb){
    /******* Fetch all qualities ********/
    api.get("/api/user/favorite-movies/" + profileId).then(response=>{
       if(response.status === 200){
           cb(response.data.user)
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