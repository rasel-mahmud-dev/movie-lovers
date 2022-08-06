import React from "react"
import HeroCarousel from "src/components/HeroCarousel"

import {  useSelector, useDispatch } from 'react-redux'

import {setSectionMovies} from "src/store/slices/appSlice"
import fullPath from 'src/utils/fullPath'
import { Link } from "react-router-dom"
import { api } from 'src/api';


const HomePage = ()=> {

    const {movies, sectionMovies} = useSelector(state=>state.app)
    const  dispatch = useDispatch()
  
    React.useEffect(()=>{

        api.get("/api/home-section-movies").then(res=>{
            dispatch(setSectionMovies(res.data.data))
        })
        .catch(ex=>{
            console.log(ex);
        })

    }, [])

    console.log(sectionMovies);


    return (
      <div>
         <HeroCarousel />
   
          <div className="my_container">


            { Object.keys(sectionMovies).map(section=>(

                <div className="mt-10">
                    <h2 className="text-3xl text-gray-100 font-medium mt-10 mb-4 pb-4 border-b 
                    border-gray-100/20">{section}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:md:grid-cols-6 gap-4">
                    {sectionMovies[section] && sectionMovies[section].map(movie=>(
                    <Link to={`/movie/${movie._id}`}>
                        <div class="card">
                        <img className="rounded-xl" src={fullPath(movie.cover)} alt="car!" />
                        </div>
                        </Link>
                    )) }
                    </div>

                </div>

            ))}
        </div>
      </div>
    )
  }
  
  export default HomePage