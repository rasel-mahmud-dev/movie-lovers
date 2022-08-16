
const movieController = require("../controllers/movieController")
const {admin, auth} = require("../middlewares")


module.exports = (router)=>{

    router.post('/api/movies',  movieController.getMovies)

    router.post('/api/similar-movies',  movieController.getSimilarMovies)
    
    router.get('/api/movie/:id',  movieController.getMovie)

    router.get('/api/movie-details/:id',  movieController.getMovieDetails)
    
    router.get('/api/home-section-movies',  movieController.getMoviesForHomeSection)

    router.get('/api/series-movies',  movieController.getSeriesMovies)

    router.post('/api/add-movie', admin, movieController.addMovie)

    router.post('/api/update-movie', admin, movieController.updateMovie)


    router.get('/api/all-movies', auth, movieController.getAllMovies)

    router.delete('/api/movie/:id', admin, movieController.deleteMovie)

    router.post('/api/send-movie-request', auth, movieController.requestMovie)

    router.get('/api/all-request-movie', admin, movieController.allRequestedMovie)

}
