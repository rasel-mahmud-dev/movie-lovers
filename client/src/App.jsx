import { useState, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navigation from './components/Navigation'

import HeroCarousel from "./components/HeroCarousel"

import {setMovies, setGenres} from "src/store/slices/appSlice"

import {loginWithTokenAction} from "src/store/slices/authSlice"

// import {setMovies} from "src/store/slices/appSlice"

import { useDispatch, useSelector } from 'react-redux'
import RegistrationModal from './components/RegistrationModal'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddMovie from './pages/addMovie/AddMovie'
import { api } from './api'
import { fetchGenres } from './store/actions/appActions'


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

   


  }, [])

  console.log(app);

  return (
    <div className="App">
      <Navigation />
     
      <RegistrationModal />

      <Routes>
        <Route exact={true} path="/" element={<HomePage/>} />
        <Route exact={true} path="/movies" element={<Movies/>} />
        <Route exact={true} path="/admin/add-movie" element={<AddMovie/>} />
      </Routes>


    </div>

  )
}

const HomePage = ()=> (
  <div>
     <HeroCarousel />
      <button onClick={() => dispatch(setMovies([{name: "rasrd"}]))}>Set Movie</button>
  </div>
)

const Movies = ()=> <h1>Movies</h1>

export default App
