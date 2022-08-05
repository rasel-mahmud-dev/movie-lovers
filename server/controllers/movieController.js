
const Movie = require("../models/Movie")
const fileUpload = require("../utilities/fileUpload")
const uploadImage = require("../utilities/imageCloudinary")

exports.getMovies = async (context) => {  
    try {
        let doc = await Movie.find({})
        context.response.status = 200
        return context.body = {
            movies: doc
        }

    } catch(ex){
        context.response.status = 500
        return context.body = {
            message: "Internal error. Please try again",
        }
    }
}

exports.addMovie = async (context) => {


    try {
      
        let {file, fields}= await fileUpload(context.req)
     
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
            isPublic,
            quality,
            videoUrl,
            rating,
            price,
            releaseYear,
            director,
            summary,
            language,
        }
        

        // try{
        //     let t = JSON.parse(tags)
        //     newMovie.tags = t
        // } catch(ex){}

       

    
        // let meta = await uploadImage(file, "netflix/images")
        // if(meta){
        //     newMovie.cover = meta.secure_url
        // }

     
        // newMovie.author = context.request.userId
        
        // let doc = new Movie(newMovie)      

        context.res.write("ASDDDDDDDD")
        context.res.end()
        

    //    doc.save().then(res=>{
    //         context.response.status = 201

    //         return context.body = {
    //             message: "Movie added",
    //             movie: doc
    //         } 
    //     }).catch(ex=>{
    //         console.log(ex);
    //     })
        
        

    } catch(ex){
        console.log(ex);
        context.response.status = 500
        return context.body = {
            message: "Internal error. Please try again",
        }
    }
}