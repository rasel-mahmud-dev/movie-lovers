import React, {lazy, Suspense} from 'react';
import RegistrationSkeleton from "./RegistrationSkeleton.jsx";

const JoinHome = lazy(() => import("src/pages/auth/JoinHome"))

const JoinHomeLite = () => {
    return (
        <Suspense fallback={<RegistrationSkeleton/>}>
            <JoinHome/>
        </Suspense>
    );
};

export default JoinHomeLite;