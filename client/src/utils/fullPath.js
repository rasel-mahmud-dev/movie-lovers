import {apiServer} from "src/api"

function fullPath(path){
    return apiServer + "/" + path;
}

export default fullPath;