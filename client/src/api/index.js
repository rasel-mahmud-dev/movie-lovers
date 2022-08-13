import axios from "axios"


const isDev = import.meta.env.MODE === "development"

export const apiServer = isDev ? "http://192.168.204.163:1000" : "https://movie-lovers-api.vercel.app"

export const api = axios.create({
    baseURL: apiServer
})


export function getApi(){
    let token =  localStorage.getItem("token")
    api.defaults.headers["authorization"] = token;
    return api
}