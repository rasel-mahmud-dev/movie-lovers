import { api } from "../../api"

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
