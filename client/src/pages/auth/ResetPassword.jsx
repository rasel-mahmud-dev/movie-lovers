import React, { useEffect } from 'react'

import { toggleModal } from "src/store/slices/appSlice"
import { setAuth } from "src/store/slices/authSlice"

import InputGroup from 'src/components/inputs/InputGroup';
import ResponseAlert from 'src/components/ResponseAlert';
import errorMessage from 'src/utils/errorResponse';
import { api } from 'src/api';


function ResetPassword(props) {

    const { state, setState, onChange, onResetUserData, dispatch } = props

    useEffect(() => {
        setState({
            ...state,
            httpResponse: "",
            httpStatus: 0,
            userData: {
                ...state.userData,
                password: { value: "", errorMessage: "", tauch: false },
                confirmPassword: { value: "", errorMessage: "", tauch: false }

            }
        })
    }, [])

    async function newPasswordSetHandler(e) {
        e.preventDefault()

        let updateState = { ...state }

        updateState = {
            ...updateState,
            httpResponse: "",
            httpStatus: 0,
        }

        setState(updateState)

        let isCompleted = true;
        let updatedUserData = { ...updateState.userData }

        let resetUserData = {
            password: updatedUserData.password,
            confirmPassword: updatedUserData.confirmPassword,
        }
        let payload = {}

        for (let key in resetUserData) {
            if (!updatedUserData[key].tauch || !updatedUserData[key].value) {
                updatedUserData[key].errorMessage = `${key} is required`
                isCompleted = false;
            } else {
                payload[key] = updatedUserData[key].value
            }
        }

        if (!isCompleted) {
            updateState = {
                ...updateState,
                userData: updatedUserData
            }
            setState(updateState)
            return;
        }

        if (updateState.userData.password.value !== updateState.userData.confirmPassword.value) {
            updateState = {
                ...updateState,
                httpResponse: "Password does't match",
                httpStatus: 500,
            }
            setState(updateState)
            return;
        }


        try {
            setState({...state, httpResponse: "pending"})
            let response = await api.post("/api/auth/reset-password", {
                email: updateState.userData.email.value,
                password: updateState.userData.password.value,
                otpCode: updateState.userData.otpCode.value
            })

            let { data, status } = response

            if (status === 201) {
                dispatch(setAuth(data))
                dispatch(toggleModal(""))
            }

            setState({...state, httpResponse: ""})

        } catch (ex) {
            setState({
                ...state,
                httpResponse: errorMessage(ex),
                httpStatus: 500,
            })
        }
    }


    return (
        <div>

            <h1 className="font-bold text-2xl md:text-3xl text-gray-200 text-center">Reset new Password</h1>
            <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <form onSubmit={newPasswordSetHandler}>

                <ResponseAlert
                    className="my-2"
                    message={state.httpResponse}
                    statusCode={state.httpStatus}
                />


                <div className="div">

                    <InputGroup
                        name="password"
                        type="password"
                        label="New password"
                        placeholder="Enter new password"
                        onChange={onChange}
                        inputClass="mt-2"
                        className="!flex-col"
                        value={state.userData.password.value}
                        errorMessage={state.userData.password.errorMessage}
                    />

                    <InputGroup
                        name="confirmPassword"
                        type="password"
                        inputClass="mt-2"
                        labelClass="!w-full"
                        className="!flex-col"
                        label="Confirm new password"
                        placeholder="Confirm password"
                        onChange={onChange}
                        value={state.userData.confirmPassword.value}
                        errorMessage={state.userData.confirmPassword.errorMessage}
                    />


                </div>


                <div className="mt-8 flex justify-between items-center">
                    <span className="link link-hover" onClick={() => dispatch(toggleModal("login"))}>Back to login</span>
                    <button type='submit' className="btn text-white">Save Password</button>
                </div>
            </form>

        </div>
    )
}

export default ResetPassword;

