import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthProfile } from "src/store/slices/authSlice"
import { fetchFavoriteMovies } from "src/store/actions/authActions"
import Avatar from 'src/components/Avatar';



function Profile() {

    const params = useParams();
    const dispatch = useDispatch();

    const { auth } = useSelector(state => state)
    const { authProfile } = auth

    const { id } = params

    React.useEffect(() => {
        fetchFavoriteMovies(id, (user) => {
            
        })

    }, [id])



    return (
        <div>
            <h1 className="text-6xl text-gray-100 font-medium">Favorite Movies</h1>
        </div>
    )
   
}

export default Profile