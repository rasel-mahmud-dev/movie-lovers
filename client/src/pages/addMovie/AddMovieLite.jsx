import React, {lazy, Suspense} from 'react'

import PageSkeleton from "./PageSkeleton.jsx";

const AddMovie = lazy(()=>import("./AddMovie"))

function AddMovieLite(props) {

    return (
        <div className="">
            <Suspense fallback={<PageSkeleton/>}>
                <AddMovie />
            </Suspense>
        </div>
    )

}

export default AddMovieLite