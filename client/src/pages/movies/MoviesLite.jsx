import React, {lazy, Suspense} from 'react';

const Movies =  lazy(()=>import( 'src/pages/movies/Movies'))

import PageSkeleton from "./PageSkeleton";


const MoviesPageLite = () => {
    return (
        <div>
            <Suspense fallback={<PageSkeleton />}>
                <Movies />
            </Suspense>

        </div>
    );
};

export default MoviesPageLite;