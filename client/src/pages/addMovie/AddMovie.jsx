import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import AddGenre from './AddGenre'

import InputGroup from "src/components/inputs/InputGroup"
import MultiInput from "src/components/inputs/MultiInput"
import FileUpload from "src/components/inputs/FileUpload"

import {
    setAddGenre, setAddLanguage, setAddQuality,
    setGenres, setLanguages, setQualities
} from "src/store/slices/appSlice"
import {fetchGenres, fetchLanguages, fetchQualities} from "src/store/actions/appActions"

import {FaTimes} from "react-icons/fa"
import TextArea from '../../components/inputs/TextArea'
import {getApi} from '../../api'
import {useParams} from 'react-router-dom';
import {api} from 'src/api';
import ResponseAlert from './../../components/ResponseAlert';
import errorMessage from './../../utils/errorResponse';
import scrollTo from "../../utils/scrollTo.js";
import AutoInput from "../../components/inputs/AutoInput.jsx";
import MultiSelect from "../../components/inputs/MultiSelect.jsx";
import SelectGroup from "../../components/inputs/SelectGroup.jsx";
import AddLanguage from "./AddLanguage.jsx";
import AddQuality from "./AddQuality.jsx";


function AddMovie() {
    const dispatch = useDispatch()
    const {app, auth} = useSelector(state => state)
    const params = useParams()

    const {genres, qualities, languages} = useSelector(state => state.app)

    const [state, setState] = React.useState({
        movieData: {
            databaseGenre: null,
            title: {value: "", errorMessage: "", tauch: false},
            // author: {value: "", errorMessage: "", tauch: false}, // id 
            genres: {value: null, errorMessage: "", tauch: false}, // id
            runtime: {value: "", errorMessage: "", tauch: false},
            language: {value: "", errorMessage: "", tauch: false},
            quality: {value: "", errorMessage: "", tauch: false}, // id
            // isPublic: {value: "", errorMessage: "", tauch: false},
            cover: {value: null, blob: null, errorMessage: "", tauch: false},
            casts: {value: "", errorMessage: "", tauch: false},
            // videoUrl.value = {value: string, language: string, quality: string}[] | null
            videoUrl: {value: null, errorMessage: "", tauch: false},
            tags: {value: [], errorMessage: "", tauch: false},
            // rating: {value: "", errorMessage: "", tauch: false},
            price: {value: "", errorMessage: "", tauch: false},
            releaseYear: {value: "", errorMessage: "", tauch: false},
            director: {value: "", errorMessage: "", tauch: false},
            summary: {value: "", errorMessage: "", tauch: false}
        },
        addMovieModal: "", // addGenre | addLanguage |  addQuality
        httpResponse: "",
        httpStatus: 0
    })

    function fetchMovie(id, cb) {
        api.get("/api/movie/" + id).then(res => {
            cb(res.data.movie)
        })
    }

    useState(() => {

        if (typeof fetchLanguages === "function") {
            (!languages || languages.length === 0) && fetchLanguages((data) => {
                dispatch(setLanguages(data.languages))
            })
        }

        if (typeof fetchQualities === "function") {
            (!qualities || qualities.length === 0) && fetchQualities((data) => {
                dispatch(setQualities(data.qualities))
            })
        }

        if (typeof fetchGenres === "function") {
            (!genres || genres.length === 0) && fetchGenres((data) => {
                dispatch(setGenres(data.genres))
            })
        }


        if (params.id) {
            fetchMovie(params.id, (movie) => {
                let updateMovieData = {...state.movieData}
                for (let key in updateMovieData) {
                    if (key === "releaseYear") {
                        let i = movie[key].indexOf("T")
                        updateMovieData[key] = {
                            ...updateMovieData[key],
                            value: movie[key].slice(0, i),
                            tauch: movie[key] ? true : false,
                            errorMessage: ""
                        }
                    } else if (key === "price") {
                        let isZero = movie[key] == 0
                        updateMovieData[key] = {
                            ...updateMovieData[key],
                            value: isZero ? "0" : movie[key],
                            tauch: true,
                            errorMessage: ""
                        }

                    } else if(key === "genres"){
                        updateMovieData["databaseGenre"] = movie[key]
                        // let items = []
                        // if(!genres || genres.length === 0){
                        //     updateMovieData["databaseGenre"] = movie[key]
                        //     return;
                        // }
                        // for (let item of movie[key]){
                        //     let findItem = genres.find(genre=>genre._id === item)
                        //     if(findItem){
                        //         items.push({name: findItem.name, _id: findItem._id})
                        //     }
                        // }
                        // if(items && items.length) {
                        //     updateMovieData[key] = {
                        //         ...updateMovieData[key],
                        //         value: items,
                        //         tauch: items ? true : false,
                        //         errorMessage: ""
                        //     }
                        //     updateMovieData["databaseGenre"] = null;
                        // } else {
                        //
                        //     // populate later when fetch all genred
                        //     updateMovieData["databaseGenre"] = movie[key]
                        // }

                    } else {
                        updateMovieData[key] = {
                            ...updateMovieData[key],
                            value: movie[key],
                            tauch: movie[key] ? true : false,
                            errorMessage: ""
                        }
                    }
                }


                setState({
                    ...state,
                    movieData: updateMovieData
                })
            })

        } else {
            if (auth.auth && auth.auth.role === "admin") {
                try {

                    let d = JSON.parse(localStorage.getItem("userData"))
                    if (d) {
                        setState({
                            ...state,
                            movieData: {
                                ...state.movieData,
                                ...d,
                            }
                        })
                    }
                } catch(_) {}
            } else {
                if(localStorage.getItem("userData")){
                    localStorage.removeItem("userData")
                }
            }
        }
    }, [])

    React.useEffect(()=>{
        let updateMovieData = {...state.movieData}
        let items = []

        if(state.movieData.databaseGenre) {
            let databaseGenre = state.movieData.databaseGenre

            for (let item of databaseGenre) {
                let findItem = genres.find(genre => genre._id === item)
                if (findItem) {
                    items.push({name: findItem.name, _id: findItem._id})
                }
            }

            updateMovieData["genres"] = {
                ...updateMovieData["genres"],
                value: items,
                tauch: items ? true : false,
                errorMessage: ""
            }

            updateMovieData.databaseGenre = null;

            setState({
                ...state,
                movieData: updateMovieData
            })
        }

    }, [genres, state.movieData.databaseGenre])

    const {addMovieModal, movieData} = state

    function handleChange(e) {

        const {name, value, values} = e.target;

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
        } else if(name === "videoUrl"){
            updateMovieData = {
                ...updateMovieData,
                [name]: {
                    ...state.movieData[name],
                    value: value ? value : "",
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
        dispatch(setAddGenre(data.genre))
    }

    function handleAddNewQuality(data) {
        dispatch(setAddQuality(data.quality))
    }

    function handleAddNewLanguage(data) {
        dispatch(setAddLanguage(data.language))
    }

    function handleToggleModal(value) {
        setState({...state, addMovieModal: state.addMovieModal === value ? "" : value})
    }

    function renderModal() {
        return (
            <div>
                <div className={["modal", addMovieModal ? "visible opacity-100 pointer-events-auto" : ""].join(" ")}>
                    <div className="modal-box">

                        <div onClick={() => handleToggleModal("")}
                             className="bg-neutral text-white absolute right-3 top-3 p-2 rounded-full">
                            <FaTimes/>
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
                                onSave={handleAddNewLanguage}
                            />
                        }
                        {addMovieModal === "addQuality" &&
                            <AddQuality
                                setModal={handleToggleModal}
                                onSave={handleAddNewQuality}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }

    function resetForm() {
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

        setState({...state, httpResponse: "", httpStatus: 0})

        let isCompleted = true;
        let updatedState = {...state.movieData}


        for (let key in movieData) {
            if (key === "videoUrl") {
                if (!movieData[key].tauch || !movieData[key].value || Array.isArray(movieData[key].value) && movieData[key].value.length === 0) {
                    updatedState[key].errorMessage = `${key} is required`
                    isCompleted = false;
                }

            } else if (key === "tags" || key === "genres") {
                if (!movieData[key].tauch || !movieData[key].value || movieData[key].value.length === 0) {
                    updatedState[key].errorMessage = `${key} is required`
                    isCompleted = false;
                }
            } else if (key === "cover") {
                if (!movieData[key].tauch || !movieData[key].value) {
                    updatedState[key].errorMessage = `${key} is required`
                    isCompleted = false;
                } else {
                    // only check when image is blob data;
                    if (!params.id) {
                        if (movieData[key].value.size > "102400") { // 100kb
                            updatedState[key].errorMessage = `${key} size should be under 100kb`
                            isCompleted = false;
                        }
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


        scrollTo(0)

        let formData = new FormData()
        for (let key in movieData) {
            if (key === "tags" || key === "videoUrl") {
                formData.append(key, JSON.stringify(movieData[key].value))
            } else if( key === "genres"){
                let genresIds = movieData[key].value.map(v=>v._id)
                formData.append(key, JSON.stringify(genresIds))
            } else {
                formData.append(key, movieData[key].value)
            }
        }

        if (auth.auth && auth.auth.role === "admin") {
            localStorage.setItem("userData", JSON.stringify(movieData))
        }



        setState({...state, httpResponse: "pending"})

        // Update existing movie
        if (params.id) {
            formData.append("_id", params.id)
            getApi().post("/api/update-movie", formData).then(response => {
                setState({
                    ...state,
                    httpResponse: "Movie updated...",
                    httpStatus: 200
                })
            }).catch(ex => {
                setState({
                    ...state,
                    httpResponse: errorMessage(ex),
                    httpStatus: 500
                })
            })


        } else {
            getApi().post("/api/add-movie", formData).then(response => {
                if (response.status === 201) {
                    setState({
                        ...state,
                        httpResponse: "movie added",
                        httpStatus: 200
                    })
                } else {
                    setState({
                        ...state,
                        httpResponse: response.data?.message,
                        httpStatus: 200
                    })
                }
            }).catch(ex => {
                setState({
                    ...state,
                    httpResponse: errorMessage(ex),
                    httpStatus: 500
                })
            })
        }

    }


    return (
        <div className="my_container">

            {renderModal()}

            <h1 className="text-center font-bold text-2xl md:text-4xl text-gray-50 mt-4 mb-3">
                {params.id ? "Update Movie" : "Add new Movie"}
            </h1>

            <div className="max-w-3xl w-full mx-auto">
                <div className="flex flex-wrap gap-4 justify-center md:justify-end mt-10">
                    <button onClick={() => handleToggleModal("addGenre")} className="btn btn-primary ">Add Genre
                    </button>
                    <button onClick={() => handleToggleModal("addQuality")} className="btn btn-primary ">Add Quality
                    </button>
                    <button onClick={() => handleToggleModal("addLanguage")} className="btn btn-primary ">Add Language
                    </button>

                </div>

                <form className="my-8" onSubmit={handleAddMovie}>


                    <ResponseAlert
                        className="my-2"
                        message={state.httpResponse}
                        statusCode={state.httpStatus}
                    />

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
                        defaultValue={movieData.cover.value}
                        errorMessage={movieData.cover.errorMessage}
                    />


                    {/*********** Multiple videoUrls **************/}
                    <AutoInput
                        name="videoUrl"
                        itemName="server"
                        label="Video Links"
                        value={movieData.videoUrl.value}
                        placeholder="Server link"
                        buttonText="Add more server"
                        onChange={handleChange}
                        errorMessage={movieData.videoUrl.errorMessage}
                    />


                    {/*********** select multiple genre **************/}
                    <MultiSelect
                        name="genres"
                        label="Genre"
                        value={movieData.genres.value}
                        placeholder="Select Genre"
                        onChange={handleChange}
                        errorMessage={movieData.genres.errorMessage}
                        options={(handleClick) => {
                            return (
                                <>
                                    {app.genres && app.genres.map(genre => (
                                        <li
                                            className="hover:bg-gray-400 hover:text-dark-700 px-2 mb-1"
                                            onClick={(e)=>handleClick({name: genre.name, _id: genre._id}, e)}
                                            key={genre._id} >{genre.name}</li>
                                    ))}
                                </>
                            )
                        }}
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
                                    <option defaultValue={true} value="">Select quality</option>
                                    {app.qualities && app.qualities.map(quality => (
                                        <option key={quality._id} value={quality._id}>{quality.name}</option>
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
                                    <option defaultValue={true} value="">Select language</option>
                                    {app.languages && app.languages.map(language => (
                                        <option key={language._id} value={language._id}>{language.name}</option>
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

                    {/*********** Casts  **************/}
                    <InputGroup
                        name="casts"
                        type="text"
                        label="Casts"
                        placeholder="casts "
                        onChange={handleChange}
                        errorMessage={movieData.casts.errorMessage}
                        value={movieData.casts.value}
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