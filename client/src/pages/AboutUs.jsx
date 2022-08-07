import React from 'react'

import fullPath from "../utils/fullPath"
import { Link } from 'react-router-dom'


function AboutUs() {
    return (
        <div className="">
            <div>
                <div className="flex justify-center bg-cover h-[40vh]" style={{
                    backgroundImage: `linear-gradient(to bottom, rgb(14 14 14 / 48%), rgb(0 0 0 / 72%)), url(${fullPath("images/Marvels-The-Avengers.jpg")})`                   
                    // backgroundImage: `linear-gradient(to bottom, rgb(255 255 0 / 0%), rgb(0 0 0 / 77%)), url(images/Marvels-The-Avengers.jpg))`                   
                }}>
                       
                    <div className="p-10 flex flex-col justify-center py-20">
                        <Link to="/" className="btn btn-ghost normal-case text-xl">
                            <div className="w-60">
                                <img src={fullPath("images/logo-3.svg")} alt="" />
                            </div>
                        </Link>
                        <p className="text-gray-100 text-4xl mt-6 italic text-center">Connecting movie fans with their favorite content worldwide</p>
                    </div>

                    
                </div>

                <div className="my_container">
                    <h1 className="text-3xl font-medium text-gray-200 text-center mb-8 mt-4">WHAT WE DO</h1>
                    <p className="text-gray-400 text-center">
                    We show you where you can legally watch movies and TV shows that you love. You are kept up to date with what is new on Netflix, Amazon Prime, Apple TV and many other streaming platforms. Our simple filter system allows you to see only what is important to you.
                        We also allow users to track their favorite shows and movies, and can notify you when a title is available on one of your services.

                    </p>
                    <br />
                    <p className="text-gray-400 text-center">
                        
                    We collect user profiles of millions of cinema goers and learn their individual movie taste. JustWatch uses this data to run highly efficient trailer campaigns for movie studios, distributors and VOD services. We retarget people on YouTube, Facebook and other platforms where they spend their time discovering new content. Our campaigns are twice as effective as the industry benchmarks.
                    </p>

                    <div className="flex justify-center gap-x-20 my-10 ">

                        <div className="w-52 h-52 bg-orange-400 rounded-full flex flex-col items-center justify-center p-10">
                            <h1 className="text-6xl text-white font-semibold">+100</h1>
                            <h3 className="text-xl text-gray-300 mt-2 ">Staff</h3>
                        </div>
                        <div className="w-52 h-52 bg-primary rounded-full flex flex-col items-center justify-center p-10">
                            <h1 className="text-6xl text-white font-semibold">+10</h1>
                            <h3 className="text-xl text-gray-300 mt-2 ">Countries</h3>
                        </div>
                        <div className="w-52 h-52 bg-dark-700 rounded-full flex flex-col items-center justify-center p-10">
                            <h1 className="text-6xl text-white font-semibold">+20</h1>
                            <h3 className="text-xl text-gray-300 mt-2 ">Users</h3>
                        </div>

                    </div>


                </div>


            </div>
        </div>
    )
}

export default AboutUs