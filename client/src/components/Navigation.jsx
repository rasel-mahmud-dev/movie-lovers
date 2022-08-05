import React from 'react'
import {toggleModal} from "src/store/slices/appSlice"

import {logOutAction} from "src/store/slices/authSlice"

import { useDispatch, useSelector } from 'react-redux'
import {Link, NavLink, useNavigate} from "react-router-dom"

import {CgProfile} from "react-icons/cg"
import { AiOutlineLogout } from "react-icons/ai"

import fullPath from "src/utils/fullPath"


function Navigation() {   
    const dispatch = useDispatch()

    const navigate = useNavigate()

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
                        <CgProfile />
                        <span className="ml-2">Profile</span>
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


    return (
        <header className="bg-dark-700">
        <div className="my_container">
            <div class="navbar ">
                <div class="navbar-start">
                    <a class="btn btn-ghost normal-case text-xl">
                        <div className="w-40">
                            <img src={fullPath("images/logo.png")} alt="" />
                        </div>
                    </a>
                </div>
                <div class="w-full hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><a>Series</a></li>
                        <li><a>Movies</a></li>
                        <li><a>Pages</a></li>
                        <li><a>Pricing</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>
                <div class="navbar-end">
                    { auth.auth ? (
                        <div>
                            <div className="relative">
                                <h2 onMouseEnter={()=>toggleExpandDropdown("auth")} onClick={()=>toggleExpandDropdown("auth")} >{auth.auth.firstName}</h2>
                                { state.openDropdown === "auth" && authDropdown() }
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button class="btn btn-primary">Get started</button>
                            <button onClick={()=>dispatch(toggleModal("registration"))} class="btn btn-primary ml-4">Join Now</button>
                        </div>
                    ) }
                    
                </div>
            </div>

        </div>
        </header>
    )
}

export default Navigation