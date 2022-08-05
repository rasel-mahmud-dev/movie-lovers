
import React from "react"
import {useSelector} from "react-redux"
import fullPath from "../../utils/fullPath"
import { Link } from "react-router-dom"

const Movies = ()=> {

    const {movies} = useSelector(state=>state.app)
  
    return (
      <div>
        <div className="my_container">
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5 gap-4">
              {movies && movies.map(movie=>(
                <div>
                <div class="card">
                  <figure><img className="rounded-xl" src={fullPath(movie.cover)} alt="car!" /></figure>
                  <div class="card-body">
                    <h2 class="card-title">{movie.title}</h2>
                    <p>{movie.summary.slice(0, 50)}</p>
                    <div class="card-actions justify-center">
                      <button class="btn btn-primary">
                          <Link to={`/movie/${movie._id}`}>Watch Now</Link>
                      </button>
                    </div>
                  </div>
                </div>
                </div>
              )) }
            </div>
          </div>
    
    
      </div>
    )
  
  }

  export default Movies