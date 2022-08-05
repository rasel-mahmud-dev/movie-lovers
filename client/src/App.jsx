import { useState, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navigation from './components/Navigation'

import HeroCarousel from "./components/HeroCarousel"

import {setMovies, setGenres} from "src/store/slices/appSlice"

import {loginWithTokenAction} from "src/store/slices/authSlice"


import { useDispatch, useSelector } from 'react-redux'
import RegistrationModal from './components/RegistrationModal'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import AddMovie from './pages/addMovie/AddMovie'
import Movies from './pages/movies/Movies'
import MovieDetail from './pages/movieDetail/MovieDetail'

import { api } from './api'
import { fetchGenres, fetchMovies } from './store/actions/appActions'
import fullPath from 'src/utils/fullPath'


function App() {

  const {app} = useSelector(state=>state)

  const dispatch = useDispatch()

  useEffect(()=>{
    let token =  localStorage.getItem("token")
    if(token){
      dispatch(loginWithTokenAction(token))
    }

   fetchGenres((data)=>{
      dispatch(setGenres(data.genres))
    })

    fetchMovies((data)=>{
      dispatch(setMovies(data.movies))
    })
 
   


  }, [])

  console.log(app);

  return (
    <div className="App">
      <Navigation />
     
      <RegistrationModal />

      <Routes>
        <Route exact={true} path="/" element={<HomePage/>} />
        <Route exact={true} path="/movies" element={<Movies/>} />
        <Route exact={true} path="/movie/:id" element={<MovieDetail/>} />

        <Route exact={true} path="/admin/add-movie" element={<AddMovie/>} />
      </Routes>

    </div>

  )
}

const HomePage = ()=> {

  const {movies} = useSelector(state=>state.app)

  return (
    <div>
       <HeroCarousel />
 
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
                    <button class="btn btn-primary">Watch Now</button>
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



export default App
