import React from 'react';
import {FaAngleDown, FaFilter, FaTimes} from "react-icons/fa";
import {useSelector} from "react-redux";

const Filter = (props) => {

    const {filter, genres, languages, searchValue, qualities, handleChangeOnFilter, handleClearSearch} = props

    const [state, setState]  = React.useState({
        openIds: [1]
    })




    React.useEffect(()=>{


    }, [])


    function handleCollapse(id){
        let updateOpenIds = [...state.openIds]
        let index = updateOpenIds.indexOf(id)
        if(index === -1){
            updateOpenIds.push(id)
        } else  {
            updateOpenIds.splice(index, 1)
        }
        setState({
            ...state,
            openIds: updateOpenIds
        })
    }

    return (
        <div className="py-4">
            <h2 className="text-white text-md font-medium text-center">Filter Movie</h2>

            <ul className="overflow-auto h-screen px-2">
               <li>
                   <div onClick={()=>handleCollapse(1)} className={` ${state.openIds.includes(1) ? "bg-neutral-focus": "" } flex justify-between items-center hover:bg-neutral-focus py-2 px-2`}>
                       <h2 className="text-white text-md font-medium">Genres</h2>
                       <FaAngleDown/>
                   </div>
                   <div className={`${state.openIds.includes(1) ? "block" : "hidden"}`}>
                       {genres && genres.map(genre => (
                           <div key={genre._id} className="flex justify-between bg-dark-700/20 my-1 py-2 px-2" value={genre._id} >
                               <span className="label-text">{genre.name}</span>
                               <input type="checkbox" checked="" className="checkbox  checkbox-xs  checkbox-primary"/>
                           </div>
                       ))}
                   </div>
               </li>
                <li>
                   <div onClick={()=>handleCollapse(2)} className={` ${state.openIds.includes(1) ? "bg-neutral-focus": "" }  flex justify-between items-center hover:bg-neutral-focus py-2 px-2`}>
                       <h2 className="text-white text-md font-medium">Language</h2>
                       <FaAngleDown/>
                   </div>
                   <div className={`${state.openIds.includes(2) ? "block" : "hidden"}`}>
                       {languages && languages.map(language => (
                           <div key={language._id} className="flex justify-between bg-dark-700/20 my-1 py-2 px-2" value={language._id} >
                               <span className="label-text">{language.name}</span>
                               <input type="checkbox" checked="" className="checkbox  checkbox-xs  checkbox-primary"/>
                           </div>
                       ))}
                   </div>
               </li>

                <li>
                   <div onClick={()=>handleCollapse(3)} className={` ${state.openIds.includes(1) ? "bg-neutral-focus": "" }  flex justify-between items-center hover:bg-neutral-focus py-2 px-2`}>
                       <h2 className="text-white text-md font-medium">Quantity</h2>
                       <FaAngleDown/>
                   </div>
                   <div className={`${state.openIds.includes(3) ? "block" : "hidden"}`}>
                       {qualities && qualities.map(quality => (
                           <div key={quality._id} className="flex justify-between bg-dark-700/20 my-1 py-2 px-2" value={quality._id} >
                               <span className="label-text">{quality.name}</span>
                               <input type="checkbox" checked="" className="checkbox  checkbox-xs  checkbox-primary"/>
                           </div>
                       ))}
                   </div>
               </li>
            </ul>


            <div className={["hidden w-full grid  grid-cols-1 sm:grid-cols-12 items-center gap-x-6 gap-y-4 relative", searchValue ? "justify-between" : "gap-x-6"].join(" ")}>
              {/********* FIlter by Genre ***********/}

              <button onClick={handleClearSearch}
              className="col-span-6 xl:col-span-3 w-max flex bg-red-500 hover:bg-red-800 px-2 py-1 ml-0 xl:ml-auto rounded items-center text-white text-sm ">
                <FaTimes />
                <span className="ml-1">Reset Filter </span>
              </button>

            </div>

        </div>
    );
};

export default Filter;