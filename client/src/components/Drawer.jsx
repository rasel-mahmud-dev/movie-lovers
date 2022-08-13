import React from 'react';

const Drawer = (props) => {

    const { toggleSidebar, isOpenBackdrop, children } = props

    return (
        <div>
            <div onClick={toggleSidebar} className={`${!isOpenBackdrop ? "my-drawer-overlay--close" : "my-drawer-overlay"}`}/>
            <div className={` ${isOpenBackdrop ? "open_sidebar" : "close_sidebar"} ` }>
                {children}
            </div>
        </div>
    );
};

export default Drawer;