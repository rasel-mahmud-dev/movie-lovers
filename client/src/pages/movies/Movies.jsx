import React from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  setMovies,
  setGenres,
  setLanguages,
  setQualities,
  setResetSearch,
  setFilterMovies,
  changePageAction,
  setFilter
} from "src/store/slices/appSlice"

import { fetchMovies, fetchGenres, fetchQualities, fetchLanguages } from 'src/store/actions/appActions'

import Movie from "src/components/Movie"
import Pagination from "src/components/Pagination"



import { FaFilter } from 'react-icons/fa'
import PageSkeleton from "./PageSkeleton";
import {BiSort} from "react-icons/all";
import Drawer from "../../components/Drawer";
import Filter from "./Filter";
import scrollTo from "../../utils/scrollTo.js";


const Movies = (props) => {

  const { movies, searchValue, genres, qualities, languages, filter, pagination, totalMovies } = useSelector(state => state.app)

  const dispatch = useDispatch();

  React.useEffect(() => {

    !movies && (
      fetchMovies({
        currentPage: pagination.currentPage,
        perPageView:pagination.perPageView,
        searchValue,
        filter: null
      }, (paginatedMovie, totalMovies) => {
        dispatch(setFilterMovies({
          paginatedMovie: paginatedMovie,
          currentPage: pagination.currentPage,
          totalMovies: pagination.currentPage === 1 ? totalMovies : null
        }))
        scrollTo(0)
      })
    )

    if (typeof fetchLanguages === "function") {
      (!languages || languages.length === 0) && fetchLanguages((data) => {
        dispatch(setLanguages(data.languages))
      })
    }


    if (typeof fetchQualities === "function") {
      (!qualities || qualities.length === 0) && fetchQualities((data) => {
        dispatch(setQualities(data.qualities))
      })
    }

    if (typeof fetchGenres === "function") {
      (!genres || genres.length === 0) && fetchGenres((data)=>{
        dispatch(setGenres(data.genres))
      })
    }

    scrollTo(0)

  }, [])

  const [state, setState] = React.useState({
    isOpenBackdrop: false
  })

  function handleChangePage(pageNumber) {
    // use caching data if already this page is fetched.
    if (movies[pageNumber] && movies[pageNumber].length !== 0) {
      // change pagination
      dispatch(changePageAction({ pageNumber, paginatedMovie: null }))
      scrollTo(0)

    } else {

      // no cache. so send request into server 
      fetchMovies({
        currentPage: pageNumber, 
        perPageView: pagination.perPageView, 
        searchValue, 
        filter: filter
      }, (paginatedMovie, totalMovies) => {
        dispatch(setFilterMovies({
          paginatedMovie: paginatedMovie,
          currentPage: pageNumber,
          filter: filter,
          searchValue: searchValue,
          totalMovies: pageNumber === 1 ? totalMovies : null
        }))
        scrollTo(0)
      })
    }
  }

  function handleClearSearch() {

    let updateFilter = {...filter};
    for (const key in updateFilter) {
      updateFilter[key] = ""
    }

    // fetchMovies({
    //   currentPage: 1,
    //   perPageView: pagination.perPageView,
    //   searchValue: "",
    //   filter: updateFilter,
    // }, (paginatedMovie) => {
    //   dispatch(setResetSearch({paginatedMovie, updateFilter}))
    // })
  }

  function toggleSidebar(){
    if(!state.isOpenBackdrop){
      document.body.style.overflow = "hidden"
    } else  {
      document.body.style.overflow = "auto"
    }
    setState({
      ...state,
      isOpenBackdrop: !state.isOpenBackdrop
    })
  }

  function handleFilterChange(data){

    let updateFilter = data

    // no cache. so send request into server
    fetchMovies({
      currentPage: 1,
      perPageView:pagination.perPageView,
      searchValue,
      filter: updateFilter,
    }, (paginatedMovie, totalMovie) => {
      dispatch(setFilterMovies({
        paginatedMovie: paginatedMovie,
        currentPage: 1,
        filter: updateFilter,
        searchValue: searchValue,
        totalMovies: totalMovies
      }))
      scrollTo(0)
    })

    // dispatch(setFilter(data))
  }


  let isFiltered = false;
  for(let key in filter){
    if(filter[key] && filter[key].length){
      isFiltered = true
    }
  }


  return (
    <div className={`${state.isOpenBackdrop ? "overflow-scroll-none": ""}`}>
      <div className="my_container">

        <Drawer
            toggleSidebar={toggleSidebar}
            isOpenBackdrop={state.isOpenBackdrop}>
              <div className="">
                <Filter
                    filter={filter}
                    searchValue={searchValue}
                    genres={genres}
                    languages={languages}
                    qualities={qualities}
                    onChangeFilter={handleFilterChange}
                    toggleSidebar={toggleSidebar}
                    handleClearSearch={handleClearSearch}
                />
              </div>
        </Drawer>

        <div className="flex justify-between mt-2 ">
          <div className="bg-neutral px-4 rounded-md flex items-center text-white py-2 cursor-pointer">
            <BiSort className="text-md " />
            <span className="ml-1.5 text-sm font-medium">Sort</span>
          </div>

          <div onClick={toggleSidebar} className={`bg-neutral px-4 rounded-md flex items-center text-white py-2 cursor-pointer 
          ${isFiltered ? "bg-primary " : ""} 
          `}>
            <FaFilter className="text-md" />
            <span className="ml-1.5 text-sm font-medium">Filter</span>
          </div>
        </div>

        <div className="mb-4">
          {searchValue && <h1 className="text-center text-gray-300 text-sm mr-5 my-4">Search Result for
            <span className="active">{searchValue}</span>
          </h1>}
        </div>

        <div className="movie_list gap-4">
          {(movies && movies[pagination.currentPage]) && movies[pagination.currentPage].map(movie => (
            <Movie movie={movie} key={movie._id} />
          ))}
        </div>

        {!movies && <PageSkeleton count={20} /> }

        {/* pagination  */}
        <div className="flex justify-center my-14">
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