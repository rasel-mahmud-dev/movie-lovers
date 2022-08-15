import React, {useEffect, useState} from 'react';
import {getApi} from "../../api/index.js";
import {useSelector} from "react-redux";

const AllRequestMovie = () => {

    const {auth} = useSelector(state=>state)

    const [state, setState] = useState(null)

    useEffect(()=>{
        if(auth.auth && auth.auth.role === "admin") {
            getApi().get("/api/all-request-movie").then(response => {
                if(response.status === 200){
                    setState(response.data.allRequestedMovie)
                }
            }).catch(ex => {

            })
        }
    }, [auth])

    return (
        <div>
            <h1 className="font-bold text-3xl text-gray-200 text-center mb-6 uppercase">All Requested Movies</h1>
            { auth.auth && auth.auth.role === "admin" ? (
                <div className="flex flex-wrap">
                    {state && state.length && state.map(item=>(
                        <div className="bg-neutral px-6 py-2 rounded">
                            <h2 className="text-gray-200 font-medium">{item.movieName}</h2>
                            <p>{item.email}</p>
                            <p>{item.message}</p>

                            <p>{new Date(item.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-w-sm bg-dark-700 mx-auto max-h-48 p-5 rounded-md">
                    <h1 className="text-center text-red-500 text-xl md:text-2xl ">This page for Admin User</h1>
                </div>
            ) }

        </div>
    );
};

export default AllRequestMovie;