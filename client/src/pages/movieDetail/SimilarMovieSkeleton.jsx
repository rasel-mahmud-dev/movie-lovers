import React from 'react';
import PostSkeleton from "../../components/skeletonModels/PostSkeleton";
import Skeleton from "../../components/Skeleton/Skeleton";

const SimilarMovieSkeleton =  ({count = 7}) => {
        return (
            <div className="my_container">

                <Skeleton.Line className="h-4 w-9/12 mt-6" />

                <div className="grid gap-8 movie_list mt-3">
                    { new Array(count).fill(0).map((item, i)=>(
                        <PostSkeleton key={i} />
                    )) }
                </div>
            </div>
        );
    };


export default SimilarMovieSkeleton;