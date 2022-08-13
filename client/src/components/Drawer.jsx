import React from 'react';

const Drawer = (props) => {

    const { toggleSidebar, isOpenBackdrop, children } = props

    return (
        <div>
            <div onClick={toggleSidebar} className={`my-drawer-overlay ${isOpenBackdrop ? " my-drawer-overlay--open" : " my-drawer-overlay--close"}`}/>
            <div className={`my_sidebar  ${isOpenBackdrop ? "open_sidebar" : "close_sidebar"} ` }>
                {children}
            </div>
        </div>
    );
};

export default Drawer;