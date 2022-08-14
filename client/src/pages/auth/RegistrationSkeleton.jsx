import React from 'react';
import Skeleton from "../../components/Skeleton/Skeleton.jsx";

const RegistrationSkeleton = () => {
    return (
        <div>
            <div className={["modal visible opacity-100 pointer-events-auto"].join(" ")}>
                <div className="modal-box relative" >

                    <Skeleton>
                       <Skeleton.Circle  className="ml-auto w-5 h-5 absolute right-4 top-4" />

                        <div>
                            <Skeleton.Line className="w-9/12 h-2.5 mx-auto" />
                            <Skeleton.Line className="w-9/12 h-2.5 mx-auto" />
                            <Skeleton.Line className="w-9/12 h-2.5 mx-auto" />
                        </div>

                        <div className="mt-6">
                            <Skeleton.Line className="w-6/12 h-2 mt-6" />
                            <Skeleton.Line className="w-full h-2" />
                            <Skeleton.Line className="w-full h-2" />

                            <Skeleton.Line className="w-6/12 h-2 mt-6" />
                            <Skeleton.Line className="w-full h-2" />
                            <Skeleton.Line className="w-full h-2" />

                            <Skeleton.Line className="w-6/12 h-2 mt-6" />
                            <Skeleton.Line className="w-full h-2" />
                            <Skeleton.Line className="w-full h-2" />

                            <Skeleton.Line className="w-6/12 h-2 mt-6" />
                            <Skeleton.Line className="w-full h-2" />
                            <Skeleton.Line className="w-full h-2" />

                            <Skeleton.Line className="w-6/12 h-2 mt-6" />
                            <Skeleton.Line className="w-full h-2" />
                            <Skeleton.Line className="w-full h-2" />
                        </div>
                        <div className="flex justify-between mt-8 gap-x-4">
                            <div className="w-full">
                                <Skeleton.Line className="w-full h-2.5" />
                                <Skeleton.Line className="w-10/12 h-2.5" />
                                <Skeleton.Line className="w-6/12 h-2.5" />
                            </div>
                            <Skeleton.Line className="w-32 h-8" />
                        </div>

                    </Skeleton>



                </div>
            </div>
        </div>
    );
};

export default RegistrationSkeleton;