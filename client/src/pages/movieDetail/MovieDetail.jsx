import React from "react"
import { useSelector, useDispatch } from "react-redux"
import fullPath from "src/utils/fullPath"
import { useParams, Link } from "react-router-dom"
import { fetchMovieDetails } from 'src/store/actions/appActions';
import { toggleFavoriteMovie } from 'src/store/actions/authActions';
import { setMovie } from 'src/store/slices/appSlice';
import { addToFavorite, removeFromFavorite } from 'src/store/slices/authSlice';
import { FaCloudDownloadAlt, FaTimes } from "react-icons/fa"
import { MdFavorite } from "react-icons/md"

import { setFavoritesMovies } from "src/store/slices/authSlice"
import { fetchFavoriteMovies } from "src/store/actions/authActions"

import ReactPlayer from 'react-player'
import ResponseAlert from './../../components/ResponseAlert';
import DialogBox from './../../components/DialogBox';



const MovieDetail = () => {

    const { app, auth } = useSelector(state => state)

    const { movie } = app
    const { favorites } = auth

    const params = useParams()
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        httpResponse: "",
        httpStatus: 0,
        popupMessage: ""
    })


    React.useEffect(() => {
        fetchMovieDetails(params.id, (movie) => {
            dispatch(setMovie(movie))
        })
    }, [])

    React.useEffect(() => {
        if (auth.auth && auth.auth._id) {
            (!favorites || favorites.length === 0) && fetchFavoriteMovies(auth.auth._id, (favoriteMovies) => {
                dispatch(setFavoritesMovies(favoriteMovies))
            })
        }

    }, [auth.auth])


    function handleAddToFavorite(movieId) {
        if(!auth.auth){
            setState({
                ...state,
                popupMessage: "Please login first"
            })
            return;
        }
        toggleFavoriteMovie(movieId, function (data) {
            if (data.isAdded) {
                dispatch(addToFavorite(data.favorite))
            } else {
                dispatch(removeFromFavorite(data._id))
            }
        })
    }

    function isInFavorite(movieId) {
        let a = favorites && (favorites.findIndex(f => f._id === movieId) !== -1) ? true : false;
        return a
    }


    function renderValue(key, value) {

        let item;
        switch (true) {
            case key === "author":
                item = value && <span>{value.firstName} {value.lastName}</span>
                break;

            case key === "price":
                item = <span>{value == 0 ? "Free" : "$" + value}</span>
                break;

            case key === "runtime":
                item = <span>{value} min</span>
                break;

            case key === "tags":
                let aa = []
                value.forEach(a => {
                    let i = <span className="px-3 py-1 bg-primary text-sm text-gray-200 mr-2 rounded">{a}</span>
                    aa.push(i)
                })
                item = aa;
                break;

            case key === "releaseYear":
                item = <span>{new Date(value).toLocaleDateString()}</span>
                break;

            default:
                if(value){
                    if (typeof value === "object") {

                        item = value.name
                    } else {
                        item = value
                    }
                } else{
                    item = ""
                }
                
                break;
        }

        return item
    }

    let whiteList = ["updatedAt", "createdAt", "__v", "summary", "videoUrl", "trailerUrl", "cover", "_id"]

    function handleError(e){
        if(e){
            setState({
                httpResponse: "This video can't play",
                httpStatus: 500
            })
        }
    }

    function handlePlay(e){
        setState({
            httpResponse: "",
            httpStatus: 0
        })
    }

    function handleDownload(e){
        setState({
            ...state,
            popupMessage: "Download feature not implement yet"
        })
    } 

    function dismissPopup(){
        setState({
            ...state,
            popupMessage: ""
        })
    }

    function isYoutubeVideo(url){
        if(url && url.startsWith("https://www.youtube.com")){
            return true
        } else{
            return false
        }
    }


    return (
        <div>
            <div className="max-w-screen-lg mx-auto px-3">
                <div className="mb-10">


                    <DialogBox className="shadow-10xl" isOpen={state.popupMessage}>
                        <>
                            <h3 class="font-bold text-2xl text-center text-white">{state.popupMessage}</h3>
                            <div onClick={dismissPopup} className="cursor-pointer bg-neutral text-white absolute right-3 top-3 p-2 rounded-full">
                                <FaTimes />
                            </div>
                        </>
                    </DialogBox>


                    {movie && (
                        <div className="">

                            <div className="flex justify-center gap-x-2 text-xl font-medium text-gray-100 mt-2">
                                <h4>{movie.title}</h4>
                                <h4 className="text-orange-400">{movie.genres && movie.genres.name}</h4>
                            </div>


                            {auth.auth && auth.auth.role === "admin" && <button className="btn block ml-auto ">
                                <Link to={`/admin/update-movie/${movie._id}`}>Edit Movie</Link>
                            </button>}



                            <ResponseAlert 
                                message={state.httpResponse} statusCode={state.httpStatus}
                            />



                            {/* video player  */}
                            <div className="mt-10">
                            { isYoutubeVideo(movie.videoUrl && movie.videoUrl.startsWith("http") ? movie.videoUrl : movie.trailerUrl) ? (
                                <div className="iframe-container">
                                <iframe 
                                    width="925"
                                    height="520" 
                                    src="https://www.youtube.com/embed/oqxAJKy0ii4" 
                                 
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>

                                </iframe>
                                </div>
                                // <iframe src={movie.videoUrl && movie.videoUrl.startsWith("http") ? movie.videoUrl : movie.trailerUrl} frameborder="0"></iframe>
                            ) : (
                                <video controls className="w-full" src={movie.videoUrl && movie.videoUrl.startsWith("http") ? movie.videoUrl : movie.trailerUrl}>
                                
                                </video>

                            ) }
                            </div>

            

                            <div className="mt-4 mb-6">
                                <button onClick={() => handleAddToFavorite(movie._id)} className="btn btn-primary">
                                    <MdFavorite className="text-lg" />
                                    <span className="ml-2">{isInFavorite(movie._id) ? "Remove to Favorite" : "Add to Favorite"}</span>
                                </button>

                            </div>


                            <table>

                                <tbody>
                                    {Object.keys(movie).map(key => whiteList.indexOf(key) === -1 && (
                                        <tr className="">
                                            <td className="py-2 w-[150px] capitalize  text-red-500 font-bold text-xl">{key}</td>
                                            <td className="text-gray-300"> {renderValue(key, movie[key])}</td>
                                        </tr>
                                    ))}
                                </tbody>


                            </table>


                            <div className="mt-1 flex flex-col md:flex-row ">
                                <span className="flex-shrink-0 py-2 w-[150px] capitalize  text-red-500 font-bold text-xl">Summary</span>
                                <p className="text-gray-200 mt-4">{movie.summary}</p>
                            </div>


                            <button className="mt-10 btn btn-primary" onClick={handleDownload}>
                                <FaCloudDownloadAlt className="text-lg" />
                                <span className="ml-2">Download</span>
                            </button>


                        </div>
                    )}
                </div>
            </div>


        </div>
    )

}

export default MovieDetail