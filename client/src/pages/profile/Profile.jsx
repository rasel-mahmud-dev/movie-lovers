import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {setAuthProfile} from "src/store/slices/appSlice"
import {fetchAuthProfile} from "src/store/actions/appActions"

function Profile() {

    const params  = useParams();
    const dispatch  = useDispatch();

    const {id} = params

    React.useEffect(()=>{

        fetchAuthProfile(id, (user)=>{
            dispatch(setAuthProfile(user))
        })

    }, [id])
    

  return (
    <div className='my_container'>
        <h1>WellCome</h1>
    </div>
  )
}

export default Profile