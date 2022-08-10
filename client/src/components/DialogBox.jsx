import React from 'react'

function DialogBox({ isOpen, children, className }) {
    return (
        <div>
            <div class={`${isOpen ? "visible opacity-100 pointer-events-auto" : ""}  modal modal-bottom sm:modal-middle`}>
                <div class={"modal-box shadow-10xl" +  className}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DialogBox