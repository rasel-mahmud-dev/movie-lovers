
const Movie = require("../models/Movie")
const fileUpload = require("../utilities/fileUpload")
const uploadImage = require("../utilities/imageCloudinary")

const homeMovieSection = require("../models/homeMovieSection.json")

const response = require("../utilities/response")

// const redisConnect = require("../redis")


let homePageData = null


exports.getMovies = async (req, res) => {

    const { text, pageNumber, perPageView, filter } = req.body

    try {


        let query = {}

        if (text) {
            query["title"] = { $regex: new RegExp(text, "i") }
        }

        if (filter) {
            for (let key in filter) {
                if (filter[key]) {
                    query[key] = filter[key]
                }
            }
        }


        let doc = await Movie.find(query)
            .skip((pageNumber - 1) * perPageView)
            .limit(perPageView)

        response(res, 200, {
            movies: doc
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


exports.searchMovie = async (req, res) => {
    const { text } = req.body;
    try {

        let doc = await Movie.findOne({
            title: { $regex: new RegExp(text, "i") }
        })

        response(res, 200, {
            movies: doc
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
        let doc = await Movie.find({ genres: section._id }).limit(10)
        if (doc && doc.length > 0) {
            data[section.name] = doc;
        }
        if ((i + 1) === homeMovieSection.length) {
            cb(data)
        }
    })
}


exports.getMoviesForHomeSection = async (req, res) => {

    if (homePageData) {

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