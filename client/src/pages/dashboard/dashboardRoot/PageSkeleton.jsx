import React from 'react';
import Skeleton from "src/components/Skeleton/Skeleton.jsx";


const PageSkeleton = (props) => {
    return (
        <div className="my_container">
            <Skeleton className="mt-4">

               <div className="grid grid-cols-8 gap-x-10">
                   <div className="col-span-2">
                       <div>
                           <Skeleton.Line className="w-full h-screen" />
                       </div>
                   </div>
                   <div className="col-span-6">
                       <div>
                           <Skeleton.Line className="w-8/12 h-2 mx-auto" />
                           <Skeleton.Line className="w-5/12 h-2 mx-auto" />
                           <Skeleton.Line className="w-3/12 h-2 mx-auto" />
                       </div>

                       <div>
                           <Skeleton.Line className="h-9 w-32" />
                           <Skeleton.Line className="h-28 w-36 mt-4" />
                       </div>

                       <div className='grid grid-cols-4 gap-x-2 gap-y-2 mt-4'>
                           <Skeleton.Line className="col-span-1 h-3 w-full" />
                           <Skeleton.Line className="col-span-3 h-3 w-full" />
                           <Skeleton.Line className="col-span-1 h-3 w-full" />
                           <Skeleton.Line className="col-span-3 h-3 w-full" />
                           <Skeleton.Line className="col-span-1 h-3 w-full" />
                           <Skeleton.Line className="col-span-3 h-3 w-9/12" />
                           <Skeleton.Line className="col-span-1 h-3 w-full" />
                           <Skeleton.Line className="col-span-3 h-3 w-full" />
                           <Skeleton.Line className="col-span-1 h-3 w-full" />
                           <Skeleton.Line className="col-span-3 h-3 w-11/12" />
                           <Skeleton.Line className="col-span-1 h-3 w-full" />
                           <Skeleton.Line className="col-span-3 h-3 w-full" />
                           <Skeleton.Line className="col-span-1 h-3 w-full" />
                           <Skeleton.Line className="col-span-3 h-3 w-4/12" />
                           <Skeleton.Line className="col-span-1 h-3 w-full" />
                           <Skeleton.Line className="col-span-3 h-3 w-11/12" />
                       </div>
                   </div>
               </div>

            </Skeleton>
        </div>
    );
};

export default PageSkeleton;