import './App.css'
import Navigation from './components/Navigation'

import HomePage from "src/pages/homepage/HomePage"
import Dashboard from "src/pages/dashboard/Dashboard"
import Footer from "src/components/Footer"

import {setMovies, setGenres} from "src/store/slices/appSlice"

import {loginWithTokenAction} from "src/store/slices/authSlice"


import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import AddMovie from './pages/addMovie/AddMovie'
import Movies from './pages/movies/Movies'
import MovieDetail from './pages/movieDetail/MovieDetail'
import Series from './pages/series/Series'

import { fetchGenres, fetchMovies } from './store/actions/appActions'
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';

import JoinHome from 'src/pages/auth/JoinHome'


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



  return (
    <div className="App">
      <Navigation />
     
      <JoinHome />

      <Routes>
        <Route exact={true} path="/" element={<HomePage/>} />
        <Route exact={true} path="/movies" element={<Movies/>} />
        <Route exact={true} path="/series" element={<Series/>} />
        <Route exact={true} path="/movie/:id" element={<MovieDetail/>} />

        <Route exact={true} path="/auth/dashboard/:id" element={<Dashboard/>} />
        <Route exact={true} path="/admin/add-movie" element={<AddMovie/>} />
        <Route exact={true} path="/admin/update-movie/:id" element={<AddMovie/>} />

        <Route exact={true} path="/about-us" element={<AboutUs/>} />
        <Route exact={true} path="/contact" element={<Contact/>} />
      </Routes>

      <Footer />

    </div>

  )
}



export default App
