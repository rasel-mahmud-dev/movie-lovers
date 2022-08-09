import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setFavoritesMovies } from "src/store/slices/authSlice"
import { fetchFavoriteMovies } from "src/store/actions/authActions"
import Movie from 'src/components/Movie';


function Profile() {

    const params = useParams();
    const dispatch = useDispatch();

    const { auth } = useSelector(state => state)
    const { favorites } = auth

    const { id } = params

    React.useEffect(() => {
        (!favorites || favorites.length === 0) && fetchFavoriteMovies(id, (favoriteMovies) => {
            dispatch(setFavoritesMovies(favoriteMovies))
        })

    }, [id])


    return (
        <div className="min-h-[50vh]">
            <h1 className="font-bold text-3xl text-gray-200 text-center mb-10">Favorite Movies</h1>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                { favorites && favorites.map(fvMovie=>(
                    <Movie key={fvMovie._id} movie={fvMovie} />
                )) }   
            </div>   

        </div>
    )
   
}

export default Profile