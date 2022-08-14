import React from 'react';
import Skeleton from "src/components/Skeleton/Skeleton.jsx";


const PageSkeleton = (props) => {

    return (
        <div className="my_container">
            <Skeleton className="mt-4">

                    <div className="">
                        <div>
                            <Skeleton.Line className="w-8/12 h-5 mx-auto" />
                        </div>

                        <div className="flex justify-center gap-4 mt-4">
                            <Skeleton.Line className="h-10 w-28" />
                            <Skeleton.Line className="h-10 w-28" />
                        </div>

                        <div className='flex flex-col gap-x-2 gap-y-1 mt-4'>
                            <Skeleton.Line className="h-3 w-2/12 mt-3" />
                            <Skeleton.Line className="h-3 w-full" />
                            <Skeleton.Line className="h-3 w-5/12 mt-3" />
                            <Skeleton.Line className="h-3 w-full" />
                            <Skeleton.Line className="h-3 w-5/12 mt-3" />
                            <Skeleton.Line className="h-3 w-full" />
                            <Skeleton.Line className="h-3 w-5/12 mt-3" />
                            <Skeleton.Line className="h-3 w-full" />
                            <Skeleton.Line className="h-3 w-5/12 mt-3" />
                            <Skeleton.Line className="h-3 w-full" />
                            <Skeleton.Line className="h-3 w-4/12 mt-3" />
                            <Skeleton.Line className="h-3 w-full" />
                            <Skeleton.Line className="h-3 w-4/12 mt-3" />
                            <Skeleton.Line className="h-3 w-full" />
                            <Skeleton.Line className="h-3 w-4/12 mt-3" />
                            <Skeleton.Line className="h-3 w-full" />
                        </div>
                        <div className="flex justify-center gap-4 mt-6">
                            <Skeleton.Line className="h-10 w-40" />
                            <Skeleton.Line className="h-10 w-28" />
                        </div>

                    </div>


            </Skeleton>
        </div>
    );
};

export default PageSkeleton;