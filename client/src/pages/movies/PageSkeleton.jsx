import React from 'react';
import PostSkeleton from "../../components/skeletonModels/PostSkeleton";


const PageSkeleton = ({count = 7}) => {
    return (
        <div className="my_container">
            <div className="grid gap-4 movie_list mt-4">
                { new Array(count).fill(0).map((item, i)=>(
                    <PostSkeleton key={i} />
                )) }
            </div>
        </div>
    );
};

export default PageSkeleton;