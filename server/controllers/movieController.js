
const Genre = require("../models/Genre")

const formidable = require('formidable');

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

    const { name } = context.request.body
    try {

        const form = formidable({});
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
            //   res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
            //   res.end(String(err));
              return;
            }
            console.log(files);
            // res.writeHead(200, { 'Content-Type': 'application/json' });
            // res.end(JSON.stringify({ fields, files }, null, 2));
          });
  
        let doc = await Movie.findOne({name: name})
        if(doc){
            context.response.status = 404
            return context.body = {
                message: "genre already exists",
            }
        }
        
        let newGenre = new Genre({
            name: name

        })

        newGenre = await newGenre.save()
        if(newGenre){
            context.response.status = 201
            return context.body = {
                message: "Genre added",
                genre: newGenre
            }
        }
    

    } catch(ex){
        context.response.status = 500
        return context.body = {
            message: "Internal error. Please try again",
        }
    }
}