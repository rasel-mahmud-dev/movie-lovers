import React from "react"

import {  useSelector, useDispatch } from 'react-redux'
import { api } from 'src/api';

import Movie from "src/components/Movie"
import {setSeriesMovies} from "src/store/slices/appSlice"


const Series = ()=> {

    const { seriesMovies } = useSelector(state=>state.app)
    const  dispatch = useDispatch()
  
    React.useEffect(()=>{
        if(!seriesMovies || seriesMovies.length === 0){
            api.get("/api/series-movies").then(res=>{
                dispatch(setSeriesMovies(res.data.movies))
            })
            .catch(ex=>{
                console.log(ex);
            })
        }
    }, [])


    return (
      <div>   
          <div className="my_container">


                    <h2 className="text-2xl md:text-5xl text-center text-gray-100 font-medium mt-4 mb-4 pb-4 ">Series</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:md:grid-cols-6 gap-4">
                        {seriesMovies && seriesMovies.map(movie=><Movie key={movie._id} movie={movie} /> )}
                    </div>

                </div>

 
      </div>
    )
  }
  
  export default Series