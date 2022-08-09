import React from 'react'

function ResponseAlert({message, statusCode, className}) {
    return (

        <div className={`${className} my-4 `}>

            {message === "pending" && (
                <div className="w-7/12 mx-auto"><progress className="progress w-full"></progress></div>
            )}

            {(message && message !== "pending") && (
                <div className="mt-8">
                    <div class={`alert rounded-md  ${statusCode > 200 ? "bg-rose-700 " : "bg-primary/50 "} text-white shadow-lg`}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{message}</span>
                        </div>
                    </div>

                </div>
            )}

        </div>
    )
}

export default ResponseAlert