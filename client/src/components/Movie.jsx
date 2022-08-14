import React from 'react'
import fullPath from "src/utils/fullPath"
import { Link } from "react-router-dom"

export default function Movie({ movie }) {
    return (
        <Link to={`/movie/${movie._id}`}>
            <div className="relative">
                <div className="movie_card">
                    <img className="movie_thumb" src={fullPath(movie.cover)} alt="car!" />
                    <div className="p-2">
                        <h1 className="text-sm md:text-base  text-white">{movie.title}</h1>
                    </div>
                </div>
                </div>

        </Link>
    )
}
