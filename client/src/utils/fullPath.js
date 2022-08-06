import {apiServer} from "src/api"


function fullPath(path){

    

    if(path && path.startsWith("http")){
        if(import.meta.env.DEV){
            let i = path.indexOf("images");
            return apiServer  + "/" + path.slice(i)
        }
        return path;
    }
    return apiServer + "/" + path;
}

export default fullPath;