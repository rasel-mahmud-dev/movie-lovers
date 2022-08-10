import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthProfile } from "src/store/slices/authSlice"
import { fetchAuthProfile } from "src/store/actions/authActions"

import Profile from 'src/pages/dashboard/Profile';
import FavoriteMovies from 'src/pages/dashboard/FavoriteMovies';
import EditProfile from './EditProfile';
import UserSettings from './UserSettings';
import {CgProfile} from 'react-icons/cg'
import {BsFillBookmarkHeartFill} from 'react-icons/bs'
import {IoIosSettings} from "react-icons/io"
import {FaBars} from "react-icons/fa"
import Playlist from './Playlist';
import AllMovies from './AllMovies';
import Sidebar from './Sidebar';
import { MdFeaturedPlayList, MdVideoLibrary } from 'react-icons/md';

function Dashboard(props) {

    const params = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const [state, setState] = React.useState({
        isOpenSidebar: false,
    }) 


    const { auth } = useSelector(state => state)
    const { authProfile } = auth

    const { id } = params
    
    React.useEffect(() => {
        !authProfile && fetchAuthProfile(id, (user) => {
            dispatch(setAuthProfile(user))
        })
    }, [id])

    function windowResizerHandler(){
        setState({
            ...state, 
            isOpenSidebar: false
        })
    }

    React.useEffect(() => {
        
        window.addEventListener("resize", windowResizerHandler)

        return ()=> window.removeEventListener("resize", windowResizerHandler)

    }, [])

    React.useEffect(()=>{
        if(location.state){
            setSideBarContent(location.state)
        }
    }, [location.state])


    const [sideBarContent, setSideBarContent] = React.useState("Profile")
    const [editProfile, setEditProfile] = React.useState(false)

    const sideBarData = [
        { icon:  <CgProfile className="text-lg"/> , name: "Profile" },
        { icon:  <BsFillBookmarkHeartFill className="text-lg"/> , name: "Favorites" },
        { icon:  <MdFeaturedPlayList className="text-lg"/> , name: "Playlist" },
        { icon:  <MdVideoLibrary className="text-lg"/> , name: "AllMovies" },
        { icon:  <IoIosSettings className="text-lg"/> , name: "Settings" }
    ]

    function changeSideBarContent(item){
        setState({
            ...state, 
            isOpenSidebar: false
        })
        setSideBarContent(item.name)

    }



    function selectSideBarSection(sideBarItem) {
        setSideBarContent(sideBarItem.name)
    }

    function handleToggleSidebar(){
        setState({
            ...state, 
            isOpenSidebar: !state.isOpenSidebar
        })
    }

    function handleClickBackdrop(e){
        if(state.isOpenSidebar){
            setState({
                ...state, 
                isOpenSidebar: false
            })
        }
    }

    return (
        <div className='my_container'>
            {authProfile && (
                <div className="grid grid-cols-4 gap-x-5">

                    <Sidebar 
                        handleToggleSidebar={handleToggleSidebar}
                        isOpenSidebar={state.isOpenSidebar}
                        authProfile={authProfile}
                        changeSideBarContent={changeSideBarContent}
                        sideBarContent={sideBarContent}
                        sideBarData={sideBarData}
                    />
    
                    <div className="col-span-4 sm:col-span-3 relative" onClick={handleClickBackdrop}>

                        <div onClick={handleToggleSidebar} className='cursor-pointer absolute top-4 block md:hidden'>
                            <FaBars className="text-2xl"/>
                        </div>

                        <div className="my-4">

                            {sideBarContent === "Profile" ? editProfile 
                            ? <EditProfile 
                                    auth={auth}
                                    editProfile={editProfile} 
                                    setEditProfile={setEditProfile} 
                                /> 

                            :  <Profile 
                                    editProfile={editProfile} 
                                    setEditProfile={setEditProfile}
                                /> : ""
                            }
                            {sideBarContent === "Favorites" && <FavoriteMovies />}
                            {sideBarContent === "Playlist" && <Playlist />}
                            {sideBarContent === "Settings" && <UserSettings />}
                            {sideBarContent === "AllMovies" && <AllMovies />}

                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard