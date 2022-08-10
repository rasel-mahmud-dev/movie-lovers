import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModal } from "src/store/slices/appSlice"


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

    const [state, setState] = useState({
        userData: {
            firstName: { value: "", errorMessage: "", tauch: false },
            lastName: { value: "", errorMessage: "", tauch: false },
            email: { value: "rasel2@gmail.com", errorMessage: "", tauch: false },
            password: { value: "a", errorMessage: "", tauch: false },
            confirmPassword: { value: "", errorMessage: "", tauch: false },
            gender: { value: "", errorMessage: "", tauch: false },
            otpCode: { value: "", errorMessage: "", tauch: false },
            result: { value: "", errorMessage: "", tauch: false }
        },
        verifyFor: "newAccount", // newAcc, resetPassword
        httpResponse: "",
        httpStatus: 200
    })

    function handleResetUserData(resetProps = {}){
        let updateUserData = { ...state.userData }
        for(let key in updateUserData){
            updateUserData[key] = {
                ...updateUserData[key],
                value: "",
                errorMessage: "",
                tauch: false
            }
        }
        setState({
            ...state,
            userData: updateUserData,
            ...resetProps
        })
    }

    // useEffect(() => {
    //     if (app.modal === "verify_modal") {
    //         if (auth.auth) {
    //             setUserData({ ...userData, email: auth.auth.email })
    //         }
    //     }
    // }, [app.modal, auth.auth])


    function handleChange(e) {
        const { name, value } = e.target
        let updateUserData = { ...state.userData }

        updateUserData = {
            ...updateUserData,
            [name]: {
                ...updateUserData[name],
                value: value,
                tauch: true,
                errorMessage: updateUserData[name] ? "" : updateUserData[name].errorMessage
            }
        }

        setState({
            ...state,
            userData: updateUserData
        })

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
                        onChange={handleChange}
                        setState={setState}
                        app={app}
                        auth={auth}
                        onResetUserData={handleResetUserData}
                        dispatch={dispatch}
                    />}
                    {modal === "registration" && <RegistrationModal
                        state={state}
                        onChange={handleChange}
                        setState={setState}
                        app={app}
                        auth={auth}
                        onResetUserData={handleResetUserData}
                        dispatch={dispatch}
                    />}
                    {modal === "get_otp_modal" && <GetOTPModal
                        state={state}
                        onChange={handleChange}
                        setState={setState}
                        app={app}
                        auth={auth}
                        onResetUserData={handleResetUserData}
                        dispatch={dispatch}
                    />}
                    {modal === "otp_verify_modal" && <OTPValidateModal
                        state={state}
                        setState={setState}
                        onChange={handleChange}
                        app={app}
                        auth={auth}
                        onResetUserData={handleResetUserData}
                        dispatch={dispatch}
                    />}
                    {modal === "reset_password_modal" && <ResetPassword
                        state={state}
                        setState={setState}
                        onChange={handleChange}
                        app={app}
                        auth={auth}
                        onResetUserData={handleResetUserData}
                        dispatch={dispatch}
                    />}
                </div>
            </div>
        </div>
    )
}

export default JoinHome


