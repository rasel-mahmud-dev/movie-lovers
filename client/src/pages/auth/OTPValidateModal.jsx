import React, { useEffect, useState } from 'react'
import { toggleModal } from "src/store/slices/appSlice"

import InputGroup from 'src/components/inputs/InputGroup';
import ResponseAlert from '../../components/ResponseAlert';
import errorMessage from 'src/utils/errorResponse';
import { api } from 'src/api';
import { useSelector } from 'react-redux';



function OTPValidateModal(props) {

    const { state, setState, dispatch, onChange } = props

    const { authProfile } = useSelector(state => state.auth)


    React.useEffect(() => {
        if (!authProfile || !authProfile.email ) {
            dispatch(toggleModal("get_otp_modal"))
        } else {
            setState({
                ...state,
                userData: {
                    ...state.userData,
                    otpCode: {
                        ...state.userData.otpCode,
                        errorMessage: "",
                        value: "",
                    }
                },
                httpResponse: "",
                httpStatus: 0,
            })
        }

    }, [authProfile])


    async function handleCheckOTPCode(e) {
        e.preventDefault()

        setState({
            ...state,
            httpResponse: "",
            httpStatus: 0,
        })


        if (!state.userData.otpCode.value) {
            setState({
                ...state,
                userData: {
                    ...state.userData,
                    otpCode: {
                        ...state.userData.otpCode,
                        errorMessage: "OTP code is required"
                    }
                }
            })
            return

        } else if (state.userData.otpCode.value.length !== 6) {
            setState({
                ...state,
                userData: {
                    ...state.userData,
                    otpCode: {
                        ...state.userData.otpCode,
                        errorMessage: "Invalid OTP code"
                    }
                }
            })
            return
        }


        if (state.userData.email.value) {

            try {

                setState({ ...state, httpResponse: "pending" })

                let response = await api.post("/api/auth/validate-otp-code", {
                    email: state.userData.email.value,
                    otp: state.userData.otpCode.value
                })
                let { data, status } = response

                if (status === 201) {
                    dispatch(toggleModal("reset_password_modal"))
                }

                setState({ ...state, httpResponse: "" })

            } catch (ex) {
                setState({
                    ...state,
                    httpResponse: errorMessage(ex),
                    httpStatus: 500,
                })
            }
        } else {
            setState({
                ...state,
                httpResponse: "Please try again. Maybe you reload this form",
                httpStatus: 500,
            })
        }
    }

    return (
        <div>

            <h1 className="font-bold text-2xl md:text-3xl text-gray-200 text-center">Verify OTP Code</h1>
            <p className="py-4 text-center text-gray-300  ">
                OTP send your
                <span className="text-gray-100 font-medium"> {state.userData.email.value} </span>
                mail. please copy and paste here to validate your account.

            </p>
            <form onSubmit={handleCheckOTPCode}>
                <ResponseAlert
                    message={state.httpResponse}
                    statusCode={state.httpStatus}
                />

                <div className="div">
                    <InputGroup
                        name="otpCode"
                        type="number"
                        label="OTP"
                        inputClass="mt-2"
                        className="!flex-col"
                        placeholder="Enter your otp code"
                        onChange={onChange}
                        value={state.userData.otpCode.value}
                        errorMessage={state.userData.otpCode.errorMessage}
                    />

                </div>


                <div className="mt-8 flex justify-between items-center">
                    <a className="text-gray-300">
                        Did't Get a Code ?
                        <span className="link link-hover"
                            onClick={() => dispatch(toggleModal("get_otp_modal"))}> Resend OTP Code</span>
                    </a>
                    <button type='submit' className="btn text-white">Verify OTP Code</button>
                </div>

            </form>

        </div>
    )
}

export default OTPValidateModal