import { React } from 'react';

const Avatar = ({ firstLetter, className }) => {
    return (
        <div className={[ className, "w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center"].join(" ")} >
            <h1 className="text-lg font-medium text-white">{firstLetter}</h1>
        </div>

    )
}

export default Avatar;