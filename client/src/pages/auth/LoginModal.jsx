import React from 'react'
import { toggleModal } from "src/store/slices/appSlice"
import InputGroup from 'src/components/inputs/InputGroup';
import { setAuth } from 'src/store/slices/authSlice';
import errorMessage from 'src/utils/errorResponse';
import ResponseAlert from './../../components/ResponseAlert';
import { api } from 'src/api';


function LoginModal(props) {

    const { state, onChange, setState, dispatch } = props


    React.useEffect(()=>{
        setState({
            ...state,
            httpResponse: "",
            httpStatus: 0
        })
    }, [])


    function toggleResetPasswordModal() {
        dispatch(toggleModal("get_otp_modal"));
    }

    async function loginHandler(e) {
        e.preventDefault();

        let isCompleted = true;
        let updatedUserData = { ...state.userData }

        let loginData = {
            email: updatedUserData.email,
            password: updatedUserData.password,
        }
        let payload = {}

        for (let key in loginData) {
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

        try {

            setState({ ...state, httpResponse: "pending" })

            let res = await api.post("/api/login", payload)
            if (res.status === 201) {
                if (!res.data.auth.verify) {
                    return dispatch(toggleModal("get_otp_modal"))
                } else {
                    dispatch(toggleModal(""))
                    dispatch(setAuth(res.data))
                }
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
            <h1 className="font-bold text-3xl text-gray-200 text-center">Login</h1>


            <form onSubmit={loginHandler}>



                <ResponseAlert
                    className="my-2"
                    message={state.httpResponse}
                    statusCode={state.httpStatus}
                />

                <div>
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

                        <InputGroup
                            name="password"
                            type="password"
                            label="password"
                            inputClass="mt-2"
                            className="!flex-col"
                            placeholder="Enter password"
                            onChange={onChange}
                            value={state.userData.password.value}
                            errorMessage={state.userData.password.errorMessage}
                        />
                    </div>
                    <p className="mt-5 text-gray-300 link link-hover" onClick={toggleResetPasswordModal}>Forgot password ?</p>
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <div>
                        <a className="text-gray-300">Not an Account ?
                            <span
                                className="cursor-pointer link link-hover ml-1"
                                onClick={() => dispatch(toggleModal("registration"))}>
                                Create new one
                            </span>
                        </a>
                    </div>
                    <button type="submit" className="btn cursor-pointer text-white">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginModal