import React, { useState } from 'react'
import { toggleModal } from "src/store/slices/appSlice"
import InputGroup from 'src/components/inputs/InputGroup';
import errorMessage from './../../utils/errorResponse';
import { api } from '../../api';
import ResponseAlert from './../../components/ResponseAlert';
import generateNumber from './../../utils/generateNumber';
import sumOfArray from './../../utils/sumOfArray';
import { useSelector } from 'react-redux';

function GetOTPModal(props) {

    const { state, setState, onChange, dispatch } = props

    const {authProfile} = useSelector(state=>state.auth)

    const [twoRandomNumber, setTwoRandomNumber] = useState([])


    React.useEffect(() => {
        let updateState= {...state}

        if(authProfile && authProfile.email){
            updateState = {
                ...updateState,
                userData: {
                    ...updateState.userData,
                    email: {
                        ...state.userData.email,
                        errorMessage: "",
                        tauch: true,
                        value: authProfile.email,
                    }
                }

            }
        } else{
            updateState = {
                ...updateState,
 
            }
        }

        setTwoRandomNumber(generateNumber(2))
        setState({
            ...updateState,
            httpResponse: "",
            httpStatus: 0,
        })
    }, [authProfile])


    async function handleGetOTPCode(e) {
        e.preventDefault()

        setState({
            ...state,
            httpResponse: "",
            httpStatus: 0,
        })

        let isCompleted = true;
        let updatedUserData = { ...state.userData }

        let otpData = {
            email: updatedUserData.email,
            result: updatedUserData.result,
        }
        let payload = {}

        for (let key in otpData) {
            if (!updatedUserData[key].tauch || !updatedUserData[key].value) {
                updatedUserData[key].errorMessage = `${key} is required`
                isCompleted = false;
            } else {
                if (key === "result") {
                    if (sumOfArray(twoRandomNumber) != updatedUserData[key].value) {
                        updatedUserData[key].errorMessage = `please enter a valid answer`
                        isCompleted = false;
                    }
                } else {
                    payload[key] = updatedUserData[key].value
                }
            }
        }

        if (!isCompleted) {
            setState({
                ...state,
                userData: updatedUserData
            })
            return;
        }


        setTwoRandomNumber(generateNumber(2))


        try {

            setState({ ...state, httpResponse: "pending" })

            let response = await api.post("/api/auth/get-otp-code", {
                email: state.userData.email.value
            })
            let { data, status } = response

            if (status === 201) {
                setState({
                    ...state,
                    httpResponse: "OTP send. please check your mail",
                    httpStatus: 200
                })

                dispatch(toggleModal("otp_verify_modal"))
            }

        } catch (ex) {
            setState({
                ...state,
                httpResponse: errorMessage(ex),
                httpStatus: 500
            })
        }
    }


    return (
        <div>
            <h1 className="font-bold text-2xl md:text-3xl text-gray-200 text-center">Get OTP Code</h1>
            <p className="py-4 text-center text-gray-300 ">We will send you a mail with a otp code and link. This link or otp code make your account verifiyed.</p>

            <form onSubmit={handleGetOTPCode}>

                <ResponseAlert
                    className="mt-2"
                    message={state.httpResponse}
                    statusCode={state.httpStatus}
                />

                <div className="div">
                    <InputGroup
                        name="email"
                        type="email"
                        inputClass="mt-2"
                        className="!flex-col"
                        label="Email"
                        placeholder="Enter email"
                        onChange={onChange}
                        value={state.userData.email.value}
                        errorMessage={state.userData.email.errorMessage}
                    />
                </div>

                <div className=" justify-center mt-4">
                    <div className="flex items-center pt-4">
                        <h1 className="text-white font-bold text-3xl">{twoRandomNumber[0]} + </h1>
                        <h1 className="text-white font-bold text-3xl ml-2">
                            {twoRandomNumber[1]}  {" "} = </h1>
                    </div>

                    <InputGroup
                        name="result"
                        type="text"
                        placeholder="result"
                        className="mt-0"
                        onChange={onChange}
                        value={state.userData.result.value}
                        errorMessage={state.userData.result.errorMessage}
                    />

                </div>


                <div className="mt-8 flex justify-between items-center">
                    <span
                        className="link link-hover"
                        onClick={() => dispatch(toggleModal("otp_verify_modal"))}>
                        Have a OTP Code
                    </span>
                    <button type="submit" className="btn text-white">GET OTP Code</button>
                </div>
            </form>
        </div>
    )
}

export default GetOTPModal