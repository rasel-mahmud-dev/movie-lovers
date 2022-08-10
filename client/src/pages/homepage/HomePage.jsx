import React from "react"
import HeroCarousel from "src/components/HeroCarousel"
import {  useSelector, useDispatch } from 'react-redux'
import {setSectionMovies} from "src/store/slices/appSlice"
import { api } from 'src/api';

import Movie from "src/components/Movie"


const HomePage = ()=> {

    const {sectionMovies} = useSelector(state=>state.app)
    const  dispatch = useDispatch()
  
    React.useEffect(()=>{

        if(!sectionMovies){
            api.get("/api/home-section-movies").then(res=>{
                dispatch(setSectionMovies(res.data.data))
            })
            .catch(ex=>{
                console.log(ex);
            })
        }

    }, [])

    return (
      <div>
         <HeroCarousel />
   
          <div className="my_container my-4">


            { sectionMovies && Object.keys(sectionMovies).map((section, i)=>(

                <div className="mt-10" key={i}>
                    <h2 className="text-3xl text-gray-100 font-medium mt-10 mb-4 pb-4 border-b 
                    border-gray-100/20">{section}</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:md:grid-cols-6 gap-4">
                    {sectionMovies[section] && sectionMovies[section].map(movie=>(
                        <Movie movie={movie} key={movie._id} />
                    )) }
                    </div>

                </div>

            ))}
        </div>
      </div>
    )
  }
  
  export default HomePage