
const movieController = require("../controllers/movieController")
const {admin} = require("../middlewares")

function a(v, next){
    console.log(v);
    next()
}

module.exports = (router)=>{

    router.get('', '/api/movies',  movieController.getMovies)
    router.post('', '/api/add-movie', admin, movieController.addMovie)

}
