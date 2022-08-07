import React from 'react'

import TextArea from 'src/components/inputs/TextArea';
import InputGroup from 'src/components/inputs/InputGroup';


function Contact() {

    const [state, setState] = React.useState({
        userData: {
            name: {value: "", errorMessage: ""},
            email:  {value: "", errorMessage: ""},
            message:  {value: "", errorMessage: ""},
            subject:  {value: "", errorMessage: ""},
        }
    })

    const { userData } = state


    function handleChange(e){

    }

    function handleSendMessage(e){
        e.preventDefault()
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
                            inputClass="h-16"
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

                        <button type="submit" className="btn w-max flex justify-center mx-auto my-4">Send Mail</button>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default Contact