import React from 'react';
import {FaAngleDown, FaAngleLeft,  FaTimes} from "react-icons/fa";


const Filter = (props) => {

    const {filter, genres, languages, searchValue, qualities, onChangeFilter, toggleSidebar, handleClearSearch} = props

    const data = {
        genres: genres,
        language: languages,
        quality: qualities,
    }


    const [state, setState]  = React.useState({
        openIds: [1]
    })

    function handleChange(e){
        const {name, value} = e.target

        let updateFilter = {...filter}
        let isExistIndex = updateFilter[name].findIndex(item=> item._id === value)

        if(isExistIndex !== -1){
            let clone = [...updateFilter[name]]
            clone.splice(isExistIndex, 1)
            updateFilter[name] = clone
        } else {
            let item = data[name].find(item=>item._id === value)
            updateFilter[name] = [
                ...updateFilter[name],
                { name: item.name, _id: item._id }
            ]
        }

        onChangeFilter(updateFilter)
    }

    function handleClearFilter(name){
        let updateState = {...filter}
        updateState[name] = []
        onChangeFilter(updateState)
    }

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

    function renderAllFilterValues(){

        const  filterItems = {
            genres: filter.genres,
            language: filter.language,
            quality: filter.quality,
        }

        return Object.keys(filterItems).map(key=>{
            return filterItems[key] && filterItems[key].length > 0 && (
                <div className="mt-2">
                    <div className="flex items-center justify-between">
                        <span className="text-white uppercase text-sm">{key}</span>
                        <button onClick={()=>handleClearFilter(key)} className="flex items-center bg-neutral-focus px-3 py-1 rounded-md text-sm text-gray-300 cursor-pointer"><FaTimes className="mr-1" /> clear</button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {filterItems[key] && filterItems[key].map(item=>(
                            <div className="bg-primary px-2 text-gray-200 rounded text-sm">
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="py-4 ">

            <button onClick={toggleSidebar} className="flex items-center fixed left-4 top-2 bg-neutral-focus px-3 py-2 rounded-md text-gray-200 text-sm">
                <FaAngleLeft className="mr-1" />
                <span>Back</span>

            </button>

            <h2 className="text-white text-md font-medium text-center">Filter Movie</h2>


            <div className="px-4">
                {renderAllFilterValues() }
            </div>

            <ul className="overflow-auto max-h-screen h-auto px-2 mt-6  mx-2">
                <li className="my-2 bg-neutral-focus">
                   <div onClick={()=>handleCollapse(1)} className={`cursor-pointer ${state.openIds.includes(1) ? "bg-neutral-focus": "" } flex justify-between items-center hover:bg-neutral-focus py-2 px-2`}>
                       <h2 className="text-white text-sm md:text-md font-medium">Genres</h2>
                       <FaAngleDown/>
                   </div>
                   <div className={`${state.openIds.includes(1) ? "block" : "hidden"}`}>
                       {genres && genres.map(genre => (
                           <div key={genre._id} className="flex justify-between bg-dark-700/20 my-1 py-2 px-2 cursor-pointer">
                               <label htmlFor={genre.name} className="label-text text-sm w-full">{genre.name}</label>
                               <input
                                   value={genre._id}
                                   type="checkbox"
                                   name="genres"
                                   id={genre.name}
                                   checked={filter.genres.findIndex(item=>item._id === genre._id) !== -1}
                                   className="checkbox  checkbox-xs checkbox-primary"
                                   onChange={handleChange}

                               />
                           </div>
                       ))}
                   </div>
               </li>

                <li className="my-2 bg-neutral-focus ">
                   <div onClick={()=>handleCollapse(2)} className={`cursor-pointer ${state.openIds.includes(1) ? "bg-neutral-focus": "" }  flex justify-between items-center hover:bg-neutral-focus py-2 px-2`}>
                       <h2 className="text-white text-sm md:text-md font-medium">Language</h2>
                       <FaAngleDown/>
                   </div>
                   <div className={`${state.openIds.includes(2) ? "block" : "hidden"}`}>
                       {languages && languages.map(language => (
                           <div key={language._id} className="flex justify-between bg-dark-700/20 my-1 py-2 px-2 cursor-pointer" >
                               <label htmlFor={language.name} className="label-text text-sm w-full" >{language.name}</label>
                               <input
                                   value={language._id}
                                   type="checkbox"
                                   name="language"
                                   id={language.name}
                                   checked={filter.language.findIndex(item=>item._id === language._id) !== -1}
                                   className="checkbox  checkbox-xs checkbox-primary"
                                   onChange={handleChange}

                               />
                           </div>
                       ))}
                   </div>
               </li>

                <li className="my-2 bg-neutral-focus">
                   <div onClick={()=>handleCollapse(3)} className={`cursor-pointer ${state.openIds.includes(1) ? "bg-neutral-focus": "" }  flex justify-between items-center hover:bg-neutral-focus py-2 px-2`}>
                       <h2 className="text-white text-sm md:text-md font-medium">Quantity</h2>
                       <FaAngleDown/>
                   </div>
                   <div className={`${state.openIds.includes(3) ? "block" : "hidden"}`}>
                       {qualities && qualities.map(quality => (
                           <div key={quality._id} className="flex justify-between bg-dark-700/20 my-1 py-2 px-2 cursor-pointer"  >
                               <label htmlFor={quality.name} className="label-text text-sm w-full">{quality.name}</label>
                               <input
                                   value={quality._id}
                                   type="checkbox"
                                   name="quality"
                                   id={quality.name}
                                   checked={filter.quality.findIndex(item=>item._id === quality._id) !== -1}
                                   className="checkbox  checkbox-xs checkbox-primary"
                                   onChange={handleChange}
                               />
                           </div>
                       ))}
                   </div>
               </li>
            </ul>


            <div className={["hidden w-full grid  grid-cols-1 sm:grid-cols-12 items-center gap-x-6 gap-y-4 relative", searchValue ? "justify-between" : "gap-x-6"].join(" ")}>
              {/********* Filter by Genre ***********/}

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