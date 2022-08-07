import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setFavoritesMovies } from "src/store/slices/authSlice"
import { fetchFavoriteMovies } from "src/store/actions/authActions"
import Avatar from 'src/components/Avatar';
import fullPath from "src/utils/fullPath"



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
        <div>
            <h1 className="text-6xl text-gray-100 font-medium">Favorite Movies</h1>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                { favorites && favorites.map(fvMovie=>(
                    <div>
                        <img src={fullPath(fvMovie.cover)} alt="" />
                    </div>
                )) }   
            </div>   

        </div>
    )
   
}

export default Profile