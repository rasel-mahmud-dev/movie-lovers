import React from 'react';

const Circle = ({className, ...other}) => {
    return (
        <div className={"skeleton-circle " + className} {...other}>
            
        </div>
    );
};

export default Circle;