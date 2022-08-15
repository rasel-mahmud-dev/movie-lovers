import React from 'react'
import {ImFacebook} from "react-icons/im"
import {AiFillGithub} from "react-icons/ai"
import {AiFillLinkedin} from "react-icons/ai"
import {BsGlobe} from "react-icons/bs"
import {Link} from 'react-router-dom';

export default function Footer() {
    return (
        <div className='bg-dark-700 '>

            <footer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center sm:justify-items-start gap-y-5 p-10 my_container text-base-content">
                <div className="flex flex-col sm:items-start items-center">
                    <span className="footer-title">Services</span>
                    <a href='https://rasel-portfolio.vercel.app/' className="link link-hover">Branding</a>
                    <Link to='/request-movie' className="link link-hover">Request for Movie</Link>
                </div>
                <div className="flex flex-col sm:items-start items-center">
                    <span className="footer-title">Company</span>
                    <Link to="/about-us" className="link link-hover">About us</Link>
                    <Link to="/contact" className="link link-hover">Contact</Link>
                </div>
                <div className="flex flex-col sm:items-start items-center">
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                </div>
            </footer>

            <footer
                className="footer flex flex-col md:grid my_container px-4 py-4 border-t bg-dark-700 text-base-content border-base-300 items-center">
                <div className="flex flex-col  ">
                    <Link to="/" className="normal-case text-xl mx-auto md:mx-0">
                        <div className="w-28">
                            <img src={"/logo-3.svg"} alt=""/>
                        </div>
                    </Link>
                    <p>Providing reliable tech since 2020</p>
                </div>
                <div className="md:place-self-center md:justify-self-end -mt-8 md:mt-auto">
                    <div class="flex mt-6 justify-center">
                            <a target="_blank"
                               className="mr-2 group  group-hover:text-blue-500 bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center"
                               href="https://www.facebook.com/rasel.mahmud.dev">
                                <ImFacebook class="text-gray-50  group-hover:text-blue-500 text-lg"></ImFacebook>
                            </a>
                            <a target="_blank"
                               className="mx-2 group  group-hover:text-blue-500 bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center"
                               href="https://rasel-portfolio.vercel.app">
                                <BsGlobe class="text-gray-50  group-hover:text-blue-500 text-lg"></BsGlobe>
                            </a>
                            <a target="_blank"
                               className="mx-2 group  group-hover:text-blue-500 bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center"
                               href="https://github.com/rasel-mahmud-dev">
                                <AiFillGithub class="text-gray-50  group-hover:text-blue-500 text-lg"></AiFillGithub>
                            </a>
                            <a target="_blank"
                               className="mx-2 group  group-hover:text-blue-500 bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center"
                               href="https://www.linkedin.com/in/rasel-mahmud-9869a2234">
                                <AiFillLinkedin
                                    class="text-gray-50  group-hover:text-blue-500 text-lg"></AiFillLinkedin>
                            </a>

                        </div>
                </div>
            </footer>
        </div>
    )
}
