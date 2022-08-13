import React from 'react';
import "./style.css"
import Line from "./Line";
import Circle from "./Circle";


const Skeleton = ({className, children, ...other}) => {
    return (
        <div className={className + " skeleton"} {...other}>
            {children}
        </div>
    );
};

Skeleton.Line = Line
Skeleton.Circle = Circle

export default Skeleton;