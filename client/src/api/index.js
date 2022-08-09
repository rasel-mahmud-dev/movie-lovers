import axios from "axios"


const isDev = import.meta.env.MODE === "development"

export const apiServer = isDev ? "http://localhost:1000" : "https://netlflx-api-20.vercel.app"

export const api = axios.create({
    baseURL: apiServer
})


export function getApi(){
    let token =  localStorage.getItem("token")
    api.defaults.headers["authorization"] = token;
    return api
}