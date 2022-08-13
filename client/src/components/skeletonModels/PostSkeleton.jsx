import React from 'react';
import Skeleton from "../../components/Skeleton/Skeleton";

const PostSkeleton = () => {
    return (
        <Skeleton className="">
            <Skeleton.Line className="h-28 w-full"  />
            <div className="mt-2">
                <Skeleton.Line className="h-2 w-full" />
                <Skeleton.Line className="h-2 w-full" />
                <Skeleton.Line className="h-2 w-10/12" />
            </div>
        </Skeleton>

    );
};

export default PostSkeleton;