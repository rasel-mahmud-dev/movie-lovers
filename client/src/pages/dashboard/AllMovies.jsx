import React from 'react'
import { getApi } from 'src/api';
import { setAllMovie } from 'src/store/slices/appSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import fullPath  from 'src/utils/fullPath';
import {BsPencilSquare} from "react-icons/bs"
import {AiOutlineDelete} from "react-icons/ai"
import {FaTimes} from "react-icons/fa"
import DialogBox from './../../components/DialogBox';
import { useNavigate } from 'react-router-dom';
import errorMessage from './../../utils/errorResponse';


function AllMovies() {
    let dispath= useDispatch()
    let navigate = useNavigate()

    const { app: {allMovies}, auth} = useSelector(state=>state)

    const [dialogMessage, setDialogMessage] = React.useState("")

    React.useEffect(() => {

       if(!allMovies){
            getApi().get("/api/all-movies").then(response => {
                if(response.status === 200){
                    dispath(setAllMovie(response.data.movies));
                }
            }).catch(ex => {

            })
       }

    }, [])

    function handleEditMovie(movieId){
        if(auth && auth.auth && auth.auth.role === "admin"){
            navigate("/admin/update-movie/"+movieId)
        } else {
            setDialogMessage("Only admin can edit movie")
        }
    }
    function handleDeleteMovie(movieId){
        if(auth && auth.auth && auth.auth.role === "admin"){
            getApi().delete("/api/movie/"+movieId).then(response=>{
                if(response.status === 201){
                    if(allMovies){
                        let restMovies = allMovies.filter(m=>m._id !== movieId)
                        console.log(restMovies);
                        dispath(setAllMovie(restMovies))
                    }
                }
            }).catch(ex=>{
                setDialogMessage(errorMessage(ex))
            })
        } else {
            setDialogMessage("Only admin can delete movie")
        }
    }

    return (
        <div className="min-h-[50vh]">
            <h1 className="font-bold text-3xl text-gray-200 text-center mb-10">Movies</h1>
 
            <DialogBox isOpen={dialogMessage != ""} className="bg-red-600">
                <div className="flex justify-between">
                    <h3 class="font-bold text-xl text-white">{dialogMessage}</h3>
                        <div onClick={()=>setDialogMessage("")} className="cursor-pointer bg-neutral text-white p-2  rounded-full">
                                <FaTimes />
                            </div>
                </div>
            </DialogBox>

            <div class="overflow-x-auto custom_scrollbar">
                <table class="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Actions</th>
                            <th></th>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>trailerUrl</th>
                            <th>videoUrl</th>
                        </tr>
                    </thead>
                    <tbody>
                        { allMovies && allMovies.map((movie, index)=>(
                            <tr>
                            <th>
                                <div className="flex items-center gap-x-3 text-lg">
                                    <BsPencilSquare onClick={()=>handleEditMovie(movie._id)} className="cursor-pointer" />
                                    <AiOutlineDelete onClick={()=>handleDeleteMovie(movie._id)}  className="cursor-pointer text-xl" />
                                </div>
                            </th>
                            <th>{index + 1}</th>
                            <td>{movie.cover && (
                                <img className="w-10" src={fullPath(movie.cover)} alt="" srcset="" />
                            )}</td>
                            <td>{movie.title}</td>
                            <td>
                                
                               {movie.trailerUrl && <div class="my-tooltip">
                                    <span className="tooltip-data">{movie.trailerUrl}</span>
                                    <span className="">{movie.trailerUrl.substr(0, 50)}</span>
                                </div> }
                                    
                            
                            </td>
                            <td>
                                
                            {movie.videoUrl && <div class="my-tooltip">
                                    <span className="tooltip-data">{movie.videoUrl}</span>
                                    <span className="">{movie.videoUrl.substr(0, 50)}</span>
                                </div>
                            }
                            
                            </td>
                    
                        </tr>
                        )) }
                    </tbody>
                </table>
            </div>

        </div>
    )

}

export default AllMovies