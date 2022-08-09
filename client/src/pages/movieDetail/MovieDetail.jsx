import React from "react"
import { useSelector, useDispatch } from "react-redux"
import fullPath from "src/utils/fullPath"
import { useParams, Link } from "react-router-dom"
import { fetchMovieDetails } from 'src/store/actions/appActions';
import { toggleFavoriteMovie } from 'src/store/actions/authActions';
import { setMovie } from 'src/store/slices/appSlice';
import { addToFavorite, removeFromFavorite } from 'src/store/slices/authSlice';
import { FaCloudDownloadAlt } from "react-icons/fa"
import { MdFavorite } from "react-icons/md"

import { setFavoritesMovies } from "src/store/slices/authSlice"
import { fetchFavoriteMovies } from "src/store/actions/authActions"

import ReactPlayer from 'react-player'
import ResponseAlert from './../../components/ResponseAlert';



const MovieDetail = () => {

    const { app, auth } = useSelector(state => state)

    const { movie } = app
    const { favorites } = auth

    const params = useParams()
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        httpResponse: "",
        httpStatus: 0
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
        toggleFavoriteMovie(movieId, function (data) {
            if (data.isAdded) {
                dispatch(addToFavorite(data.favorite))
            } else {
                dispatch(removeFromFavorite(data._id))
            }
        })
    }

    function isInFavorite(movieId) {
        let a = favorites && favorites.findIndex(f => f._id === movieId) === -1 ? false : true;
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
                if (typeof value === "object") {
                    item = value.name
                } else {
                    item = value
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
        alert("Download feature not implement yet")
    } 


    return (
        <div>
            <div className="max-w-screen-lg mx-auto">
                <div className="mb-10">
                    {movie && (
                        <div className="">

                            <div className="flex justify-center gap-x-2 text-xl font-medium text-gray-100 mt-2">
                                <h4>{movie.title}</h4>
                                <h4 className="text-orange-400">{movie.genres && movie.genres.name}</h4>
                            </div>


                            {auth.auth && auth.auth.role === "admin" && <button className="btn block ml-auto ">
                                <Link to={`/admin/update-movie/${movie._id}`}>Edit Movie</Link>
                            </button>}


                            {/* video player  */}
                            {/* <div className="mt-10">
                                <video controls className="w-full" src={fullPath("images/v.mp4")}></video>
                            </div> */}


                            <ResponseAlert 
                                message={state.httpResponse} statusCode={state.httpStatus}
                            />
                          
                            <ReactPlayer
                                onPlay={handlePlay}
                            onError={handleError}  controls={true} 
                            
                                url={movie.videoUrl && movie.videoUrl.startsWith("http") ? movie.videoUrl : movie.trailerUrl}
                             />
                            {/* url='https://www.youtube.com/watch?v=RfLlwL7YvAw&ab_channel=PinakiBhattacharya' /> */}




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


                            <div className="mt-1 flex">
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