
const Movie = require("../models/Movie")
const fileUpload = require("../utilities/fileUpload")
const uploadImage = require("../utilities/imageCloudinary")

const homeMovieSection = require("../models/homeMovieSection.json")

const response = require("../utilities/response")


exports.getMovies = async (req, res) => {  

    const { text, pageNumber, perPageView, filter } = req.body

    try {


        let query = {}

        if(text){
            query["title"] = { $regex: new RegExp(text, "i")}
        }

        if(filter){
            for(let key in filter){
                if(filter[key]){
                    query[key] = filter[key]
                }
            }
        }


        let doc = await Movie.find(query)
        .skip((pageNumber - 1) * perPageView )
        .limit(perPageView)
        
        response(res, 200, {
            movies: doc
        })


    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.getSeriesMovies = async (req, res) => {  
    try {

        let s = homeMovieSection.find(s=>s.name === "Series")
        if(!s){
            return response(res, 404, {
                message: "Series not found",
            })
        }
        let doc = await Movie.find({genres: s._id})
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

exports.calcTotalMovie = async (req, res) => {  
    try {
        let total = await Movie.countDocuments()
        response(res, 200, {
            total: total
        })
    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.getMovieDetails = async (req, res) => {  
    try {

        let doc = await Movie.findOne({_id: req.params.id})
        .populate("genres", "name")
        .populate("quality", "name")
        .populate("language", "name")
        .populate("author", "firstName lastName avatar")

        response(res, 200, {
            movie: doc
        })


    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.searchMovie = async (req, res) => {  
    const { text } = req.body;
    try {

        let doc = await Movie.findOne({
            title: { $regex: new RegExp(text, "i")}
        })

        response(res, 200, {
            movies: doc
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
      
        let {file, fields} = await fileUpload(req, "cover")
     
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
            isPublic: true,
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


        if(file){
            let meta = await uploadImage(file, "netflix/images")
            if(meta){
                newMovie.cover = meta.secure_url
            }
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


exports.updateMovie = async (req, res) => {


    try {
      
        let {file, fields} = await fileUpload(req)
     
        const {
            _id,
            title,
            genres,
            runtime,
            quality,
            cover,
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

        let updateMovie = {
            title,
            genres,
            runtime,
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
            updateMovie.tags = t
        } catch(ex){}


        if(file){
            let meta = await uploadImage(file, "netflix/images")
            if(meta){
                updateMovie.cover = meta.secure_url
            }
        } else {
            updateMovie.cover = cover
        }
    
        updateMovie.author = req.userId
        
        let doc = await Movie.findByIdAndUpdate({_id}, { $set: updateMovie }, { new: true })      

        return response(res, 201, {
            movie: doc
        })

    } catch(ex){
     
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}