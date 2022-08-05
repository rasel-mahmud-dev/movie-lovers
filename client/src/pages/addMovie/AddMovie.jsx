import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import AddGenre from './AddGenre'
import AddLanguage from './AddLanguage'
import AddQuality from './AddQuality'

import InputGroup from "src/components/inputs/InputGroup"

import { setLanguages } from "src/store/slices/appSlice"
import { fetchLanguages } from "src/store/actions/appActions"



import { FaTimes } from "react-icons/fa"
import SelectGroup from 'src/components/inputs/SelectGroup'

function AddMovie() {

    const dispatch = useDispatch()
    const { app } = useSelector(state => state)



    React.useState(() => {
        fetchLanguages((data) => {
            dispatch(setLanguages(data.languages))
        })
    }, [])


    const [state, setState] = React.useState({
        movieData: {
            title: { value: "", errorMessage: "", tauch: false },
            // author: {value: "", errorMessage: "", tauch: false}, // id 
            genres: { value: "", errorMessage: "", tauch: false }, // id
            runtime: { value: "", errorMessage: "", tauch: false },
            // isPublic: {value: "", errorMessage: "", tauch: false},
            cover: { value: "", errorMessage: "", tauch: false },
            quality: { value: "", errorMessage: "", tauch: false }, // id
            path: { value: "", errorMessage: "", tauch: false },
            tags: { value: "", errorMessage: "", tauch: false },
            // rating: {value: "", errorMessage: "", tauch: false},
            price: { value: "", errorMessage: "", tauch: false },
            releaseYear: { value: "", errorMessage: "", tauch: false },
            director: { value: "", errorMessage: "", tauch: false },
            summary: { value: "", errorMessage: "", tauch: false },
            language: { value: "", errorMessage: "", tauch: false }, // id
        },
        addMovieModal: "" // addGenre | addLanguage |  addQuality
    })


    const { movieData, addMovieModal } = state

    function handleChange(e) {
        const { name, value } = e.target;
        setState({
            ...state,
            movieData: {
                ...state.movieData,
                [name]: {
                    ...state.movieData[name],
                    value: value
                }
            }
        })
    }

    function handleAddNewGenre(data) {
        console.log(data);
    }

    function handleToggleModal(value) {
        setState({ ...state, addMovieModal: state.addMovieModal === value ? "" : value })
    }

    function renderModal() {
        return (
            <div>
                <div className={["modal", addMovieModal ? "visible opacity-100 pointer-events-auto" : ""].join(" ")}>
                    <div class="modal-box">

                        <div onClick={() => handleToggleModal("")} className="bg-neutral text-white absolute right-3 top-3 p-2 rounded-full">
                            <FaTimes />
                        </div>

                        {addMovieModal === "addGenre" &&
                            <AddGenre
                                setModal={handleToggleModal}
                                onSave={handleAddNewGenre}
                            />
                        }
                        {addMovieModal === "addLanguage" &&
                            <AddLanguage
                                setModal={handleToggleModal}
                                onSave={handleAddNewGenre}
                            />
                        }
                        {addMovieModal === "addQuality" &&
                            <AddQuality
                                setModal={handleToggleModal}
                                onSave={handleAddNewGenre}
                            />
                        }

                    </div>
                </div>
            </div>

        )
    }

    return (
        <div className="my_container">

            {renderModal()}

            <h1 className="text-center font-bold text-6xl text-gray-50 mt-8 mb-4">Add new Movie</h1>

            <div>
                <div className="flex justify-end mt-10">
                    <button onClick={() => handleToggleModal("addGenre")} className="btn btn-primary ml-5">Add Genre</button>
                    <button onClick={() => handleToggleModal("addQuality")} className="btn btn-primary ml-5">Add Quality</button>
                    <button onClick={() => handleToggleModal("addLanguage")} className="btn btn-primary ml-5">Add Language</button>

                </div>


                <div className="mt-8">

                    {/*********** Release year **************/}
                    <InputGroup
                        name="title"
                        type="text"
                        label="Title"
                        placeholder="Enter movie title"
                        onChange={handleChange}
                        value={movieData.title.value}
                    />



                    {/*********** Genre **************/}
                    <SelectGroup
                        name="genres"
                        label="Genre"
                        value={movieData.genres.value}
                        placeholder="Select Genre"
                        onChange={handleChange}
                        options={() => {
                            return (
                                <>
                                    <option selected>Select Genre</option>
                                    {app.genres && app.genres.map(genre => (
                                        <option value={genre._id} >{genre.name}</option>
                                    ))}
                                </>
                            )
                        }}
                    />


                    {/*********** Release year **************/}
                    <InputGroup
                        name="releaseYear"
                        type="date"
                        label="Release Year"
                        placeholder="Release Year"
                        onChange={handleChange}
                        value={movieData.releaseYear.value}
                    />

                    {/*********** runtime **************/}
                    <InputGroup
                        name="runtime"
                        type="number"
                        label="Runtime"
                        placeholder="Movie duration"
                        onChange={handleChange}
                        value={movieData.runtime.value}
                    />

                    {/*********** Director  **************/}
                    <InputGroup
                        name="director"
                        type="text"
                        label="Director"
                        placeholder="Director name"
                        onChange={handleChange}
                        value={movieData.director.value}
                    />

                    {/*********** Price **************/}
                    <InputGroup
                        name="price"
                        type="text"
                        label="Price"
                        placeholder="Enter movie price"
                        onChange={handleChange}
                        value={movieData.price.value}
                    />


                    {/*********** Genre **************/}
                    <SelectGroup
                        name="language"
                        label="Language"
                        value={movieData.language.value}
                        placeholder="Select Language"
                        onChange={handleChange}
                        options={() => {
                            return (
                                <>
                                    <option selected>Select language</option>
                                    {app.languages && app.languages.map(language => (
                                        <option value={language._id} >{language.name}</option>
                                    ))}
                                </>
                            )
                        }}
                    />



                    {/*********** Summary **************/}
                    <div className="mt-4 flex items-start">
                        <label htmlFor="" className="block w-40 font-medium text-gray-200" >Summary</label>
                        <textarea class="textarea textarea-primary w-full h-32 text-gray-300 " placeholder="Bio"></textarea>
                    </div>



                </div>




            </div>


        </div>

    )
}


export default AddMovie