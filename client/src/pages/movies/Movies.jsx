
import React from "react"
import {useSelector, useDispatch} from "react-redux"

import {setMovies, changePageAction} from "src/store/slices/appSlice"
import { fetchMovies } from 'src/store/actions/appActions'
import Movie from "src/components/Movie"
import Pagination from "src/components/Pagination"
import { api } from 'src/api';

const Movies = (props)=> {

    const {movies, pagination, totalMovies} = useSelector(state=>state.app)

    const dispatch = useDispatch();

    React.useEffect(()=>{
      
      // (!movies || movies.length === 0) && fetchMovies((data)=>{
      //   dispatch(setMovies(data.movies))
      // })
      
      if(!totalMovies){
        api.get("/api/total-movies").then(response=>{
          
        })
      }
      // (!totalMovies && fetchMovies((data)=>{
      //   dispatch(setMovies(data.movies))
      // })
 
    }, [])

    function handleChangePage(pageNumber){
      dispatch(changePageAction(pageNumber))
    }

  
    return (
      <div>
        <div className="my_container">
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5 gap-4">
              {/* {movies && movies.slice((pagination.currentPage - 1), pagination.perPageView * pagination.currentPage).map(movie=>(
                  <Movie key={movie._id} movie={movie} />
              )) } */}
            </div>


            {/* pagination  */}
            <div className="flex justify-center mt-20">
                <Pagination 
                  total={totalMovies} 
                  perPageView={pagination.perPageView} 
                  currentPage={pagination.currentPage} 
                  onPageChange={handleChangePage} 
                />
            </div>

          </div>    
      </div>
    )
  }

  export default Movies