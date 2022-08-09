import { React } from 'react';
import fullPath from 'src/utils/fullPath';

const Avatar = ({ firstLetter, className, url }) => {
    return (
        <div className={[ className, "w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center"].join(" ")} >
            { url ? <img className="rounded-full" src={fullPath(url)} alt="" srcset="" /> : <h1 className="text-md font-medium text-white">{firstLetter}</h1> }
        </div> 

    )
}

export default Avatar;