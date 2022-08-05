import axios from "axios"

export const apiServer = "http://localhost:3000"

export function api(){
    return axios.create({
        baseURL: apiServer
    })
}
