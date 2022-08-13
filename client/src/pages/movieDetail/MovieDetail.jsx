import React from "react"
import {useSelector, useDispatch} from "react-redux"
import fullPath from "src/utils/fullPath"
import {useParams, Link} from "react-router-dom"
import {fetchMovieDetails} from 'src/store/actions/appActions';
import {toggleFavoriteMovie} from 'src/store/actions/authActions';
import {addToFavorite, removeFromFavorite} from 'src/store/slices/authSlice';
import {FaCloudDownloadAlt, FaTimes} from "react-icons/fa"
import {MdFavorite} from "react-icons/md"

import {setFavoritesMovies} from "src/store/slices/authSlice"
import {fetchFavoriteMovies} from "src/store/actions/authActions"

import ResponseAlert from 'src/components/ResponseAlert';
import DialogBox from 'src/components/DialogBox';
import {BiPlayCircle} from "react-icons/bi";
import PageSkeleton from "./PageSkeleton";
import {fetchSimilarMovies} from "src/store/actions/appActions";
import {setMovieCache, setSimilarMovieCache} from "src/store/slices/appSlice";
import Movie from "src/components/Movie";
import SimilarMovieSkeleton from "./SimilarMovieSkeleton";


const MovieDetail = () => {

    const {app, auth} = useSelector(state => state)

    const {movieCache} = app
    const {favorites} = auth

    const params = useParams()
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        httpResponse: "",
        httpStatus: 0,
        popupMessage: "",
        isPlaying: false,
    })

    React.useEffect(() => {



        if(!movieCache[params.id]) {

            // store cache for individual movie
            fetchMovieDetails(params.id, (movie) => {
                dispatch(setMovieCache({_id: params.id, detail: movie}))

                // store similarMovie cache for individual movie
                fetchSimilarMovies(movie, (data) => {
                    dispatch(setSimilarMovieCache({_id: movie._id, similarMovies: data.similarMovies}))
                })
            })
        }

        // if similar movie cache not found inside movie cache...
        if(movieCache[params.id]){
            if(!movieCache[params.id].similarMovies){
                fetchSimilarMovies(params.id, (data) => {
                    dispatch(setSimilarMovieCache({_id: params.id, similarMovies: data.similarMovies}))
                })
            }
        }


    }, [params.id])


    React.useEffect(() => {
        if (auth.auth && auth.auth._id) {
            (!favorites || favorites.length === 0) && fetchFavoriteMovies(auth.auth._id, (favoriteMovies) => {
                dispatch(setFavoritesMovies(favoriteMovies))
            })
        }

    }, [auth.auth])

    function handleAddToFavorite(movieId) {
        if (!auth.auth) {
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
        let a = favorites && (favorites.findIndex(f => f._id === movieId) !== -1);
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
                if (value) {
                    if (typeof value === "object") {

                        item = value.name
                    } else {
                        item = value
                    }
                } else {
                    item = ""
                }

                break;
        }

        return item
    }

    let whiteList = ["updatedAt", "createdAt", "__v", "summary", "videoUrl", "trailerUrl", "cover", "_id"]

    function handlePlay(movie) {
        let videLink = movie.videoUrl ? movie.videoUrl.trim() : ""
        setState({
            httpResponse: videLink ? "" : "Movie video not found",
            httpStatus: videLink ? 0 : 500,
            isPlaying: true
        })
    }

    function handleDownload(e) {
        setState({
            ...state,
            popupMessage: "Download feature not implement yet"
        })
    }

    function dismissPopup() {
        setState({
            ...state,
            popupMessage: ""
        })
    }

    function isYoutubeVideo(url) {
        if (url && url.startsWith("https://www.youtube.com")) {
            return true
        } else {
            return false
        }
    }

    function updateYoutubeLink(url) {
        if (url && url.startsWith("https://www.youtube.com")) {
            let a = url.replace("watch?v=", "embed/")
            let i = a.indexOf("&")
            if (i === -1) {
                return a
            } else {
                let o = a.slice(0, i)
                return o
            }
        } else {
            return url
        }
    }


    function renderMoreMovies(movieCache) {
        return movieCache.similarMovies ? (
            <div className="mt-8">
                <h2 className="text-xl md:text-2xl font-medium text-white my-4">Similar movies</h2>
                <div className="movie_list gap-3">
                    {movieCache.similarMovies.map(movie=>(
                        <Movie movie={movie} key={movie._id} />
                    )) }
                </div>
            </div>
        ) : (
            <SimilarMovieSkeleton count={12}/>
        )
    }

    const getMovie = movieCache[params.id]

    return (
        <div>
            <div className="max-w-screen-lg mx-auto ">
                <div className="mb-10">
                    <DialogBox className="px-3" isOpen={state.popupMessage}>
                        <>
                            <h3 class="font-bold text-2xl text-center text-white">{state.popupMessage}</h3>
                            <div onClick={dismissPopup}
                                 className="cursor-pointer bg-neutral text-white absolute right-3 top-3 p-2 rounded-full">
                                <FaTimes/>
                            </div>
                        </>
                    </DialogBox>

                    {getMovie && getMovie.detail ? (
                        <div className="px-3">

                            <div className="flex justify-center gap-x-2 text-xl font-medium text-gray-100 mt-2">
                                <h4>{getMovie.detail.title}</h4>
                            </div>


                            {auth.auth && auth.auth.role === "admin" && <button className="btn block ml-auto ">
                                <Link to={`/admin/update-movie/${getMovie.detail._id}`}>Edit Movie</Link>
                            </button>}

                            <ResponseAlert
                                message={state.httpResponse} statusCode={state.httpStatus}
                            />


                            {/* video player  */}
                            <div className="mt-4">
                                {state.isTrailerMode && (
                                    <h2 className="text-white font-medium my-1">Trailer video</h2>
                                )}

                                {/* https://www.youtube.com/embed/oqxAJKy0ii4 */}
                                {state.isPlaying
                                    ? (
                                        isYoutubeVideo(getMovie.detail.videoUrl) ? (
                                            <div className="iframe-container">
                                                <iframe
                                                    width="925"
                                                    height="520"
                                                    src={updateYoutubeLink(getMovie.detail.videoUrl)}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen>
                                                </iframe>
                                            </div>
                                        ) : (
                                            <video
                                                controlsList="nodownload"
                                                controls
                                                // application/x-mpegURL
                                                className="w-full"
                                                src={getMovie.detail.videoUrl}>
                                            </video>)
                                    ) : (
                                        <div>
                                            <img src={fullPath(getMovie.detail.cover)} alt=""/>
                                        </div>
                                    )
                                }

                            </div>


                            <div className="mt-4 mb-6 flex gap-2 flex-wrap">
                                <button onClick={() => handleAddToFavorite(getMovie.detail._id)} className="btn ">
                                    <MdFavorite className="text-lg"/>
                                    <span
                                        className="ml-1">{isInFavorite(getMovie.detail._id) ? "Remove to Favorite" : "Add to Favorite"}</span>
                                </button>

                                <button
                                    onClick={() => handlePlay(getMovie.detail)}
                                    className="btn btn-primary">
                                    <BiPlayCircle className="text-xl"/>
                                    <span className="ml-1">Watch Now</span>
                                </button>
                            </div>

                            {/* <iframe width="668" height="376" src="https://www.youtube.com/embed/oqxAJKy0ii4" title="Squid Game | Official Trailer | Netflix" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

                            {state.isPlaying && (
                                <div>
                                    <img src={fullPath(getMovie.detail.cover)} alt=""/>
                                </div>
                            )}

                            <table>
                                <tbody>
                                {Object.keys(getMovie.detail).map(key => whiteList.indexOf(key) === -1 && (
                                    <tr className="">
                                        <td className="py-2 w-[150px] capitalize  text-red-500 font-bold text-xl">{key}</td>
                                        <td className="text-gray-300"> {renderValue(key, getMovie.detail[key])}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>


                            <div className="mt-1 flex flex-col md:flex-row ">
                                <span
                                    className="flex-shrink-0 py-2 w-[150px] capitalize  text-red-500 font-bold text-xl">Summary</span>
                                <p className=" text-gray-200 mt-4">{getMovie.detail.summary}</p>
                            </div>


                            <button className="mt-10 btn btn-primary" onClick={handleDownload}>
                                <FaCloudDownloadAlt className="text-lg"/>
                                <span className="ml-2">Download</span>
                            </button>

                            {renderMoreMovies(getMovie)}

                        </div>
                    ) :
                        <>
                            <PageSkeleton/>
                            <SimilarMovieSkeleton />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieDetail