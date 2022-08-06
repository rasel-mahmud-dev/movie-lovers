import React from "react"

import {  useSelector, useDispatch } from 'react-redux'
import fullPath from 'src/utils/fullPath'
import { Link } from "react-router-dom"
import { api } from 'src/api';

import {setSeriesMovies} from "src/store/slices/appSlice"


const Series = ()=> {

    const {movies, seriesMovies, sectionMovies} = useSelector(state=>state.app)
    const  dispatch = useDispatch()
  
    React.useEffect(()=>{

        api.get("/api/series-movies").then(res=>{
        
            dispatch(setSeriesMovies(res.data.movies))
        })
        .catch(ex=>{
            console.log(ex);
        })

    }, [])



    console.log(seriesMovies);



    return (
      <div>
        
   
          <div className="my_container">


                    <h2 className="text-5xl text-center text-gray-100 font-medium mt-4 mb-4 pb-4 ">Series</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:md:grid-cols-6 gap-4">
                    {seriesMovies && seriesMovies.map(movie=>(
                    <Link to={`/movie/${movie._id}`}>
                        <div class="card">
                        <img className="rounded-xl" src={fullPath(movie.cover)} alt="car!" />
                        </div>
                        </Link>
                    )) }
                    </div>

                </div>

 
      </div>
    )
  }
  
  export default Series