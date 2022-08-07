import React from 'react'

function Pagination({ currentPage, total, perPageView, onPageChange }) {

    return (
        <div className="flex flex-wrap  ">
            {new Array(total / perPageView).fill(1).map((item, index) => (
                <button
                    onClick={() => onPageChange(index + 1)}
                        className={["bg-dark-700 px-2 py-1 text-white m-1 w-10 h-10 "  + 
                        "rounded-full cursor-pointer hover:bg-primary", 
                        currentPage === (index + 1) ? "bg-primary" : ""].join(" ")}>
                    {index + 1}
                </button>
            ))}
        </div>
    )
}

export default Pagination