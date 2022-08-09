import './App.css'
import { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'


import Navigation from './components/Navigation'

import Footer from "src/components/Footer"
import {loginWithTokenAction} from "src/store/slices/authSlice"

const HomePage = lazy(()=>import("src/pages/homepage/HomePage"))
const AddMovie = lazy(()=>import( './pages/addMovie/AddMovie'))
const Movies =  lazy(()=>import( './pages/movies/Movies'))
const MovieDetail = lazy(()=>import('./pages/movieDetail/MovieDetail'))
const Series = lazy(()=>import('./pages/series/Series'))
const Dashboard = lazy(()=>import("src/pages/dashboard/Dashboard"))
const Contact  = lazy(()=>import('./pages/Contact'));
const AboutUs  = lazy(()=>import('./pages/AboutUs'));
const JoinHome = lazy(()=>import("src/pages/auth/JoinHome"))
import Loader from 'src/components/loader/Loader';



function App() {

  const dispatch = useDispatch()

  
  const modal = useSelector(state => state.app.modal)


  useEffect(()=>{
    let token = localStorage.getItem("token")
    if(token){
      dispatch(loginWithTokenAction(token))
    }      
  }, [])



  return (
    <div className="App">
      <Navigation />
     
      <Suspense fallback={<Spinner />}>

       { modal && <JoinHome /> }

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
      </Suspense>


      <Footer />

    </div>

  )
}

const Spinner = ()=>{
  return (
    <div className="flex flex-col items-center py-10 min-h-[500px] justify-center">
      <h1 className="text-center text-3xl text-white">Loading Please wait...</h1>
      <Loader className="big_loader mt-4" />
    </div>

  )
}


export default App
