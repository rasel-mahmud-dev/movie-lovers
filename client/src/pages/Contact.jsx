import React from 'react'

import TextArea from 'src/components/inputs/TextArea';
import InputGroup from 'src/components/inputs/InputGroup';
import { getApi } from 'src/api';
import errorMessage from 'src/utils/errorResponse';
import generateNumber from 'src/utils/generateNumber';
import sumOfArray from 'src/utils/sumOfArray';
import ResponseAlert from 'src/components/ResponseAlert';
import scrollTo from "../utils/scrollTo.js";


function Contact() {

    const [state, setState] = React.useState({
        userData: {
            name: { value: "", errorMessage: "" },
            email: { value: "", errorMessage: "" },
            message: { value: "", errorMessage: "" },
            subject: { value: "", errorMessage: "" },
            result: { value: "", errorMessage: "" },
        },
        httpResponse: "",
        httpStatus: 0,
        twoRandomNumber: []
    })


    React.useEffect(() => {
        setState({ ...state, twoRandomNumber: generateNumber(2) })

        scrollTo(0)

    }, [])


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

        let ranTwoDigit = generateNumber(2)

        getApi().post("/api/send-mail", payload).then(response => {
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
            <div className="my_container">
                <h1 className="text-5xl font-medium text-gray-200 text-center mb-8 mt-4"></h1>

                <div className="flex flex-col justify-center items-center">
                    <div class="w-52 h-52 overflow-hidden border-2 border-primary rounded-full">
                        <div class="rounded-full ">
                            <img className="" src="https://rasel-portfolio.vercel.app/images/new-img-md.png" alt="" srcset="" />
                        </div>
                    </div>
                    <h2 className="text-xl font-medium text-gray-100 mt-4">Rasel Mahmud</h2>
                    <p className="text-base text-gray-100">rasel.mahmud.dev@gmail.com</p>


                    <h1 className="text-2xl font-medium text-gray-200 text-center mb-5 mt-10">Contact Form</h1>




                    <form onSubmit={handleSendMessage} className="w-full max-w-xl">

                        <div className="my-8 mt-4">
                            <ResponseAlert
                                className="mt-2"
                                message={state.httpResponse}
                                statusCode={state.httpStatus}
                            />
                        </div>

                        {/*********** Name **************/}
                        <InputGroup
                            name="name"
                            type="text"
                            label="Name"
                            placeholder="Enter name"
                            onChange={handleChange}
                            value={userData.name.value}
                            errorMessage={userData.name.errorMessage}
                        />

                        {/*********** Email **************/}
                        <InputGroup
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={userData.email.value}
                            errorMessage={userData.email.errorMessage}
                        />


                        {/*********** subject **************/}
                        <TextArea
                            name="subject"
                            label="Subject"
                            inputClass="!h-14"
                            placeholder="Write subject"
                            onChange={handleChange}
                            value={userData.subject.value}
                            errorMessage={userData.subject.errorMessage}
                        />


                        {/*********** Message **************/}
                        <TextArea
                            name="message"
                            label="Message"
                            placeholder="Write message"
                            onChange={handleChange}
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
                                placeholder="result"
                                className="mt-0"
                                onChange={handleChange}
                                value={userData.result.value}
                                errorMessage={userData.result.errorMessage}
                            />

                        </div>

                        {state.httpResponse !== "pending"
                            && <button type="submit" className="btn w-max flex justify-center mx-auto my-4">Send Mail</button>}
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Contact
