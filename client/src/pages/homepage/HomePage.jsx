import React from "react"
import {  useSelector, useDispatch } from 'react-redux'
import {setSectionMovies} from "src/store/slices/appSlice"
import { api } from 'src/api';

import Movie from "src/components/Movie"
import PageSkeleton from "./PageSkeleton";
import scrollTo from "../../utils/scrollTo.js";


const HomePage = ()=> {

    const {sectionMovies} = useSelector(state=>state.app)
    const  dispatch = useDispatch()
  
    React.useEffect(()=>{
        if(!sectionMovies){
            api.get("/api/home-section-movies").then(res=> {
                dispatch(setSectionMovies(res.data.data))
                scrollTo(0)
            })
            .catch(ex=>{
                console.log(ex);
            })
        }

        scrollTo(0)

    }, [])


    return (
      <div>

          {(!sectionMovies || Object.keys(sectionMovies).length === 0) && <PageSkeleton/> }

          <div className="my_container my-4">
            { sectionMovies && Object.keys(sectionMovies).map((section, i)=>(

                <div className="mt-10" key={i}>
                    <h2 className="text-xl md:text-3xl text-gray-100 font-medium mt-5 md:mt-10 mb-4 pb-1 md:pb-4 border-b
                    border-gray-100/20">{section}</h2>

                    <div className="movie_list gap-3">
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