
const Movie = require("../models/Movie")
const RequestMovie = require("../models/RequestMovie")
const fileUpload = require("../utilities/fileUpload")
const uploadImage = require("../utilities/imageCloudinary")

const homeMovieSection = require("../models/homeMovieSection.json")
const mongoose = require("mongoose")
const {ObjectId} = mongoose.Types
const response = require("../utilities/response")


// const redisConnect = require("../redis")


let homePageData = null


exports.getMovies = async (req, res) => {

    const { text, pageNumber, perPageView, filter } = req.body

    try {

        let query = []

        if (text) {
            query.push({title: { $regex: new RegExp(text, "i")}})
        }

        if (filter) {
            for (let key in filter) {
                if(filter[key] && filter[key].length){
                    filter[key].map(item=>{
                        query.push({[key]: item})
                    })
                }
            }
        }


        let doc = await Movie.find({
            $or: query && query.length ? query : [{}]
            // $or: [ 
            //     // {title: "300"}, 
            //     // {title: "SAD"},
            //     // {genres: "62ed3958e25223c70465f213" }
            // ]
        }).select("title cover")
            .skip((pageNumber - 1) * perPageView)
            .limit(perPageView)

        let counts = 0;
        if(pageNumber === 1){
            counts = await Movie.countDocuments({
                $or: query && query.length ? query : [{}]
            })
        }

        response(res, 200, {
            movies: doc,
            totalMovies: counts 
        })

    } catch (ex) {
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.getSimilarMovies = async (req, res) => {

    const {  pageNumber, perPageView, or } = req.body

    try {


        let { title, genres, language, tags } = or

        
        let queries = []

        if (title) {
            let titleArr  = title.split(" ")
            titleArr.forEach(item=>{
                queries.push({ title: new RegExp(item, "i") })
            })
        }
        if(language){
            queries.push({ language:  ObjectId(language) })
        }
        if(genres){
            queries.push({ genres:  ObjectId(genres) })
        }
        if(tags && Array.isArray(tags) && tags.length){
            queries.push({ tags:  { $in: tags } })
        }
        
        
        let doc = await Movie.aggregate([
            { 
                $match: {
                    
                    $or: [ 
                        ...queries,
                        // { genres: ObjectId("62ed430c9327186ffbfc868e") },
                        // { language: ObjectId("62ee8bde6e01d746187400b1") },
                        // { title: RegExp("300", "i")},
                        // { title: RegExp("troy", "i") },
                        // { tags: {
                            // $in: ["300"]
                        // }}
                    ]
                }
            },
            { $skip: (pageNumber - 1) * perPageView },
            { $limit: perPageView },
            { 
                $project: {
                    title:1,
                    cover: 1
                }
            }
        ])
        

        response(res, 200, {
            similarMovies: doc
        })


    } catch (ex) {
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.getSeriesMovies = async (req, res) => {
    try {

        let s = homeMovieSection.find(s => s.name === "Series")
        if (!s) {
            return response(res, 404, {
                message: "Series not found",
            })
        }
        let doc = await Movie.find({ genres: s._id })
        response(res, 200, {
            movies: doc
        })

    } catch (ex) {
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.getMovie = async (req, res) => {
    try {

        let doc = await Movie.findOne({ _id: req.params.id })

        response(res, 200, {
            movie: doc
        })


    } catch (ex) {
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
    } catch (ex) {
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.getMovieDetails = async (req, res) => {
    try {

        let doc = await Movie.findOne({ _id: req.params.id })
            .populate("genres", "name")
            .populate("quality", "name")
            .populate("language", "name")
            .populate("author", "firstName lastName avatar")

        response(res, 200, {
            movie: doc
        })


    } catch (ex) {
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}



function getFormMongodb(cb) {
    let data = {}
    homeMovieSection.forEach(async (section, i) => {
        try{
            let doc = await Movie.find({ genres: section._id }).select("title cover").limit(10)
            if (doc && doc.length > 0) {
                data[section.name] = doc;
            }
            if ((i + 1) === homeMovieSection.length) {
                cb(data)
            }
        } catch(ex){

        }
    })
}


exports.getMoviesForHomeSection = async (req, res) => {

    if (homePageData && Object.keys(homePageData).length > 3) {

        try {
            let data = JSON.parse(homePageData);
            response(res, 200, {
                data: data,
                message: "from server cache"
            })

        } catch (ex) {
            getFormMongodb((data) => {
                homePageData = JSON.stringify(data)
                response(res, 200, {
                    data: data
                })
            })
        }

    } else {
        getFormMongodb((data) => {
            homePageData = JSON.stringify(data)
            response(res, 200, {
                data: data
            })
        })

    } 


    // let client = await redisConnect()
    // if (client) {
    //     let a = await client.get("home_section_movies")
    //     if (a) {
    //         try{
    //             let data = JSON.parse(a);
    //             response(res, 200, {
    //                 data: data,
    //                 message: "from redis cache"
    //             })

    //         } catch(ex){
    //             getFormMongodb((data)=>{
    //                 client.set("home_section_movies", JSON.stringify(data))
    //                response(res, 200, {
    //                    data: data
    //                })
    //            })
    //         } finally{
    //             client?.quit()
    //         }


    //     } else{
    //         getFormMongodb((data)=>{
    //              client.set("home_section_movies", JSON.stringify(data))
    //              client?.quit()
    //             response(res, 200, {
    //                 data: data
    //             })
    //         })
    //     }
    // } else {
    //     // if redis connect fail...
    //     getFormMongodb((data)=>{
    //        response(res, 200, {
    //            data: data
    //        })
    //    })
    // }

}

exports.addMovie = async (req, res) => {


    try {

        let { file, fields } = await fileUpload(req, "cover")

        const {
            title,
            author,
            genres,
            runtime,
            isPublic,
            quality,
            videoUrl,
            
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
            
            rating,
            price,
            releaseYear,
            director,
            summary,
            language,
        }

        try {
            let t = JSON.parse(tags)
            newMovie.tags = t
        } catch (ex) { }


        if (file) {
            let meta = await uploadImage(file, "netflix/images")
            if (meta) {
                newMovie.cover = meta.secure_url
            }
        }

        newMovie.author = req.userId

        let doc = new Movie(newMovie)
        doc = await doc.save()

        homePageData = null
        return response(res, 201, {
            movie: doc
        })

    } catch (ex) {

        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.updateMovie = async (req, res) => {


    try {

        let { file, fields } = await fileUpload(req, "cover")

        const {
            _id,
            title,
            genres,
            runtime,
            quality,
            cover,
            videoUrl,
            
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
            
            rating,
            price,
            releaseYear,
            director,
            summary,
            language,
        }

        try {
            let t = JSON.parse(tags)
            updateMovie.tags = t
        } catch (ex) { }


        if (file) {
            let meta = await uploadImage(file, "netflix/images")
            if (meta) {
                updateMovie.cover = meta.secure_url
            }
        } else {
            updateMovie.cover = cover
        }

  
        updateMovie.author = req.userId

        let doc = await Movie.findByIdAndUpdate({ _id }, { $set: updateMovie }, { new: true })
        homePageData = null
        return response(res, 201, {
            movie: doc
        })

    } catch (ex) {
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.getAllMovies = async (req, res) => {
    try {
        let doc = await Movie.find({}).select("title cover videoUrl")

        response(res, 200, {
            movies: doc
        })


    } catch (ex) {
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.deleteMovie = async (req, res) => {
    try {

        if (!req.params.id) {
            response(res, 500, {
                message: "Please provide movie id",
            })
            return;
        }

        let doc = await Movie.findByIdAndDelete({ _id: req.params.id })
        if (doc) {
            homePageData = null
            response(res, 201, {
                message: "movie deleted."
            })
        } else {
            response(res, 404, {
                message: "movie not found."
            })
        }


    } catch (ex) {
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}


exports.requestMovie = async (req, res) => {
    try {

        const {movieName, message} = req.body;

        let movie =  await RequestMovie.findOne({movieName: movieName})
        if(movie){
            response(res, 409, {
                message: "This movie already requested",
            })
            return;
        }

     

        let newReq = new RequestMovie({
            movieName,
            email: req.userEmail,
            customerId: req.userId,
            message,
        })
        newReq = await newReq.save()
        if(newReq){
            response(res, 201, {
                message: "movie request has been send",
            })
        } else{
            response(res, 500, {
                message: "Internal error. Please try again",
            })
        }
        

    } catch (ex) {
        console.log(ex);
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }


}
exports.allRequestedMovie = async (req, res) => {
    try {
        let movies =  await RequestMovie.find({})
        if(movies){
            response(res, 200, {
                allRequestedMovie: movies,
            })
            return;
        }
    } catch (ex) {
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}