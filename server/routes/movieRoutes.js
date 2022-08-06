
const movieController = require("../controllers/movieController")
const {admin} = require("../middlewares")

function a(v, next){
    console.log(v);
    next()
}

module.exports = (router)=>{

    router.get('/api/movies',  movieController.getMovies)
    router.get('/api/movie/:id',  movieController.getMovie)
    router.get('/api/home-section-movies',  movieController.getMoviesForHomeSection)
    router.post('/api/add-movie', admin, movieController.addMovie)
    router.post('/api/update-movie', admin, movieController.updateMovie)

}
