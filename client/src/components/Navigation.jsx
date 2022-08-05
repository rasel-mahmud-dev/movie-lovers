import React from 'react'
import {toggleModal} from "src/store/slices/appSlice"

import {logOutAction} from "src/store/slices/authSlice"

import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"

import {CgProfile} from "react-icons/cg"
import { AiOutlineLogout } from "react-icons/ai"


function Navigation() {   
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const auth = useSelector(state=>state.auth)

    const [state, setState] = React.useState({
        openDropdown: "auth"
    })
    
    function logOutHandler(){
        dispatch(logOutAction())
        navigate("/")
    }

    function authDropdown(){
        return (
            <div className="border-slate-900 bg-neutral p-6 pt-4 absolute right-0 top-8 z-20 text-white w-[250px] text-start rounded-md">
                <ul>
                    <li className="flex items-center link link-hover">
                        <CgProfile />
                        <span className="ml-2">Profile</span>
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
        <div className="my_container">
            <div class="navbar bg-base-100">
                <div class="navbar-start">
                    <a class="btn btn-ghost normal-case text-xl">
                        <div className="w-40">
                            <img src="https://streamo.vuejstemplate.com/images/logo/logo.png" alt="" />
                        </div>
                    </a>
                </div>
                <div class="w-full hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        <li><a>Home</a></li>
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
                                <h2>{auth.auth.firstName}</h2>
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
    )
}

export default Navigation