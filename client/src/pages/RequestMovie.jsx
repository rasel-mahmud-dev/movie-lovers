import React from 'react'

import TextArea from 'src/components/inputs/TextArea';
import InputGroup from 'src/components/inputs/InputGroup';
import { getApi } from 'src/api';
import errorMessage from 'src/utils/errorResponse';
import generateNumber from 'src/utils/generateNumber';
import sumOfArray from 'src/utils/sumOfArray';
import ResponseAlert from 'src/components/ResponseAlert';
import scrollTo from "../utils/scrollTo.js";
import {useSelector} from "react-redux";


function RequestMovie() {

    const auth = useSelector(state=>state.auth)

    const [state, setState] = React.useState({
        userData: {
            movieName: { value: "", errorMessage: "" },
            email: { value: "", errorMessage: "" },
            message: { value: "", errorMessage: "" },
            result: { value: "", errorMessage: "" },
        },
        httpResponse: "",
        httpStatus: 0,
        twoRandomNumber: []
    })


    React.useEffect(() => {


        let updateUserData = {...state.userData}
        if(auth.auth) {

            updateUserData = {
                ...updateUserData,
                email: {
                    ...state.userData.email,
                    value: auth.auth.email,
                    tauch: true,
                }
            }
        }

        scrollTo(0)
        setState({
            ...state,
            httpResponse: "",
            httpStatus: 0,
            twoRandomNumber: generateNumber(2),
            userData: updateUserData
        })


    }, [auth.auth])


    const { userData, twoRandomNumber } = state


    function handleChange(e) {

        const { name, value } = e.target;

        let updateUserData = {
            ...state.userData,
        }


        updateUserData = {
            ...updateUserData,
            [name]: {
                ...state.userData[name],
                value: value,
                tauch: true,
                errorMessage: state.userData[name] ? "" : state.userData[name].errorMessage
            }
        }

        setState({
            ...state,
            httpResponse: "",
            httpStatus: 0,
            userData: updateUserData
        })
    }


    function handleSendMessage(e) {

        setState({
            ...state,
            httpResponse: "",
            httpStatus: 0,
        })

        e.preventDefault();
        let isCompleted = true;
        let updatedState = { ...userData }

        let payload = {}

        for (let key in userData) {
            if (!userData[key].tauch || !userData[key].value) {
                updatedState[key].errorMessage = `${key} is required`
                isCompleted = false;
            } else {
                if (key === "result") {

                    if (sumOfArray(twoRandomNumber) != userData[key].value) {

                        updatedState[key].errorMessage = `please enter a valid answer`
                        isCompleted = false;
                    }
                } else {
                    payload[key] = userData[key].value
                }
            }
        }

        if (!isCompleted) {
            setState({
                ...state,
                userData: updatedState
            })
            return;
        }
        setState({
            ...state,
            httpResponse: "pending",
            httpStatus: 0,
        })

        if(!auth.auth){
            setState({
                ...state,
                httpResponse: "You have to Login for request movie",
                httpStatus: 500,
            })
            return;
        }

        if(auth.auth.email !== payload.email){
            setState({
                ...state,
                httpResponse: "Please put your login email",
                httpStatus: 500,
            })
            return;
        }

        let ranTwoDigit = generateNumber(2)

        getApi().post("/api/send-movie-request", payload).then(response => {
            if (response.status === 201) {
                setState({
                    ...state,
                    twoRandomNumber: ranTwoDigit,
                    httpResponse: response.data.message,
                    httpStatus: 200
                })
            }
        }).catch(ex => {
            setState({
                ...state,
                twoRandomNumber: ranTwoDigit,
                httpResponse: errorMessage(ex),
                httpStatus: 500,
            })
        })
    }

    return (
        <div className="">
            <div className="my_container px-3 ">
                <div className="bg-dark-700/90 p-4 my-5 rounded-lg">
                    <h1 className="text-xl md:text-2xl font-medium text-gray-200 text-center">Movie Request form </h1>

                    <p className="text-gray-300 max-w-2xl text-center mx-auto mt-4">

                        Customers can request any kind of hollywood, bollywood, or any kind of Genre like
                        Animation,
                        Comedy,
                        Crime,
                        Drama,
                        Experimental,
                        Fantasy,
                        Historical,
                        Horror,
                        Romance,
                        Science Fiction,
                        Thriller,
                        Western,
                        Series,
                        movies. we will try to collect this.

                    </p>

                    <form onSubmit={handleSendMessage} className="w-full max-w-xl mx-auto mt-10">
                        <div className="my-4">
                            <ResponseAlert
                                className="mt-2"
                                message={state.httpResponse}
                                statusCode={state.httpStatus}
                            />
                        </div>

                        {/*********** Name **************/}
                        <InputGroup
                            name="movieName"
                            type="text"
                            inputClass="bg-transparent"
                            placeholder="Enter Movie name"
                            onChange={handleChange}
                            value={userData.movieName.value}
                            errorMessage={userData.movieName.errorMessage}
                        />

                        {/*********** Email **************/}
                        <InputGroup
                            name="email"
                            inputClass="bg-transparent"
                            type="email"
                            placeholder="Enter Your email"
                            onChange={handleChange}
                            value={userData.email.value}
                            errorMessage={userData.email.errorMessage}
                        />


                        {/*********** Description **************/}
                        <TextArea
                            name="message"
                            placeholder="Why you need this movie"
                            onChange={handleChange}
                            inputClass="bg-transparent w-full"
                            value={userData.message.value}
                            errorMessage={userData.message.errorMessage}
                        />

                        <div className="flex items-baseline justify-center mt-4">
                            <div className="flex items-center pt-4">
                                <h1 className="text-white font-bold text-3xl">{twoRandomNumber[0]} + </h1>
                                <h1 className="text-white font-bold text-3xl ml-2">
                                    {twoRandomNumber[1]}  {" "} = </h1>
                            </div>

                            <InputGroup
                                name="result"
                                type="text"
                                className="mt-0 ml-2 w-20"
                                onChange={handleChange}
                                value={userData.result.value}
                                errorMessage={userData.result.errorMessage}
                            />

                        </div>

                        {state.httpResponse !== "pending"
                            && <button type="submit" className="btn btn-primary w-max text-white flex justify-center mx-auto my-4">Request movie</button>}
                    </form>
                </div>

            </div>

        </div>
    )
}

export default RequestMovie
