import React, {lazy, Suspense} from 'react';
import NavigationSkeleton from "./NavigationSkeleton.jsx";

const Navigation = lazy(()=>import('src/components/navigation/Navigation.jsx'))


const NavigationLite = () => {
    return (
        <div>
            <Suspense fallback={<NavigationSkeleton />}>
                <Navigation />
            </Suspense>
        </div>
    );
};

export default NavigationLite;