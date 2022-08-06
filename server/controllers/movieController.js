
const Movie = require("../models/Movie")
const fileUpload = require("../utilities/fileUpload")
const uploadImage = require("../utilities/imageCloudinary")

const homeMovieSection = require("../models/homeMovieSection.json")

const response = require("../utilities/response")


exports.getMovies = async (req, res) => {  
    try {

        let doc = await Movie.find({})

        response(res, 200, {
            movies: doc
        })


    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}

exports.getMovie = async (req, res) => {  
    try {

        let doc = await Movie.findOne({_id: req.params.id})

        response(res, 200, {
            movie: doc
        })


    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}



exports.getMoviesForHomeSection = async (req, res) => {  
    
    try {
        let data = {}
        homeMovieSection.forEach(async (section, i)=>{
            let doc = await Movie.find({genres: section._id}).limit(10)
            data[section.name] = doc;

            if((i + 1) === homeMovieSection.length){
                response(res, 200, {
                    data: data
                })
            }
        })

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}

exports.addMovie = async (req, res) => {


    try {
      
        let {file, fields} = await fileUpload(req)
     
        const {
            title,
            author,
            genres,
            runtime,
            isPublic,
            quality,
            videoUrl,
            trailerUrl,
            tags,
            rating,
            price,
            releaseYear,
            director,
            summary,
            language,
          
        } = fields

        let newMovie = {
            title,
            author,
            genres,
            runtime,
            isPublic,
            quality,
            videoUrl,
            trailerUrl,
            rating,
            price,
            releaseYear,
            director,
            summary,
            language,
        }
        
         try{
            let t = JSON.parse(tags)
            newMovie.tags = t
        } catch(ex){}


        let meta = await uploadImage(file, "netflix/images")
        if(meta){
            newMovie.cover = meta.secure_url
        }
    
        newMovie.author = req.userId
        
        let doc = new Movie(newMovie)      
        doc = await doc.save()

        return response(res, 201, {
            movie: doc
        })

    } catch(ex){
     
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}