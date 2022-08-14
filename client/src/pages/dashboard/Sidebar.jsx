import React from 'react'
import Avatar from 'src/components/Avatar';
import {FaBars} from "react-icons/fa"

function Sidebar({handleToggleSidebar, isOpenSidebar, authProfile, changeSideBarContent, sideBarContent, sideBarData}) {
  return (
    <div className={`${isOpenSidebar ? 
        '!block fixed left-0 z-20 top-[64px] w-60' : ''} 
        hidden md:block col-span-1 bg-dark-700 h-screen`}>

        <div onClick={handleToggleSidebar} className='cursor-pointer fixed top-[78px] left-4 z-50 block md:hidden'>
            <FaBars className="text-2xl"/>
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
  )
}

export default Sidebar