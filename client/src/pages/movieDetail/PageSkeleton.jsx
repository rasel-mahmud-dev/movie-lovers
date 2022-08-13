import React from 'react';
import PostSkeleton from "../../components/skeletonModels/PostSkeleton";
import Skeleton from "../../components/Skeleton/Skeleton";
let data = [
    { "name": "Romance" },
    { "name": "Action & Adventure" },
    { "name": "Comedy" },
    { "name": "Horror" },
    { "name": "Science-Fiction" },
    { "name": "Drama" },
    { "name": "War & Military" },

]

const PageSkeleton = () => {
    return (
        <div className="my_container">
           <Skeleton>
               <div className="mt-4">
                   <Skeleton.Line className="mx-auto h-2 w-full" />
                   <Skeleton.Line className="mx-auto h-2 w-10/12 mt-1" />
                   <Skeleton.Line className="mx-auto h-28  w-full mt-4" />
               </div>
               <div className="flex justify-between mt-4">
                   <Skeleton.Line className="h-10 w-28" />
                   <Skeleton.Line className="h-10 w-28" />
               </div>
               <div className="grid grid-cols-6 mt-4 gap-2">
                    <Skeleton.Line className="col-span-1 h-2 w-full " />
                    <Skeleton.Line className="col-span-5 h-2 w-full" />
                    <Skeleton.Line className="col-span-1 h-2 w-full " />
                    <Skeleton.Line className="col-span-5 h-2 w-6/12 " />
                    <Skeleton.Line className="col-span-1 h-2 w-full" />
                    <Skeleton.Line className="col-span-5 h-2 w-full" />
                    <Skeleton.Line className="col-span-1 h-2 w-full " />
                    <Skeleton.Line className="col-span-5 h-2 w-full " />
                   <Skeleton.Line className="col-span-1 h-2 w-full " />
                   <Skeleton.Line className="col-span-5 h-2 w-full" />
                   <Skeleton.Line className="col-span-1 h-2 w-full " />
                   <Skeleton.Line className="col-span-5 h-2 w-full " />
                   <Skeleton.Line className="col-span-1 h-2 w-full" />
                   <Skeleton.Line className="col-span-5 h-2 w-full" />
                   <Skeleton.Line className="col-span-1 h-2 w-full " />
                   <Skeleton.Line className="col-span-5 h-2 w-10/12 " />
               </div>
               <div className="mt-8">
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-4 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-full " />
                   <Skeleton.Line className="h-2 mt-1 w-10/12" />
                   <Skeleton.Line className="h-2 mt-1 w-9/12 " />
               </div>

               <div className="mt-5">
                   <Skeleton.Line className="h-10 w-28" />
               </div>

           </Skeleton>
        </div>
    );
};

export default PageSkeleton;