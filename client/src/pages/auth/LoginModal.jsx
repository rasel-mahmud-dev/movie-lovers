import React, { useEffect, useState } from 'react'
import { toggleModal } from "src/store/slices/appSlice"
import {  loginAction } from "src/store/slices/authSlice"

import InputGroup from 'src/components/inputs/InputGroup';


function LoginModal(props) {


    const {app, auth, state, userData, dispatch, setState } = props



    function handleChange(){

    }

    function handleRegistration(){

    }



    function toggleResetPasswordModal(){
        setState({
            ...state, 
            verifyFor: "resetPassword"
        })
        dispatch(toggleModal("get_otp_modal"));
    }

    function loginHandler(){
        if(userData.email && userData.password){
            dispatch(loginAction({
                email: userData.email,
                password: userData.password,
            }))
        } else{
            alert("please provide email and password")
        }
    }


    return (
        <div>
            <h1 className="font-bold text-3xl text-gray-200 text-center">Login</h1>
            <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>

            <form action="">
                <div className="div">

                    <InputGroup
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        value={userData.email.value}
                        errorMessage={userData.email.errorMessage}
                    />

                    <InputGroup
                        name="password"
                        type="password"
                        label="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={userData.password.value}
                        errorMessage={userData.password.errorMessage}
                    />

                </div>
                <p className="mt-3 text-gray-300 link link-hover" onClick={toggleResetPasswordModal}>Forgot password ?</p>
            </form>

            <div className="mt-8 flex justify-between items-center">
                
                <div>
                    
                    <a className="text-gray-300">Not an Account ?

                    <span className="cursor-pointer link link-hover"
                        onClick={() => dispatch(toggleModal("registration"))}>Create new one</span></a>
                </div>

                <label onClick={loginHandler} for="my-modal" className="btn cursor-pointer text-white">Login</label>
            </div>
        </div>
    )
}

export default LoginModal