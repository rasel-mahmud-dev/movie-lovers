import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from "src/store/slices/appSlice"
import { registration, loginAction } from "src/store/slices/authSlice"

import InputGroup from 'src/components/inputs/InputGroup';



function ResetPassword(props) {

    const { setState } = props

    function handleChangePassword(e){
        setState({
            ...state, 
            [e.target.name]: e.target.value
        })
    }


    async function newPasswordSetHandler() {
       
        if(!state.password || !state.confirmPassword){
            alert("please put new password")
            return 
        }
        if(state.password !== state.confirmPassword){
            alert("Password does't match")
            return;
        }

        try {
            let response = await api.post("/api/auth/reset-password", { 
                email: userData.email,
                password: state.password
            })

            let { data, status } = response

            if (status === 201) {
                    // dispatch(toggleModal("OTPCode_modal"))
                }

        } catch (ex) {
            
        }
            
    }
       





    return (
        <div>

            <h1 className="font-bold text-3xl text-gray-200 text-center">Reset new Password</h1>
            <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <form action="">
                <div className="div">

                    <InputGroup
                        name="password"
                        type="password"
                        label="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={userData.password.value}
                        errorMessage={userData.password.errorMessage}
                    />

                    <InputGroup
                        name="confirmPassword"
                        type="password"
                        label="confirmPassword"
                        placeholder="Confirm password"
                        onChange={handleChange}
                        value={userData.confirmPassword.value}
                        errorMessage={userData.confirmPassword.errorMessage}
                    />


                </div>
            </form>

            <div className="mt-8 flex justify-between">
             
                   
                    <span className="link link-hover" 
                     onClick={() => dispatch(toggleModal("login"))}> login</span> 
                   

                <label for="my-modal" onClick={newPasswordSetHandler} className="btn text-white">Save Password</label>

            </div>


        </div>
    )
}

export default ResetPassword;

