
import React from "react"
import {useSelector, useDispatch} from "react-redux"

import {setMovies, setPaginatedMovie, setTotalMovie, changePageAction} from "src/store/slices/appSlice"
import { fetchMovies } from 'src/store/actions/appActions'
import Movie from "src/components/Movie"
import Pagination from "src/components/Pagination"
import { api } from 'src/api';

const Movies = (props)=> {

    const {movies, pagination, totalMovie} = useSelector(state=>state.app)


    const dispatch = useDispatch();

    React.useEffect(()=>{
      
      {!movies && (
      
        fetchMovies(pagination.currentPage, pagination.perPageView, (paginatedMovie)=>{
          dispatch(setMovies(paginatedMovie))
        }) 
      
      )}
      
      if(!totalMovie){
        api.get("/api/total-movie").then(response=>{
          if(response.status === 200){
            dispatch(setTotalMovie(response.data.total))
          }
        })
      }
 
    }, [])

    function handleChangePage(pageNumber){
      // use caching data if already this page are fetched.
      if(movies[pageNumber] && movies[pageNumber].length !== 0){
        dispatch(changePageAction({pageNumber, paginatedMovie: null}))
      } else {

        // no cache. so send request into server 
        fetchMovies(pageNumber, pagination.perPageView, (paginatedMovie)=>{
          dispatch(changePageAction({pageNumber, paginatedMovie}))
        }) 
      }
    }
  
    return (
      <div>
        <div className="my_container">
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5 gap-4">
              {/* {movies && movies.slice((pagination.currentPage - 1), pagination.perPageView * pagination.currentPage).map(movie=>(
                  <Movie key={movie._id} movie={movie} />
              )) } */}

              { movies && movies[pagination.currentPage] && movies[pagination.currentPage].map(movie=>(
                <Movie movie={movie} key={movie._id} />
              ))}


            </div>


            {/* pagination  */}
            <div className="flex justify-center mt-20">
                <Pagination 
                  total={totalMovie} 
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