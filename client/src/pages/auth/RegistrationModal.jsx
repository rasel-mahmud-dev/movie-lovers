import React, { useEffect, useState } from 'react'
import { toggleModal } from "src/store/slices/appSlice"

import InputGroup from 'src/components/inputs/InputGroup';

import CheckboxGroup from 'src/components/inputs/Checkbox';



function RegistrationModal(props) {

    const {app, auth, state, userData, dispatch } = props



    function handleChange(){

    }

    function handleRegistration(){

    }

    return (
        <div>
            <h1 className="font-bold text-3xl text-gray-200 text-center">Create a new Account</h1>
            <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <h1>{auth.verify}</h1>
            <form action="">
                <div className="div">

                <InputGroup
                        name="firstName"
                        type="text"
                        label="FirstName"
                        placeholder="Enter FirstName"
                        onChange={handleChange}
                        value={userData.firstName.value}
                        errorMessage={userData.firstName.errorMessage}
                    />
                    <InputGroup
                        name="lastName"
                        type="text"
                        label="LastName"
                        placeholder="Enter lastName"
                        onChange={handleChange}
                        value={userData.lastName.value}
                        errorMessage={userData.lastName.errorMessage}
                    />
                    <InputGroup
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter email"
                        onChange={handleChange}
                        value={userData.email.value}
                        errorMessage={userData.email.errorMessage}
                    />

                    <CheckboxGroup 
                        name="gender"
                        type="text"
                        label="gender"
                        onChange={handleChange}
                        value={userData.gender.value}
                        errorMessage={userData.gender.errorMessage}
                        options={["male", "female", "ASD"]}
                    />  


                </div>
            </form>

            <div className="mt-8 flex justify-between">
                <a className="text-gray-300">Already have an Account? <span className="cursor-pointer link link-hover" onClick={() => dispatch(toggleModal("login"))}>Login here</span> </a>

                <label for="my-modal" onClick={handleRegistration} className="btn text-white">Create</label>

            </div>
        </div>
    )
}   



    

export default RegistrationModal


