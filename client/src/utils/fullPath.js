import {apiServer} from "src/api"

function fullPath(path){

    if(path && path.startsWith("http")){
        return path;
    }
    return apiServer + "/" + path;
}

export default fullPath;