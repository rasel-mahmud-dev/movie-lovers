import React, {lazy, Suspense} from 'react';
import PageSkeleton from "./PageSkeleton";
const MovieDetail = lazy(()=>import('./MovieDetail'))



const MovieDetailLite = (props) => {
    return (
        <div>
            <Suspense fallback={PageSkeleton()}>
                <MovieDetail />
            </Suspense>
        </div>
    );
};

export default MovieDetailLite;