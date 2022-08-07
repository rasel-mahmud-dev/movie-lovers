
import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { setMovies, setFilter, setPaginatedMovie, setLanguages, setQualities, setResetSearch, setTotalMovie, changePageAction } from "src/store/slices/appSlice"

import { fetchMovies, fetchQualities, fetchLanguages } from 'src/store/actions/appActions'

import Movie from "src/components/Movie"
import Pagination from "src/components/Pagination"
import { api } from 'src/api';

import { FaTimes } from 'react-icons/fa'
import { FaFilter } from 'react-icons/fa'


const Movies = (props) => {

  const { movies, searchValue, genres, qualities, languages, filter, pagination, totalMovie } = useSelector(state => state.app)

  const dispatch = useDispatch();

  React.useEffect(() => {

    {
      !movies && (

        fetchMovies({
          currentPage: pagination.currentPage, 
          perPageView:pagination.perPageView, 
          searchValue, 
          filter: null
        }, (paginatedMovie) => {
          dispatch(setMovies(paginatedMovie))
        })

      )
    }

    if (!totalMovie) {
      api.get("/api/total-movie").then(response => {
        if (response.status === 200) {
          dispatch(setTotalMovie(response.data.total))
        }
      })
    }

    if (typeof fetchLanguages === "function") {
      (!languages || languages.length === 0) && fetchLanguages((data) => {
        dispatch(setLanguages(data.languages))
      })
    }


    (!qualities || qualities.length === 0) && fetchQualities((data) => {
      dispatch(setQualities(data.qualities))
    })


  }, [])





  function handleChangePage(pageNumber) {
    // use caching data if already this page are fetched.
    if (movies[pageNumber] && movies[pageNumber].length !== 0) {
      dispatch(changePageAction({ pageNumber, paginatedMovie: null }))
    } else {

      // no cache. so send request into server 
      fetchMovies({
        currentPage: pageNumber, 
        perPageView: pagination.perPageView, 
        searchValue, 
        filter: null
      }, (paginatedMovie) => {
        dispatch(changePageAction({ pageNumber, paginatedMovie }))
      })
    }
  }

  function handleClearSearch() {

    let updateFilter = {...filter};
    for (const key in updateFilter) {
      updateFilter[key] = ""
    }

    fetchMovies({
      currentPage: 1, 
      perPageView: pagination.perPageView, 
      searchValue: "", 
      filter: updateFilter,
    }, (paginatedMovie) => {
      dispatch(setResetSearch({paginatedMovie, updateFilter}))
    })
  }


  function handleChangeOnFilter(e) {
    const { name, value } = e.target;
    let updateFilter = {...filter}

    updateFilter[name] = value
  
    // no cache. so send request into server 
    fetchMovies({
      currentPage: pagination.currentPage, 
      perPageView:pagination.perPageView, 
      searchValue, 
      filter: updateFilter,
    }, (paginatedMovie) => {
      dispatch(changePageAction({
        pageNumber: pagination.currentPage,
        filter: updateFilter, 
        paginatedMovie
      }))
    })

  }



  return (
    <div>
      <div className="my_container">

        <div className="flex items-center justify-between mb-6">
          <div className={["w-full flex items-center gap-x-6", searchValue ? "justify-between" : "gap-x-6"].join(" ")}>

            {searchValue && <h1 className="text-center text-gray-300 text-sm mr-5">Search Result for <span className="active">{searchValue}</span></h1>}


            {/********* FIlter by Genre ***********/}
            <div className="flex items-center">
              <h1 className="flex item-center">
                <FaFilter className="mt-1 text-sm" />
                <span className="ml-1.5 text-gray-300 text-sm ">Genre</span>
              </h1>

              <select
                name="genres"
                value={filter.genres}
                placeholder="Select Genre"
                onChange={handleChangeOnFilter}
                className="bg-transparent border-primary text-gray-300 text-sm border-[1.5px] outline-none rounded-md py-1 px-1.5 ml-2">

                <option className="bg-dark-700" defaultValue={true} value="">All Genre</option>
                {genres && genres.map(genre => (
                  <option key={genre._id} className="bg-dark-700" value={genre._id} >{genre.name}</option>
                ))}

              </select>

            </div>


            {/********* Filter by language ***********/}
            <div className="flex items-center">
              <h1 className="flex item-center">
                <FaFilter className="mt-1 text-sm" />
                <span className="ml-1.5 text-gray-300 text-sm ">Language</span>
              </h1>

              <select
                name="language"
                value={filter.language}
                placeholder="Select Genre"
                onChange={handleChangeOnFilter}
                className="bg-transparent text-gray-300 text-sm  border-primary border-[1.5px] outline-none rounded-md py-1 px-1.5 ml-2">

                <option className="bg-dark-700" defaultValue={true} value="">All language</option>
                {languages && languages.map(language => (
                  <option key={language._id} className="bg-dark-700" value={language._id} >{language.name}</option>
                ))}

              </select>

            </div>



            {/********* Filter by Quality ***********/}
            <div className="flex items-center">
              <h1 className="flex item-center">
                <FaFilter className="mt-1 text-sm" />
                <span className="ml-1.5 text-gray-300 text-sm ">Quality</span>
              </h1>

              <select
                name="quality"
                value={filter.quality}
                placeholder="Select Genre"
                onChange={handleChangeOnFilter}
                className="bg-transparent border-primary text-gray-300 text-sm  border-[1.5px] outline-none rounded-md py-1 px-1.5 ml-2">

                <option className="bg-dark-700" defaultValue={true} value="">All Quality</option>
                {qualities && qualities.map(quality => (
                  <option key={quality._id} className="bg-dark-700" value={quality._id} >{quality.name}</option>
                ))}

              </select>

            </div>



            <button onClick={handleClearSearch} className="flex bg-red-500 hover:bg-red-800 px-2 py-1 rounded items-center text-white text-sm ml-auto">
              <FaTimes />
              <span className="ml-1">Reset Filter </span>
            </button>

          </div>
        </div>


        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:md:grid-cols-5 gap-4">
          {/* {movies && movies.slice((pagination.currentPage - 1), pagination.perPageView * pagination.currentPage).map(movie=>(
                  <Movie key={movie._id} movie={movie} />
              )) } */}

          {(movies && movies[pagination.currentPage]) ? movies[pagination.currentPage].map(movie => (
            <Movie movie={movie} key={movie._id} />
          )) : (
            <h1>Not Found</h1>
          )}
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