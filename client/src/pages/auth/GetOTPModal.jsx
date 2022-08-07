import React, { useEffect, useState } from 'react'
import { toggleModal } from "src/store/slices/appSlice"
import InputGroup from 'src/components/inputs/InputGroup';


function GetOTPModal(props) {

    const {app, auth, state, userData, dispatch } = props



    function handleChange(){

    }

    function handleRegistration(){

    }
    
    
    async function handleGetOTPCode() {
        if (userData.email) {
            try {
                let response = await api.post("/api/auth/get-otp-code", { email: userData.email })
                let { data, status } = response
                if (status === 201) {
                    dispatch(toggleModal("otp_verify_modal"))
                }

            } catch (ex) {

            }
        } else {
            alert("please put your email")
        }
    }


    return (
        <div>
            <h1 className="font-bold text-3xl text-gray-200 text-center">Get OTP Code</h1>
            <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <h1>{auth.verify}</h1>
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

                </div>
            </form>

            <div className="mt-8 flex justify-between">
            <span 
                className="link link-hover"
                onClick={() => dispatch(toggleModal("otp_verify_modal"))}>
                    Have a OTP Code
                </span>
                <label for="my-modal" onClick={handleGetOTPCode} className="btn text-white">GET OTP Code</label>
            </div>
        </div>
    )
}

export default GetOTPModal