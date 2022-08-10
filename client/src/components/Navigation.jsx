import React from 'react'
import {toggleModal, setSearchValue, setPaginatedMovie } from "src/store/slices/appSlice"

import {logOutAction} from "src/store/slices/authSlice"

import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink, useNavigate} from "react-router-dom"

import {CgProfile} from "react-icons/cg"
import { AiOutlineLogout } from "react-icons/ai"
import { MdFavorite } from "react-icons/md"
import { BiSearchAlt } from "react-icons/bi"

import Avatar from 'src/components/Avatar';


import { fetchMovies } from 'src/store/actions/appActions';
import { FaPlus } from 'react-icons/fa';

let id;


function Navigation() {   
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {auth, app} = useSelector(state=>state)


    const [state, setState] = React.useState({
        openDropdown: "" /// "auth"
    })
    
    function logOutHandler(){
        dispatch(logOutAction())
        navigate("/")
    }

    function toggleExpandDropdown(dropdownName){
        setState({
            ...state,
            openDropdown: state.openDropdown === dropdownName ? "" : dropdownName
        }) 
    }

    function authDropdown(){
        return (
            <div onMouseLeave={()=>toggleExpandDropdown("auth")} className="border-slate-900 bg-neutral p-6 pt-4 absolute right-0 top-8 z-20 text-white w-[250px] text-start rounded-md">
                <ul>
                    <li className="flex items-center link link-hover">
                        <Link to={`/auth/dashboard/${auth.auth._id}`} state={"Profile"} className="flex items-center">
                            <CgProfile  className="text-xl"/> 
                            <span className="ml-2">Profile</span>
                        </Link>
                    </li>
                    <li className="flex items-center link link-hover mt-2">
                        <div onClick={()=>navigate(`/auth/dashboard/${auth.auth._id}`, { replace: true, state: "Favorites"})} className="flex items-center">
                            <MdFavorite className="text-xl" /> 
                            <span className="ml-2">Favorite</span>
                        </div>
                    </li>
                    <li className="flex items-center link link-hover mt-2">
                        <FaPlus className="text-lg" />
                        <span className="ml-2">
                            <Link to="/admin/add-movie">Add Movie</Link>
                        </span>
                    </li>
                    <li onClick={logOutHandler} className="flex items-center mt-2 link link-hover">
                        <AiOutlineLogout className="text-xl" />
                        <span className="ml-2">Log Out</span>
                    </li>
                </ul>
            </div>
        )
    }

    function handleChange(e){
        
        id && clearTimeout(id)

        const {pagination} = app

        dispatch(setSearchValue(e.target.value))
   
        if(e.target.value === ""){
            fetchMovies({
                currentPage: pagination.currentPage, 
                perPageView:pagination.perPageView, 
                searchValue: "", 
                filter: null
              }, (paginatedMovie)=>{
                dispatch(setPaginatedMovie(paginatedMovie))
                if(paginatedMovie){
                    navigate("/movies")
                }
            }) 
        } else{
            id = setTimeout(()=>{
                handleSearchMovies(e)
            }, 400)
        }

    }


    function handleSearchMovies(e){
        e.preventDefault && e.preventDefault()
        const {searchValue, pagination} = app
      
        fetchMovies({
            currentPage: pagination.currentPage, 
            perPageView:pagination.perPageView, 
            searchValue: searchValue ? searchValue : "", 
            filter: null
          }, (paginatedMovie)=>{
            dispatch(setPaginatedMovie(paginatedMovie))
            if(paginatedMovie){
                navigate("/movies")
            }
        }) 
    }


    return (
        <>
            <header className="bg-dark-700 fixed w-full z-40">
            <div className="my_container py-0 md:py-2">
                <div className="navbar">

                    <div className="navbar-start">
                        <Link to="/" className="normal-case text-xl">
                            <div className="w-24 md:w-40">
                                <img src="logo-3.svg" alt="" />
                            </div>
                        </Link>
                    </div>

                    <div className="w-full hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li><NavLink className="bg-transparent" to="/">Home</NavLink></li>
                            <li><NavLink className="bg-transparent" to="/series">Series</NavLink></li>
                            <li><NavLink className="bg-transparent" to="/movies">Movies</NavLink></li>
                            {/* <li><NavLink className="bg-transparent" to="/price_and_planling">Pricing</NavLink></li> */}
                            <li><NavLink className="bg-transparent" to="/about-us">About Us</NavLink></li>
                            <li><NavLink className="bg-transparent" to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>

                    <div className="w-1/2">
                       <div className="flex px-2 justify-between items-center h-auto input bg-white/10  text-gray-200 w-full">
                        <form onSubmit={handleSearchMovies}>
                            <input 
                                type="text" 
                                value={app.searchValue}
                                onChange={handleChange}
                                placeholder="Search movie" 
                                className="py-1 pl-1.5 outline-none bg-transparent w-full placeholder:text-gray-400"
                            />
                        </form>
                            <BiSearchAlt onClick={handleSearchMovies} className="text-xl cursor-pointer" />
                       </div>
                    </div>

                    <div className="navbar-end w-4/12">
                        { auth.auth ? (
                            <div>
                                <div className="relative">
                                    <div className='cursor-pointer flex items-center' onMouseEnter={()=>toggleExpandDropdown("auth")} onClick={()=>toggleExpandDropdown("auth")} >

                                        <Avatar 
                                            className="w-6 h-6"
                                            firstLetter={auth.auth.firstName[0]} 
                                            url={auth.auth.avatar}
                                         />

                                        <h2 className="ml-1.5 text-gray-200 font-medium" >{auth.auth.firstName}</h2>
                                    </div>
                                    { state.openDropdown === "auth" && authDropdown() }
                                </div>
                            </div>
                        ) : (
                            <div>
                                <button onClick={()=>dispatch(toggleModal("registration"))} className="btn btn-sm sm:btn-md btn-primary ml-4">

                                Join <span className='hidden md:inline-block ml-1'> Now</span>

                                </button>
                            </div>
                        ) }
                        
                    </div>
                </div>

            </div>
            </header>
            <div className='pb-[64px] md:pb-[80px]'></div>
        </>
    )
}

export default Navigation