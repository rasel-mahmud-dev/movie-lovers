
const movieController = require("../controllers/movieController")


module.exports = (router)=>{

    router.get('', '/api/movies', movieController.getMovies)
    router.post('', '/api/add-movie', movieController.addMovie)

}
