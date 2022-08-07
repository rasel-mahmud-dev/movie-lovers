import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthProfile } from "src/store/slices/authSlice"
import { fetchAuthProfile } from "src/store/actions/authActions"
import Avatar from 'src/components/Avatar';

import Profile from 'src/pages/dashboard/Profile';
import FavoriteMovies from 'src/pages/dashboard/FavoriteMovies';
import EditProfile from './EditProfile';

function Dashboard(props) {

    const params = useParams();
    const dispatch = useDispatch();
    const location = useLocation();



    const { auth } = useSelector(state => state)
    const { authProfile } = auth

    const { id } = params
    
    React.useEffect(() => {
        !authProfile && fetchAuthProfile(id, (user) => {
            dispatch(setAuthProfile(user))
        })
    }, [id])

    React.useEffect(()=>{
        if(location.state){
            setSideBarContent(location.state)
        }
    }, [location.state])


    const [sideBarContent, setSideBarContent] = React.useState("Profile")
    const [editProfile, setEditProfile] = React.useState(true)

    const sideBarData = [
        { name: "Profile" },
        { name: "Favorites" },
        { name: "Playlist" }
    ]

    function selectSideBarSection(sideBarItem) {
        setSideBarContent(sideBarItem.name)
    }


    return (
        <div className='my_container'>
            {authProfile && (
                <div className="grid grid-cols-4 gap-x-5">

                    <div className='col-span-1 bg-dark-700 h-screen'>

                        <div className="flex flex-col items-center mt-8">
                            <Avatar firstLetter={authProfile.firstName[0]} />
                            <span className="font-medium text-gray-100 text-lg mt-2">
                                {authProfile.firstName} {" "}
                                {authProfile.lastName}
                            </span>
                        </div>

                        <ul className="p-5">
                            {sideBarData.map(item => (
                                <li     
                                    key={item._id}
                                    onClick={() => selectSideBarSection(item)}
                                    className={["py-4 font-medium text-md text-gray-100 cursor-pointer", item.name === sideBarContent ? "active" : ""].join(" ")}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>

                    </div>

                    <div className="col-span-3">
                        {sideBarContent === "Profile" && editProfile 
                        ? <EditProfile 
                                auth={auth.auth}
                                editProfile={editProfile} 
                                setEditProfile={setEditProfile} 
                            /> 

                        :  <Profile 
                                editProfile={editProfile} 
                                setEditProfile={setEditProfile}
                            />
                        }
                        {sideBarContent === "Favorites" && <FavoriteMovies />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard