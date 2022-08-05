import React from 'react'
import {toggleModal} from "src/store/slices/appSlice"
import { useDispatch } from 'react-redux'

function Navigation() {   
    const dispatch = useDispatch()
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
                    <button class="btn btn-primary">Get started</button>
                    <button onClick={()=>dispatch(toggleModal("registration"))} class="btn btn-primary ml-4">Join Now</button>
                </div>
            </div>

        </div>
    )
}

export default Navigation