import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthProfile } from "src/store/slices/authSlice"
import { fetchAuthProfile } from "src/store/actions/authActions"
import Avatar from 'src/components/Avatar';

import Profile from 'src/pages/dashboard/Profile';
import FavoriteMovies from 'src/pages/dashboard/FavoriteMovies';
import EditProfile from './EditProfile';
import UserSettings from './UserSettings';
import {CgProfile, CgPlayList} from 'react-icons/cg'
import {BsFillBookmarkHeartFill} from 'react-icons/bs'
import {IoIosSettings} from "react-icons/io"
import {FaBars} from "react-icons/fa"
import Playlist from './Playlist';

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
        { icon:  <CgProfile/> , name: "Profile" },
        { icon:  <BsFillBookmarkHeartFill/> , name: "Favorites" },
        { icon:  <CgPlayList/> , name: "Playlist" },
        { icon:  <IoIosSettings/> , name: "Settings" }
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

                    <div className={`${state.isOpenSidebar ? 
                        '!block fixed left-0 z-20 top-[96px]  w-60' : ''} hidden md:block col-span-1 bg-dark-700 h-screen`}>

                        <div onClick={handleToggleSidebar} className='cursor-pointer absolute top-1 left-4 block md:hidden'>
                            <FaBars  className="text-2xl"/>
                        </div>

                        <div className="flex flex-col items-center mt-8">
                            <Avatar firstLetter={authProfile.firstName[0]} url={authProfile.avatar} />
                            <span className="text-center font-medium text-gray-100 text-lg mt-2">
                                {authProfile.firstName} {" "}
                                {authProfile.lastName}
                            </span>
                        </div>

                        <ul className="p-5">
                            {sideBarData.map(item => (
                                <li     
                                    key={item._id}
                                    onClick={() => changeSideBarContent(item)}
                                    className={["py-4 flex items-center font-medium text-md text-gray-100 cursor-pointer", item.name === sideBarContent ? "active" : ""].join(" ")}>
                                    <span className="mr-1">{item.icon}</span>
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    

                    <div className="col-span-4 sm:col-span-3 relative" onClick={handleClickBackdrop}>

                        <div onClick={handleToggleSidebar} className='cursor-pointer absolute top-1 block md:hidden'>
                            <FaBars  className="text-2xl"/>
                        </div>


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
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard