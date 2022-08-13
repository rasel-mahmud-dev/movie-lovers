import React, {lazy, Suspense} from 'react';
import HeroCarousel from "../../components/HeroCarousel";

const HomePage  = lazy(()=>import("./HomePage"));

import PageSkeleton from "./PageSkeleton";


const HomePageLite = () => {
    return (
        <div>
            <HeroCarousel />
            <Suspense fallback={<PageSkeleton />}>
                <HomePage />
            </Suspense>

        </div>
    );
};

export default HomePageLite;