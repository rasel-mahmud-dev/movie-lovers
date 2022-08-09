import React, { useEffect, useState } from 'react'
import { toggleModal } from "src/store/slices/appSlice"
import InputGroup from 'src/components/inputs/InputGroup';
import CheckboxGroup from 'src/components/inputs/Checkbox';
import errorMessage from './../../utils/errorResponse';
import { api } from 'src/api';
import ResponseAlert from './../../components/ResponseAlert';
import { setAuth } from '../../store/slices/authSlice';


function RegistrationModal(props) {

    const {state, onResetUserData, setState, dispatch, onChange  } = props

    React.useEffect(()=>{
        onResetUserData({httpResponse: ""})
    }, [])

    function handleChange(e) {
        onChange && onChange(e)
    }

    async function handleRegistration(e) {
        e.preventDefault();
        let isCompleted = true;
        let updatedUserData = {...state.userData}

        let registerData = {
            firstName: updatedUserData.firstName,
            lastName: updatedUserData.lastName,
            email: updatedUserData.email,
            gender: updatedUserData.gender,
        }
        let payload = {}

        for (let key in registerData) {
            if (!updatedUserData[key].tauch || !updatedUserData[key].value) {
                updatedUserData[key].errorMessage = `${key} is required`
                isCompleted = false;
            } else {
                payload[key] = updatedUserData[key].value
            }
        }
    
        if (!isCompleted) {
            setState({
                ...state,
                userData: updatedUserData
            })
            return;
        }

        try{
            setState({...state, httpResponse: "pending"})
            let res = await api.post( "/api/registration", payload)

            if(res.status === 201){
                dispatch(toggleModal("get_otp_modal"))
                dispatch(setAuth({auth: res.data.auth, token: res.data.token}))
            }

            setState({...state, httpResponse: ""})

        } catch(ex){
            setState({
                ...state,
                httpResponse: errorMessage(ex),
                httpStatus: 500
            })
        }
    }


    return (
        <div>
            <h1 className="font-bold text-3xl text-gray-200 text-center">Create a new Account</h1>

            <form className="mt-8" onSubmit={handleRegistration}>


            <ResponseAlert
                    className="my-2"
                    message={state.httpResponse}
                    statusCode={state.httpStatus}
                />

                <div className="div">
                    <InputGroup
                        name="firstName"
                        type="text"
                        label="FirstName"
                        inputClass="mt-2"
                        className="!flex-col"
                        placeholder="Enter FirstName"
                        onChange={handleChange}
                        value={state.userData.firstName.value}
                        errorMessage={state.userData.firstName.errorMessage}
                    />
                    <InputGroup
                        name="lastName"
                        type="text"
                        label="LastName"
                        inputClass="mt-2"
                        className="!flex-col"
                        placeholder="Enter lastName"
                        onChange={handleChange}
                        value={state.userData.lastName.value}
                        errorMessage={state.userData.lastName.errorMessage}
                    />
                    <InputGroup
                        name="email"
                        type="email"
                        label="Email"
                        inputClass="mt-2"
                        className="!flex-col"
                        placeholder="Enter email"
                        onChange={handleChange}
                        value={state.userData.email.value}
                        errorMessage={state.userData.email.errorMessage}
                    />

                    <CheckboxGroup
                        name="gender"
                        type="text"
                        label="Gender"
                        inputClass="mt-2"
                        className="!flex-col"
                        onChange={handleChange}
                        value={state.userData.gender.value}
                        errorMessage={state.userData.gender.errorMessage}
                        options={["male", "female"]}
                    />


                </div>
        

                <div className="mt-8 flex justify-between items-center">
                    <a className="text-gray-300">Already have an Account? <span className="cursor-pointer link link-hover" onClick={() => dispatch(toggleModal("login"))}>Login here</span> </a>
                    <button type="submit" className="btn text-white">Create</button>
                </div>

            </form>
        </div>
    )
}





export default RegistrationModal


