
const genreController = require("../controllers/genreController")


module.exports = (router)=>{

    router.get('', '/api/genres', genreController.getGenres)
    router.post('', '/api/add-genre', genreController.addGenre)

}
