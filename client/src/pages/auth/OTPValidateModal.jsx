import React, { useEffect, useState } from 'react'
import { toggleModal } from "src/store/slices/appSlice"

import InputGroup from 'src/components/inputs/InputGroup';




function OTPValidateModal(props) {

    const {app, auth, state, userData, dispatch } = props



    function handleChange(){

    }

    function handleRegistration(){

    }
    

    const [otpCode, setOtpCode] = useState("")


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

    return (
        <div>

            <h1 className="font-bold text-3xl text-gray-200 text-center">Verify OTP Code</h1>
            <p className="py-4 text-center ">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <form action="">
                <div className="div">

                    <InputGroup
                        name="otpCode"
                        type="number"
                        label="OTP"
                        placeholder="Enter your otp code"
                        onChange={(e) => setOtpCode(e.target.value)}
                        value={userData.email.value}
                        // errorMessage={userData.email.errorMessage}
                    />

                </div>
            </form>

            <div className="mt-8 flex justify-between">
                <a className="text-gray-300">
                    Did't Get a Code ?  
                    <span className="link link-hover"
                     onClick={() => dispatch(toggleModal("get_otp_modal"))}> Resend OTP Code</span> 
                     </a>

                <label for="my-modal" onClick={handleCheckOTPCode} className="btn text-white">Verify OTP Code</label>

            </div>


        </div>
    )
}

export default OTPValidateModal