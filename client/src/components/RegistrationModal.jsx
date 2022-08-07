import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from "src/store/slices/appSlice"
import { registration, loginAction } from "src/store/slices/authSlice"

import { FaTimes } from "react-icons/fa"
import { api, getApi } from '../api'

function RegistrationModal() {

    const { app, auth } = useSelector(state => state)

    const { modal } = app

    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
    })

    const [state, setState] = useState({
        verifyFor: "newAccount" // newAcc, resetPassword
    })


    const [otpCode, setOtpCode] = useState("")

    useEffect(() => {
        if (app.modal === "verify_modal") {
            if (auth.auth) {
                setUserData({ ...userData, email: auth.auth.email })
            }
        }
    }, [app.modal, auth.auth])


    function handleChange(e, value) {
        if (e.target.name === "gender") {
            setUserData({
                ...userData,
                [e.target.name]: value
            })
        } else {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value
            })
        }
    }

    function handleRegistration() {
        let isCompleted = true
        for (const key in userData) {
            if (!userData[key]) {
                isCompleted = false;
            }
        }
        if (isCompleted) {
            dispatch(registration({
                ...userData
            }))
        } else {
            alert("please fill up give input")
        }
    }

    function loginContent() {

        function toggleResetPasswordModal(){
            setState({
                ...state, 
                verifyFor: "resetPassword"
            })
            dispatch(toggleModal("verify_modal"));
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

                        <input
                            value={userData.email}
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            className="input text-white input-bordered input-primary w-full mt-4  "
                        />


                        <input
                            value={userData.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            className="input text-white input-bordered input-primary w-full mt-4  "
                        />

                    </div>
                    <p className="mt-3 text-gray-300 link link-hover" onClick={toggleResetPasswordModal} >Forgot password ?</p>
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

    function registraionContent() {

        return (
            <div>
                <h1 className="font-bold text-3xl text-gray-200 text-center">Create a new Account</h1>
                <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                <h1>{auth.verify}</h1>
                <form action="">
                    <div className="div">
                        <input
                            value={userData.firstName}
                            name="firstName"
                            onChange={handleChange}
                            type="text"
                            placeholder="First Name"
                            className="input text-white input-bordered input-primary w-full mt-4 "
                        />
                        <input
                            type="text"
                            value={userData.lastName}
                            name="lastName"
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="input text-white input-bordered input-primary w-full mt-4 "
                        />
                        <input
                            type="email"
                            value={userData.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            className="input text-white input-bordered input-primary w-full mt-4  "
                        />

                        <div className="mt-4">
                            <h4 className="text-lg font-medium">Gender</h4>
                            <div >
                                <div className="flex items-center mt-2">
                                    <input
                                        type="radio"
                                        name="gender"
                                        className="mr-2 radio radio-primary"
                                        id="male"
                                        checked={userData.gender === "male"}
                                        onChange={(e) => handleChange(e, "male")}
                                    />
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className="flex items-center mt-3">
                                    <input
                                        type="radio"
                                        name="gender"
                                        id="female"
                                        className="mr-2 radio radio-primary"
                                        checked={userData.gender === "female"}
                                        onChange={(e) => handleChange(e, "female")}

                                    />
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                        </div>



                    </div>
                </form>

                <div className="mt-8 flex justify-between">
                    <a className="text-gray-300">Already have an Account? <span className="cursor-pointer link link-hover" onClick={() => dispatch(toggleModal("login"))}>Login here</span> </a>

                    <label for="my-modal" onClick={handleRegistration} className="btn text-white">Create</label>

                </div>
            </div>
        )
    }

    function verificationContent() {

        return (
            <div>
                <h1 className="font-bold text-3xl text-gray-200 text-center">Get OTP Code</h1>
                <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                <h1>{auth.verify}</h1>
                <form action="">
                    <div className="div">

                        <input
                            type="email"
                            value={userData.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                            className="input text-white input-bordered input-primary w-full mt-4  "
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

    function otpCodeVerificationContent() {
        return (
            <div>

                <h1 className="font-bold text-3xl text-gray-200 text-center">Verify OTP Code</h1>
                <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                <form action="">
                    <div className="div">

                        <input
                            type="number"
                            value={otpCode}
                            name="otpCode"
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="Enter your otp code"
                            className="input text-white input-bordered input-primary w-full mt-4  "
                        />

                    </div>
                </form>

                <div className="mt-8 flex justify-between">
                    <a className="text-gray-300">
                        Did't Get a Code ?  
                        <span className="link link-hover"
                         onClick={() => dispatch(toggleModal("verify_modal"))}> Resend OTP Code</span> 
                         </a>

                    <label for="my-modal" onClick={handleCheckOTPCode} className="btn text-white">Verify OTP Code</label>

                </div>


            </div>
        )
    }

    function resetPasswordContent() {

        function handleChangePassword(e){
            setState({
                ...state, 
                [e.target.name]: e.target.value
            })
        }

        return (
            <div>

                <h1 className="font-bold text-3xl text-gray-200 text-center">Reset new Password</h1>
                <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                <form action="">
                    <div className="div">
                        <input
                            type="password"
                            value={state.password}
                            name="password"
                            onChange={handleChangePassword}
                            placeholder="Password"
                            className="input text-white input-bordered input-primary w-full mt-4  "
                        />
                        <input
                            type="password"
                            value={state.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChangePassword}
                            placeholder="Confirm password"
                            className="input text-white input-bordered input-primary w-full mt-4  "
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

    async function handleCheckOTPCode() {
       
        if(!otpCode || otpCode.length !== 6){
            alert("please put valid otp code")
            return 
        }

        if (userData.email && otpCode) {
            try {
                let response = await api.post("/api/auth/validate-otp-code", { 
                    email: userData.email,
                    otp: otpCode,
                })
                let { data, status } = response

                if(state.verifyFor === "resetPassword"){
                    dispatch(toggleModal("resetPasswordModal"))
                }

                // if (status === 201) {

                //     // dispatch(toggleModal("OTPCode_modal"))
                // }

            } catch (ex) {
                if(state.verifyFor === "resetPassword"){
                    dispatch(toggleModal("resetPasswordModal"))
                }
            }
        } else {
            alert("please put your email")
        }
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

            {/* <input type="checkbox" id="my-modal" className="modal-toggle" /> */}

            <div className={["modal", modal ? "visible opacity-100 pointer-events-auto" : ""].join(" ")}>
                <div className="modal-box">

                    <div onClick={() => dispatch(toggleModal(""))} className="bg-neutral text-white absolute right-3 top-3 p-2 rounded-full">
                        <FaTimes />
                    </div>

                    {modal === "login" && loginContent()}
                    {modal === "registration" && registraionContent()}
                    {modal === "verify_modal" && verificationContent()}
                    {modal === "otp_verify_modal" && otpCodeVerificationContent()}
                    {modal === "resetPasswordModal" && resetPasswordContent()}
                </div>
            </div>
        </div>
    )
}

export default RegistrationModal


