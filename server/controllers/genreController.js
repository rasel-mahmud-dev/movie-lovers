
const Genre = require("../models/Genre")
const response = require("../utilities/response")

exports.getGenres = async (req, res) => {  
    try {
        let doc = await Genre.find({})
      
        response(res, 200, {
            message: "",
            genres: doc
        })

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}

exports.addGenre = async (req, res) => {

    const { name } = req.body
    try {
  
        let doc = await Genre.findOne({name: name})
        if(doc){
            response(res, 404, {
                message: "genre already exists",
            })
            return;
        }
        
        let newGenre = new Genre({
            name: name
        })

        newGenre = await newGenre.save()
        if(newGenre){
            response(res, 201, {
                message: "Genre added",
                genre: newGenre
            })
        } else{
            response(res, 500, {
                message: "Genre adding fail"
            })
        }
    

    } catch(ex){
        response(res, 500, {
            message: "Internal error. Please try again",
        })
    }
}