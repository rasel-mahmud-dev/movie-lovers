import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import AddGenre from './AddGenre'
import AddLanguage from './AddLanguage'
import AddQuality from './AddQuality'

import InputGroup from "src/components/inputs/InputGroup"
import MultiInput from "src/components/inputs/MultiInput"
import FileUpload from "src/components/inputs/FileUpload"

import { setLanguages, setQualities } from "src/store/slices/appSlice"
import { fetchLanguages, fetchQualities } from "src/store/actions/appActions"



import { FaTimes } from "react-icons/fa"
import SelectGroup from 'src/components/inputs/SelectGroup'
import TextArea from '../../components/inputs/TextArea'
import { getApi } from '../../api'


function AddMovie() {
    const dispatch = useDispatch()
    const { app } = useSelector(state => state)

    

    const [state, setState] = React.useState({
        movieData: {
            title: { value: "", errorMessage: "", tauch: false },
            // author: {value: "", errorMessage: "", tauch: false}, // id 
            genres: { value: "", errorMessage: "", tauch: false }, // id
            runtime: { value: "", errorMessage: "", tauch: false },
            // isPublic: {value: "", errorMessage: "", tauch: false},
            cover: { value: null, blob: null, errorMessage: "", tauch: false },
            quality: { value: "", errorMessage: "", tauch: false }, // id
            videoUrl: { value: "", errorMessage: "", tauch: false },
            tags: { value: [], errorMessage: "", tauch: false },
            // rating: {value: "", errorMessage: "", tauch: false},
            price: { value: "", errorMessage: "", tauch: false },
            releaseYear: { value: "", errorMessage: "", tauch: false },
            director: { value: "", errorMessage: "", tauch: false },
            summary: { value: "", errorMessage: "", tauch: false },
            language: { value: "", errorMessage: "", tauch: false }, // id
        },
        addMovieModal: "" // addGenre | addLanguage |  addQuality
    })


    React.useState(() => {
        fetchLanguages((data) => {
            dispatch(setLanguages(data.languages))
        })
        fetchQualities((data) => {
            dispatch(setQualities(data.qualities))
        })


        try{
            let d = JSON.parse(localStorage.getItem("userData"))
            if(d){
                setState({
                    ...state,
                    movieData: d
                })
            }

        } catch(_){}

    }, [])



    const { movieData, addMovieModal } = state

    function handleChange(e) {

        const { name, value, values } = e.target;

        let updateMovieData = {
            ...state.movieData,
        }

        if (name === "tags") {
            updateMovieData = {
                ...updateMovieData,
                [name]: {
                    ...state.movieData[name],
                    value: values,
                    tauch: true,
                    errorMessage: state.movieData[name] ? "" : state.movieData[name].errorMessage
                }
            }
        } else {

            updateMovieData = {
                ...updateMovieData,
                [name]: {
                    ...state.movieData[name],
                    value: value,
                    tauch: true,
                    errorMessage: state.movieData[name] ? "" : state.movieData[name].errorMessage
                }
            }
        }


        setState({
            ...state,
            movieData: updateMovieData
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

    function resetForm(){
        localStorage.removeItem("userData")

        let updateMovieData = {}
        for (let key in movieData) {
            updateMovieData[key] = {
                ...movieData[key],
                value: "",
                tauch: false,
                errorMessage: ""
            }
        }

        setState({
            ...state,
            movieData: updateMovieData
        })
    }

    function handleAddMovie(e) {
        e.preventDefault();
        let isCompleted = true;

        let updatedState = {
            ...movieData
        }

        for (let key in movieData) {
            if (key === "tags") {

                if (!movieData[key].tauch || !movieData[key].value || movieData[key].value.length === 0 ) {
                    updatedState[key].errorMessage = `${key} is required`
                    isCompleted = false;
                }
            } else if(key === "cover"){
                if (!movieData[key].tauch || !movieData[key].value) {
                    updatedState[key].errorMessage = `${key} is required`
                    isCompleted = false;
                } else {
                    if(movieData[key].value.size > "102400"){ // 100kb
                        updatedState[key].errorMessage = `${key} size should be under 100kb`
                        isCompleted = false;
                    }
                }

            } else {
                if (!movieData[key].tauch || !movieData[key].value) {
                    updatedState[key].errorMessage = `${key} is required`
                    isCompleted = false;
                }
            }
        }

        if (!isCompleted) {
            setState({
                ...state,
                movieData: updatedState
            })
            return;
        }

        localStorage.setItem("userData", JSON.stringify(movieData))

        let formData = new FormData()
        for (let key in movieData) {
            if (key === "tags") {
                formData.append(key, JSON.stringify(movieData[key].value))
            } else {
                formData.append(key, movieData[key].value)
            }
        }

        getApi().post("/api/add-movie", formData).then(response => {
            console.log(response);
        }).catch(ex => {
            console.log(ex);
        })
    }

    return (
        <div className="my_container">

            {renderModal()}

            <h1 className="text-center font-bold text-4xl text-gray-50 mt-4 mb-3">Add new Movie</h1>

            <div className="max-w-3xl w-full mx-auto">
                <div className="flex justify-end mt-10">
                    <button onClick={() => handleToggleModal("addGenre")} className="btn btn-primary ml-5">Add Genre</button>
                    <button onClick={() => handleToggleModal("addQuality")} className="btn btn-primary ml-5">Add Quality</button>
                    <button onClick={() => handleToggleModal("addLanguage")} className="btn btn-primary ml-5">Add Language</button>

                </div>


                <form className="mt-8" onSubmit={handleAddMovie}>

                    {/*********** Title **************/}
                    <InputGroup
                        name="title"
                        type="text"
                        label="Title"
                        placeholder="Enter movie title"
                        onChange={handleChange}
                        value={movieData.title.value}
                        errorMessage={movieData.title.errorMessage}
                    />



                    {/*********** Cover **************/}
                    <FileUpload
                        name="cover"
                        type="text"
                        label="Cover"
                        placeholder="Choose Cover Photo"
                        onChange={handleChange}
                        value={movieData.cover.value}
                        errorMessage={movieData.cover.errorMessage}
                    />


                    {/*********** videoUrl **************/}
                    <InputGroup
                        name="videoUrl"
                        type="text"
                        label="videoUrl"
                        placeholder="movie url"
                        onChange={handleChange}
                        value={movieData.videoUrl.value}
                        errorMessage={movieData.videoUrl.errorMessage}
                    />


                    {/*********** Genre **************/}
                    <SelectGroup
                        name="genres"
                        label="Genre"
                        value={movieData.genres.value}
                        placeholder="Select Genre"
                        onChange={handleChange}
                        errorMessage={movieData.genres.errorMessage}
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
                        errorMessage={movieData.releaseYear.errorMessage}
                    />

                    {/*********** runtime **************/}
                    <InputGroup
                        name="runtime"
                        type="number"
                        label="Runtime"
                        placeholder="Movie duration"
                        onChange={handleChange}
                        errorMessage={movieData.runtime.errorMessage}
                        value={movieData.runtime.value}
                    />

                    {/*********** Director  **************/}
                    <InputGroup
                        name="director"
                        type="text"
                        label="Director"
                        placeholder="Director name"
                        onChange={handleChange}
                        errorMessage={movieData.director.errorMessage}
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
                        errorMessage={movieData.price.errorMessage}
                    />


                    {/*********** Qualities **************/}
                    <SelectGroup
                        name="quality"
                        label="quality"
                        value={movieData.quality.value}
                        placeholder="Select quality"
                        onChange={handleChange}
                        errorMessage={movieData.quality.errorMessage}
                        options={() => {
                            return (
                                <>
                                    <option selected>Select quality</option>
                                    {app.qualities && app.qualities.map(quality => (
                                        <option value={quality._id} >{quality.name}</option>
                                    ))}
                                </>
                            )
                        }}
                    />

                    {/*********** Languages **************/}
                    <SelectGroup
                        name="language"
                        label="Language"
                        value={movieData.language.value}
                        placeholder="Select Language"
                        onChange={handleChange}
                        errorMessage={movieData.language.errorMessage}
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
                    <TextArea
                        name="summary"
                        label="summary"
                        placeholder="Movie summary"
                        onChange={handleChange}
                        value={movieData.summary.value}
                        errorMessage={movieData.summary.errorMessage}
                    />

                    <MultiInput
                        name="tags"
                        label="Tags"
                        // value={movieData.tags.value}
                        onChange={handleChange}
                        placeholder="Select Tag"
                        errorMessage={movieData.tags.errorMessage}
                        defaultValues={movieData.tags.value}
                    />


                    <div className="flex justify-center mt-10">
                        <button type="submit" className="btn btn-primary px-20">Save</button>
                        <button type="button" onClick={resetForm} className="btn px-5 ml-4">clear</button>
                    </div>

                </form>




            </div>


        </div>

    )
}


export default AddMovie