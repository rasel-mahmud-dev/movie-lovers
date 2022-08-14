import React from 'react';
import PostSkeleton from "../../components/skeletonModels/PostSkeleton";
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
            {data.map(section=>(
                <div>

                    <h2 className="text-xl md:text-3xl text-gray-100 font-medium mt-5 md:mt-10 mb-4 pb-1 md:pb-4 border-b
                        border-gray-100/20">{section.name}
                    </h2>

                    <div className="grid gap-4 movie_list mt-4">
                        { new Array(6).fill(0).map((item, i)=>(
                            <PostSkeleton key={i} />
                        )) }
                    </div>

                </div>

            ))}
        </div>
    );
};

export default PageSkeleton;