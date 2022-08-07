import React from 'react'
import {toggleModal} from "src/store/slices/appSlice"

import {logOutAction} from "src/store/slices/authSlice"

import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink, useNavigate} from "react-router-dom"

import {CgProfile} from "react-icons/cg"
import { AiOutlineLogout } from "react-icons/ai"
import { MdFavorite } from "react-icons/md"
import { BiSearchAlt } from "react-icons/bi"

import fullPath from "src/utils/fullPath"
import Avatar from 'src/components/Avatar';

function Navigation() {   
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [searchValue, setSearchValue] = React.useState("")

    const auth = useSelector(state=>state.auth)

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
                        <Link to={`/auth/dashboard/${auth.auth._id}`} className="flex items-center">
                            <CgProfile /> 
                            <span className="ml-2">Profile</span>
                        </Link>
                    </li>
                    <li className="flex items-center link link-hover mt-2">
                        <div onClick={()=>navigate(`/auth/dashboard/${auth.auth._id}`, { replace: true, state: "Favorites"})} className="flex items-center">
                            <MdFavorite /> 
                            <span className="ml-2">Favorite</span>
                        </div>
                    </li>
                    <li className="flex items-center link link-hover mt-2">
                        <CgProfile />
                        <span className="ml-2">
                            <Link to="/admin/add-movie">Add Movie</Link>
                        </span>
                    </li>
                    <li onClick={logOutHandler} className="flex items-center mt-2 link link-hover">
                        <AiOutlineLogout />
                        <span className="ml-2">Log Out</span>
                    </li>
                </ul>
            </div>
        )
    }


    function handleSearchMovies(){
        if(searchValue){
            alert(searchValue)
        }
    }


    return (
        <>
            <header className="bg-dark-700 fixed w-full z-40">
            <div className="my_container">
                <div className="navbar">

                    <div className="navbar-start">
                        <Link to="/" className="btn btn-ghost normal-case text-xl">
                            <div className="w-40">
                                <img src={fullPath("images/logo-3.svg")} alt="" />
                            </div>
                        </Link>
                    </div>

                    <div className="w-full hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            <li><NavLink className="bg-transparent" to="/">Home</NavLink></li>
                            <li><NavLink className="bg-transparent" to="/series">Series</NavLink></li>
                            <li><NavLink className="bg-transparent" to="/movies">Movies</NavLink></li>
                            <li><NavLink className="bg-transparent" to="/price_and_planling">Pricing</NavLink></li>
                            <li><NavLink className="bg-transparent" to="/contact">Contact</NavLink></li>
                        </ul>
                    </div>

                    <div className="w-1/2">
                       <div className="flex px-2 justify-between items-center h-auto input input-bordered input-primary text-gray-200 w-full">
                        <input 
                                type="text" 
                                onChange={(e)=>setSearchValue(e.target.value)}
                                placeholder="Search movie" 
                                className="py-1 pl-1.5 outline-none bg-transparent w-full placeholder:text-gray-200"
                            />
                            <BiSearchAlt onClick={handleSearchMovies} className="text-xl cursor-pointer" />
                       </div>
                    </div>

                    <div className="navbar-end w-4/12">
                        { auth.auth ? (
                            <div>
                                <div className="relative">
                                    <div className='cursor-pointer flex items-center' onMouseEnter={()=>toggleExpandDropdown("auth")} onClick={()=>toggleExpandDropdown("auth")} >
                                        <Avatar className="w-8 h-8" firstLetter={auth.auth.firstName[0]} />
                                        <h2 className="ml-1.5" >{auth.auth.firstName}</h2>
                                    </div>
                                    { state.openDropdown === "auth" && authDropdown() }
                                </div>
                            </div>
                        ) : (
                            <div>
                                <button className="btn btn-primary">Get started</button>
                                <button onClick={()=>dispatch(toggleModal("registration"))} className="btn btn-primary ml-4">Join Now</button>
                            </div>
                        ) }
                        
                    </div>
                </div>

            </div>
            </header>
            <div className='pb-[96px]'></div>
        </>
    )
}

export default Navigation