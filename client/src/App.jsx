import { useState, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navigation from './components/Navigation'

import HeroCarousel from "./components/HeroCarousel"

import {setMovies} from "src/store/slices/appSlice"

import {loginWithTokenAction} from "src/store/slices/authSlice"

// import {setMovies} from "src/store/slices/appSlice"

import { useDispatch, useSelector } from 'react-redux'
import RegistrationModal from './components/RegistrationModal'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'



function App() {

  const {movies} = useSelector(state=>state.app)

  const dispatch = useDispatch()

  useEffect(()=>{
    let token =  localStorage.getItem("token")
    if(token){
      dispatch(loginWithTokenAction(token))
    }
  }, [])

  console.log(movies);

  return (
    <div className="App">
      <Navigation />
      <HeroCarousel />
      <button onClick={() => dispatch(setMovies([{name: "rasrd"}]))}>Set Movie</button>
      <RegistrationModal />

      <Routes>
        <Route exact={true} path="/" element={HomePage} />
        <Route path="/movies" element={Movies} />
      </Routes>


    </div>

  )
}

const HomePage = ()=> <h1>Homepage</h1>
const Movies = ()=> <h1>Movies</h1>

export default App
