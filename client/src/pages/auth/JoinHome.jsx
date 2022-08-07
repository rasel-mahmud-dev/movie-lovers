import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from "src/store/slices/appSlice"
import { registration, loginAction } from "src/store/slices/authSlice"

import { FaTimes } from "react-icons/fa"
import OTPValidateModal from './OTPValidateModal';
import GetOTPModal from './GetOTPModal';
import ResetPassword from './ResetPassword';
import RegistrationModal from './RegistrationModal';
import LoginModal from './LoginModal';


function JoinHome() {

    const { app, auth } = useSelector(state => state)

    const { modal } = app

    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        firstName: {value: "", errorMessage: "", tauch: false},
        lastName: {value: "", errorMessage: "", tauch: false},
        email: {value: "", errorMessage: "", tauch: false},
        password: {value: "", errorMessage: "", tauch: false},
        confirmPassword: {value: "", errorMessage: "", tauch: false},
        gender: {value: "", errorMessage: "", tauch: false},
    })

    const [state, setState] = useState({
        verifyFor: "newAccount" // newAcc, resetPassword
    })


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


    return (
        <div>

            {/* <input type="checkbox" id="my-modal" className="modal-toggle" /> */}

            <div className={["modal", modal ? "visible opacity-100 pointer-events-auto" : ""].join(" ")}>
                <div className="modal-box">

                    <div onClick={() => dispatch(toggleModal(""))} className="bg-neutral text-white absolute right-3 top-3 p-2 rounded-full">
                        <FaTimes />
                    </div>

                    {modal === "login" && <LoginModal
                        state={state}
                        setState={setState}
                        userData={userData}
                        app={app} 
                        auth={auth}
                        dispatch={dispatch}
                    />}
                    {modal === "registration" && <RegistrationModal
                        state={state}
                        userData={userData}
                        setState={setState}
                        app={app} 
                        auth={auth}
                        dispatch={dispatch}
                    />}
                    {modal === "get_otp_modal" && <GetOTPModal
                        state={state}
                        userData={userData}
                        setState={setState}
                        app={app} 
                        auth={auth}
                        dispatch={dispatch}
                     />}
                    {modal === "otp_verify_modal" && <OTPValidateModal 
                        state={state}
                        userData={userData}
                        setState={setState}
                        app={app} 
                        auth={auth}
                        dispatch={dispatch}
                    />}
                    {modal === "resetPasswordModal" && <ResetPassword 
                        state={state}
                        userData={userData}
                        setState={setState}
                        app={app} 
                        auth={auth}
                        dispatch={dispatch}
                    />}
                </div>
            </div>
        </div>
    )
}

export default JoinHome


