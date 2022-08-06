
import React from "react"
import {useSelector} from "react-redux"
import fullPath from "../../utils/fullPath"
import { useParams, Link } from "react-router-dom"


const MovieDetail = ()=> {

    const {app, auth} = useSelector(state=>state)

    const {movies} = app

    const params =  useParams()

  

    const movie = movies.find(movie=>movie._id === params.id)



    function renderValue(key, value){
        let item;
        switch (true) {
            case key === "price":
             
                item = <span>{value ==  0 ? "Free" : "$" + value}</span>
                break;
        
            case key === "releaseYear":
             
                item = <span>{new Date(value).toLocaleDateString()}</span>
                break;
        
            default:
                item = value
                break;
        }

        return item
    }

    let whiteList = ["updatedAt", "createdAt", "__v", "summary", "videoUrl", "cover", "_id"]

  
    return (
      <div>
        <div className="max-w-screen-lg mx-auto">
            <div className="">
              {movie  && (
                <div className="">

                <div className="flex justify-center gap-x-2 text-xl font-medium text-gray-100">
                    <h4>{movie.title}</h4>
                    <h4>4 Minutes</h4>
                    <h4>2022-03-28</h4>
                    <h4>Romantic/Action</h4>
                </div>


               {auth.auth && auth.auth.role === "admin" && <button className="btn block ml-auto ">
                    <Link to={`/admin/update-movie/${movie._id}`}>Edit Movie</Link>
                </button>}


                    {/* <div class="flex">
                
                        <img className="rounded-xl" src={fullPath(movie.cover)} alt="car!" />
                    
                    <div class="card-body">
                        <h2 class="font-semibold text-4xl text-gray-100">{movie.title}</h2>
                        <p className="text-gray-300">{movie.summary}</p>
                        <div class="">
                        <button class="btn btn-primary">Watch Now</button>
                        </div>
                    </div>
                    </div> */}

                    {/* video player  */}
                    <div className="mt-10"> 
                        <video controls className="w-4/6" src={fullPath("images/v.mp4")}></video>
                    </div>


                    <table>

                        <tbody>
                            { Object.keys(movie).map(key=> whiteList.indexOf(key) === -1 && (
                                <tr className="">
                                    <td className="py-2 w-[150px] capitalize  text-red-500 font-bold text-xl">{key}</td>
                                    <td className="text-gray-300"> {renderValue(key, movie[key])}</td>
                                </tr>
                            )) }
                        </tbody>


                    </table>   

    
                    <div className="mt-10 flex"> 
                        <span className="flex-shrink-0 py-2 w-[150px] capitalize  text-red-500 font-bold text-xl">Summary</span>
                        <p className="text-gray-200 mt-4">{movie.summary}</p>
                    </div>


                    <button className="mt-10 btn btn-primary">Download </button>


                </div>
              ) }
            </div>
          </div>
    
    
      </div>
    )
  
  }

  export default MovieDetail