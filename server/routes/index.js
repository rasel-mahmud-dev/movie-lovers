
const authRoutes = require("./authRoutes");
const genreRoutes = require("./genreRoutes");
const languageRoutes = require("./languageRoutes");
const qualityRoutes = require("./qualityRoutes");
const movieRoutes = require("./movieRoutes");

module.exports = (app)=>{

    authRoutes(app)
    genreRoutes(app)
    languageRoutes(app)
    qualityRoutes(app)
    movieRoutes(app)
}