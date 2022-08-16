import React, {useRef} from "react"
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
import scrollTo from "../../utils/scrollTo.js";


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
        server: null
    })

    React.useEffect(() => {

        if(!movieCache[params.id]) {

            // store cache for individual movie
            fetchMovieDetails(params.id, (movie) => {
                dispatch(setMovieCache({_id: params.id, detail: movie}))

                setState({
                    ...state,
                    server: movie.videoUrl[0] ? movie.videoUrl[0] : null
                })

                scrollTo(0)

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

        scrollTo(0)
        setState({
            ...state,
            isPlaying: false
        })

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

    // function handlePlay(movie) {
    //     let videLink = movie.videoUrl ? movie.videoUrl.trim() : ""
    //     setState({
    //         httpResponse: videLink ? "" : "Movie video not found",
    //         httpStatus: videLink ? 0 : 500,
    //         isPlaying: true
    //     })
    // }

    function handleDownload(movie) {
        if(movie.videoUrl && movie.videoUrl.trim()) {
            if(movie.videoUrl.startsWith("https://www.youtube")){
                setState({
                    ...state,
                    popupMessage: "Youtube embed video can not download for copyright issue"
                })
            } else {
                let a = document.createElement("a")
                a.href = movie.videoUrl
                a.setAttribute("target", "_blank")
                a.click();
            }
        } else{
        setState({
            ...state,
            popupMessage: "Movie video link not found"
        })
            }
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

    const scriptTag = useRef()

    function removeScriptTags(){
        let cls = document.querySelectorAll(".player_script_tag")
        if(cls && cls.length) {
            for (let c of cls) {
                if (c.parentNode) {
                    c.parentNode.removeChild(c)
                }
            }
        }
    }

    function handleChooseServer(serverItem){
        let videLink = serverItem.value ? serverItem.value.trim() : ""
        setState({
            ...state,
            httpResponse: videLink ? "" : "Movie video not found",
            httpStatus: videLink ? 0 : 500,
            isPlaying: true,
            server: serverItem
        })
    }

    React.useEffect(()=>{

        if(scriptTag.current && getMovie) {

            let a = state.server.value;

            if(a && !a.startsWith("https://www.youtube")) {
                const s = document.createElement('script');
                s.classList.add("player_script_tag")
                s.type = 'text/javascript';
                s.async = true;
                s.innerHTML = `if (Hls.isSupported()) {var video = document.getElementById('video');var hls = new Hls();hls.loadSource('${a}');hls.attachMedia(video);hls.on(Hls.Events.MANIFEST_PARSED, function () {video.play();});}`

                let s2 = document.createElement('script');
                s2.classList.add("player_script_tag")
                s2.async = true;
                s2.src = "/hls.js@latest"
                scriptTag.current.appendChild(s2);
                scriptTag.current.appendChild(s);
            } else {
                removeScriptTags("player_script_tag")
            }
        }

        return ()=>{
            removeScriptTags("player_script_tag")
        }

    }, [state.isPlaying,  state.server])


    return (
        <div>
            <div ref={scriptTag}></div>

            {/*<Helmet>*/}
            {/*    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>*/}
            {/*    <script async={true}>*/}
            {/*        "document.write('This is output by document.write()!')";*/}
            {/*    </script>*/}
            {/*</Helmet>*/}

            <div className="max-w-screen-lg mx-auto ">
                <div className="mb-10">
                    <DialogBox className="px-3" isOpen={state.popupMessage}>
                        <>
                            <h3 className="font-bold text-xl md:text-2xl text-center text-white">{state.popupMessage}</h3>
                            <div onClick={dismissPopup}
                                 className="cursor-pointer bg-neutral text-white absolute right-3 top-3 p-2 rounded-full">
                                <FaTimes/>
                            </div>
                        </>
                    </DialogBox>

                    {/*<video id="video" controls={true} muted={true}> </video>*/}

                    {getMovie && getMovie.detail ? (
                        <div className="px-3">

                            <div className="flex justify-center gap-x-2 text-xl font-medium text-gray-100 mt-2">
                                <h4>{getMovie.detail.title}</h4>
                            </div>


                            <div className="flex justify-between">
                                {/******* Genres list ********/}
                                <div className="flex items-center mt-6">
                                    <h2 className="text-red-500 font-bold text-md md:text-lg">Genres:</h2>
                                    <div className="flex flex-wrap gap-x-1 ml-2">
                                        { getMovie.detail.genres && getMovie.detail.genres.map(genre=>(
                                            <span className="text-sm md:text-base text-gray-200 ml-1">{genre.name}</span>
                                        )) }
                                    </div>
                                </div>

                                {auth.auth && auth.auth.role === "admin" && <button className="btn block ml-auto ">
                                    <Link to={`/admin/update-movie/${getMovie.detail._id}`}>Edit Movie</Link>
                                </button>}

                            </div>



                            <ResponseAlert
                                message={state.httpResponse} statusCode={state.httpStatus}
                            />


                            {/* video player  */}
                            <div className="mt-4">

                                {/* https://www.youtube.com/embed/oqxAJKy0ii4 */}

                                {state.isPlaying
                                    ? (
                                        isYoutubeVideo(state.server.value) ? (
                                            <div className="iframe-container">
                                                <iframe
                                                    width="925"
                                                    height="520"
                                                    src={updateYoutubeLink(state.server.value)}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen>
                                                </iframe>
                                            </div>
                                        ) : (
                                            <video
                                                id="video"
                                                controlsList="nodownload"
                                                controls

                                                className="w-full"
                                            muted={true}>

                                            </video>)
                                    ) : (
                                        <div>
                                            <img src={fullPath(getMovie.detail.cover)} alt=""/>
                                        </div>
                                    )
                                }

                            </div>


                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                                { getMovie.detail.videoUrl && getMovie.detail.videoUrl.map(video=>(
                                    <button onClick={()=>handleChooseServer(video)}
                                            className={`py-2 px-3 rounded-md ${state.server.id === video.id ? 'btn-primary' :  ''} flex items-center `}>
                                        <BiPlayCircle className="text-xl"/>
                                        <span className="ml-1">Watch on {video.name}</span>
                                        <span className="ml-2">
                                            <span className="ml-1">{video.quality} </span>
                                            <span className="ml-1">({video.language})</span>
                                        </span>
                                    </button>
                                )) }

                            </div>


                            <div className="mt-4 mb-6 flex gap-2 flex-wrap">
                                <button onClick={() => handleAddToFavorite(getMovie.detail._id)} className="btn ">
                                    <MdFavorite className="text-lg"/>
                                    <span
                                        className="ml-1">{isInFavorite(getMovie.detail._id) ? "Remove to Favorite" : "Add to Favorite"}</span>
                                </button>
                            </div>


                            {/* <iframe width="668" height="376" src="https://www.youtube.com/embed/oqxAJKy0ii4" title="Squid Game | Official Trailer | Netflix" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

                            {state.isPlaying && (
                                <div>
                                    <img src={fullPath(getMovie.detail.cover)} alt=""/>
                                </div>
                            )}


                            <table className="mt-2">
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


                            <button className="mt-10 btn btn-primary" onClick={()=>handleDownload(getMovie.detail)}>
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