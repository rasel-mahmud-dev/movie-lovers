import React, {lazy, Suspense} from 'react'
import PageSkeleton from "./PageSkeleton.jsx";

const Profile = lazy(()=>import("./Profile.jsx"))

function ProfileLite(props) {

    return (
        <div className="">
            <Suspense fallback={<PageSkeleton/>}>
                <Profile />
            </Suspense>
        </div>
    )

}

export default ProfileLite