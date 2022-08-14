import React, {lazy, Suspense} from 'react'
import PageSkeleton from "./PageSkeleton.jsx";

const Dashboard = lazy(()=>import("./Dashboard.jsx"))

function DashboardLite(props) {

    return (
        <div className="">
            <Suspense fallback={<PageSkeleton/>}>
                <Dashboard />
            </Suspense>
        </div>
    )

}

export default DashboardLite