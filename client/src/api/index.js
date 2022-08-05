import axios from "axios"

export const apiServer = "http://localhost:3000"

export const api = axios.create({
    baseURL: apiServer
})


export function getApi(){
    let token =  localStorage.getItem("token")
    api.defaults.headers["authorization"] = token;
    return api
}