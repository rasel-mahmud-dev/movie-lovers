import React from 'react';
import Skeleton from "src/components/Skeleton/Skeleton.jsx";


const NavigationSkeleton = () => {
    return (
        <div>
            <header className="bg-dark-700 fixed w-full z-40">
                <div className="my_container py-0 md:py-2">
                    <div className="navbar justify-between md:justify-start">
                        <div className="navbar-start">
                            <div className="block md:hidden  cursor-pointer text-white text-2xl mr-5" >
                                <Skeleton className="white-bg">
                                    <Skeleton.Line className="w-8 h-1" />
                                    <Skeleton.Line className="w-6 h-1" />
                                    <Skeleton.Line className="w-8 h-1" />
                                </Skeleton>
                            </div>

                            <div className="normal-case text-xl">
                                <div className="w-32 md:w-40">
                                    <Skeleton className="white-bg">
                                        <Skeleton.Line className="w-full h-1" />
                                        <Skeleton.Line className="w-full h-1" />
                                        <Skeleton.Line className="w-full h-1" />
                                    </Skeleton>
                                </div>
                            </div>
                        </div>

                        <div  className={`w-full mobile_nav`}>

                        </div>

                        <div className="hidden md:block w-1/2">
                            <Skeleton className="white-bg mr-10">
                                <Skeleton.Line className="w-full h-7 rounded-full" />
                            </Skeleton>

                        </div>

                        <div className="navbar-end w-auto md:w-4/12 ">
                            <div className="block md:hidden  cursor-pointer text-white text-2xl mr-5 ">
                                <Skeleton className="white-bg ">
                                    <Skeleton.Circle className="w-6 h-6" />
                                </Skeleton>
                            </div>


                                <div className="w-full">
                                    <div className="flex items-center justify-end">
                                        <Skeleton className="white-bg">
                                            <Skeleton.Circle className="w-6 h-6" />
                                        </Skeleton>
                                        <Skeleton className="white-bg w-10 ml-2">
                                            <div className="w-full">
                                                <Skeleton.Line className="w-full h-1" />
                                                <Skeleton.Line className="w-full h-1" />
                                                <Skeleton.Line className="w-full h-1" />
                                            </div>
                                        </Skeleton>
                                    </div>
                                </div>
                        </div>
                    </div>

                </div>
            </header>
            <div className='pb-[64px] md:pb-[80px]'></div>

        </div>
    );
};

export default NavigationSkeleton;