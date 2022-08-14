import React from 'react'
import {toggleModal, setSearchValue, setPaginatedMovie } from "src/store/slices/appSlice.js"

import {logOutAction} from "src/store/slices/authSlice.js"

import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom"

import {CgProfile} from "react-icons/cg"
import { AiOutlineLogout } from "react-icons/ai"
import { MdFavorite } from "react-icons/md"
import { BiSearchAlt } from "react-icons/bi"

import Avatar from 'src/components/Avatar.jsx';


import { fetchMovies } from 'src/store/actions/appActions.js';
import {FaPlus, FaRegUser} from 'react-icons/fa';
import {GoThreeBars} from "react-icons/all";

let id;


function Navigation() {   
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    const {auth, app} = useSelector(state=>state)

    const [state, setState] = React.useState({
        openDropdown: "", /// "auth"
        isOpenNav: false,
        isOpenSearchBar: true,
    })

    function handleWindowResize(){
        let updateState = {...state}
        if(window.innerWidth > 767){
            updateState.isOpenNav = false
            updateState.isOpenSearchBar = false;
        }
        setState(updateState)
    }

    function toggleOpenMobileSearchbar(){
        if(window.innerWidth < 768) {
            setState({
                ...state,
                isOpenSearchBar: !state.isOpenSearchBar
            })
        }
    }

    React.useEffect(()=>{
        window.addEventListener("resize", handleWindowResize)
        return () => window.removeEventListener("resize", handleWindowResize)
    }, [])

    React.useEffect(()=>{
        if(location.pathname !== "/movies"){
            setState({
                ...state,
                isOpenSearchBar: false
            })
        }
    }, [location])

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
                        <Link to={`/auth/dashboard/${auth.auth._id}`} onClick={()=>toggleExpandDropdown("")} state={"Profile"} className="flex items-center">
                            <CgProfile  className="text-xl"/> 
                            <span className="ml-2">Profile</span>
                        </Link>
                    </li>
                    <li className="flex items-center link link-hover mt-2">
                        <Link to={`/auth/dashboard/${auth.auth._id}`} onClick={()=>toggleExpandDropdown("")}  state={"Favorites"} className="flex items-center">
                            <MdFavorite className="text-xl" /> 
                            <span className="ml-2">Favorite</span>
                        </Link>
                    </li>
                    <li className="flex items-center link link-hover mt-2">
                        <FaPlus className="text-lg" />
                        <span className="ml-2">
                            <Link to="/admin/add-movie" onClick={()=>toggleExpandDropdown("")}>Add Movie</Link>
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
        e.preventDefault && e.preventDefault();
        const { searchValue, pagination } = app

        fetchMovies({
            currentPage: pagination.currentPage,
            perPageView: pagination.perPageView,
            searchValue: searchValue ? searchValue : "",
            filter: null
        }, (paginatedMovie) => {
            dispatch(setPaginatedMovie(paginatedMovie))
            if (paginatedMovie) {
                navigate("/movies")
            }
        })

    }


    return (
        <div>
            <header className="bg-dark-700 fixed w-full z-40">
             <div className=""></div>

                {/**** backdrop ****/}
                <div onClick={()=>setState({...state, isOpenNav: false})} className={`${state.isOpenNav ?
                    '!block fixed left-0 top-[64px] z-20 w-full  bg-dark-700/80' : ''} 
                     hidden  h-screen`}>
                </div>

            <div className="my_container py-0 md:py-2">
                <div className="navbar justify-between md:justify-start">
                    <div className="navbar-start">
                        <GoThreeBars onClick={()=>setState({...state, isOpenNav: !state.isOpenNav})} className="block md:hidden   cursor-pointer text-white text-2xl mr-5" />

                        <Link to="/" className="normal-case text-xl">
                            <div className="w-24 md:w-40">
                                <img src="logo-3.svg" alt="" />
                            </div>
                        </Link>
                    </div>

                    <div style={{height: state.isOpenNav ? 300: '0'}} className={`w-full  mobile_nav`}>
                        <ul className={`menu menu-horizontal p-0`}>
                            <li><NavLink onClick={()=>setState({...state, isOpenNav: false})} className="bg-transparent" to="/">Home</NavLink></li>
                            <li><NavLink onClick={()=>setState({...state, isOpenNav: false})} className="bg-transparent" to="/series">Series</NavLink></li>
                            <li><NavLink onClick={()=>setState({...state, isOpenNav: false})} className="bg-transparent" to="/movies">Movies</NavLink></li>
                            <li><NavLink onClick={()=>setState({...state, isOpenNav: false})} className="bg-transparent" to="/about-us">About Us</NavLink></li>
                            <li><NavLink onClick={()=>setState({...state, isOpenNav: false})} className="bg-transparent" to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>

                    <div className="hidden md:block w-1/2">
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

                    <div className="navbar-end w-auto md:w-4/12">

                        <BiSearchAlt
                            onClick={toggleOpenMobileSearchbar}
                            className="block md:hidden  cursor-pointer text-white text-2xl mr-5"
                        />

                        { auth.auth ? (
                            <div>
                                <div className="relative">
                                    <div className='cursor-pointer flex items-center'
                                         onMouseEnter={()=>toggleExpandDropdown("auth")}
                                         onClick={()=>toggleExpandDropdown("auth")} >

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
                            <div onClick={()=>dispatch(toggleModal("registration"))}>
                                <FaRegUser className="block md:hidden text-white  text-xl ml-auto" />
                                <button  className="hidden md:inline-block btn btn-sm sm:btn-md btn-primary ml-4">
                                    Join Now
                                </button>
                            </div>
                        ) }
                        
                    </div>
                </div>

            </div>
            </header>
            <div className='pb-[64px] md:pb-[80px]'></div>

            {/***** search bar *****/}
            <div className={`bg-dark-700/50 hidden md:hidden  ${state.isOpenSearchBar ? " !block" : ""}`} >
                <div className="max-w-sm w-full mx-auto py-2">
                    <form onSubmit={handleSearchMovies} className="flex justify-between items-center px-2">
                        <input
                            type="text"
                            value={app.searchValue}
                            onChange={handleChange}
                            placeholder="Search movie"
                            className="input rounded-md input-sm bg-white/10 text-gray-200  w-full placeholder:text-gray-400"
                        />
                        <button type="submit" className="bg-neutral-focus py-1.5 px-4 rounded-md text-sm text-gray-300 cursor-pointer ml-2" >Search</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Navigation