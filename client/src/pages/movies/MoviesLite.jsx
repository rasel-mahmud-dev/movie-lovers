import React, {lazy, Suspense} from 'react';

const Movies =  lazy(()=>import( 'src/pages/movies/Movies'))

import PageSkeleton from "./PageSkeleton";


const MoviesPageLite = () => {
    return (
        <div>
            <Suspense fallback={<div className="my_container"><PageSkeleton /></div>}>
                <Movies />
            </Suspense>

        </div>
    );
};

export default MoviesPageLite;