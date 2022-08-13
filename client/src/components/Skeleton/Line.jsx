import React from 'react';

const Line = ({className, ...other}) => {
    return (
        <div className={"skeleton-line " +className} {...other}>
            
        </div>
    );
};

export default Line;