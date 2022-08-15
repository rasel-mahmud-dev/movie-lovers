import './App.css'
import { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { lazy, useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'



import Footer from "src/components/Footer"
import {loginWithTokenAction, setAuth} from "src/store/slices/authSlice"

const Series = lazy(()=>import('./pages/series/Series'))
const Contact  = lazy(()=>import('./pages/Contact'));
const AboutUs  = lazy(()=>import('./pages/AboutUs'));
const RequestMovie  = lazy(()=>import('./pages/RequestMovie'));
import Loader from 'src/components/loader/Loader';
import HomePageLite from "./pages/homepage/HomePageLite";
import MoviesPageLite from "./pages/movies/MoviesLite";
import MovieDetailLite from "./pages/movieDetail/MovieDetailLite";
import DashboardLite from "./pages/dashboard/dashboardRoot/DashboardLite.jsx";
import AddMovieLite from "./pages/addMovie/AddMovieLite.jsx";
import JoinHomeLite from "./pages/auth/JoinHomeLite.jsx";
import scrollTo from "./utils/scrollTo.js";
import NavigationLite from "./components/navigation/NavigationLite.jsx";



function App() {
  const dispatch = useDispatch()
  
  const {app, auth} = useSelector(state => state)
  const {modal} = app

  useEffect(()=>{
      dispatch(loginWithTokenAction())
  }, [])

    useEffect(()=>{
        if(modal !== ""){
            scrollTo(0)
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [modal])

  return (
    <div className="App">
      <NavigationLite />


      <Suspense fallback={<Spinner />}>

       { modal && <JoinHomeLite /> }

        <Routes>
          <Route exact={true} path="/" element={<HomePageLite/>} />
          <Route exact={true} path="/movies" element={<MoviesPageLite/>} />
          <Route exact={true} path="/series" element={<Series/>} />
          <Route exact={true} path="/movie/:id" element={<MovieDetailLite/>} />

          {(auth.auth || !auth.authFetched) ? (
            <>
              <Route exact={true} path="/auth/dashboard/:id" element={<DashboardLite/>} />
              <Route exact={true} path="/admin/add-movie" element={<AddMovieLite/>} />
              <Route exact={true} path="/admin/update-movie/:id" element={<AddMovieLite/>} />
            </>
          ) : (
             <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
          )}

          <Route exact={true} path="/about-us" element={<AboutUs/>} />
          <Route exact={true} path="/contact" element={<Contact/>} />
          <Route exact={true} path="/request-movie" element={<RequestMovie/>} />


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
